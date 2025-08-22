// This MathPlugin is WIP, it will be used to render math formulas in the editor when fully implemented.

import katex from 'katex';
import { DecoratorNode } from 'lexical';
import { realmPlugin } from '@mdxeditor/editor';

// Define MathNode for KaTeX rendering
class MathNode extends DecoratorNode<JSX.Element> {
  __formula: string;
  __display: boolean;

  constructor(formula: string, display = false) {
    super();
    this.__formula = formula;
    this.__display = display;
  }

  static getType(): string {
    return 'math';
  }

  static clone(node: MathNode): MathNode {
    return new MathNode(node.__formula, node.__display);
  }

  createDOM(): HTMLElement {
    return document.createElement(this.__display ? 'div' : 'span');
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    try {
      const html = katex.renderToString(this.__formula, {
        throwOnError: false,
        displayMode: this.__display,
      });
      return (
        <span
          className={this.__display ? 'katex-display' : 'katex-inline'}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (e) {
      return <span style={{ color: 'red' }}>Invalid LaTeX</span>;
    }
  }

  exportJSON() {
    return {
      type: 'math',
      formula: this.__formula,
      display: this.__display,
      version: 1,
    };
  }
}

// Import visitor (MDX → Editor)
export function MathMdastImporter(
  node: any,
  addNode: (n: MathNode) => void
): void {
  if (node.type === 'inlineMath') {
    addNode(new MathNode(node.value || '', false));
  } else if (node.type === 'math') {
    addNode(new MathNode(node.value || '', true));
  }
}

// Export visitor (Editor → MDX)
export function MathLexicalExporter(node: MathNode): any {
  return {
    type: node.__display ? 'math' : 'inlineMath',
    value: node.__formula,
  };
}

// Plugin definition
export const MathPlugin = realmPlugin({
  init() {
    console.log('MathPlugin initialized');
    // realm.pub(addLexicalNode$, MathNode as LexicalNode);
    // realm.pub(addImportVisitor$, MathMdastImporter);
    // realm.pub(addExportVisitor$, MathLexicalExporter);
  },
});
