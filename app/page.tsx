'use client';
import React, { useState, useEffect } from 'react';
import { Building2, Search, BedDouble, Bath, Maximize2, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { PROPIEDADES_INICIALES, Propiedad, Lead } from './data';
import ModalDetalle from './ModalDetalle';
import PanelAdmin from './PanelAdmin';

const TIPO_CAMBIO_USD = 20.2;

export default function VestoraHome() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>(PROPIEDADES_INICIALES);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [vistaAdmin, setVistaAdmin] = useState(false);

  const [filtroZona, setFiltroZona] = useState('Todas');
  const [filtroOperacion, setFiltroOperacion] = useState('Todas');
  const [precioMax, setPrecioMax] = useState<number>(10000000);
  const [propiedadActiva, setPropiedadActiva] = useState<Propiedad | null>(null);

  useEffect(() => {
    const propsGuardadas = localStorage.getItem('vestora_props');
    const leadsGuardados = localStorage.getItem('vestora_leads');
    if (propsGuardadas) setPropiedades(JSON.parse(propsGuardadas));
    if (leadsGuardados) setLeads(JSON.parse(leadsGuardados));
  }, []);

  const guardarPropiedades = (nuevas: Propiedad[]) => {
    setPropiedades(nuevas);
    localStorage.setItem('vestora_props', JSON.stringify(nuevas));
  };

  const guardarLeads = (nuevos: Lead[]) => {
    setLeads(nuevos);
    localStorage.setItem('vestora_leads', JSON.stringify(nuevos));
  };

  const propiedadesFiltradas = propiedades.filter((p) => {
    const cumpleZona = filtroZona === 'Todas' || p.zona === filtroZona;
    const cumpleOp = filtroOperacion === 'Todas' || p.operacion === filtroOperacion;
    const cumplePrecio = p.precioMXN <= precioMax;
    return cumpleZona && cumpleOp && cumplePrecio;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div
            onClick={() => setVistaAdmin(false)}
            className="flex cursor-pointer items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-lg font-extrabold tracking-tight">VESTORA JRZ</span>
              <span className="block text-[10px] uppercase tracking-widest text-amber-400">
                Inmobiliaria • Ciudad Juárez
              </span>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#catalogo" onClick={() => setVistaAdmin(false)} className="hover:text-amber-400">
              Propiedades
            </a>
            <a href="#nosotros" onClick={() => setVistaAdmin(false)} className="hover:text-amber-400">
              Asesoría Patrimonial
            </a>
            <a href="#contacto" onClick={() => setVistaAdmin(false)} className="hover:text-amber-400">
              Contacto
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
          onAgregarPropiedad={(nueva) => guardarPropiedades([nueva, ...propiedades])}
          onActualizarEstatusLead={(id, estatus) =>
            guardarLeads(leads.map((l) => (l.id === id ? { ...l, estatus } : l)))
          }
          onCerrarPanel={() => setVistaAdmin(false)}
        />
      ) : (
        <>
          {/* Hero Section */}
          <section className="bg-slate-900 px-4 py-16 text-white md:py-24">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-block rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold text-amber-300">
                Asesoría Certificada por Landy Arce • Ciudad Juárez, Chih.
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Encuentra el lugar donde comienza tu próxima historia

              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                Propiedades verificadas en las zonas de mayor plusvalía de Ciudad Juárez. Calcula tu mensualidad y agenda visita en un clic.
              </p>

              {/* Buscador */}
              <div className="mt-8 grid gap-3 rounded-2xl bg-white p-4 text-left text-slate-900 shadow-2xl md:grid-cols-4">
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

                <div>
                  <label className="text-xs font-bold text-slate-500">Presupuesto Máximo</label>
                  <select
                    value={precioMax}
                    onChange={(e) => setPrecioMax(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium"
                  >
                    <option value={10000000}>Sin límite</option>
                    <option value={3500000}>Hasta $3,500,000 MXN</option>
                    <option value={5000000}>Hasta $5,000,000 MXN</option>
                    <option value={7000000}>Hasta $7,000,000 MXN</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <a
                    href="#catalogo"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 text-sm font-bold text-amber-400 hover:bg-slate-800"
                  >
                    <Search className="h-4 w-4" />
                    <span>Ver {propiedadesFiltradas.length} opciones</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Catálogo */}
          <section id="catalogo" className="mx-auto max-w-7xl px-4 py-14">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Catálogo Destacado</h2>
                <p className="text-sm text-slate-500">Selecciona una propiedad para simular tu crédito hipotecario o Infonavit</p>
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
                    <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white">
                      {prop.operacion}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-700">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{prop.zona}, Cd. Juárez</span>
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
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4 text-slate-400" /> {prop.recamaras} Rec.
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-slate-400" /> {prop.banos} Baños
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="h-4 w-4 text-slate-400" /> {prop.construccionM2} m²
                      </span>
                    </div>

                    <button
                      onClick={() => setPropiedadActiva(prop)}
                      className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Ver detalles y calcular crédito
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
                <p className="font-bold text-white">@landyarcebienesraices
                </p>
                <p className="text-xs">@landyarcebienesraices</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <Phone className="h-4 w-4" />
                <span>Atención directa vía WhatsApp • 656 419 0479</span>
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