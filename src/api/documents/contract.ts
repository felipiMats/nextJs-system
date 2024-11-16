import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  uploadedBy: z.string(),
  documentType: z.string(),
  totalTaxes: z.number(),
  netValue: z.number(),
  attachment: z.string(),
  creationDate: z.string(),
  lastUpdateDate: z.string(),
});

export const contract = initContract({
  getDocuments: {
    method: 'GET',
    path: '/api/documents',
    responses: {
      200: z.object({ documents: z.array(documentSchema) }),
    },
  },
  createDocument: {
    method: 'POST',
    path: '/api/documents',
    body: documentSchema.omit({ id: true, creationDate: true, lastUpdateDate: true }),
    responses: {
      201: z.object({ message: z.string() }),
    },
  }
});
