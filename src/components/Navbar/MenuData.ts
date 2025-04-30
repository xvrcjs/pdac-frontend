type Rol = "Omic" | "Admin" | "Support"

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
            headerSubTitle:"Modifique los datos, seleccione el tipo de rol y accesos que tendrá este usuario.",
            show: true
        },
        {
            title: "Crear nuevo usuario",
            path: "gestion-de-usuarios/editar-usuario/:id",
            rolesAllowed: ["Admin"],
            headerTitle:"Datos del usuario",
            headerSubTitle:"Modifique los datos, seleccione el tipo de rol y accesos que tendrá este usuario.",
            show: false
        },
        {
            title: "Listado general de usuarios",
            path: "gestion-de-usuarios/listado-de-usuarios",
            rolesAllowed: ["Admin"],
            headerTitle:"Te damos la bienvenida a tu tablero de gestión administrativa",
            headerSubTitle:"A continuación podrás ver el listado general de usuarios.",
            show: true
        },
    ],
    show: true,
},
{
    title: "Estandares y protocolos",
    path: "estandares-y-protocolos",
    rolesAllowed: ["Admin","Omic"],
    headerTitle: "Te damos la bienvenida a tu Biblioteca de estándares y protocolos",
    headerSubTitle:"Acá podrás consultar y descargar la información que necesites",
    show: false,
},
{
    title: "Reclamo",
    path: "mesa-de-entrada/reclamo/:id",
    rolesAllowed: ["Admin","Omic"],
    headerTitle: "Te damos la bienvenida a la gestión de este reclamo",
    headerSubTitle:"Acá podras ver la información detallada y gestionar sus avances",
    show: false,
},
{
    title: "Reclamo IVE",
    path: "reclamos-hv/reclamo-ive/:id",
    rolesAllowed: ["Admin","Omic"],
    headerTitle: "Te damos la bienvenida a tu Mesa de entrada",
    headerSubTitle:"Acá podras ver los reclamos sin asignar, asignados y filtrarlos por el sistema de semáforos.",
    show: false,
},
{
    title: "Buzón general de Tickets",
    path: "tickets",
    rolesAllowed: ["Admin","Support"],
    headerTitle: "Te damos la bienvenida a tu Buzón de Tickets de soporte ",
    headerSubTitle:"Acá podrás gestionarlos y darle el seguimiento que cada ticket necesita, dependiendo los niveles técnicos N1 - N2 - N3",
    show: true,
},
{
    title: "Buzón general de Tickets",
    path: "tickets/:id",
    rolesAllowed: ["Admin","Support"],
    headerTitle: "Te damos la bienvenida a tu Buzón de Tickets de soporte ",
    headerSubTitle:"Acá podrás gestionarlos y darle el seguimiento que cada ticket necesita, dependiendo los niveles técnicos N1 - N2 - N3",
    show: false,
}
]