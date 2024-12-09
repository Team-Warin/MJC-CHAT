'use client'

import AdminNavbar from "@/components/admin/navbar";
import AdminSidebar from "@/components/admin/sidebar";
import AdminBreadCrumb from "@/components/admin/breadcrumb";

export default function AdminLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        <AdminNavbar />
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
          <AdminBreadCrumb />
          {children}
        </div>
      </div>
    </div>
  );
}