"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px",
        class:
          "focus:outline-none border-[#C7c7c7] border bg-white w-[816px] min-h-[1054px] pt-10 pr-14 pb-10 cursor-text flex flex-col",
      },
    },
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:px-0  print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 mx-auto print:py-0 print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
