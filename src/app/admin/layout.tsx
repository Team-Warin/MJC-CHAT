import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";

import { AdminNavbar } from "@/components/admin/navbar";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
}