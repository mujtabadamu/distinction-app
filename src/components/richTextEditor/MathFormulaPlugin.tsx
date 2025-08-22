import React, { useState, useEffect, useRef } from 'react';
import { MathfieldElement } from 'mathlive';

import { Button } from '@flexisaf/flexibull2';

// Register the MathfieldElement as a custom element
if (!customElements.get('math-field')) {
  customElements.define('math-field', MathfieldElement);
}

/**
 * This plugin is used to insert and edit math formulas using MathLive.
 * It provides a more robust editing experience with real-time preview.
 */

// --- Types ---
interface MathFormulaModalProps {
  open: boolean;
  initialValue: string;
  onSave: (latex: string, isInline: boolean) => void;
  onClose: () => void;
}

interface EditableFormulaProps {
  latex: string;
  isInline?: boolean;
  onEdit?: (newLatex: string) => void;
  className?: string;
}

// --- Utility Functions ---
export const processLatexFromAPI = (content: string): string => {
  return content;
};

export const extractLatexFromContent = (
  content: string
): Array<{
  type: 'inline' | 'block';
  latex: string;
  fullMatch: string;
}> => {
  const formulas: Array<{
    type: 'inline' | 'block';
    latex: string;
    fullMatch: string;
  }> = [];

  // Find inline LaTeX: $...$
  const inlineRegex = /\$([^$\n]+?)\$/g;
  let inlineMatch;
  while ((inlineMatch = inlineRegex.exec(content)) !== null) {
    formulas.push({
      type: 'inline',
      latex: inlineMatch[1],
      fullMatch: inlineMatch[0],
    });
  }

  // Find block LaTeX: $$...$$
  const blockRegex = /\$\$([\s\S]+?)\$\$/g;
  let blockMatch;
  while ((blockMatch = blockRegex.exec(content)) !== null) {
    formulas.push({
      type: 'block',
      latex: blockMatch[1],
      fullMatch: blockMatch[0],
    });
  }

  return formulas;
};

// --- Editable Formula Component with MathLive ---
export const EditableFormula: React.FC<EditableFormulaProps> = ({
  latex,
  isInline = false,
  onEdit,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentLatex, setCurrentLatex] = useState(latex);
  const [formulaType, setFormulaType] = useState<'inline' | 'block'>(
    isInline ? 'inline' : 'block'
  );
  const mathFieldRef = useRef<MathfieldElement>(null);

  useEffect(() => {
    if (isEditing && mathFieldRef.current) {
      mathFieldRef.current.setValue(currentLatex);
      mathFieldRef.current.focus();
    }
  }, [isEditing, currentLatex]);

  const handleSave = () => {
    if (mathFieldRef.current) {
      const newLatex = mathFieldRef.current.getValue();
      setCurrentLatex(newLatex);
      if (onEdit) {
        onEdit(newLatex);
      }
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl p-6 w-[700px] max-w-[90vw]">
          <h2 className="font-bold text-lg mb-4">Edit Formula</h2>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Formula Type:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={formulaType === 'block'}
                  onChange={() => setFormulaType('block')}
                  className="mr-2"
                />
                <span>Block Formula (Display Mode)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={formulaType === 'inline'}
                  onChange={() => setFormulaType('inline')}
                  className="mr-2"
                />
                <span>Inline Formula</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Edit Formula:
            </label>
            {/* @ts-expect-error math-field is a custom element */}
            <math-field
              ref={mathFieldRef}
              class="w-full border-2 border-gray-300 rounded-lg p-4 min-h-[150px] bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              virtual-keyboard-mode="manual"
              virtual-keyboard-layout="qwerty"
              virtual-keyboard-theme="apple"
              math-mode={formulaType === 'inline' ? 'text' : 'display'}
              style={
                {
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif',
                  '--mathfield-background-color': 'transparent',
                  '--mathfield-border-color': 'transparent',
                  '--mathfield-text-color': '#1f2937',
                  '--mathfield-selection-color': '#dbeafe',
                  '--mathfield-selection-background-color': '#3b82f6',
                } as any
              }
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button pale onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="black" fontColor="white" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const baseClasses = isInline
    ? 'inline-block px-2 py-1 bg-blue-50 border border-blue-200 rounded-md cursor-pointer hover:bg-blue-100 transition-colors duration-200'
    : 'my-4 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 text-center transition-colors duration-200';

  return (
    <div
      className={`${baseClasses} ${className}`}
      onClick={() => setIsEditing(true)}
      title="Click to edit formula"
    >
      <div className={isInline ? '' : 'flex justify-center'}>
        {/* @ts-expect-error math-field is a custom element */}
        <math-field
          read-only
          class={isInline ? 'inline-block' : 'block'}
          math-mode={isInline ? 'text' : 'display'}
          value={currentLatex}
          style={
            {
              fontSize: isInline ? '14px' : '18px',
              fontFamily: 'Inter, sans-serif',
              '--mathfield-background-color': 'transparent',
              '--mathfield-border-color': 'transparent',
              '--mathfield-text-color': '#1f2937',
            } as any
          }
        />
      </div>
      {!isInline && (
        <div className="text-xs text-blue-500 mt-2">Click to edit formula</div>
      )}
    </div>
  );
};

// --- Math Formula Modal with MathLive ---
const MathFormulaModal: React.FC<MathFormulaModalProps> = ({
  open,
  initialValue,
  onSave,
  onClose,
}) => {
  const [isInline, setIsInline] = useState(false);
  const mathFieldRef = useRef<MathfieldElement>(null);

  useEffect(() => {
    if (open && mathFieldRef.current) {
      mathFieldRef.current.setValue(initialValue);
      mathFieldRef.current.focus();
    }
  }, [open, initialValue]);

  const handleSave = () => {
    if (mathFieldRef.current) {
      const latex = mathFieldRef.current.getValue();
      onSave(latex, isInline);
    }
  };

  if (!open) return null;

  return (
    <>
      <style>
        {`
        math-field::part(virtual-keyboard-toggle) {
          display: none;
        }
      `}
      </style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl p-6 w-[700px] max-w-[90vw]">
          <h2 className="font-bold text-lg mb-4">Insert Formula</h2>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Formula Type:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={!isInline}
                  onChange={() => setIsInline(false)}
                  className="mr-2"
                />
                <span>Block Formula (Display Mode)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={isInline}
                  onChange={() => setIsInline(true)}
                  className="mr-2"
                />
                <span>Inline Formula</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Enter Formula:
            </label>
            {/* @ts-expect-error math-field is a custom element */}
            <math-field
              ref={mathFieldRef}
              class="w-full border-2 border-gray-300 rounded-lg p-4 min-h-[150px] bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 "
              math-mode={isInline ? 'text' : 'display'}
              placeholder="f(x) = ..."
              style={{
                fontSize: '18px',
                fontFamily: 'Inter, sans-serif',
                '--mathfield-background-color': 'transparent',
                '--mathfield-border-color': 'transparent',
                '--mathfield-text-color': '#1f2937',
                '--mathfield-selection-color': '#dbeafe',
                '--mathfield-selection-background-color': '#3b82f6',
              }}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button plain fontColor="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button plain onClick={handleSave}>
              Insert
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Toolbar Button ---
export const InsertFormulaButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (latex: string, isInline: boolean) => {
    // Generate actual LaTeX format
    const latexFormat = isInline ? `$${latex}$` : `$$\n${latex}\n$$`;

    // Insert the LaTeX into the editor
    const event = new CustomEvent('insert-latex-formula', {
      detail: { latex: latexFormat },
    });
    window.dispatchEvent(event);

    setModalOpen(false);
  };

  return (
    <>
      <button
        className="toolbar-item px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 font-bold text-lg"
        title="Insert Formula"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        ∑
      </button>
      <MathFormulaModal
        open={modalOpen}
        initialValue=""
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

// --- MathFormulaPlugin Export ---
export const MathFormulaPlugin = () => {
  return {};
};
