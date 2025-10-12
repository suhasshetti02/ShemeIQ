"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import api from "./lib/app";

export default function UploadPolicy() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile.size > 50 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds 5MB limit.");
      return;
    }
    setFile(uploadedFile);
    setError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(res.data.summary);

      // if (!res.ok) throw new Error("Failed to summarize file.");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setSummary("");
    setError("");
  };

  return (
    <section
      id="upload"
      className="py-12 px-4 max-w-3xl mx-auto flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
        Upload Policy PDF
      </h2>

      {/* Drag and Drop area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-accent bg-accent/10"
            : "border-gray-300 dark:border-gray-700"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p>
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        ) : (
          <p>Drag & drop a PDF here, or click to select file</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleUpload} disabled={loading} className="flex-1">
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
        <Button onClick={handleClear} variant="outline" className="flex-1">
          Clear
        </Button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Summary */}
      {summary && (
        <div className="mt-6 p-4 bg-white dark:bg-black text-black dark:text-white rounded shadow transition-colors">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </section>
  );
}
