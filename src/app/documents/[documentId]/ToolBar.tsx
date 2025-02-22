"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { HamIcon, LucideIcon, Redo2Icon, Undo2Icon } from "lucide-react";

type ToolBarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};
type SectionProps = ToolBarButtonProps & {
  label: string;
};

const ToolBarButton = ({
  icon: Icon,
  isActive,
  onClick,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};
export default function ToolBar() {
  const editor = useEditorStore((state) => state.editor);
  console.log(editor);
  const sections: SectionProps[][] = [
    [
      {
        icon: Undo2Icon,
        label: "Undo",
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: true,
      },
      {
        icon: Redo2Icon,
        label: "Redo",
        onClick: () => editor?.chain().focus().redo().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] overflow-x-visible flex items-center gap-x-0.5">
      {sections[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
