import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader
  } from "@/components/ui/table";
import { DocumentDTO } from "@/dtos/DocumentDTO";
import { api } from "@/lib/apiClient";
import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import { FiFileText, FiTrash } from "react-icons/fi";
import { TbScanEye } from "react-icons/tb";

const ITEMS_PER_PAGE = 10;

export default function DocumentTable({ documents }: { documents: DocumentDTO[] }) {
  const [dropdownVisible, setDropdownVisible] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDocuments = documents.slice(startIndex, endIndex);
  const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE);
  const totalDocuments = `${documents.length} documentos`;
  const totalIssuer = `${new Set(documents.map((doc) => doc.uploadedBy)).size} emitentes`;
  const totalTaxValue = formatCurrency(documents.reduce((sum, doc) => sum + doc.totalTaxes, 0));
  const totalNetValue = formatCurrency(documents.reduce((sum, doc) => sum + doc.netValue, 0));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleDropdown = (id: string) => {
    setDropdownVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div style={{ overflowX: 'auto', maxWidth: screenWidth -84 }}>
        <Table className="border border-[#E5E7EB] min-w-[1080px]">
          <TableHeader>
            <TableRow>
              <TableHead className="font-normal border-b">Nome do documento</TableHead>
              <TableHead className="font-normal border-b">Emitente</TableHead>
              <TableHead className="font-normal border-b">Total de tributos</TableHead>
              <TableHead className="font-normal border-b">Valor líquido</TableHead>
              <TableHead className="font-normal border-b">Data de criação</TableHead>
              <TableHead className="font-normal border-b">Última atualização</TableHead>
              <TableHead className="font-normal border-b" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center">
                    <FiFileText size={24} color="#079942" />
                    <div className="flex flex-col ml-2">
                      <span className="text-xs text-[#6B7280]">{`Cód ${doc.id}`}</span>
                      <span className="text-sm text-[#191E29]">{doc.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[#3A424E]">{doc.uploadedBy}</TableCell>
                <TableCell className="text-sm text-[#3A424E]">{formatCurrency(doc.totalTaxes)}</TableCell>
                <TableCell className="text-sm text-[#3A424E]">{formatCurrency(doc.netValue)}</TableCell>
                <TableCell className="text-sm text-[#3A424E]">{formatDate(new Date(doc.creationDate!))}</TableCell>
                <TableCell className="text-sm text-[#3A424E]">{formatDate(new Date(doc.lastUpdateDate!))}</TableCell>
                <TableCell>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(doc.id!)}
                      className="text-base text-[#191E29] px-2 py-1 rounded"
                    >
                     ...
                    </button>
                    {dropdownVisible[doc.id!] && (
                      <div className="z-10 absolute right-0 mt-2 bg-white shadow-md rounded border w-44 p-2 flex flex-col">
                        <button
                          className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded"
                          onClick={() => console.log(`Visualizar documento ${doc.id}`)}
                        >
                          <TbScanEye size={18} />
                          <span className="text-sm text-[#191E29]">Visualizar</span>
                        </button>
                        <button
                          className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded"
                          onClick={() => api.deleteDocument(doc.id!)}
                        >
                          <FiTrash size={18} />
                          <span className="text-sm text-[#191E29]">Excluir documento</span>
                        </button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs text-[#6B7280]">Total</span>
                  <span className="text-sm text-[#3A424E]">{totalDocuments}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs text-[#6B7280]">nº de emitentes</span>
                  <span className="text-sm text-[#3A424E]">{totalIssuer}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs text-[#6B7280]">Total de tributos</span>
                  <span className="text-sm text-[#3A424E]">{totalTaxValue}</span>
                </div>
              </TableCell>
              <TableCell colSpan={4}>
                <div className="flex flex-col">
                  <span className="text-xs text-[#6B7280]">Total valor líquido</span>
                  <span className="text-sm text-[#3A424E]">{totalNetValue}</span>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end items-center space-x-4 mt-4">
        <span className="text-sm font-medium text-[#9CA3AF]">
          {Math.min(endIndex, documents.length)} de {documents.length}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`border px-4 py-2 text-sm rounded ${
            currentPage === 1
              ? "text-[#9CA3AF] border-gray-300 cursor-not-allowed"
              : "text-[#191A29] border-gray-500 hover:bg-gray-100"
          }`}
        >
          Anterior
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`border px-4 py-2 text-sm rounded ${
            currentPage === totalPages
              ? "text-[#9CA3AF] border-gray-300 cursor-not-allowed"
              : "text-[#191A29] border-gray-500 hover:bg-gray-100"
          }`}
        >
          Próxima
        </button>
      </div>
    </div>

  );
}



