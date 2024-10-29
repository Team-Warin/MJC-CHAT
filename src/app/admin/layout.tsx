import AdminSidebar from '@/components/admin/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <AdminSidebar />
      {children}
    </div>
  );
}
