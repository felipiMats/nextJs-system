import { NextRequest, NextResponse } from 'next/server';
import { getDocuments, createDocument } from './handlers';

export const GET = async () => {
  const documents = await getDocuments();
  return NextResponse.json({ documents });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  await createDocument(body);
  return NextResponse.json({ message: 'Document created' }, { status: 201 });
};
