'use client';
import React, { useState } from 'react';
import { Lock, PlusCircle, Users, Home, LogOut } from 'lucide-react';
import { Propiedad, Lead } from './data';

interface Props {
  propiedades: Propiedad[];
  leads: Lead[];
  onActualizarEstatusProp: (id: string, estatus: Propiedad['estatus']) => void;
  onAgregarPropiedad: (prop: Propiedad) => void;
  onActualizarEstatusLead: (id: string, estatus: Lead['estatus']) => void;
  onCerrarPanel: () => void;
}

export default function PanelAdmin({
  propiedades,
  leads,
  onActualizarEstatusProp,
  onAgregarPropiedad,
  onActualizarEstatusLead,
  onCerrarPanel,
}: Props) {
  const [autenticado, setAutenticado] = useState(false);
  const [clave, setClave] = useState('');
  const [errorClave, setErrorClave] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [zona, setZona] = useState<Propiedad['zona']>('Campos Elíseos');
  const [operacion, setOperacion] = useState<Propiedad['operacion']>('Venta');
  const [precioMXN, setPrecioMXN] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (clave === 'vestora2026') {
      setAutenticado(true);
      setErrorClave(false);
    } else {
      setErrorClave(true);
    }
  };

  const handleCrearPropiedad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !precioMXN) return;

    const nueva: Propiedad = {
      id: `VJRZ-${Math.floor(200 + Math.random() * 700)}`,
      titulo,
      zona,
      operacion,
      precioMXN: Number(precioMXN),
      estatus: 'Disponible',
      terrenoM2: 250,
      construccionM2: 200,
      recamaras: 3,
      banos: 2.5,
      imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
      descripcion: 'Propiedad agregada desde el panel administrativo de Vestora JRZ.',
    };
    onAgregarPropiedad(nueva);
    setTitulo('');
    setPrecioMXN('');
  };

  if (!autenticado) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-amber-400">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-center text-xl font-bold text-slate-900">Acceso Asesora • Vestora JRZ</h2>
        <p className="mt-1 text-center text-xs text-slate-500">Clave demo: vestora2026</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Ingresa tu clave de acceso"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
          {errorClave && <p className="text-xs text-red-600">Clave incorrecta. Usa: vestora2026</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCerrarPanel}
              className="w-1/2 rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700"
            >
              Volver al sitio
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-amber-400 hover:bg-slate-800"
            >
              Entrar al CRM
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Panel de Control • Landy Arce</h2>
          <p className="text-sm text-slate-500">Gestión de inventario inmobiliario y prospectos de Ciudad Juárez</p>
        </div>
        <button
          onClick={onCerrarPanel}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" /> Ver Catálogo Público
        </button>
      </div>

      {/* Formulario Alta Rápida */}
      <form onSubmit={handleCrearPropiedad} className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-slate-900">
          <PlusCircle className="h-5 w-5 text-amber-600" /> Publicar Nueva Propiedad
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <input
            type="text"
            required
            placeholder="Título (ej. Casa en Bosques de Senecú)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 md:col-span-2"
          />
          <select
            value={zona}
            onChange={(e) => setZona(e.target.value as Propiedad['zona'])}
            className="rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900"
          >
            <option>Campos Elíseos</option>
            <option>Las Misiones</option>
            <option>Valle del Sol</option>
            <option>Gómez Morín</option>
            <option>San Lorenzo</option>
          </select>
          <select
            value={operacion}
            onChange={(e) => setOperacion(e.target.value as Propiedad['operacion'])}
            className="rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900"
          >
            <option>Venta</option>
            <option>Renta</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              required
              placeholder="Precio MXN"
              value={precioMXN}
              onChange={(e) => setPrecioMXN(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
            />
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-4 font-semibold text-white hover:bg-amber-700"
            >
              Subir
            </button>
          </div>
        </div>
      </form>

      {/* Tabla de Inventario */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-slate-900">
          <Home className="h-5 w-5 text-amber-600" /> Inventario Activo ({propiedades.length})
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Propiedad</th>
                <th className="p-3">Zona</th>
                <th className="p-3">Precio MXN</th>
                <th className="p-3">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {propiedades.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-mono text-xs font-bold">{p.id}</td>
                  <td className="p-3 font-medium text-slate-900">{p.titulo}</td>
                  <td className="p-3 text-slate-600">{p.zona}</td>
                  <td className="p-3 font-semibold">${p.precioMXN.toLocaleString('es-MX')}</td>
                  <td className="p-3">
                    <select
                      value={p.estatus}
                      onChange={(e) => onActualizarEstatusProp(p.id, e.target.value as Propiedad['estatus'])}
                      className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold"
                    >
                      <option value="Disponible">Disponible</option>
                      <option value="Apartada">Apartada</option>
                      <option value="Vendida">Vendida</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla de Leads (CRM) */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-slate-900">
          <Users className="h-5 w-5 text-emerald-600" /> Prospectos Capturados ({leads.length})
        </h3>
        {leads.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Aún no hay prospectos. Abre cualquier casa del catálogo y llena el formulario para probar el flujo.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">WhatsApp</th>
                  <th className="p-3">Crédito</th>
                  <th className="p-3">Propiedad</th>
                  <th className="p-3">Seguimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className="p-3 text-xs text-slate-500">{l.fecha}</td>
                    <td className="p-3 font-semibold text-slate-900">{l.nombre}</td>
                    <td className="p-3 text-emerald-700">{l.telefono}</td>
                    <td className="p-3">{l.credito}</td>
                    <td className="p-3 text-xs">{l.propiedadInteres}</td>
                    <td className="p-3">
                      <select
                        value={l.estatus}
                        onChange={(e) => onActualizarEstatusLead(l.id, e.target.value as Lead['estatus'])}
                        className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold"
                      >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Contactado">Contactado</option>
                        <option value="Visita Agendada">Visita Agendada</option>
                        <option value="Cerrado">Cerrado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}