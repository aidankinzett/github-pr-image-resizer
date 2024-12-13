import { useAtom } from "jotai";
import { Clipboard } from "lucide-react";

import React from "react";

import { Button } from "@/components/ui/button";

import { useClipboard } from "@/hooks/use-clipboard";

import { errorsAtom, outputAtom, useTableAtom } from "@/atoms/image-converter";

export const OutputSection = () => {
  const [output] = useAtom(outputAtom);
  const [useTable] = useAtom(useTableAtom);
  const [errors] = useAtom(errorsAtom);
  const { handleCopy } = useClipboard();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <label className="text-lg font-bold">
          {useTable ? "Markdown Table Output" : "HTML Output"}
        </label>
        <Button
          onClick={() => handleCopy(output)}
          variant="ghost"
          size="icon"
          disabled={errors.length > 0}
          title="Copy to clipboard"
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <textarea
        className="w-full h-48 p-2 border rounded-md font-mono text-sm"
        value={output}
        readOnly
      />
    </div>
  );
};
