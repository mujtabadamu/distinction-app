import { useState, useEffect, useRef, Ref } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  linkDialogPlugin,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  InsertThematicBreak,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  Separator,
  MDXEditorMethods,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { MathFormulaPlugin, InsertFormulaButton } from './MathFormulaPlugin';
import KaTeX from 'katex';
import 'katex/dist/katex.min.css';

interface RichTextEditorProps {
  markdownContent: string;
  onChange: (newMarkdown: string) => void;
  editorRef?: Ref<MDXEditorMethods> | null;
  scale?: number;
  lineHeight?: string;
  disabled?: boolean;
}

const RichTextEditor = ({
  markdownContent,
  onChange,
  editorRef,
  scale = 1,
  lineHeight = '1.6',
  disabled = false,
}: RichTextEditorProps) => {
  const [editorContent, setEditorContent] = useState(markdownContent);
  const localEditorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditorContent(markdownContent);
    localEditorRef.current?.setMarkdown(markdownContent);
  }, [markdownContent]);

  useEffect(function handleFormularInsertion() {
    const handler = (e: any) => {
      const latex = e.detail?.latex;
      if (latex && localEditorRef.current) {
        localEditorRef.current.insertMarkdown(
          `\n\n\`\`\`math\n${latex}\`\`\`\n\n`
        );
      }
    };
    window.addEventListener('insert-math-formula', handler);
    return () => window.removeEventListener('insert-math-formula', handler);
  }, []);

  const handleEditorChange = (newMarkdown: string) => {
    setEditorContent(newMarkdown);
    if (onChange) {
      onChange(newMarkdown);
    }
  };

  // WIP: Post-process math code blocks to render KaTeX
  useEffect(() => {
    if (!containerRef.current) return;
    const codeBlocks = containerRef.current.querySelectorAll(
      'pre code.language-math'
    );
    codeBlocks.forEach((codeBlock) => {
      const latex = codeBlock.textContent || '';
      let html = '';
      try {
        html = KaTeX.renderToString(latex, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (e) {
        html = `<span style='color:red'>Invalid LaTeX</span>`;
      }
      const parent = codeBlock.parentElement;
      if (parent) {
        parent.innerHTML = html;
      }
    });
  }, [editorContent]);

  return (
    <>
      <style>
        {`
          .mdx-editor-content {
            font-family: Inter !important;
            color: #1a202c !important;
            line-height: ${lineHeight} !important;
          }
          .mdx-editor-content h1 {
            font-size: ${1.125 * scale}rem !important;
            font-weight: 700 !important;
            margin: 1.2em 0 0.6em 0 !important;
            color: #1a202c !important;
          }
          .mdx-editor-content h2 {
            font-size: ${1.0 * scale}rem !important;
            font-weight: 600 !important;
            margin: 1.1em 0 0.55em 0 !important;
            color: #1a202c !important;
          }
          .mdx-editor-content h3 {
            font-size: ${0.95 * scale}rem !important;
            font-weight: 600 !important;
            margin: 1em 0 0.5em 0 !important;
            color: #1a202c !important;
          }
          .mdx-editor-content h4 {
            font-size: ${0.875 * scale}rem !important;
            font-weight: 600 !important;
            margin: 0.9em 0 0.45em 0 !important;
            color: #1a202c !important;
          }
          .mdx-editor-content h5 {
            font-size: ${0.8 * scale}rem !important;
            font-weight: 600 !important;
            margin: 0.8em 0 0.4em 0 !important;
            color: #1a202c !important;
          }
          .mdx-editor-content h6 {
            font-size: ${0.75 * scale}rem !important;
            font-weight: 600 !important;
            margin: 0.7em 0 0.35em 0 !important;
            color: #1a202c !important;
          }
          .mdx-editor-content p {
            color: #1a202c !important;
            font-size: ${0.875 * scale}rem !important;
          }
          .mdx-editor-content li {
            color: #1a202c !important;
            font-size: ${0.875 * scale}rem !important;
          }
          .mdx-editor-content a {
            color: #1a202c !important;
            font-size: ${0.875 * scale}rem !important;
          }
          .mdx-editor-content code {
            color: #1a202c !important;
            font-size: ${0.8 * scale}rem !important;
          }
          .mdx-editor-content blockquote {
            color: #1a202c !important;
            font-size: ${0.875 * scale}rem !important;
          }
          .mdx-editor-content .line-number {
            font-size: ${0.75 * scale}rem !important;
          }
      
        `}
      </style>
      <div
        ref={containerRef}
        className="w-full bg-white "
        style={{ fontFamily: 'Inter' }}
      >
        <MDXEditor
          readOnly={disabled}
          markdown={editorContent}
          onChange={handleEditorChange}
          ref={(instance) => {
            localEditorRef.current = instance;
            if (typeof editorRef === 'function') editorRef(instance);
            else if (editorRef) (editorRef as any).current = instance;
          }}
          className=" mdx-editor-content"
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            imagePlugin(),
            codeBlockPlugin({
              defaultCodeBlockLanguage: 'js',
            }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: 'JavaScript',
                css: 'CSS',
                html: 'HTML',
                python: 'Python',
                ts: 'TypeScript',
                tsx: 'TypeScript (React)',
                jsx: 'JavaScript (React)',
                json: 'JSON',
                bash: 'Bash',
                sql: 'SQL',
                scss: 'SCSS',
                sass: 'SASS',
                txt: 'Text',
              },
              autoLoadLanguageSupport: true,
            }),
            linkPlugin(),
            linkDialogPlugin(),
            MathFormulaPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <InsertFormulaButton />
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === 'codeblock',
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                      {
                        fallback: () => (
                          <>
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <CodeToggle />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <CreateLink />
                            <InsertImage />
                            <Separator />
                            <InsertTable />
                            <InsertThematicBreak />
                            <Separator />
                            <InsertCodeBlock />
                          </>
                        ),
                      },
                    ]}
                  />
                </>
              ),
            }),
          ]}
        />
      </div>
    </>
  );
};

export default RichTextEditor;
