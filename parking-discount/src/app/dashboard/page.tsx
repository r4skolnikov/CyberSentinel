// app/dashboard/page.tsx (o donde tengas tu Dashboard)
'use client';
import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Elimina esta importación si no la vas a usar
import Image from 'next/image'; // <-- Importa el componente Image de Next.js
import React from 'react'; // Necesario para los tipos de eventos

export default function Dashboard() {
  // const router = useRouter(); // <-- Comenta o elimina esta línea si no vas a usar el router
  const [descuento, setDescuento] = useState('');
  const [patente, setPatente] = useState('');

  // Define el tipo de evento para handleSubmit
  function handleSubmit(e: React.FormEvent) { // <-- Usa React.FormEvent para tipar el evento
    e.preventDefault();

    // --- Lógica para simular el error siempre ---
    alert('Error: Ha ocurrido un problema al aplicar el descuento. Por favor, cierre la pestaña e ingrese nuevamente.');
    window.close(); // Intenta cerrar la pestaña al presionar OK en la alerta
    return; // Detiene cualquier otra ejecución de la función
  }

  const handleLogout = () => {
    // Lógica para cerrar sesión (ej. limpiar tokens, etc.)
    console.log('Cerrando sesión...');
    alert('No es posible cerrar sesión en este momento. Por favor, cierre la pestaña manualmente.');
    // router.push('/login'); // Si activas esta línea, descomenta la importación y la inicialización de useRouter
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Encabezado Superior */}
      <header className="flex justify-between items-center bg-white p-4 shadow-sm border-b border-gray-200">
        <div className="flex items-center">
          {/* Usa el componente Image de Next.js para el logo */}
          <Image
            src="/logo-mallplaza.png"
            alt="mallplaza"
            width={32} // Define un ancho fijo para la imagen
            height={32} // Define un alto fijo para la imagen (ajusta según tus necesidades)
            className="mr-2"
          />
        </div>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Contenido Principal: Sidebar + Main Content Area */}
      <div className="flex flex-1">
        {/* Barra Lateral (Sidebar) */}
        <aside className="bg-gray-800 text-white w-20 flex flex-col items-center py-8">
          <div className="w-full py-4 px-2 flex flex-col items-center cursor-pointer bg-red-600 text-white rounded-r-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 mb-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 13.5l-4.5 4.5l-2.5-2.5l4.5-4.5l2.5 2.5zm-3.5 3.5l1.5-1.5m6.5-6.5l4.5 4.5l-2.5-2.5l-4.5-4.5l2.5-2.5zM12 5L7 10M17 15L22 10" />
            </svg>
            <span className="text-xs">Descuentos</span>
          </div>
        </aside>

        {/* Área de Contenido Principal a la derecha del sidebar */}
        <main className="flex-1 flex flex-col items-center pt-10 px-8 bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 self-start">Descuentos Mallplaza</h1>
          <p className="text-gray-600 mb-8 self-start text-lg">
            Selecciona el descuento de tu cliente y añade la patente
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-lg shadow-lg flex flex-col gap-6 w-full max-w-lg mx-auto"
          >
            <div className="flex flex-col">
              <label htmlFor="descuento" className="text-sm font-medium text-gray-700 mb-2">Descuento*</label>
              <select
                id="descuento"
                value={descuento}
                onChange={e => setDescuento(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white appearance-none text-black"
              >
                <option value="">Selecciona un descuento</option>
                <option value="Energy PNO 2.0">Energy PNO 2.0</option>
                <option value="Descuento VIP">Descuento VIP</option>
                <option value="Promoción Verano">Promoción Verano</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="patente" className="text-sm font-medium text-gray-700 mb-2">Patente*</label>
              <input
                id="patente"
                type="text"
                placeholder="Ej: KBFG90"
                value={patente}
                onChange={e => setPatente(e.target.value.toUpperCase())}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
              />
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out mt-4"
              type="submit"
            >
              Aplicar Descuento
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}