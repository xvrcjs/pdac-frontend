type Rol = "Omic" | "Admin" | "Soporte"

interface Menu{
    title: string;
    path: string;
    rolesAllowed?: Rol[];
    subItems?: Menu[];
    headerTitle?: string;
    headerSubTitle?: string;
    show?: boolean;
}

export const MenuData:Menu[] = [{
    title: "Mesa de entrada",
    path: "mesa-de-entrada",
    rolesAllowed: ["Admin","Omic"],
    headerTitle: "Te damos la bienvenida a tu Mesa de entrada",
    headerSubTitle: "Acá podras ver los reclamos sin asignar, asignados y filtrarlos por el sistema de semáforos.",
    show: true,
},
,{
    title: "Reclamos HV",
    path: "reclamos-hv",
    rolesAllowed: ["Admin","Omic"],
    headerTitle: "Te damos la bienvenida a tu Mesa de reclamos Hiper Vulnerables",
    headerSubTitle:"Acá podras ver los reclamos y sus diferentes estados.",
    show: true,
},{
    title: "Gestión de usuarios",
    path: "gestion-de-usuarios",
    rolesAllowed: ["Admin"],
    subItems:[
        {
            title: "Crear nuevo usuario",
            path: "gestion-de-usuarios/crear-usuario",
            rolesAllowed: ["Admin"],
            headerTitle:"Datos del usuario",
            headerSubTitle:"Modifique los datos, seleccione el tipo de rol y accesos que tendrá este usuario."
        },
        {
            title: "Listado general de usuarios",
            path: "gestion-de-usuarios/listado-de-usuarios",
            rolesAllowed: ["Admin"],
            headerTitle:"Te damos la bienvenida a tu tablero de gestión administrativa",
            headerSubTitle:"A continuación podrás ver el listado general de usuarios."
        },
        {
            title: "Configuracion de roles",
            path: "gestion-de-usuarios/editar-usuario/:id",
            rolesAllowed: ["Admin"],
            headerTitle:"Datos del usuario",
            headerSubTitle:"Modifique los datos, seleccione el tipo de rol y accesos que tendrá este usuario."
        }
    ],
    show: true,
},{
    title: "Estandares y protocolos",
    path: "estandares-y-protocolos",
    rolesAllowed: ["Admin","Omic"],
    headerTitle: "Te damos la bienvenida a tu Biblioteca de estándares y protocolos",
    headerSubTitle:"Acá podrás consultar y descargar la información que necesites",
    show: false,
}
]