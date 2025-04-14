type Rol = "Omic" | "Admin" | "Soporte"

interface Menu{
    title: string;
    path: string;
    rolesAllowed?: Rol[];
    subItems?: Menu[];
    headerTitle?: string;
    headerSubTitle?: string;
}

export const MenuDataNav:Menu[] = [{
    title: "Inicio",
    path: "inicio",
    rolesAllowed: ["Admin","Omic"],
    headerTitle:"Te damos la bienvenida a tu tablero de gestión administrativa",
    headerSubTitle:"Acá tendrás el control y  acceso a todo."
},
,{
    title: "Mi perfil",
    path: "perfil",
    rolesAllowed: ["Admin","Omic"],
    headerTitle:"Toda la información que necesitas, está al alcance de tu mano.",
    headerSubTitle:"Navegá entre las secciones de trabajo de manera intuitiva."
},{
    title: "Mesa de entrada",
    path: "mesa-de-entrada",
    rolesAllowed: ["Admin","Omic"],
    headerTitle:"Te damos la bienvenida a tu Mesa de entrada",
    headerSubTitle:"Acá podras ver los reclamos sin asignar, asignados y filtrarlos por el sistema de semáforos."
},{
    title: "Archivados",
    path: "archivados",
    rolesAllowed: ["Admin","Omic"],
    headerTitle:"Te damos la bienvenida a el archivo de reclamos cerrados",
    headerSubTitle:"Acá podras ver los reclamos cerrados, archivados y tambien podrás reabrirlos."
},{
    title: "Derivados",
    path: "derivados",
    rolesAllowed: ["Admin","Omic"]
},
{
    title: "Configuración",
    path: "configuracion",
    rolesAllowed: ["Admin"],
    subItems: [
        {
            title: "Sistema de Semáforo",
            path: "configuracion/sistema-de-semaforos",
            rolesAllowed: ["Admin"],
            headerTitle: "Te damos la bienvenida a el Panel de Configuración",
            headerSubTitle:"Acá podrás ver los controladores de tiempo del sistema de semáforo y modificar su configuración"
            
        },
        {
            title: "Datos organismos",
            path: "configuracion/datos-organismos",
            rolesAllowed: ["Admin"],
            headerTitle:"Configuración > Datos de organismos",
            headerSubTitle:"Acá podras ver las OMICs cargadas en el sistema y tambien podrás dar de alta una nueva."
        }
    ],
}
]