// AUTENTICACION-REGISTRO-RESTAURAR CONTRASEÑA
export const LOGOUT_ENDPOINT = "/v1/logout/";
export const SINGIN_ENDPOINT = "/v1/login/";
// export const SINGIN_GOOGLE_ENDPOINT = "auth/v1/login/google";
export const SINGUP_ENDPOINT = "/v1/register/";
export const FORGOT_PASSWORD_ENDPOINT = "/v1/forgot-password/";
export const CREATE_PASSWORD_ENDPOINT = "/v1/create-password/";

// INFORMACION DE USUARIO
export const GET_PROFILE_ENDPOINT = "/v1/profile";
export const GET_PERMISSIONS = "/v1/permissions";
export const CREATE_USER = "/v1/account";
export const GET_USERS = "/v1/account";
export const GET_USERS_SUPPORT = "/v1/supports";

// FORMULARIO DE RECLAMO
export const CLAIM = "/v1/claim";
export const CLAIM_IVE = "/v1/claim-ive";
export const CREATE_CLAIM = "/v1/create_claim";
export const CREATE_CLAIM_IVE = "/v1/create-claim-ive";
export const DOWNLOAD_CLAIM = "/v1/download_claim";
export const DOWNLOAD_ZIP = "/v1/zip_files_claim";
export const COMMENT = "/v1/comment";
export const COMMENT_IVE = "/v1/comment-ive";
export const ASSIGN_CLAIM = "/v1/assign_claim";
export const ASSIGN_CLAIM_IVE = "/v1/assign-claim-ive";
export const CANT_CLAIM_HV_IVE = "/v1/cant-claim-hv";
export const CLAIM_REJECTED = "/v1/claim-rejected";

export const VALIDATE_RECAPTCHA = "/v1/validate-recaptcha";

// CONFIGURACION DE SEMAFOROS
export const GET_TRAFIC_LIGHT_CONFIG = "/v1/traffic-light-system-config";

// CONFIGURACION DE DATOS ORGANISMOS
export const OMICS = "/v1/omic";


export const CREATE_STANDARDS_PROTOCOLS = "v1/standards-and-protocols"
export const GET_ZIP_STANDARDS_PROTOCOLS = "v1/standards-and-protocols/zip"

//TICKETS
export const TICKET = "v1/ticket"
export const ASSIGN_TICKET = "v1/ticket/assign"
export const COMMENT_TICKET = "v1/ticket/comment"
export const ADD_INFO_ADITIONAL_TICKET = "v1/ticket/aditional-info"