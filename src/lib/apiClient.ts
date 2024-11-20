import { DocumentDTO } from '@/dtos/DocumentDTO';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/documents',
  headers: {
    'Content-Type': 'application/json',
  },
});

const toBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string | null);
    reader.onerror = () => reject(null);
    reader.readAsDataURL(file);
  });
};

export const api = {
  getDocuments: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },

  createDocument: async (data: DocumentDTO) => {
    const payload = {
      ...data,
      attachment: data.attachment && typeof data.attachment !== 'string' 
        ? await toBase64(data.attachment) 
        : data.attachment,
    };

    console.log(payload, "teste")

    const response = await apiClient.post('/', payload);
    return response.data;
  },

  deleteDocument: async (id: string) => {
    const response = await apiClient.delete(`/${id}`);
    return response.status === 204;
  },
};
