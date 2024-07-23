/*Declaración de datos a transferir entre el cliente y el servidor*/
/*Declaración de constantes*/
const MAXCAD = 20;
const MAXDAT = 12;
/*Declaración de la estructura que permite almacenar los datos para una sesion*/
struct datos_sesion{
int id;
char usuario[MAXDAT];
char clave[MAXDAT];
};
/*Declaración de la estructura que permite almacenar los datos de un usuario*/
struct datos_usuario{
int id;
char nombreCompleto[MAXDAT];
char usuario[MAXDAT];
char clave[MAXDAT];
};
/*Definición de las operaciones que se pueden realizar*/
program gestion_usuarios{
 version gestion_usuarios_version{
 bool abrirsesion(datos_sesion)=1;
 datos_usuario consultarusuario(int id)=2;
 }=1;
}=0x30000013;