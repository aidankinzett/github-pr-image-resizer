import { useAtom } from "jotai";

import React from "react";

import { Switch } from "@/components/ui/switch";

import { useTableAtom, widthAtom } from "@/atoms/image-converter";

export const OptionsSection = () => {
  const [width, setWidth] = useAtom(widthAtom);
  const [useTable, setUseTable] = useAtom(useTableAtom);

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label className="block text-lg font-bold mb-2">
          Image Width (pixels)
        </label>
        <input
          type="number"
          className="w-32 p-2 border rounded-md"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
          step="1"
          min="1"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold">Output Format</label>
        <div className="flex items-center space-x-2">
          <Switch checked={useTable} onCheckedChange={setUseTable} />
          <span className="text-sm text-gray-600">Output as Table</span>
        </div>
      </div>
    </div>
  );
};
