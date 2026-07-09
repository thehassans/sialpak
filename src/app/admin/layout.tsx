import { getSession } from "@/lib/auth";
import { getSetting, DEFAULT_SETTINGS } from "@/lib/settings";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const general = await getSetting("general", DEFAULT_SETTINGS.general);

  return (
    <div className="flex bg-bg min-h-screen font-sans">
      <Sidebar storeName={general.storeName} userName={session?.name || "Admin"} />
      <div className="flex-1 min-w-0">
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
