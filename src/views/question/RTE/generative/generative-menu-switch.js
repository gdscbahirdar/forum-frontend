import { EditorBubble, useEditor } from "novel";
import { removeAIHighlight } from "novel/extensions";
import { Fragment, useEffect } from "react";
import { Button } from "../ui/button";
import Magic from "../ui/icons/magic";
import { AISelector } from "./ai-selector";

const GenerativeMenuSwitch = ({ children, open, onOpenChange }) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open) removeAIHighlight(editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        }
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Magic className="h-5 w-5" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
