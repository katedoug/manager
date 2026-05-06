"use client";

import * as React from "react";
import { UploadCloud, X, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface Upload2Props {
  title?: string;
  subtitle?: string;
  action?: string;
  className?: string;
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
}

export function Upload2({
  title,
  subtitle,
  action,
  className,
  accept = "image/*",
  multiple = true,
  onFilesChange,
}: Upload2Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const next = [...files, ...Array.from(incoming)];
    setFiles(next);
    onFilesChange?.(next);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange?.(next);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function onDragLeave() {
    setDragging(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <UploadCloud className="size-5" aria-hidden="true" />
        </div>
        {title && (
          <span className="text-sm font-semibold text-card-foreground">
            {title}
          </span>
        )}
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
        {action && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            className="mt-1 rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90"
          >
            {action}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, i) => {
            const preview = file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : null;
            return (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt={file.name}
                    className="size-9 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                    <FileImage className="size-4 text-muted-foreground" />
                  </div>
                )}
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate text-xs font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-auto flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
