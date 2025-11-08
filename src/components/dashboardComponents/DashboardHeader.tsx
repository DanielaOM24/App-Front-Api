'use client';

import { useRouter } from "next/navigation";


interface Props {
  title: string;
}

export default function DashboardHeader({ title }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/login"); 
  };

  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
