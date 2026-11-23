export interface Propiedad {
  id: string;
  titulo: string;
  tipo: 'Casa' | 'Departamento' | 'Terreno';
  condicion: 'Nueva' | 'Usada' | 'Remodelada' | 'N/A';
  zona: string;
  operacion: 'Venta' | 'Renta';
  precioMXN: number;
  estatus: 'Disponible' | 'Apartada' | 'Vendida';
  terrenoM2: number;
  construccionM2: number;
  recamaras: number;
  banos: number;
  imagen: string;
  imagenes?: string[];
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
    imagenes: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
    ],
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
    imagenes: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80',
    ],
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
    imagenes: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
    ],
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
    imagenes: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=900&q=80',
    ],
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
    imagenes: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
    ],
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
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
    ],
    descripcion: 'Terreno plano listo para escriturar en esquina de alto flujo vehicular, ideal para plaza comercial o desarrollo.'
  }
];