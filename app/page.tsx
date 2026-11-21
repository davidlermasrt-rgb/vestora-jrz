'use client';
import React, { useState, useEffect } from 'react';
import { Building2, Search, BedDouble, Bath, Maximize2, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { PROPIEDADES_INICIALES, Propiedad, Lead, DATOS_ASESORA } from './data';
import ModalDetalle from './ModalDetalle';
import PanelAdmin from './PanelAdmin';

const TIPO_CAMBIO_USD = 20.2;

export default function VestoraHome() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>(PROPIEDADES_INICIALES);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [vistaAdmin, setVistaAdmin] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroCondicion, setFiltroCondicion] = useState('Todas');
  const [filtroZona, setFiltroZona] = useState('Todas');
  const [filtroOperacion, setFiltroOperacion] = useState('Todas');
  const [propiedadActiva, setPropiedadActiva] = useState<Propiedad | null>(null);

  useEffect(() => {
    const propsGuardadas = localStorage.getItem('vestora_props_v2');
    const leadsGuardados = localStorage.getItem('vestora_leads_v2');
    if (propsGuardadas) setPropiedades(JSON.parse(propsGuardadas));
    if (leadsGuardados) setLeads(JSON.parse(leadsGuardados));
  }, []);

  const guardarPropiedades = (nuevas: Propiedad[]) => {
    setPropiedades(nuevas);
    localStorage.setItem('vestora_props_v2', JSON.stringify(nuevas));
  };

  const guardarLeads = (nuevos: Lead[]) => {
    setLeads(nuevos);
    localStorage.setItem('vestora_leads_v2', JSON.stringify(nuevos));
  };

  const propiedadesFiltradas = propiedades.filter((p) => {
    const cumpleTipo = filtroTipo === 'Todos' || p.tipo === filtroTipo;
    const cumpleCondicion = filtroCondicion === 'Todas' || p.condicion === filtroCondicion;
    const cumpleZona = filtroZona === 'Todas' || p.zona === filtroZona;
    const cumpleOp = filtroOperacion === 'Todas' || p.operacion === filtroOperacion;
    return cumpleTipo && cumpleCondicion && cumpleZona && cumpleOp;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar con Logo */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
          <div
            onClick={() => setVistaAdmin(false)}
            className="flex cursor-pointer items-center gap-3"
          >
            {!logoError ? (
              <img
                src="/logo-vestora.png"
                alt="Logo Vestora JRZ"
                onError={() => setLogoError(true)}
                className="h-11 w-11 rounded-lg object-contain bg-slate-900 p-0.5 border border-amber-500/40"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-lg shadow">
                VJ
              </div>
            )}
            <div>
              <span className="block text-lg font-extrabold tracking-tight">VESTORA JRZ</span>
              <span className="block text-[10px] uppercase tracking-widest text-amber-400">
                Inmobiliaria • {DATOS_ASESORA.nombre}
              </span>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#catalogo" onClick={() => setVistaAdmin(false)} className="hover:text-amber-400">
              Propiedades
            </a>
            <a href="#contacto" onClick={() => setVistaAdmin(false)} className="hover:text-amber-400">
              Contacto Directo
            </a>
          </nav>

          <button
            onClick={() => setVistaAdmin(!vistaAdmin)}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-amber-400 hover:bg-slate-800"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{vistaAdmin ? 'Ver Sitio Público' : 'Acceso Asesora'}</span>
          </button>
        </div>
      </header>

      {vistaAdmin ? (
        <PanelAdmin
          propiedades={propiedades}
          leads={leads}
          onActualizarEstatusProp={(id, estatus) =>
            guardarPropiedades(propiedades.map((p) => (p.id === id ? { ...p, estatus } : p)))
          }
          onEliminarPropiedad={(id) => guardarPropiedades(propiedades.filter((p) => p.id !== id))}
          onAgregarPropiedad={(nueva) => guardarPropiedades([nueva, ...propiedades])}
          onActualizarEstatusLead={(id, estatus) =>
            guardarLeads(leads.map((l) => (l.id === id ? { ...l, estatus } : l)))
          }
          onCerrarPanel={() => setVistaAdmin(false)}
        />
      ) : (
        <>
          {/* Hero Section */}
          <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-block rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold text-amber-300">
                Asesoría Certificada por {DATOS_ASESORA.nombre} • Ciudad Juárez, Chih.
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Encuentra el lugar donde comienza tu próxima historia
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Casas nuevas, usadas, remodeladas, departamentos y terrenos en las mejores zonas de Ciudad Juárez.
              </p>

              {/* Buscador Avanzado */}
              <div className="mt-8 grid gap-3 rounded-2xl bg-white p-4 text-left text-slate-900 shadow-2xl sm:grid-cols-2 md:grid-cols-5">
                <div>
                  <label className="text-xs font-bold text-slate-500">Tipo de Inmueble</label>
                  <select
                    value={filtroTipo}
                    onChange={(e) => {
                      setFiltroTipo(e.target.value);
                      if (e.target.value === 'Terreno') setFiltroCondicion('Todas');
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium"
                  >
                    <option value="Todos">Todos (Casas, Deptos, Terrenos)</option>
                    <option value="Casa">Casas</option>
                    <option value="Departamento">Departamentos</option>
                    <option value="Terreno">Terrenos</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500">Condición</label>
                  <select
                    value={filtroCondicion}
                    disabled={filtroTipo === 'Terreno'}
                    onChange={(e) => setFiltroCondicion(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium disabled:opacity-50"
                  >
                    <option value="Todas">Todas (Nueva / Usada / Remod.)</option>
                    <option value="Nueva">Nueva</option>
                    <option value="Usada">Usada</option>
                    <option value="Remodelada">Remodelada</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500">Zona en Juárez</label>
                  <select
                    value={filtroZona}
                    onChange={(e) => setFiltroZona(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium"
                  >
                    <option value="Todas">Todas las zonas</option>
                    <option value="Campos Elíseos">Campos Elíseos</option>
                    <option value="Las Misiones">Las Misiones</option>
                    <option value="Valle del Sol">Valle del Sol</option>
                    <option value="Gómez Morín">Gómez Morín</option>
                    <option value="San Lorenzo">San Lorenzo</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500">Operación</label>
                  <select
                    value={filtroOperacion}
                    onChange={(e) => setFiltroOperacion(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium"
                  >
                    <option value="Todas">Venta y Renta</option>
                    <option value="Venta">En Venta</option>
                    <option value="Renta">En Renta</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <a
                    href="#catalogo"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-bold text-amber-400 hover:bg-slate-800"
                  >
                    <Search className="h-4 w-4" />
                    <span>Ver ({propiedadesFiltradas.length})</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Catálogo con pestañas rápidas */}
          <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Catálogo de Propiedades</h2>
                <p className="text-sm text-slate-500">Filtra por categoría o selecciona una opción para calcular crédito</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Todos', 'Casa', 'Departamento', 'Terreno'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFiltroTipo(cat);
                      if (cat === 'Terreno') setFiltroCondicion('Todas');
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                      filtroTipo === cat
                        ? 'bg-slate-900 text-amber-400'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'Todos' ? 'Todas' : `${cat}s`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {propiedadesFiltradas.map((prop) => (
                <article
                  key={prop.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    <img src={prop.imagen} alt={prop.titulo} className="h-52 w-full object-cover" />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                        prop.estatus === 'Disponible'
                          ? 'bg-emerald-600 text-white'
                          : prop.estatus === 'Apartada'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {prop.estatus}
                    </span>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      <span className="rounded-md bg-slate-950/85 px-2.5 py-1 text-xs font-semibold text-amber-400">
                        {prop.tipo}
                      </span>
                      {prop.condicion !== 'N/A' && (
                        <span className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900">
                          {prop.condicion}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {prop.zona}, Cd. Juárez
                      </span>
                      <span className="text-slate-500">{prop.operacion}</span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">{prop.titulo}</h3>

                    <div className="mt-2">
                      <span className="text-xl font-extrabold text-slate-900">
                        ${prop.precioMXN.toLocaleString('es-MX')} MXN
                      </span>
                      <span className="ml-2 text-xs text-slate-500">
                        (~${Math.round(prop.precioMXN / TIPO_CAMBIO_USD).toLocaleString('en-US')} USD)
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
                      {prop.tipo === 'Terreno' ? (
                        <span className="flex items-center gap-1 font-medium">
                          <Maximize2 className="h-4 w-4 text-slate-400" /> Superficie: {prop.terrenoM2} m²
                        </span>
                      ) : (
                        <>
                          <span className="flex items-center gap-1">
                            <BedDouble className="h-4 w-4 text-slate-400" /> {prop.recamaras} Rec.
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-4 w-4 text-slate-400" /> {prop.banos} Baños
                          </span>
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-4 w-4 text-slate-400" /> {prop.construccionM2} m²
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => setPropiedadActiva(prop)}
                      className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Ver detalles y contactar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer id="contacto" className="border-t border-slate-800 bg-slate-950 py-10 text-slate-400">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-bold text-white">Vestora JRZ Inmobiliaria</p>
                <p className="text-xs">
                  {DATOS_ASESORA.nombre} • Instagram: {DATOS_ASESORA.instagram}
                </p>
              </div>
              <div className="flex flex-col gap-1 text-xs text-amber-400 sm:items-end">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {DATOS_ASESORA.telefonoMostrar}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {DATOS_ASESORA.correo}
                </span>
              </div>
            </div>
          </footer>
        </>
      )}

      <ModalDetalle
        propiedad={propiedadActiva}
        onCerrar={() => setPropiedadActiva(null)}
        onGuardarLead={(nuevoLead) => guardarLeads([nuevoLead, ...leads])}
      />
    </div>
  );
}