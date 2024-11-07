type Rol = "Omic" | "Admin" | "Soporte"

interface Menu{
    title: string;
    path: string;
    rolesAllowed?: Rol[];
    subItems?: Menu[];
    headerTitle?: string;
    headerSubTitle?: string;
}

export const MenuData:Menu[] = [{
    title: "Mesa de entrada",
    path: "mesa-de-entrada",
    rolesAllowed: ["Admin"],
    headerTitle: "Te damos la bienvenida a tu Mesa de entrada",
    headerSubTitle: "Acá podras ver los reclamos sin asignar, asignados y filtrarlos por el sistema de semáforos."
},
,{
    title: "Reclamos HV",
    path: "reclamos-hv",
    rolesAllowed: ["Admin"],
    headerTitle: "Te damos la bienvenida a tu Mesa de reclamos Hiper Vulnerables",
    headerSubTitle:"Acá podras ver los reclamos y sus diferentes estados."
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
}
]