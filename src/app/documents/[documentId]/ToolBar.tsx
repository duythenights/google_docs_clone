"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type Level } from "@tiptap/extension-heading";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [inputEditing, setInputEditing] = useState(false);

  const validSize = (size: string) => {
    let returnSize = parseInt(size);
    if (isNaN(returnSize)) {
      return "";
    }

    if (returnSize >= 100) {
      returnSize = 96;
    }

    return returnSize;
  };

  const updateFontSize = (newSize: string, focusEditor: boolean = true) => {
    const size = Number(newSize);
    if (!isNaN(size) && size > 0 && size < 100) {
      if (focusEditor) {
        editor?.chain().focus().setFontSize(`${size}px`).run();
        setInputEditing(false);
      } else {
        editor?.chain().setFontSize(`${size}px`).run();
      }
      setFontSize(newSize);
      setInputValue(newSize);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const size = validSize(e.target.value);
    setInputValue(size);
  };
  const handleInputBur = () => {
    updateFontSize(inputValue);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const focusEditor = false;
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
    if (e.key === "ArrowUp") {
      increment(focusEditor);
    }
    if (e.key === "ArrowDown") {
      decrement(focusEditor);
    }
  };

  const increment = (focusEditor: boolean = true) => {
    const newSize = (parseInt(fontSize) || 0) + 1;
    if (newSize < 100) {
      updateFontSize(newSize.toString(), focusEditor);
    }
  };
  const decrement = (focusEditor: boolean = true) => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString(), focusEditor);
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      <button
        onClick={() => decrement()}
        className="w-7 h-7 flex justify-center items-center rounded-sm shrink-0 hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      {inputEditing ? (
        <Input
          className="w-12 h-7 text-center text-sm flex justify-center items-center border border-neutral-400 rounded-sm shrink-0 bg-transparent"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeydown}
          onBlur={handleInputBur}
        />
      ) : (
        <button
          onClick={() => {
            setInputEditing(true);
            setFontSize(currentFontSize);
            setInputValue(currentFontSize);
          }}
          className="w-12 h-7 text-center text-sm flex justify-center items-center border border-neutral-400 rounded-sm shrink-0 bg-transparent"
        >
          {currentFontSize}
        </button>
      )}

      <button
        onClick={() => increment()}
        className="w-7 h-7 flex justify-center items-center rounded-sm shrink-0 hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const aligments = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7  shrink-0 flex items-center justify-between rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <ListIcon className="size-4" />
          <ChevronDownIcon className="ml-2 shrink-0 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {aligments.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            onClick={onClick}
            key={label}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              isActive && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const AlignButton = () => {
  const { editor } = useEditorStore();

  const aligments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7  shrink-0 flex items-center justify-between rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <AlignLeftIcon className="size-4" />
          <ChevronDownIcon className="ml-2 shrink-0 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {aligments.map(({ label, value, icon: Icon }) => (
          <button
            onClick={() => {
              editor?.chain().focus().setTextAlign(value).run();
            }}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };
  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };
  const handleImageUrlSubmit = () => {
    if (!imageUrl) return;

    onChange(imageUrl);
    setImageUrl("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 m-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 m-w-7 shrink-0 flex items-center flex-col justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://example.com"
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighLightColoButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight")?.color || "#ffffff";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 m-w-7 shrink-0 gap-y-1 flex items-center flex-col justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <HighlighterIcon className="size-4" />
          <div className="h-0.5 w-full " style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 m-w-7 gap-y-1 shrink-0 flex items-center  flex-col justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <span className="text-sm w-4 h-4">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
      return "Normal text";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 m-w-7 shrink-0 flex items-center justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 shrink-0 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ fontSize, label, value }) => (
          <button
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            key={label}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Infer",
      value: "Infer",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}{" "}
          </span>
          <ChevronDownIcon className="ml-2 shrink-0 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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

  const sections: SectionProps[][] = [
    [
      {
        icon: Undo2Icon,
        label: "Undo",
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        icon: Redo2Icon,
        label: "Redo",
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        icon: PrinterIcon,
        label: "Print",
        onClick: () => window.print(),
      },
      {
        icon: SpellCheckIcon,
        label: "Spell Check",
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("TODO: comment"),
        isActive: false, // TODO: Comment functionality
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.commands.unsetAllMarks(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] overflow-x-visible flex items-center gap-x-0.5">
      {sections[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <TextColorButton />
      <HighLightColoButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <ImageButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <AlignButton />
      {/* TODO: Line Height */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <ListButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
