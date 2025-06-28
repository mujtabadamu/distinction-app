import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { Highlight, themes } from 'prism-react-renderer';
import { detectLanguage } from 'utils/helpers';

const getThemeForLanguage = (language: string) => {
  const themeMap: { [key: string]: typeof themes.vsDark } = {
    javascript: themes.vsDark,
    typescript: themes.vsDark,
    python: themes.vsDark,
    html: themes.vsDark,
    css: themes.vsLight,
    sql: themes.vsDark,
    json: themes.vsDark,
    markdown: themes.vsDark,
    plaintext: themes.vsDark,
  };

  return themeMap[language] || themes.vsDark;
};

interface ContentViewerProps {
  botResponse: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ botResponse }) => {
  const fontSizeMap = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs',
  } as const;

  const components: Components = {
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        className="bg-gray-800 px-1 rounded ml-1 no-underline text-xs text-gray-200 transition-colors"
      >
        {children}
      </a>
    ),

    code: ({ inline, className, children, ...props }: CodeProps) => {
      if (inline) {
        return (
          <code className=" bg-gray-800 px-1 rounded text-sm" {...props}>
            {children}
          </code>
        );
      }

      const code = String(children).replace(/\n$/, '');
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : detectLanguage(code);
      const theme = getThemeForLanguage(language);

      return (
        <div className="relative my-4 rounded-lg overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1 text-xs font-medium  text-gray-400 bg-gray-800 ">
            {language}
          </div>
          <Highlight theme={theme} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className}  p-4 pt-8 overflow-auto`}
                style={{
                  ...style,
                  backgroundColor: theme.plain.backgroundColor,
                  color: theme.plain.color,
                }}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className="table-row"
                  >
                    <span className="table-cell pr-4 text-gray-500 text-right select-none">
                      {i + 1}
                    </span>
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      );
    },

    h1: ({ children, ...props }) => (
      <h1 {...props} className={`font-bold ${fontSizeMap[1]} my-4`}>
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2 {...props} className={`font-bold ${fontSizeMap[2]} my-4`}>
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3 {...props} className={`font-bold ${fontSizeMap[3]} my-4`}>
        {children}
      </h3>
    ),

    h4: ({ children, ...props }) => (
      <h4 {...props} className={`font-bold ${fontSizeMap[4]} my-4`}>
        {children}
      </h4>
    ),

    h5: ({ children, ...props }) => (
      <h5 {...props} className={`font-bold ${fontSizeMap[5]} my-4`}>
        {children}
      </h5>
    ),

    h6: ({ children, ...props }) => (
      <h6 {...props} className={`font-bold ${fontSizeMap[6]} my-4`}>
        {children}
      </h6>
    ),

    p: ({ children, ...props }) => (
      <p {...props} className="text-gray-800  font-light my-2">
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="list-none list-inside my-2 space-y-1">
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol {...props} className="list-none list-inside my-2 space-y-1">
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li {...props} className="pl-2 list-inside  ">
        {children}
      </li>
    ),
  };

  return (
    <div className="w-full">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={components}
      >
        {botResponse}
      </ReactMarkdown>
    </div>
  );
};

export default ContentViewer;
