import { DocumentDTO } from '@/dtos/DocumentDTO';
import axios from 'axios';
import { toBase64 } from './convertToBase64';

const apiClient = axios.create({
  baseURL: '/api/documents',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

    const response = await apiClient.post('/', payload);
    return response.data;
  },

  deleteDocument: async (id: string) => {
    const response = await apiClient.delete(`?id=${id}`);
    return response.status === 204;
  },
};
