// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    // Contenedor principal que ocupa toda la pantalla y centra el contenido
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100"> {/* Añadido bg-gray-100 para un fondo claro */}
      
      {/* Contenedor para el logo en la parte superior izquierda */}
      <div className="absolute top-0 left-0 p-8"> {/* Posicionado absoluto en la esquina */}
        {/* LA RUTA CORRECTA ES DESDE LA RAIZ DE LA CARPETA PUBLIC */}
        <img src="/logo-mallplaza.png" alt="mallplaza" className="h-10" /> {/* Asegúrate de que el nombre del archivo sea 'logo-mallplaza.png' como en los ejemplos anteriores, o cámbialo a 'image.png' si ese es el nombre real de tu archivo */}
      </div>

      {/* Contenedor del cuadro central */}
      <div className="bg-white p-10 rounded-lg shadow-lg text-center"> {/* Aumentado padding y shadow para que sea más prominente */}
        <h1 className="mb-6 text-3xl font-semibold text-gray-800">Backoffice Digital Parking</h1> {/* Aumentado tamaño, peso de fuente y color */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out" // Color más rojo, padding, fuente, esquinas y hover
          onClick={() => router.push('/login')}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}