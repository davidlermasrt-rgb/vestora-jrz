export interface Propiedad {
  id: string;
  titulo: string;
  tipo: 'Casa' | 'Departamento' | 'Terreno';
  condicion: 'Nueva' | 'Usada' | 'Remodelada' | 'N/A';
  zona: string; // <-- Antes estaba limitado a 5 zonas; ahora acepta cualquier zona nueva
  operacion: 'Venta' | 'Renta';
  precioMXN: number;
  estatus: 'Disponible' | 'Apartada' | 'Vendida';
  terrenoM2: number;
  construccionM2: number;
  recamaras: number;
  banos: number;
  imagen: string;
  descripcion: string;
}

export interface Lead {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  credito: string;
  propiedadInteres: string;
  estatus: 'Nuevo' | 'Contactado' | 'Visita Agendada' | 'Cerrado';
  fecha: string;
}

export const DATOS_ASESORA = {
  nombre: 'Landy Arce',
  telefonoWA: '526564190479',
  telefonoMostrar: '656 419 0479',
  correo: 'landyarce.vestorajrz@gmail.com',
  instagram: '@landyarcebienesraices',
};

export const PROPIEDADES_INICIALES: Propiedad[] = [
  {
    id: 'VJRZ-101',
    titulo: 'Residencia Contemporánea en Privada',
    tipo: 'Casa',
    condicion: 'Nueva',
    zona: 'Campos Elíseos',
    operacion: 'Venta',
    precioMXN: 5850000,
    estatus: 'Disponible',
    terrenoM2: 320,
    construccionM2: 295,
    recamaras: 4,
    banos: 3.5,
    imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Acabados de lujo, cocina equipada con cubierta de cuarzo, patio amplio con área de asador y seguridad 24/7 cerca de Consulado.'
  },
  {
    id: 'VJRZ-102',
    titulo: 'Casa Familiar frente a Parque',
    tipo: 'Casa',
    condicion: 'Usada',
    zona: 'Valle del Sol',
    operacion: 'Venta',
    precioMXN: 3450000,
    estatus: 'Disponible',
    terrenoM2: 240,
    construccionM2: 210,
    recamaras: 3,
    banos: 2.5,
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Excelente ubicación en corredor Valle del Sol. Cochera techada para 2 autos, estancia en planta alta y aislamiento térmico.'
  },
  {
    id: 'VJRZ-103',
    titulo: 'Departamento Ejecutivo Amueblado',
    tipo: 'Departamento',
    condicion: 'Nueva',
    zona: 'Las Misiones',
    operacion: 'Renta',
    precioMXN: 24500,
    estatus: 'Disponible',
    terrenoM2: 120,
    construccionM2: 120,
    recamaras: 2,
    banos: 2,
    imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Ideal para ejecutivos o cruce rápido a El Paso. Incluye mantenimiento, gimnasio, alberca y acceso controlado.'
  },
  {
    id: 'VJRZ-104',
    titulo: 'Residencia Minimalista de Estreno',
    tipo: 'Casa',
    condicion: 'Nueva',
    zona: 'Campos Elíseos',
    operacion: 'Venta',
    precioMXN: 6900000,
    estatus: 'Apartada',
    terrenoM2: 360,
    construccionM2: 330,
    recamaras: 4,
    banos: 4,
    imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Doble altura en sala, recámara principal en planta baja, sistema hidroneumático y preparación para paneles solares.'
  },
  {
    id: 'VJRZ-105',
    titulo: 'Casa Remodelada Zona Dorada',
    tipo: 'Casa',
    condicion: 'Remodelada',
    zona: 'Gómez Morín',
    operacion: 'Venta',
    precioMXN: 2890000,
    estatus: 'Disponible',
    terrenoM2: 210,
    construccionM2: 185,
    recamaras: 3,
    banos: 2,
    imagen: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Totalmente renovada a 3 minutos de Av. Gómez Morín. Acepta crédito Infonavit, Cofinavit y bancario.'
  },
  {
    id: 'VJRZ-106',
    titulo: 'Terreno Comercial / Residencial en Esquina',
    tipo: 'Terreno',
    condicion: 'N/A',
    zona: 'San Lorenzo',
    operacion: 'Venta',
    precioMXN: 4100000,
    estatus: 'Disponible',
    terrenoM2: 450,
    construccionM2: 0,
    recamaras: 0,
    banos: 0,
    imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Terreno plano listo para escriturar en esquina de alto flujo vehicular, ideal para plaza comercial o desarrollo.'
  }
];