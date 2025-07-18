 

 
 import medicinaImg from "../assets/medicina.jpg";
import sistemas from "../assets/ingenieriasis.jpg";
import derecho from "../assets/derecho.jpg";
import Arquitectura from "../assets/Arquitectura.jpg";
import Psicologia from "../assets/Psicologia.png";
import Administracion from "../assets/Administracion.jpg";
import ContabilidadAuditoria from "../assets/Contabilidad_y_Auditoria.jpeg";
import EducacionInicial from "../assets/Educacion_Inicial.jpg";
import IngenieriaCivil from "../assets/Ingenieria_Civil.jpeg";
import Marketing from "../assets/Marketing.jpg";
import Biologia from "../assets/Biologia.jpg";
import Turismo from "../assets/Turismo.jpg";
import Odontologia from "../assets/Odontologia.jpeg";
import Enfermeria from "../assets/Enfermeria.jpg";
import IngenieriaIndustrial from "../assets/Ingenieria_Industrial.jpg";
import Comunicacion from "../assets/Comunicacion.jpeg";
import IngenieriaElectronica from "../assets/Ingenieria_Electronica.jpg";
import IngenieriaMecanica from "../assets/Ingenieria_Mecanica.jpg";
import IngenieriaQuimica from "../assets/Ingenieria_Quimica.jpg";
import IngenieriaAmbiental from "../assets/Ingenieria_Ambiental.jpg";
import IngenieriaPetroleos from "../assets/Ingenieria_Petroleos.jpeg";
import IngenieriaAgronomica from "../assets/Ingenieria_Agronomica.jpg";
import Veterinaria from "../assets/Veterinaria.jpg"; // temporal, no tienes veterinaria.jpg
import Fisioterapia from "../assets/Fisioterapia.jpg";
import IngenieriaTelecomunicaciones from "../assets/Ingenieria_Telecomunicaciones.jpg";
import IngenieriaEnergiasRenovables from "../assets/Ingenieria_en_Energias_Renovables.jpg";
import EstadisticaInformatica from "../assets/Estadistica_e_Informatica.jpeg";
import CienciasComputacion from "../assets/Ciencias_de_la_Computacion.jpeg";
import Filosofia from "../assets/Filosofia.jpeg";
import Gastronomia from "../assets/Gastronomia.jpeg";
import Antropologia from "../assets/Antropologia.jpg";
 
 
 export const carreras = [
    { nombre: "Ingeniería en Sistemas", duracion: "5 años", descripcion: "Desarrollo de software, sistemas y redes.", imagen: sistemas, universidades: ["UTPL","ESPOL","ESPE"], urlSenescyt: "" },
    { nombre: "Medicina", duracion: "6 años", descripcion: "Diagnóstico y tratamiento de enfermedades.", imagen: medicinaImg , universidades: ["PUCE","UCE","UTPL"], urlSenescyt: "https://www.caces.gob.ec/medicina/"  },
    { nombre: "Derecho", duracion: "5 años", descripcion: "Estudio del sistema jurídico y leyes.", imagen: derecho , universidades: ["UCE","PUCE","UTPL"] , urlSenescyt: "" },
    { nombre: "Arquitectura", duracion: "5 años", descripcion: "Diseño y planificación de espacios.", imagen: Arquitectura , universidades: ["UEES","ESPOL","FLACSO"] , urlSenescyt: "" },
    { nombre: "Psicología", duracion: "5 años", descripcion: "Estudio de la mente y comportamiento.", imagen: Psicologia, universidades: ["PUCE","UTPL","ESPE"] , urlSenescyt: "" },
    { nombre: "Administración de Empresas", duracion: "5 años", descripcion: "Gestión de organizaciones y negocios.", imagen: Administracion, universidades: ["UTPL","UCE","ESPOL"], urlSenescyt: ""  },
    { nombre: "Contabilidad y Auditoría", duracion: "5 años", descripcion: "Registro y análisis financiero.", imagen: ContabilidadAuditoria , universidades: ["PUCE","UTPL","ESPE"] , urlSenescyt: "" },
    { nombre: "Educación Inicial", duracion: "4 años", descripcion: "Formación de docentes para niños pequeños.", imagen: EducacionInicial , universidades: ["UCE","UP","UTPL"] , urlSenescyt: "" },
    { nombre: "Ingeniería Civil", duracion: "5 años", descripcion: "Diseño y construcción de infraestructuras.", imagen: IngenieriaCivil , universidades: ["ESPOL","ESPE","UTPL"] , urlSenescyt: "" },
    { nombre: "Marketing", duracion: "5 años", descripcion: "Promoción y comercialización de productos.", imagen: Marketing, universidades: ["UTPL","UAE","UTMACH"], urlSenescyt: ""  },
    { nombre: "Biología", duracion: "5 años", descripcion: "Estudio de organismos y ecosistemas.", imagen: Biologia , universidades: ["PUCE","UTPL","UESLE"], urlSenescyt: ""  },
    { nombre: "Turismo", duracion: "4 años", descripcion: "Gestión de empresas turísticas.", imagen: Turismo, universidades: ["UTPL","UCSG","ESPOL"], urlSenescyt: "" },
    { nombre: "Odontología", duracion: "6 años", descripcion: "Cuidado y tratamiento dental.", imagen: Odontologia, universidades: ["PUCE","UCE","UTPL"] , urlSenescyt: "" },
    { nombre: "Enfermería", duracion: "5 años", descripcion: "Atención de la salud y cuidado del paciente.", imagen: Enfermeria , universidades: ["PUCE","UTPL","ESPE"], urlSenescyt: ""  },
    { nombre: "Ingeniería Industrial", duracion: "5 años", descripcion: "Optimización de procesos industriales.", imagen: IngenieriaIndustrial , universidades: ["ESPOL","UTPL","ESPE"], urlSenescyt: ""  },
    { nombre: "Comunicación", duracion: "5 años", descripcion: "Medios, prensa, publicidad.", imagen: Comunicacion , universidades: ["PUCE","UTPL","UPS"], urlSenescyt: ""  },
    { nombre: "Ingeniería en Electrónica", duracion: "5 años", descripcion: "Diseño de circuitos y dispositivos.", imagen: IngenieriaElectronica , universidades: ["ESPOL","ESPE","UTPL"], urlSenescyt: ""  },
    { nombre: "Ingeniería Mecánica", duracion: "5 años", descripcion: "Máquinas y sistemas mecánicos.", imagen: IngenieriaMecanica , universidades: ["ESPOL","ESPE","UTPL"] , urlSenescyt: "" },
    { nombre: "Ingeniería Química", duracion: "5 años", descripcion: "Procesos químicos e industriales.", imagen: IngenieriaQuimica , universidades: ["ESPE","ESPOL","UTPL"] , urlSenescyt: "" },
    { nombre: "Ingeniería Ambiental", duracion: "5 años", descripcion: "Soluciones para el desarrollo sostenible.", imagen: IngenieriaAmbiental , universidades: ["ESPE","UTPL","ESPOL"] , urlSenescyt: "" },
    { nombre: "Ingeniería en Petróleos", duracion: "5 años", descripcion: "Extracción de hidrocarburos.", imagen: IngenieriaPetroleos , universidades: ["ESPE","ESPOL","UTPL"] , urlSenescyt: "" },
    { nombre: "Ingeniería Agronómica", duracion: "5 años", descripcion: "Agricultura y producción de alimentos.", imagen: IngenieriaAgronomica, universidades: ["UTPL","UTMACH","PUCE"], urlSenescyt: ""  },
    { nombre: "Veterinaria", duracion: "5 años", descripcion: "Salud y cuidado animal.", imagen: Veterinaria , universidades: ["UESLE","UTPL","PUCE"] , urlSenescyt: "" },
    { nombre: "Fisioterapia", duracion: "5 años", descripcion: "Recuperación física y rehabilitación.", imagen: Fisioterapia , universidades: ["UST","UTPL","PUCE"] , urlSenescyt: "" },
    { nombre: "Ingeniería en Telecomunicaciones", duracion: "5 años", descripcion: "Redes y transmisión de datos.", imagen: IngenieriaTelecomunicaciones, universidades: ["ESPOL","ESPE","UTPL"] , urlSenescyt: "" },
    { nombre: "Ingeniería en Energías Renovables", duracion: "5 años", descripcion: "Fuentes alternativas de energía.", imagen: IngenieriaEnergiasRenovables , universidades: ["UTPL","ESPE","ESPOL"] , urlSenescyt: "" },
    { nombre: "Gastronomía", duracion: "3 años", descripcion: "Cocina profesional y gestión culinaria.", imagen: Gastronomia , universidades: ["UTPL","ESPOL","UP"], urlSenescyt: ""  },
    { nombre: "Estadística e Informática", duracion: "5 años", descripcion: "Análisis de datos y probabilidades.", imagen: EstadisticaInformatica, universidades: ["UTPL","ESPOL","ESPE"] , urlSenescyt: "" },
    { nombre: "Ciencias de la Computación", duracion: "5 años", descripcion: "Programación avanzada y teoría.", imagen: CienciasComputacion , universidades: ["ESPOL","ESPE","UTPL"], urlSenescyt: ""  },
    { nombre: "Antropología", duracion: "5 años", descripcion: "Estudio de la cultura y sociedad.", imagen: Antropologia, universidades: ["PUCE","UTPL","UESLE"], urlSenescyt: ""  },
    { nombre: "Filosofía", duracion: "5 años", descripcion: "Pensamiento crítico y reflexión.", imagen: Filosofia, universidades: ["PUCE","UTPL","ESPE"] , urlSenescyt: "" },
  ];