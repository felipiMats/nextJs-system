'use client';

import { useState, useEffect } from "react";
import DocumentTable from "@/components/DocumentTable";
import DocumentModal from "@/components/DocumentModal";
import FilterModal from "@/components/DocumentFilter";
import { CiFilter } from "react-icons/ci";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentDTO } from "@/dtos/DocumentDTO";
import { api } from "@/lib/apiClient";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentDTO[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    documentOrigin: "all",
    documentType: "all",
    uploadedBy: "",
    minTax: "",
    maxNetValue: "",
    creationStartDate: "",
    creationEndDate: "",
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = filters.search
      ? doc.attachment?.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;
  
    const matchesOrigin = filters.documentOrigin !== "all"
      ? doc.documentOrigin === filters.documentOrigin
      : true;
  
    const matchesType = filters.documentType !== "all"
      ? doc.documentType === filters.documentType
      : true;
  
    const matchesUploadedBy = filters.uploadedBy
      ? doc.uploadedBy?.toLowerCase().includes(filters.uploadedBy.toLowerCase())
      : true;
  
    const matchesMinTax = filters.minTax
      ? Number(doc.totalTaxes || 0) >= Number(filters.minTax)
      : true;
  
    const matchesMaxNetValue = filters.maxNetValue
      ? Number(doc.netValue || 0) <= Number(filters.maxNetValue)
      : true;
  
    const matchesCreationDate = filters.creationStartDate || filters.creationEndDate
      ? new Date(doc.creationDate) >= new Date(filters.creationStartDate) &&
        new Date(doc.creationDate) <= new Date(filters.creationEndDate)
      : true;
  
    return (
      matchesSearch &&
      matchesOrigin &&
      matchesType &&
      matchesUploadedBy &&
      matchesMinTax &&
      matchesMaxNetValue &&
      matchesCreationDate
    );
  });
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleOriginChange = (value: string) => {
    setFilters((prev) => ({ ...prev, documentOrigin: value }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, documentType: value }));
  };

  const fetchDocuments = async () => {
    const res = await api.getDocuments();
    setDocuments(res);
  };

  useEffect(() => {
    fetchDocuments();
  }, [filters]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row mb-6 border-b justify-between border-[#E5E7EB]">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Documentos</h1>
          <span className="text-sm text-[#6B7280]">
            Crie, gerencie e visualize os documentos
          </span>
        </div>

        <div className="flex flex-col mb-6 md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Buscar documentos"
            value={filters.search}
            onChange={handleInputChange}
            className="w-full md:w-auto border border-[#E5E7EB] rounded px-4 py-2 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
          />

          <button
            className="flex items-center w-full md:w-auto justify-center text-white rounded px-4 py-2 border border-[#E5E7EB] text-sm font-medium transition"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <CiFilter color="#191E29" size={18} style={{ strokeWidth: 0.5 }} />
            <span className="text-sm ml-2 text-[#191E29]">Filtrar</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mb-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col">
            <div className="flex gap-1">
              <span className="text-sm font-bold">Origem do documento</span>
              <AiOutlineQuestionCircle size={16} color="#9CA3AF" />
            </div>
            <Select onValueChange={handleOriginChange}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="digitalizado">Digitalizado</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-1">
              <span className="text-sm font-bold">Tipo documental</span>
              <AiOutlineQuestionCircle size={16} color="#9CA3AF" />
            </div>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="invoice">Nota fiscal</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="report">Relatório</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end items-end mt-4 md:mt-0">
          <DocumentModal refreshDocuments={fetchDocuments} />
        </div>
      </div>

      <DocumentTable documents={filteredDocuments} refreshDocuments={fetchDocuments} />

      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </div>
  );
}
