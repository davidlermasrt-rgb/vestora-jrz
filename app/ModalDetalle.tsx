'use client';
import React, { useState } from 'react';
import { X, Calculator, Send, CheckCircle2, Mail } from 'lucide-react';
import { Propiedad, Lead, DATOS_ASESORA } from './data';

interface Props {
  propiedad: Propiedad | null;
  onCerrar: () => void;
  onGuardarLead: (lead: Lead) => void;
}

export default function ModalDetalle({ propiedad, onCerrar, onGuardarLead }: Props) {
  const [enganchePct, setEnganchePct] = useState(20);
  const [plazoAnios, setPlazoAnios] = useState(15);
  const [tasaAnual, setTasaAnual] = useState(10.5);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [credito, setCredito] = useState('Crédito Bancario');
  const [enviado, setEnviado] = useState(false);

  if (!propiedad) return null;

  const montoFinanciar = propiedad.precioMXN * (1 - enganchePct / 100);
  const tasaMensual = tasaAnual / 100 / 12;
  const numPagos = plazoAnios * 12;
  const mensualidad =
    propiedad.operacion === 'Venta'
      ? (montoFinanciar * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos))
      : propiedad.precioMXN;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono || !correo) return;

    const nuevoLead: Lead = {
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      nombre,
      telefono,
      correo,
      credito: propiedad.operacion === 'Renta' ? 'Arrendamiento' : credito,
      propiedadInteres: `${propiedad.id} - ${propiedad.titulo}`,
      estatus: 'Nuevo',
      fecha: new Date().toLocaleDateString('es-MX'),
    };

    onGuardarLead(nuevoLead);
    setEnviado(true);

    const textoWA = encodeURIComponent(
      `Hola ${DATOS_ASESORA.nombre}, soy ${nombre} (${correo}). Me interesa el ${propiedad.tipo} "${propiedad.titulo}" (${propiedad.id}) en ${propiedad.zona}. Busco información con ${nuevoLead.credito}.`
    );
    window.open(`https://wa.me/${DATOS_ASESORA.telefonoWA}?text=${textoWA}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onCerrar}
          className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/80 p-2 text-white hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <img src={propiedad.imagen} alt={propiedad.titulo} className="h-64 w-full object-cover" />

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                {propiedad.zona} • {propiedad.operacion}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {propiedad.tipo} {propiedad.condicion !== 'N/A' ? `• ${propiedad.condicion}` : ''}
              </span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              ${propiedad.precioMXN.toLocaleString('es-MX')} MXN
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">{propiedad.titulo}</h2>
          <p className="mt-2 text-sm text-slate-600">{propiedad.descripcion}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Calculadora */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Calculator className="h-5 w-5 text-amber-600" />
                <span>Simulador de Mensualidad</span>
              </div>

              {propiedad.operacion === 'Venta' ? (
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Enganche ({enganchePct}%)</span>
                      <span>${((propiedad.precioMXN * enganchePct) / 100).toLocaleString('es-MX')}</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={enganchePct}
                      onChange={(e) => setEnganchePct(Number(e.target.value))}
                      className="mt-1 w-full accent-amber-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-600">Plazo (años)</label>
                      <select
                        value={plazoAnios}
                        onChange={(e) => setPlazoAnios(Number(e.target.value))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
                      >
                        <option value={10}>10 años</option>
                        <option value={15}>15 años</option>
                        <option value={20}>20 años</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600">Tasa anual (%)</label>
                      <input
                        type="number"
                        step={0.5}
                        value={tasaAnual}
                        onChange={(e) => setTasaAnual(Number(e.target.value))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-900 p-3 text-center text-white">
                    <p className="text-xs text-slate-300">Mensualidad estimada</p>
                    <p className="text-xl font-bold text-amber-400">
                      ${Math.round(mensualidad).toLocaleString('es-MX')} MXN / mes
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-600">
                  Propiedad en esquema de arrendamiento mensual. Solicita requisitos de aval o póliza jurídica.
                </p>
              )}
            </div>

            {/* Formulario de Lead */}
            <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900">Contactar a {DATOS_ASESORA.nombre}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <Mail className="h-3.5 w-3.5 text-amber-600" /> {DATOS_ASESORA.correo}
              </p>

              <div className="mt-3 space-y-2.5 text-sm">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp (ej. 656 123 4567)"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900"
                />
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900"
                />
                {propiedad.operacion === 'Venta' && (
                  <select
                    value={credito}
                    onChange={(e) => setCredito(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-slate-900"
                  >
                    <option>Crédito Bancario</option>
                    <option>Infonavit / Cofinavit</option>
                    <option>Fovissste</option>
                    <option>Recurso Propio (Contado)</option>
                  </select>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar y abrir WhatsApp</span>
                </button>

                {enviado && (
                  <p className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> ¡Datos enviados a {DATOS_ASESORA.nombre}!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}