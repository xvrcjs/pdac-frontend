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
    path: "mesa_de_entrada",
    icon: "",
    rolesAllowed: ["Admin"],
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
}
]