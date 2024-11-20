'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { TbFileUpload } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentDTO } from "@/dtos/DocumentDTO";
import { api } from "@/lib/apiClient";

export default function DocumentModal({
  refreshDocuments,
}: {
  refreshDocuments: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<DocumentDTO>();

  const onSubmit: SubmitHandler<DocumentDTO> = async (data) => {
    try {
      const payload = {
        name: data.name,
        uploadedBy: data.uploadedBy,
        documentType: data.documentType,
        documentOrigin: data.documentOrigin,
        totalTaxes: parseFloat(data.totalTaxes.toString()),
        netValue: parseFloat(data.netValue.toString()),
        attachment: data.attachment,
        creationDate: new Date().toISOString(),
      };
      await api.createDocument(payload)
      refreshDocuments();
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Error create document:', error);
    }
  };
  
  const file = watch("attachment");

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
        <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
          <div
            className="bg-white p-6 rounded w-full sm:w-[600px] sm:max-h-[90vh] h-screen sm:h-auto overflow-y-auto"
          >
            <h1 className="text-2xl font-bold">Criar novo documento</h1>
            <span className="text-sm text-[#6B7280]">
              Insira os dados necessários para criar
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mt-6 gap-4"
            >
              <div className="flex flex-col gap-4 border-b boder-[#3A424E]">
                <div>
                  <label className="text-sm font-bold">Nome do documento</label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Campo obrigatório",
                    })}
                    className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold">Emitente</label>
                  <input
                    type="text"
                    {...register("uploadedBy", {
                      required: "Campo obrigatório",
                    })}
                    className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
                  />
                  {errors.uploadedBy && (
                    <span className="text-red-500 text-xs">
                      {errors.uploadedBy.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold flex gap-1">
                    Origem do documento
                    <AiOutlineQuestionCircle size={16} color="#9CA3AF" />
                  </label>
                  <Select
                    onValueChange={(value) => setValue("documentOrigin", value)}
                  >
                    <SelectTrigger className="w-full focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]">
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digitalizado">
                        Digitalizado
                      </SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-bold flex gap-1">
                    Tipo documental
                    <AiOutlineQuestionCircle size={16} color="#9CA3AF" />
                  </label>
                  <Select
                    onValueChange={(value) => setValue("documentType", value)}
                  >
                    <SelectTrigger className="w-full focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Nota fiscal</SelectItem>
                      <SelectItem value="contract">Contrato</SelectItem>
                      <SelectItem value="report">Relatório</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-bold">Total de tributos</label>
                  <input
                    type="number"
                    {...register("totalTaxes", {
                      required: "Campo obrigatório",
                      valueAsNumber: true,
                    })}
                    className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
                  />
                  {errors.totalTaxes && (
                    <span className="text-red-500 text-xs">
                      {errors.totalTaxes.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold">Valor líquido</label>
                  <input
                    type="number"
                    {...register("netValue", {
                      required: "Campo obrigatório",
                      valueAsNumber: true,
                    })}
                    className="border border-[#E5E7EB] w-full rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CAFFD6]"
                  />
                  {errors.netValue && (
                    <span className="text-red-500 text-xs">
                      {errors.netValue.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold">Anexo</label>
                  <div
                    className="border-2 border-dashed border-[#05c151] p-6 flex flex-col items-center justify-center rounded-md mt-2"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        setValue('attachment', file);
                      }
                    }}
                  >
                    <TbFileUpload size={40} color="#05c151" />
                    <span className="text-sm text-[#3A424E] mt-4 text-center">
                      Arraste e solte aqui ou selecione o arquivo para upload
                    </span>
                    <button
                      type="button"
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="mt-4 border border-[#E5E7EB] text-black text-sm px-4 py-2 rounded"
                    >
                      Procurar e selecionar arquivo
                    </button>
                    <span className="text-xs text-[#9CA3AF] mt-4">
                      Tamanho máximo: 10MB
                    </span>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    {...register('attachment')}
                    onChange={(e) => setValue('attachment', e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  {errors.attachment && (
                    <span className="text-red-500 text-xs">{errors.attachment.message}</span>
                  )}
                </div>
              </div>


              {file && (
                <div className="flex items-center border border-[#E5E7EB] rounded-md mt-4 p-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#F9FAFB] rounded-full">
                    <TbFileUpload size={24} color="#9CA3AF" />
                  </div>
                  <div className="flex flex-col ml-4 flex-1">
                    <span className="text-sm text-[#3A424E]">{file.name}</span>
                    <span className="text-xs text-[#9CA3AF]">
                      {((file.size / 1024 / 1024).toFixed(2))}MB de 10MB
                    </span>
                    <div className="relative w-full h-2 bg-[#E5E7EB] rounded-full mt-2">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="absolute top-0 left-0 h-2 bg-[#05C151] rounded-full"
                      ></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 text-[#9CA3AF] hover:text-[#3A424E]"
                    onClick={() => setValue("attachment", null)}
                  >
                    <IoCloseOutline size={18} />
                  </button>
                </div>
              )}

              <div className="flex justify-end mt-2 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  className="border border-[#E5E7EB] mt-4 text-sm text-[#3A424E] px-4 py-2 rounded"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex mt-4 items-center justify-center text-sm gap-2 bg-[#05c151] ml-4 text-white px-4 py-2 rounded"
                >
                  Criar documento
                  <FiArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
