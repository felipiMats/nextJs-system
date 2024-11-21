'use client';

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterModal({
  filters,
  setFilters,
  onClose,
}: {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...localFilters,
    }));
    onClose();
  };

  const handleClearFilters = () => {
    setLocalFilters({
      documentType: "all",
      documentOrigin: "all",
      uploadedBy: "",
      minTax: "",
      maxNetValue: "",
      creationStartDate: "",
      creationEndDate: "",
    });
  };

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-white w-full sm:w-[400px] md:w-[500px] lg:w-[400px] h-screen sm:h-auto overflow-y-auto p-6"
        style={{
          ...(window.innerWidth > 768 && { position: "absolute", right: 0, height: "100vh" }),
        }}
      >
        <div className="flex-col mb-4">
          <div className="flex-col border-b h-16 border-[#E5E7EB]" >
            <h2 className="text-lg font-bold">Filtrar Documentos</h2>
            <span className="text-sm text-[#6B7280]">
              Indique os dados necessários para fazer a filtragem
            </span>
          </div>

          <div className="flex px-2 py-2 border border-[#E5E7EB] rounded mt-4 mb-4" >
            <AiOutlineExclamationCircle />
            <span className="text-sm text-[#202936] ml-2">
              Selecione o tipo de documento necessário para, a partir dele, selecionar os tipos de índice para a filtragem.
            </span>
          </div>
          <button className="absolute top-5 right-5" onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        <div className="space-y-4 border-b border-[#E5E7EB]">
          <div>
            <div className="border-b border-[#E5E7EB] mb-4">
              <label className="text-sm font-bold">Período de criação</label>
              <div className="flex gap-4 mb-6">
                <input
                  type="date"
                  value={localFilters.creationStartDate}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({ ...prev, creationStartDate: e.target.value }))
                  }
                  className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
                />
                <input
                  type="date"
                  value={localFilters.creationEndDate}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({ ...prev, creationEndDate: e.target.value }))
                  }
                  className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
                />
              </div>
            </div>
            <label className="text-sm font-bold">Tipo de Documento</label>
            <Select
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, documentType: value }))
              }
              value={localFilters.documentType}
            >
              <SelectTrigger className="w-full focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="invoice">Nota Fiscal</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="report">Relatório</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-bold">Emitente</label>
            <input
              placeholder="Razão social do emitente"

              type="text"
              value={localFilters.uploadedBy}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, uploadedBy: e.target.value }))
              }
              className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
            />
          </div>

          <div>
            <label className="text-sm font-bold">Valor total dos tributos</label>
            <input
              placeholder="Valor em R$"
              type="number"
              value={localFilters.minTax}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, minTax: e.target.value }))
              }
              className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
            />
          </div>

          <div>
            <label className="text-sm font-bold">Valor Líquido</label>
            <input
              placeholder="Valor em R$"
              type="number"
              value={localFilters.maxNetValue}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, maxNetValue: e.target.value }))
              }
              className="border border-[#E5E7EB] w-full rounded mb-6 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="rounded text-[#191E29] px-4 py-2 border border-[#E5E7EB] mr-2"
            onClick={handleClearFilters}
          >
            Limpar
          </button>
          <button
            className="bg-[#05c151] rounded text-white px-4 py-2"
            onClick={handleApplyFilters}
          >
            Aplicar filtro
          </button>
        </div>
      </div>
    </div>
  );
}
