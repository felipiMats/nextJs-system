import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'My App',
  description: 'An awesome app with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={roboto.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
