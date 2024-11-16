'use client';

import { useState, useEffect } from 'react';
import DocumentTable from '@/components/DocumentTable';
import DocumentModal from '@/components/DocumentModal';
import { CiFilter } from "react-icons/ci";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentDTO } from '@/dtos/DocumentDTO';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentDTO[]>([
    {
      id: "1",
      name: "invoice_2023",
      uploadedBy: "João Silva",
      documentType: "Invoice",
      totalTaxes: 250.5,
      netValue: 1500.75,
      attachment: "/uploads/invoice_2023.pdf",
      creationDate: "2023-10-01T10:30:00.000Z",
      lastUpdateDate: "2023-11-15T15:45:00.000Z",
    },
    {
      id: "2",
      name: "contract_final",
      uploadedBy: "Maria Oliveira",
      documentType: "Contract",
      totalTaxes: 0,
      netValue: 2000,
      attachment: "/uploads/contract_final.pdf",
      creationDate: "2023-09-20T14:00:00.000Z",
      lastUpdateDate: "2023-11-10T18:00:00.000Z",
    },
    {
      id: "3",
      name: "tax_report_2023",
      uploadedBy: "João Silva",
      documentType: "Report",
      totalTaxes: 100,
      netValue: 500,
      attachment: "/uploads/tax_report_2023.pdf",
      creationDate: "2023-08-15T09:00:00.000Z",
      lastUpdateDate: "2023-11-16T08:00:00.000Z",
    },
  ]);
  const [filters, setFilters] = useState({ documentType: '', uploadedBy: '' });

  const fetchDocuments = async () => {
    const res = await fetch('/api/documents');
    const data = await res.json();
    setDocuments(data.documents);
  };

  useEffect(() => {
    fetchDocuments();
  }, [filters]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row mb-6 border-b justify-between border-[#E5E7EB]">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Documentos</h1>
          <span className="text-sm text-[#6B7280]">Crie, gerencie e visualize os documentos</span>
        </div>

        <div className="flex flex-col mb-6 md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Buscar documentos"
            className="w-full md:w-auto border border-[#E5E7EB] rounded px-4 py-2 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
          />

          <button
            className="flex items-center w-full md:w-auto justify-center text-white rounded px-4 py-2 border border-[#E5E7EB] text-sm font-medium transition"
            onClick={() => console.log('Abrir filtros (futuro)')}
          >
            <CiFilter color='#191E29' size={18} style={{ strokeWidth: 0.5 }} />
            <span className="text-sm ml-2 text-[#191E29]">Filtrar</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mb-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col">
            <div className="flex gap-1">
              <span className="text-sm font-bold">Origem do documento</span>
              <AiOutlineQuestionCircle size={16} color='#9CA3AF' />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Digitalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-1">
              <span className="text-sm font-bold">Tipo documental</span>
              <AiOutlineQuestionCircle size={16} color='#9CA3AF' />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Nota fiscal de serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end items-end mt-4 md:mt-0">
          <DocumentModal refreshDocuments={fetchDocuments} />
        </div>
      </div>

      <DocumentTable documents={documents} />
    </div>
  );
}