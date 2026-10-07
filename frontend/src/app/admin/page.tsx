import type { Metadata } from "next";
import { AdminApp } from "@/components/AdminApp";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="min-h-[70vh] bg-cream px-6 py-12 md:px-20">
      <div className="mx-auto max-w-[1000px]">
        <AdminApp />
      </div>
    </section>
  );
}
