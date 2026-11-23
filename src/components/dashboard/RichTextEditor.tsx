"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";

export const blogImageTypes = "image/jpeg,image/png,image/webp,image/avif";

const extensions = [
  StarterKit.configure({ link: { openOnClick: false, defaultProtocol: "https" } }),
  Image,
  TableKit,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Youtube.configure({ nocookie: true }),
];

export default function RichTextEditor({
  label, value, direction, large, onChange, uploadImage,
}: {
  label: string;
  value: string;
  direction: "ltr" | "rtl";
  large?: boolean;
  onChange: (html: string) => void;
  uploadImage: (file: File) => Promise<string>;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        "aria-label": label,
        "aria-multiline": "true",
        role: "textbox",
        dir: direction,
        lang: direction === "rtl" ? "ar" : "en",
        class: large ? "blog-rich blog-editor blog-editor-large" : "blog-rich blog-editor",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });

  if (!editor) return <div className="rounded-xl border border-platinum p-4">{label}</div>;

  function link() {
    if (!editor) return;
    const url = window.prompt("Link URL. Clear the field to remove the link.", editor.getAttributes("link").href || "");
    if (url === null) return;
    const selection = editor.chain().focus().extendMarkRange("link");
    if (!url.trim()) selection.unsetLink().run();
    else if (!selection.setLink({ href: url.trim() }).run()) setError("Enter a valid link URL.");
  }

  function video() {
    if (!editor) return;
    const input = window.prompt("YouTube video URL");
    if (!input?.trim()) return;
    try {
      const url = new URL(input.trim());
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
      const shortUrl = url.hostname === "youtu.be";
      const youtube = /^(?:(?:www|m|music)\.)?youtube\.com$|^www\.youtube-nocookie\.com$/.test(url.hostname);
      const id = shortUrl ? url.pathname.slice(1) : youtube
        ? url.searchParams.get("v") || /^\/(?:embed|shorts|live)\/([\w-]+)\/?$/.exec(url.pathname)?.[1]
        : undefined;
      if (!id || !/^[\w-]{11}$/.test(id)) throw new Error();
      editor.chain().focus().setYoutubeVideo({ src: "https://www.youtube-nocookie.com/embed/" + id }).run();
    } catch {
      setError("Enter a valid YouTube video URL.");
    }
  }

  async function insertImage(file: File) {
    if (!editor) return;
    setUploading(true);
    setError("");
    try {
      const src = await uploadImage(file);
      if (!editor.isDestroyed) editor.chain().focus().setImage({ src, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const chain = () => editor.chain().focus();
  const controls: { text: string; run: () => unknown; active?: boolean; disabled?: boolean }[] = [
    { text: "Undo", run: () => chain().undo().run(), disabled: !editor.can().undo() },
    { text: "Redo", run: () => chain().redo().run(), disabled: !editor.can().redo() },
    { text: "Bold", run: () => chain().toggleBold().run(), active: editor.isActive("bold") },
    { text: "Italic", run: () => chain().toggleItalic().run(), active: editor.isActive("italic") },
    { text: "Strike", run: () => chain().toggleStrike().run(), active: editor.isActive("strike") },
    { text: "Paragraph", run: () => chain().setParagraph().run(), active: editor.isActive("paragraph") },
    ...([1, 2, 3] as const).map((level) => ({
      text: "H" + level,
      run: () => chain().toggleHeading({ level }).run(),
      active: editor.isActive("heading", { level }),
    })),
    { text: "Bullets", run: () => chain().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { text: "Numbered", run: () => chain().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    ...["left", "center", "right", "justify"].map((alignment) => ({
      text: "Align " + alignment,
      run: () => chain().setTextAlign(alignment).run(),
      active: editor.isActive({ textAlign: alignment }),
    })),
    { text: "Link", run: link, active: editor.isActive("link") },
    { text: uploading ? "Uploading image…" : "Upload image", run: () => fileInput.current?.click(), disabled: uploading },
    { text: "YouTube", run: video },
    { text: "Horizontal rule", run: () => chain().setHorizontalRule().run() },
    { text: "Insert table", run: () => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  ];

  if (editor.isActive("table")) {
    controls.push(
      { text: "Row above", run: () => chain().addRowBefore().run() },
      { text: "Row below", run: () => chain().addRowAfter().run() },
      { text: "Delete row", run: () => chain().deleteRow().run() },
      { text: "Column before", run: () => chain().addColumnBefore().run() },
      { text: "Column after", run: () => chain().addColumnAfter().run() },
      { text: "Delete column", run: () => chain().deleteColumn().run() },
      { text: "Delete table", run: () => chain().deleteTable().run() },
    );
  }

  return (
    <div className="min-w-0 space-y-2">
      <p className="text-sm font-semibold">{label}</p>
      <div className="overflow-hidden rounded-xl border border-platinum bg-white focus-within:border-accent-500">
        <div role="group" aria-label={label + " formatting"} className="flex flex-wrap gap-1 border-b border-platinum bg-frost p-2">
          {controls.map(({ text, run, active, disabled }) => (
            <button
              key={text}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => { setError(""); run(); }}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium hover:bg-accent-500/10 aria-pressed:bg-accent-500/20 disabled:opacity-40"
            >
              {text}
            </button>
          ))}
        </div>
        <input
          ref={fileInput}
          type="file"
          accept={blogImageTypes}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void insertImage(file);
          }}
        />
        <EditorContent editor={editor} />
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
