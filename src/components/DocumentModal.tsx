'use client';

import { useState } from 'react';
import { HiOutlinePlus } from "react-icons/hi2";

export default function DocumentModal({ refreshDocuments }: { refreshDocuments: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    uploadedBy: '',
    documentType: '',
    totalTaxes: '',
    netValue: '',
  });
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('uploadedBy', formData.uploadedBy);
    formDataObj.append('documentType', formData.documentType);
    formDataObj.append('totalTaxes', formData.totalTaxes);
    formDataObj.append('netValue', formData.netValue);
    if (attachment) formDataObj.append('attachment', attachment);

    await fetch('/api/documents', {
      method: 'POST',
      body: formDataObj,
    });

    setOpen(false);
    refreshDocuments();
  };

  return (
    <>
      <button
        className="flex h-10 w-full md:w-auto items-center justify-center gap-2 bg-[#05c151] text-white px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        <HiOutlinePlus size={24} />
        Novo Documento
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h2 className="text-xl font-bold mb-4">Criar Documento</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                className="border p-2 w-full mb-4"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Quem Fez o Upload"
                className="border p-2 w-full mb-4"
                value={formData.uploadedBy}
                onChange={(e) =>
                  setFormData({ ...formData, uploadedBy: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tipo de Documento"
                className="border p-2 w-full mb-4"
                value={formData.documentType}
                onChange={(e) =>
                  setFormData({ ...formData, documentType: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Total de Tributos"
                className="border p-2 w-full mb-4"
                value={formData.totalTaxes}
                onChange={(e) =>
                  setFormData({ ...formData, totalTaxes: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Valor Líquido"
                className="border p-2 w-full mb-4"
                value={formData.netValue}
                onChange={(e) =>
                  setFormData({ ...formData, netValue: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  setAttachment(e.target.files ? e.target.files[0] : null)
                }
                className="border p-2 w-full mb-4"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
              <button
                type="button"
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
