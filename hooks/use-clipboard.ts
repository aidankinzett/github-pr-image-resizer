import { useAtom } from "jotai";

import { useCallback } from "react";

import { errorsAtom, inputAtom } from "@/atoms/image-converter";

import { useToast } from "./use-toast";

export const useClipboard = () => {
  const [, setInput] = useAtom(inputAtom);
  const [, setErrors] = useAtom(errorsAtom);
  const { toast } = useToast();

  const handlePaste = useCallback(async () => {
    try {
      if (!navigator.clipboard) {
        toast({
          title: "Clipboard access not available",
          description:
            "Clipboard access is not available in your browser. Please use Ctrl+V/Cmd+V to paste.",
          variant: "destructive",
        });
        return;
      }

      const text = await navigator.clipboard.readText();
      if (text) {
        toast({
          title: "Content pasted",
          description: "Content has been pasted into the input field",
        });
        setInput(text);
        // Reset errors when pasting new content
        setErrors([]);
      }
    } catch (err) {
      console.error("Failed to paste:", err);
      toast({
        title: "Failed to paste",
        description: "Failed to paste content from clipboard",
        variant: "destructive",
      });
    }
  }, [toast, setInput, setErrors]);

  const handleCopy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Content copied",
          description: "Content has been copied to the clipboard",
        });
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Failed to copy content to clipboard",
          variant: "destructive",
        });
        console.error("Failed to copy:", err);
      }
    },
    [toast],
  );

  return { handlePaste, handleCopy };
};
