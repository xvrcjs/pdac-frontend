type Rol = "Omic" | "Admin" | "Soporte"

interface Menu{
    title: string;
    path: string;
    icon: string;
    rolesAllowed?: Rol[];
    subItems?: Menu[];
    headerTitle?: string;
    headerSubTitle?: string;
}

export const MenuData:Menu[] = [{
    title: "Home",
    path: "home",
    icon: "",
    rolesAllowed: ["Admin"],
    headerTitle:"Te damos la bienvenida a tu tablero de gestión administrativa",
    headerSubTitle:"Sed tortor, sed velit ridiculus ipsum pharetra lacus odio gravida augue enim."
},
,{
    title: "Mi perfil",
    path: "perfil",
    icon: "",
    rolesAllowed: ["Admin"]
},{
    title: "Mesa de entrada",
    path: "mesa-de-entrada",
    icon: "",
    rolesAllowed: ["Admin"],
    headerTitle:"Te damos la bienvenida a tu Mesa de entrada",
    headerSubTitle:"Acá podras ver los reclamos sin asignar, asignados y filtrarlos por el sistema de semáforos."
},{
    title: "Archivados",
    path: "archivados",
    icon: "",
    rolesAllowed: ["Admin"],
    subItems: [
        {
            title: "Enviados",
            path: "archivados/enviados",
            icon: "",
            rolesAllowed: ["Admin"]
        }
    ],
    headerTitle:"Te damos la bienvenida a el archivo de reclamos cerrados",
    headerSubTitle:"Acá podras ver los reclamos cerrados, archivados y tambien podrás reabrirlos."
},{
    title: "Derivados",
    path: "derivados",
    icon: "",
    rolesAllowed: ["Admin"]
},
{
    title: "Configuración",
    path: "configuracion",
    icon: "",
    rolesAllowed: ["Admin"],
    subItems: [
        {
            title: "Sistema de Semáforo",
            path: "configuracion/sistema-de-semaforos",
            icon: "",
            rolesAllowed: ["Admin"]
        },
        {
            title: "Datos organismos",
            path: "configuracion/datos-organismos",
            icon: "",
            rolesAllowed: ["Admin"],
            headerTitle:"Configuración > Datos de organismos",
            headerSubTitle:"Acá podras ver las OMICs cargadas en el sistema y tambien podrás dar de alta una nueva."
        }
    ],
}
]