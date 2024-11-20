export interface DocumentDTO {
  id?: string;
  name: string;
  uploadedBy: string;
  documentType: string;
  documentOrigin: string;
  totalTaxes: number;
  netValue: number;
  attachment: File | null;
  creationDate?: string;
  lastUpdateDate?: string;
}
