import { useAtom } from "jotai";

import { useEffect } from "react";

import {
  errorsAtom,
  inputAtom,
  outputAtom,
  useTableAtom,
  widthAtom,
} from "@/atoms/image-converter";

export const useImageConverter = () => {
  const [input] = useAtom(inputAtom);
  const [output, setOutput] = useAtom(outputAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [width] = useAtom(widthAtom);
  const [useTable] = useAtom(useTableAtom);

  const validateInput = (text: string): string[] => {
    const errors: string[] = [];
    const lines = text.split("\n").filter((line: string) => line.trim());

    lines.forEach((line: string, index: number) => {
      if (!line.match(/^!\[.*?\]\(https?:\/\/.*?\)$/)) {
        errors.push(
          `Line ${index + 1}: Invalid markdown image format. Expected: ![alt text](url)`,
        );
      }
    });

    return errors;
  };

  // Live conversion effect
  useEffect(() => {
    setErrors(validateInput(input));
  }, [input, setErrors]);

  useEffect(() => {
    if (errors.length > 0) {
      setOutput("");
      return;
    }

    const lines = input.split("\n").filter((line: string) => line.trim());

    if (useTable) {
      if (lines.length === 0) {
        setOutput("");
        return;
      }

      const columnTitles = lines.map(
        (_: string, index: number) => `Column ${index + 1}`,
      );
      const tableHeader = `| ${columnTitles.join(" | ")} |\n| ${columnTitles.map(() => "---").join(" | ")} |`;

      const tableRow = lines
        .map((line: string) => {
          const match = line.match(/!\[(.*?)\]\((.*?)\)/);
          return match
            ? `<img src="${match[2]}" width="${width}" alt="${match[1]}">`
            : line;
        })
        .join(" | ");

      const table = `${tableHeader}\n| ${tableRow} |`;
      setOutput(table);
    } else {
      const converted = lines
        .map((line: string) => {
          const match = line.match(/!\[(.*?)\]\((.*?)\)/);
          if (!match) return line;
          const [, alt, url] = match;
          return `<img src="${url}" width="${width}" alt="${alt}">`;
        })
        .join("\n\n");

      setOutput(converted);
    }
  }, [input, width, useTable, errors, setOutput]);

  return {
    input,
    output,
    errors,
    validateInput,
  };
};
