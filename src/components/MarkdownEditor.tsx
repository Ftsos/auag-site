import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
};

type Action = {
  label: string;
  title: string;
  run: (text: string, start: number, end: number) => {
    text: string;
    start: number;
    end: number;
  };
};

/** Wrap the current selection, keeping it selected afterwards. */
const wrap = (before: string, after: string) => (text: string, start: number, end: number) => {
  const selected = text.slice(start, end);
  const next = `${text.slice(0, start)}${before}${selected}${after}${text.slice(end)}`;
  return {
    text: next,
    start: start + before.length,
    end: start + before.length + selected.length,
  };
};

/** Prefix every line the selection touches — used for headings, lists, quotes. */
const prefixLines = (prefix: string) => (text: string, start: number, end: number) => {
  const lineStart = text.lastIndexOf('\n', start - 1) + 1;
  const lineEnd = text.indexOf('\n', end);
  const stop = lineEnd === -1 ? text.length : lineEnd;

  const block = text
    .slice(lineStart, stop)
    .split('\n')
    .map((line) => (line.startsWith(prefix) ? line : `${prefix}${line}`))
    .join('\n');

  const next = text.slice(0, lineStart) + block + text.slice(stop);
  return { text: next, start: lineStart + block.length, end: lineStart + block.length };
};

const ACTIONS: Action[] = [
  { label: 'B', title: 'Bold', run: wrap('**', '**') },
  { label: 'I', title: 'Italic', run: wrap('_', '_') },
  { label: 'H2', title: 'Heading', run: prefixLines('## ') },
  { label: '“”', title: 'Quote', run: prefixLines('> ') },
  { label: '•', title: 'Bulleted list', run: prefixLines('- ') },
  { label: '1.', title: 'Numbered list', run: prefixLines('1. ') },
  { label: 'Link', title: 'Link', run: wrap('[', '](https://)') },
];

/**
 * Markdown editor with a formatting toolbar and live preview.
 *
 * Deliberately not a WYSIWYG: officers write markdown, but they should never
 * have to remember the syntax, and they should be able to see the result before
 * publishing.
 */
const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, id }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<'write' | 'preview'>('write');

  const applyAction = (action: Action) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const result = action.run(value, selectionStart, selectionEnd);

    onChange(result.text);

    // The textarea re-renders with the new value; restore the selection after.
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.start, result.end);
    });
  };

  return (
    <div className="md-editor">
      <div className="md-editor-bar">
        <div className="md-editor-tools" role="toolbar" aria-label="Formatting">
          {ACTIONS.map((action) => (
            <button
              key={action.title}
              type="button"
              className="md-tool"
              title={action.title}
              aria-label={action.title}
              onClick={() => applyAction(action)}
              disabled={mode === 'preview'}
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="md-editor-modes" role="tablist" aria-label="Editor mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'write'}
            className={`md-mode ${mode === 'write' ? 'is-active' : ''}`}
            onClick={() => setMode('write')}
          >
            Write
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'preview'}
            className={`md-mode ${mode === 'preview' ? 'is-active' : ''}`}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
        </div>
      </div>

      {mode === 'write' ? (
        <textarea
          id={id}
          ref={textareaRef}
          className="md-editor-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write the post. Markdown works — use the toolbar for formatting."
          spellCheck
        />
      ) : (
        <div className="md-editor-preview blog-post-body" aria-live="polite">
          {value.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="md-editor-empty">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
