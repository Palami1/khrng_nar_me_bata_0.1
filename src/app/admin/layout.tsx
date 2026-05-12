import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | LTC WorkFlow',
  description: 'ລະບົບຈັດການຄຳຮ້ອງ - Admin Dashboard',
  robots: 'noindex, nofollow', // ບໍ່ໃຫ້ search engine index admin page
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin ໃຊ້ root HTML/body ຈາກ parent layout,
  // ສ່ວນ style/provider ຈັດການໃນ page.tsx ເອງ (ConfigProvider Ant Design).
  return <>{children}</>;
}
