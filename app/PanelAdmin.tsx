'use client';
import React, { useState } from 'react';
import { Lock, PlusCircle, Users, Home, LogOut, ImagePlus, Trash2, X, Star } from 'lucide-react';
import { Propiedad, Lead, DATOS_ASESORA } from './data';

interface Props {
  propiedades: Propiedad[];
  leads: Lead[];
  zonasDisponibles: string[];
  onActualizarEstatusProp: (id: string, estatus: Propiedad['estatus']) => void;
  onEliminarPropiedad: (id: string) => void;
  onAgregarPropiedad: (prop: Propiedad) => void;
  onActualizarEstatusLead: (id: string, estatus: Lead['estatus']) => void;
  onCerrarPanel: () => void;
}

const CLAVE_ADMIN = 'Landynataliavestora2026';
const MINIMO_FOTOS = 4;

export default function PanelAdmin({
  propiedades,
  leads,
  zonasDisponibles,
  onActualizarEstatusProp,
  onEliminarPropiedad,
  onAgregarPropiedad,
  onActualizarEstatusLead,
  onCerrarPanel,
}: Props) {
  const [autenticado, setAutenticado] = useState(false);
  const [clave, setClave] = useState('');
  const [errorClave, setErrorClave] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState<Propiedad['tipo']>('Casa');
  const [condicion, setCondicion] = useState<Propiedad['condicion']>('Nueva');
  const [zonaSeleccionada, setZonaSeleccionada] = useState('Campos Elíseos');
  const [zonaNueva, setZonaNueva] = useState('');
  const [operacion, setOperacion] = useState<Propiedad['operacion']>('Venta');
  const [precioMXN, setPrecioMXN] = useState('');
  const [terrenoM2, setTerrenoM2] = useState('');
  const [construccionM2, setConstruccionM2] = useState('');
  const [recamaras, setRecamaras] = useState('');
  const [banos, setBanos] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([]);
  const [errorFotos, setErrorFotos] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (clave.trim() === CLAVE_ADMIN) {
      setAutenticado(true);
      setErrorClave(false);
    } else {
      setErrorClave(true);
    }
  };

  const comprimirImagen = (archivo: File): Promise<string> => {
    return new Promise((resolve) => {
      const lector = new FileReader();
      lector.onload = (evento) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxAncho = 720;
          const escala = maxAncho / img.width;
          canvas.width = img.width > maxAncho ? maxAncho : img.width;
          canvas.height = img.width > maxAncho ? img.height * escala : img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.72));
        };
        img.src = evento.target?.result as string;
      };
      lector.readAsDataURL(archivo);
    });
  };

  const handleSubirFotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = Array.from(e.target.files || []);
    if (archivos.length === 0) return;

    const nuevasComprimidas = await Promise.all(archivos.map(comprimirImagen));
    setImagenesPreview((prev) => {
      const combinadas = [...prev, ...nuevasComprimidas];
      if (combinadas.length >= MINIMO_FOTOS) setErrorFotos('');
      return combinadas;
    });
    e.target.value = '';
  };

  const handleEliminarFoto = (index: number) => {
    setImagenesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHacerPortada = (index: number) => {
    if (index === 0) return;
    setImagenesPreview((prev) => {
      const copia = [...prev];
      const [seleccionada] = copia.splice(index, 1);
      copia.unshift(seleccionada);
      return copia;
    });
  };

  const handleCrearPropiedad = (e: React.FormEvent) => {
    e.preventDefault();
    const zonaFinal =
      zonaSeleccionada === '__NUEVA__' ? zonaNueva.trim() : zonaSeleccionada;

    if (!titulo || !precioMXN || !zonaFinal) return;

    if (imagenesPreview.length < MINIMO_FOTOS) {
      setErrorFotos(`Debes subir al menos ${MINIMO_FOTOS} fotografías (llevas ${imagenesPreview.length}).`);
      return;
    }

    const nueva: Propiedad = {
      id: `VJRZ-${Math.floor(200 + Math.random() * 700)}`,
      titulo,
      tipo,
      condicion: tipo === 'Terreno' ? 'N/A' : condicion,
      zona: zonaFinal,
      operacion,
      precioMXN: Number(precioMXN),
      estatus: 'Disponible',
      terrenoM2: Number(terrenoM2) || 200,
      construccionM2: tipo === 'Terreno' ? 0 : Number(construccionM2) || 0,
      recamaras: tipo === 'Terreno' ? 0 : Number(recamaras) || 0,
      banos: tipo === 'Terreno' ? 0 : Number(banos) || 0,
      imagen: imagenesPreview[0],
      imagenes: imagenesPreview,
      descripcion: descripcion || 'Propiedad publicada en el catálogo oficial de Vestora JRZ Inmobiliaria.',
    };

    onAgregarPropiedad(nueva);
    setTitulo('');
    setPrecioMXN('');
    setTerrenoM2('');
    setConstruccionM2('');
    setRecamaras('');
    setBanos('');
    setDescripcion('');
    setImagenesPreview([]);
    setErrorFotos('');
    if (zonaSeleccionada === '__NUEVA__') {
      setZonaSeleccionada(zonaFinal);
      setZonaNueva('');
    }
  };

  if (!autenticado) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-amber-400">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-center text-xl font-bold text-slate-900">Acceso Asesora • Vestora JRZ</h2>
        <p className="mt-1 text-center text-xs text-slate-500">Ingresa tu clave privada de administración</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Contraseña de acceso"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
          {errorClave && (
            <p className="text-xs font-medium text-red-600">
              Contraseña incorrecta. Verifica mayúsculas y minúsculas.
            </p>
          )}
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

  const faltanFotos = Math.max(0, MINIMO_FOTOS - imagenesPreview.length);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Panel Administrativo • {DATOS_ASESORA.nombre}</h2>
          <p className="text-sm text-slate-500">Sube propiedades con galería de fotos y gestiona tus prospectos en Ciudad Juárez</p>
        </div>
        <button
          onClick={onCerrarPanel}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" /> Ver Catálogo Público
        </button>
      </div>

      {/* Formulario Alta */}
      <form onSubmit={handleCrearPropiedad} className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <PlusCircle className="h-5 w-5 text-amber-600" /> Publicar Nueva Propiedad
        </h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-bold text-slate-700">Título de la propiedad *</label>
            <input
              type="text"
              required
              placeholder="Ej. Casa familiar en Arroyos del Paraíso"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Tipo de inmueble</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as Propiedad['tipo'])}
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900"
            >
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Terreno">Terreno</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Condición</label>
            <select
              value={condicion}
              disabled={tipo === 'Terreno'}
              onChange={(e) => setCondicion(e.target.value as Propiedad['condicion'])}
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900 disabled:bg-slate-100"
            >
              <option value="Nueva">Nueva</option>
              <option value="Usada">Usada</option>
              <option value="Remodelada">Remodelada</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Zona / Fraccionamiento *</label>
            <select
              value={zonaSeleccionada}
              onChange={(e) => setZonaSeleccionada(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900"
            >
              {zonasDisponibles.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
              <option value="__NUEVA__">+ Agregar nueva zona...</option>
            </select>
            {zonaSeleccionada === '__NUEVA__' && (
              <input
                type="text"
                required
                placeholder="Escribe el nombre de la zona"
                value={zonaNueva}
                onChange={(e) => setZonaNueva(e.target.value)}
                className="mt-2 w-full rounded-lg border border-amber-500 bg-amber-50/40 p-2 text-sm text-slate-900"
              />
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Operación</label>
            <select
              value={operacion}
              onChange={(e) => setOperacion(e.target.value as Propiedad['operacion'])}
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900"
            >
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Precio (MXN) *</label>
            <input
              type="number"
              required
              placeholder="Ej. 3500000"
              value={precioMXN}
              onChange={(e) => setPrecioMXN(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Metros de Terreno (m²)</label>
            <input
              type="number"
              placeholder="Ej. 240"
              value={terrenoM2}
              onChange={(e) => setTerrenoM2(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
            />
          </div>

          {tipo !== 'Terreno' && (
            <>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Metros de Construcción (m²)</label>
                <input
                  type="number"
                  placeholder="Ej. 210"
                  value={construccionM2}
                  onChange={(e) => setConstruccionM2(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Habitaciones / Recámaras</label>
                <input
                  type="number"
                  placeholder="Ej. 3"
                  value={recamaras}
                  onChange={(e) => setRecamaras(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Baños</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="Ej. 2.5"
                  value={banos}
                  onChange={(e) => setBanos(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
                />
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-bold text-slate-700">
              Galería de fotografías * ({imagenesPreview.length} / {MINIMO_FOTOS} mínimas)
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-amber-500/60 bg-amber-50/50 p-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-50">
              <ImagePlus className="h-5 w-5 text-amber-600" />
              <span>
                {imagenesPreview.length === 0
                  ? 'Seleccionar 4 o más fotos'
                  : `Agregar más fotos (${imagenesPreview.length} cargadas)`}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSubirFotos}
                className="hidden"
              />
            </label>
          </div>

          <div className="md:col-span-3">
            <label className="mb-1 block text-xs font-bold text-slate-700">Descripción y equipamiento</label>
            <input
              type="text"
              placeholder="Ej. Cocina con cubierta de cuarzo, cochera techada, cercana a consulado..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={imagenesPreview.length < MINIMO_FOTOS}
              className="w-full rounded-lg bg-slate-900 py-2.5 font-bold text-amber-400 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              {faltanFotos > 0 ? `Faltan ${faltanFotos} foto(s)` : 'Publicar Propiedad'}
            </button>
          </div>
        </div>

        {errorFotos && (
          <p className="mt-3 text-xs font-semibold text-red-600">{errorFotos}</p>
        )}

        {imagenesPreview.length > 0 && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold text-slate-600">
              {imagenesPreview.length >= MINIMO_FOTOS
                ? `✓ ${imagenesPreview.length} fotos listas. La primera es la portada (puedes cambiarla con la estrella).`
                : `Llevas ${imagenesPreview.length} foto(s). Sube ${faltanFotos} más para poder publicar.`}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {imagenesPreview.map((imgSrc, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-lg border border-slate-300 bg-white">
                  <img src={imgSrc} alt={`Foto ${idx + 1}`} className="h-24 w-full object-cover" />
                  {idx === 0 ? (
                    <span className="absolute left-1 top-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
                      Portada
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleHacerPortada(idx)}
                      title="Usar como foto principal"
                      className="absolute left-1 top-1 rounded bg-slate-900/75 p-1 text-white hover:bg-amber-500 hover:text-slate-950"
                    >
                      <Star className="h-3 w-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleEliminarFoto(idx)}
                    title="Quitar foto"
                    className="absolute right-1 top-1 rounded bg-red-600/90 p-1 text-white hover:bg-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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
                <th className="p-3">Galería</th>
                <th className="p-3">Propiedad</th>
                <th className="p-3">Tipo / Condición</th>
                <th className="p-3">Zona</th>
                <th className="p-3">Precio MXN</th>
                <th className="p-3">Estatus</th>
                <th className="p-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {propiedades.map((p) => {
                const totalFotos = p.imagenes?.length || 1;
                return (
                  <tr key={p.id}>
                    <td className="p-3">
                      <div className="relative inline-block">
                        <img src={p.imagen} alt={p.titulo} className="h-10 w-14 rounded object-cover" />
                        <span className="absolute -bottom-1 -right-1 rounded bg-slate-900 px-1 text-[10px] font-bold text-amber-400">
                          {totalFotos} fotos
                        </span>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-slate-900">{p.titulo}</td>
                    <td className="p-3 text-xs">
                      {p.tipo} {p.condicion !== 'N/A' ? `(${p.condicion})` : ''}
                    </td>
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
                    <td className="p-3">
                      <button
                        onClick={() => onEliminarPropiedad(p.id)}
                        title="Eliminar propiedad"
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
            Aún no hay prospectos. Abre cualquier propiedad del catálogo y llena el formulario para probar el flujo.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">WhatsApp / Correo</th>
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
                    <td className="p-3 text-xs">
                      <span className="block font-medium text-emerald-700">{l.telefono}</span>
                      <span className="text-slate-500">{l.correo}</span>
                    </td>
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