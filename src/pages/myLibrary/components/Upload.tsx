import React, { ChangeEvent, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Theme from 'utils/theme';
import UploadIcon from '../../../assets/icons/upload-icon.png';

interface FileUploaderProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
  noBorder?: boolean;
  label: ReactNode;
  size: string;
}

interface FileWrapperProps extends FileUploaderProps {
  noBorder?: boolean;
}

const FileWrapper = styled.div<FileWrapperProps>`
  padding: 15px;
  width: 100%;
  display: block;
  text-align: center;
  border-radius: ${Theme.PrimaryRadius};
  border: 2px dashed #cccccc;

  ${(props) =>
    props.noBorder &&
    css`
      border: none;
    `}

  margin-bottom: 20px;

  & img {
    margin: 0 auto;
  }

  & .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    & + label {
      max-width: 80%;
      font-size: 0.8rem;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      display: inline-block;
      overflow: hidden;
      padding: 0.625rem 1.25rem;
      outline: transparent;

      & figure {
        width: 100px;
        height: 100px;
        border: 1px dashed ${Theme.PrimaryGrey};
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 20px;
        margin: 0 auto 20px;

        &::after,
        ::before {
          width: 0;
          height: 0;
          content: '';
          position: absolute;
          top: 0;
          right: 0;
        }

        & svg {
          width: 2em;
          height: 2em;
          vertical-align: middle;
          fill: ${Theme.PrimaryGrey};
          margin-top: -0.25em;
          margin-right: 0.25em;
        }
      }

      & p {
        font-weight: 600;
        font-size: 14px;
      }
    }

    &:focus {
      & + label {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
      }
    }
  }
`;

export const Uploader = (props: FileUploaderProps) => {
  return (
    <FileWrapper {...props}>
      <input
        type="file"
        onChange={props.onChange}
        accept={props.accept}
        name="file[]"
        id="file"
        className="inputfile"
        data-multiple-caption="files selected"
        multiple={props.multiple ?? false}
      />
      <label htmlFor="file">
        <img src={UploadIcon} />
        <span>{props.label}</span>
        <small>{props.size}</small>
        <br></br>
        <small> DOCX, TXT , PDF</small>
      </label>
    </FileWrapper>
  );
};
