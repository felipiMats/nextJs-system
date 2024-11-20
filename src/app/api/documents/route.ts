// src/app/api/documents/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const documents = await prisma.document.findMany();
  return NextResponse.json(documents);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const requiredFields = [
      'uploadedBy',
      'documentType',
      'documentOrigin',
      'totalTaxes',
      'netValue',
      'name',
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Field "${field}" is required.` },
          { status: 400 }
        );
      }
    }

    const document = await prisma.document.create({
      data: {
        uploadedBy: data.uploadedBy,
        name: data.name,
        documentType: data.documentType,
        documentOrigin: data.documentOrigin,
        totalTaxes: parseFloat(data.totalTaxes),
        netValue: parseFloat(data.netValue),
        attachment: data.attachment || null,
        creationDate: new Date(data.creationDate || Date.now()),
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await prisma.document.delete({ where: { id } });
  return NextResponse.json({ message: 'Document deleted successfully' });
}
