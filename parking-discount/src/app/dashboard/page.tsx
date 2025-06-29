// app/dashboard/page.tsx (o donde tengas tu Dashboard)
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Necesario para Cerrar Sesión

// Opcional: Puedes importar un ícono si usas una librería como react-icons
// Por ejemplo: import { FiTag } from 'react-icons/fi';

export default function Dashboard() {
  const router = useRouter(); // Inicializa useRouter para la navegación
  const [descuento, setDescuento] = useState('');
  const [patente, setPatente] = useState('');

  function handleSubmit(e) {
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
    //router.push('/login'); // Redirige a la página de login
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100"> {/* Contenedor principal con fondo ligero */}
      {/* Encabezado Superior */}
      <header className="flex justify-between items-center bg-white p-4 shadow-sm border-b border-gray-200">
        <div className="flex items-center">
          <img src="/logo-mallplaza.png" alt="mallplaza" className="h-8 mr-2" /> {/* Ajusta la altura si es necesario */}
          {/* Puedes añadir un texto aquí si el logo no es suficiente */}
        </div>
        <button 
          onClick={handleLogout} 
          className="text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Contenido Principal: Sidebar + Main Content Area */}
      <div className="flex flex-1"> {/* Flex para el sidebar y el contenido */}
        {/* Barra Lateral (Sidebar) */}
        <aside className="bg-gray-800 text-white w-20 flex flex-col items-center py-8"> {/* w-20 para un sidebar más delgado, bg-gray-800 para oscuro */}
          {/* Item de menú "Descuentos" - Activo */}
          <div className="w-full py-4 px-2 flex flex-col items-center cursor-pointer bg-red-600 text-white rounded-r-lg"> {/* Fondo rojo para indicar activo, rounded-r-lg */}
            {/* Ícono (puedes usar un SVG o librería de íconos) */}
            {/* Si usas react-icons: <FiTag className="text-3xl mb-1" /> */}
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
          {/* Puedes añadir más ítems de menú aquí, con estilos no activos */}
          {/* <div className="w-full py-4 px-2 flex flex-col items-center text-gray-400 hover:bg-gray-700 cursor-pointer">
              <svg ...> (Otro ícono) </svg>
              <span className="text-xs">Otro Item</span>
          </div> */}
        </aside>

        {/* Área de Contenido Principal a la derecha del sidebar */}
        <main className="flex-1 flex flex-col items-center pt-10 px-8 bg-gray-100"> {/* Margen superior para el contenido, fondo consistente */}
          {/* Título de la Sección */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 self-start">Descuentos Mallplaza</h1> {/* Alineado a la izquierda, más grande */}
          
          {/* Subtítulo/Instrucción */}
          <p className="text-gray-600 mb-8 self-start text-lg"> {/* Tamaño de fuente y color ajustados */}
            Selecciona el descuento de tu cliente y añade la patente
          </p>

          {/* Formulario de Aplicación de Descuento */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-10 rounded-lg shadow-lg flex flex-col gap-6 w-full max-w-lg mx-auto" // Aumentado padding, shadow, redondeo y ancho
          >
            <div className="flex flex-col">
              <label htmlFor="descuento" className="text-sm font-medium text-gray-700 mb-2">Descuento*</label> {/* Label con estrella */}
            <select
                id="descuento"
                value={descuento}
                onChange={e => setDescuento(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white appearance-none text-black" // Añadido text-black para letra negra
            >
                <option value="">Selecciona un descuento</option>
                <option value="Energy PNO 2.0">Energy PNO 2.0</option>
                <option value="Descuento VIP">Descuento VIP</option>
                <option value="Promoción Verano">Promoción Verano</option>
                {/* Otros descuentos */}
            </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="patente" className="text-sm font-medium text-gray-700 mb-2">Patente*</label> {/* Label con estrella */}
              <input
                id="patente"
                type="text"
                placeholder="Ej: KBFG90" // Añadido placeholder
                value={patente}
                onChange={e => setPatente(e.target.value.toUpperCase())} // Convertir a mayúsculas
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black" // Estilo para input, letra negra
              />
            </div>
            
            <button 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out mt-4" // Estilo de botón consistente
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