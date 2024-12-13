"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useImageConverter } from "@/hooks/use-image-converter";

import { InputSection } from "./input-section";
import { OptionsSection } from "./options-section";
import { OutputSection } from "./output-section";

const ImageConverter = () => {
  useImageConverter();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>GitHub PR Image Resizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-md text-gray-500">
            This tool will help you resize images in GitHub PR comments and
            descriptions so that they don&apos;t take up the full width of the
            screen.
          </p>
          <p className="text-md text-gray-500">
            First drag and drop your image into the GitHub PR comment or
            description. Then after waiting for it to upload, copy the resulting
            markdown into the textarea below. Then you can paste the output back
            into the PR comment or description.
          </p>
        </div>

        <InputSection />
        <OptionsSection />
        <OutputSection />
      </CardContent>
    </Card>
  );
};

export default ImageConverter;
