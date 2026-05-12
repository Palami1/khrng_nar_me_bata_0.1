import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LTC WorkFlow System',
  description: 'ລະບົບຈັດການເອກະສານພາຍໃນ LTC Digital Form Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lo">
      <body>{children}</body>
    </html>
  );
}