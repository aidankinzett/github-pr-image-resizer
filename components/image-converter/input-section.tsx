import { useAtom } from "jotai";
import { ClipboardPaste } from "lucide-react";

import React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { useClipboard } from "@/hooks/use-clipboard";

import { errorsAtom, inputAtom } from "@/atoms/image-converter";

export const InputSection = () => {
  const [input, setInput] = useAtom(inputAtom);
  const [errors] = useAtom(errorsAtom);
  const { handlePaste } = useClipboard();

  return (
    <div className="relative">
      <div className="space-y-2 mb-2">
        <div className="flex justify-between items-start">
          <label className="block text-lg font-bold">
            Paste Markdown Images
          </label>
          <Button
            onClick={handlePaste}
            variant="ghost"
            size="icon"
            title="Paste from clipboard"
          >
            <ClipboardPaste className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
          Example format:
          <br />
          ![Image name](https://github.com/...)
        </div>
      </div>
      <textarea
        className={`w-full h-48 p-2 border rounded-md font-mono text-sm ${errors.length > 0 ? "border-red-500" : ""}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste markdown images here, one per line..."
      />
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            <ul className="list-disc pl-4">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
