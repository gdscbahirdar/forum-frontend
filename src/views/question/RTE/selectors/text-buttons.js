import { cn } from "@/lib/utils";
import { EditorBubbleItem, useEditor } from "novel";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  {
    name: "bold",
    isActive: editor => editor.isActive("bold"),
    command: editor => editor.chain().focus().toggleBold().run(),
    icon: BoldIcon
  },
  {
    name: "italic",
    isActive: editor => editor.isActive("italic"),
    command: editor => editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon
  },
  {
    name: "underline",
    isActive: editor => editor.isActive("underline"),
    command: editor => editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon
  },
  {
    name: "strike",
    isActive: editor => editor.isActive("strike"),
    command: editor => editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon
  },
  {
    name: "code",
    isActive: editor => editor.isActive("code"),
    command: editor => editor.chain().focus().toggleCode().run(),
    icon: CodeIcon
  }
];

export const TextButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={() => {
            item.command(editor);
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor)
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
