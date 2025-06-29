// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // <-- Importa el componente Image de Next.js

export default function Home() {
  const router = useRouter();
  return (
    // Contenedor principal que ocupa toda la pantalla y centra el contenido
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      {/* Contenedor para el logo en la parte superior izquierda */}
      <div className="absolute top-0 left-0 p-8">
        {/* Reemplazado <img> con <Image /> */}
        <Image
          src="/logo-mallplaza.png"
          alt="mallplaza"
          width={150} // Ajusta el ancho según el tamaño real o deseado de tu logo
          height={40}  // Ajusta el alto para mantener la proporción de tu logo
          className="h-10" // Puedes mantener la clase de Tailwind para un control adicional si es necesario
        />
      </div>

      {/* Contenedor del cuadro central */}
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="mb-6 text-3xl font-semibold text-gray-800">Backoffice Digital Parking</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out"
          onClick={() => router.push('/login')}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}