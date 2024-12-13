import { useAtom } from "jotai";

import { useCallback } from "react";

import { errorsAtom, inputAtom } from "@/atoms/image-converter";

export const useClipboard = () => {
  const [, setInput] = useAtom(inputAtom);
  const [, setErrors] = useAtom(errorsAtom);

  const handlePaste = useCallback(async () => {
    try {
      if (!navigator.clipboard) {
        alert(
          "Clipboard access is not available in your browser. Please use Ctrl+V/Cmd+V to paste.",
        );
        return;
      }

      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        // Reset errors when pasting new content
        setErrors([]);
      }
    } catch (err) {
      console.error("Failed to paste:", err);
      alert(
        "Unable to access clipboard. Please use Ctrl+V/Cmd+V to paste your content.",
      );
    }
  }, [setInput, setErrors]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return { handlePaste, handleCopy };
};
