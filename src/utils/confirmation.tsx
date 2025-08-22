import { darken } from "polished";
import { useKey, useToggle } from "react-use";
import { useCallback } from "react";
import styled, { keyframes } from "styled-components";

import { Box, Spacer } from "@flexisaf/flexibull2/build/layout";
import { Text } from "@flexisaf/flexibull2/build/typo";

import theme from "utils/theme";
import { createRoot } from "react-dom/client";

type ConfirmationType = "warning" | "danger" | "confirm";

const colorTypeMap: Record<ConfirmationType, string> = {
    warning: theme.PrimaryOrange,
    danger: theme.PrimaryRed,
    confirm: theme.PrimaryColor,
};

const getColorFromTypeMap = (type: ConfirmationType) => colorTypeMap[type] || theme.PrimaryColor;

const blurIn = keyframes`
 from {
    backdrop-filter: blur(0px);
 }
  to {
    backdrop-filter: blur(2px);
  }
`;

const ConfirmationOverlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 1000;
    min-height: 100vh;
    display: grid;
    transition: all 2x ease-in-out;
    place-items: center;
    animation: ${blurIn} 700ms forwards;
    background-color: rgba(79, 93, 117, 0.2);
`;

const ConfirmationWrapper = styled.div<{ type: ConfirmationType }>`
    color: ${theme.PrimaryGrey};
    background: white;
    border-radius: 0.5em;
    padding: 24px;
    font-family: Inter;
    max-width: 400px;

    & button {
        // Values based on flexibull's button component
        height: 36px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0 15px;
        border-radius: 5px;

        background: transparent;
        border: none;
        cursor: pointer;

        &:hover {
            background-color: ${darken(0.1, "white")};
        }

        &.is-cancel {
            border: 1px solid black;
        }

        &.is-action {
            color: white;
            background-color: ${(p) => getColorFromTypeMap(p.type)};

            &:hover:not(:disabled) {
                background-color: ${(p) => darken(0.1, getColorFromTypeMap(p.type))};
            }
        }
        &.disabled {
            background-color: lightgray;
            color: gray;
            pointer-events: none;
            cursor: not-allowed;
        }
    }
`;

const containerId = "confirmation-container";
const defaultConfig = {};
(() => {
    if (!document.querySelector(`#${containerId}`)) {
        const container = document.createElement("div");
        container.setAttribute("id", containerId);
        document.body.append(container);
    }
})();

type ActionButton = { style?: React.CSSProperties; text: string; icon?: React.ReactNode };

type ConfirmationConfig = {
    title?: string | number | React.ReactNode;
    message?: string | number | React.ReactNode;
    icon?: React.ReactNode;
    onClose?: () => void;
    render?: (
        handleAction: () => void | Promise<void>,
        handleUnmount: () => void
    ) => React.ReactNode;
    type?: ConfirmationType;
    okText?: string;
    className?: string;
    cancelText?: string;
    okButton?: ActionButton;
    cancelButton?: ActionButton;
    loadingText?: string;
};

type ConfirmationProps = {
    cb: () => void;
} & ConfirmationConfig;

function Confirmation(props: ConfirmationProps) {
    const {
        cb,
        title,
        message,
        icon,
        type = "confirm",
        okButton,
        className,
        cancelButton,
        okText = "Confirm",
        cancelText = "Cancel",
        render,
        onClose,
        loadingText = "Loading...",
    } = props;

    useKey("Escape", unmountConfirmation);
    const [isLoading, toggleIsLoading] = useToggle(false);

    const handleUnmount = useCallback(() => {
        onClose && onClose();
        unmountConfirmation();
    }, [onClose]);

    const handleAction = useCallback(async () => {
        if (cb) {
            try {
                toggleIsLoading(true);
                await cb();
                unmountConfirmation();
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            } finally {
                toggleIsLoading(false);
            }
        }
    }, [cb, toggleIsLoading]);

    return (
        <ConfirmationOverlay>
            {render ? (
                render(handleAction, handleUnmount)
            ) : (
                <ConfirmationWrapper type={type} className={className}>
                    <Box>
                        <Box>
                            {icon && <Box style={{ marginBottom: "8px" }}>{icon}</Box>}
                            <Text
                                block
                                size="18px"
                                style={{
                                    textAlign: "left",
                                    margin: 0,
                                    fontWeight: "600",
                                    color: theme.PrimaryDark
                                }}
                            >
                                {title}
                            </Text>
                            <Spacer space="8px" />
                            <Text block style={{ textAlign: "left", color: theme.PrimaryDark }}>
                                {message}
                            </Text>
                        </Box>
                        <Spacer space="32" />
                        <Box display="flex" pad="20" style={{ justifyContent: "flex-end" }}>
                            <button
                                className="is-cancel"
                                onClick={handleUnmount}
                                style={{
                                    marginRight: "1em",
                                    borderColor: theme.PrimaryBorderColor,
                                    color: theme.PrimaryColor,
                                    ...(cancelButton?.style ?? {}),
                                }}
                            >
                                {cancelButton?.icon && <>{cancelButton.icon} </>}
                                {cancelButton?.text ?? cancelText}
                            </button>
                            <button
                                className={`is-action ${isLoading && "disabled"}`}
                                disabled={isLoading}
                                style={okButton?.style ?? {}}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick={handleAction}
                            >
                                {isLoading ? (
                                    loadingText
                                ) : (
                                    <>
                                        {okButton?.icon && <>{okButton.icon}</>}
                                        {okButton?.text ?? okText}
                                    </>
                                )}
                            </button>
                        </Box>
                    </Box>
                </ConfirmationWrapper>
            )}
        </ConfirmationOverlay>
    );
}

function unmountConfirmation() {
    const container = document.getElementById(containerId);
    if (container) {
        const root = createRoot(container);
        root.unmount();
    } else {
        // eslint-disable-next-line no-console
        console.error(`Unable to unmount component with container id: ${containerId}`);
    }
}

function confirmation(cbArg: (data: any) => Promise<void> | void, config: ConfirmationConfig = {}) {
    return (data?: any) => {
        const cb = async () => await cbArg(data);
        const componentProps = { ...defaultConfig, ...config, cb };
        // Rendering inside flexibull layout in order to have items that have a potentially higher z-index
        const container = document.querySelector(`#${containerId}`);
        if (container) {
            const root = createRoot(container);
            root.render(<Confirmation {...{ ...componentProps }} />);
        }
    };
}

export default confirmation;
