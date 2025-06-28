import React, { MutableRefObject, FocusEvent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { EDITOR_API_KEY } from '../../utils/constants';

interface TinyEditorProps {
  editorRef: MutableRefObject<never | null>;
  value: string;
  pluginsList?: string[];
  height?: number;
  showMenuBar?: boolean;
  toolbarItems?: string;
  onChange?: (content: string, editor: never) => void;
  onBlur?: (event: FocusEvent) => void;
  controlled?: boolean;
}

const TinyEditor = ({
  editorRef,
  value,
  pluginsList,
  height,
  showMenuBar,
  toolbarItems,
  onChange,
  onBlur,
  controlled,
}: TinyEditorProps) => {
  return (
    <Editor
      apiKey={EDITOR_API_KEY}
      onInit={(evt: never, editor: never) => {
        editorRef.current = editor;
      }}
      initialValue={!controlled && (value || '')}
      value={controlled && value}
      onEditorChange={onChange}
      onBlur={onBlur}
      init={{
        height: height || 400,
        menubar: showMenuBar,
        plugins: pluginsList || [
          'advlist',
          'lists',
          'charmap',
          'anchor',
          'searchreplace',
          'visualblocks',
          'insertdatetime',
          'table',
          'wordcount',
          'tiny_mce_wiris',
          // 'autolink',
          // 'link',
          // 'image',
          // 'preview',
          // 'code',
          // 'fullscreen',
          // 'media',
          // 'code',
          // 'help',
        ],
        external_plugins: {
          tiny_mce_wiris: `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`,
        },
        toolbar:
          toolbarItems ||
          'undo redo | blocks | ' +
            'bold underline italic forecolor | alignleft aligncenter' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry',
        draggable_modal: true,
        extended_valid_elements: '*[.*]',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};

export default React.memo(TinyEditor);
