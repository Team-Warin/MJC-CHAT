import AdminSidebar from "@/components/admin/sidebar";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();

  if(!session) {
    redirect('/404');
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div>
        {children}
      </div>
    </div>
  );
}