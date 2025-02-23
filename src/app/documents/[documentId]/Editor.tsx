"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import UnderLine from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import HighLight from "@tiptap/extension-highlight";
import { useEditorStore } from "@/store/use-editor-store";

export default function Editor() {
  const setEditor = useEditorStore((state) => state.setEditor);

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px",
        class:
          "tiptap focus:outline-none border-[#C7c7c7] border bg-white w-[816px] min-h-[1054px] pt-10 pr-14 pb-10 cursor-text flex flex-col",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      UnderLine,
      FontFamily,
      TextStyle,
      HighLight.configure({
        multicolor: true,
      }),
      Color,
    ],
    content: `
       <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
        `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:px-0  print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 mx-auto print:py-0 print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
