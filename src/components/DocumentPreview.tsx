import { toBase64 } from "@/lib/convertToBase64";
import React, { useEffect, useState } from "react";

export default function PreviewDocument({
  fileName,
  file,
  onClose,
}: {
  fileName: string;
  file: string | File;
  onClose: () => void;
}) {
  const [fileSrc, setFileSrc] = useState<string | null>(null);

  useEffect(() => {
    const handleFileConversion = async () => {
      if (typeof file !== "string") {
        const base64 = await toBase64(file);
        setFileSrc(base64);
      } else {
        setFileSrc(file);
      }
    };

    handleFileConversion();
  }, [file]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full sm:w-[600px] sm:max-h-[90vh] h-screen sm:h-auto overflow-y-auto">
        <h1 className="text-2xl font-bold">Pré-visualização do arquivo</h1>
        <span className="text-sm text-[#6B7280]">{fileName}</span>
        <div className="mt-4">
          {fileSrc ? (
            <iframe
              src={fileSrc}
              className="w-full h-[400px] border border-[#E5E7EB]"
            />
          ) : (
            <p>Carregando pré-visualização...</p>
          )}
        </div>
        <div className="flex justify-end mt-4 border-t border-[#E5E7EB] pt-4">
          <button
            type="button"
            className="border border-[#E5E7EB] text-sm text-[#3A424E] px-4 py-2 rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
