/*Declaración de datos a transferir entre el plc_tu y el plc_mms*/
/*Declaración de constantes*/
const MAXCAD = 20;
const MAXDAT = 12;
/*Declaración de la estructura que permite almacenar los datos de un 
plc_tu*/
struct datos_plctu{
char id_plctu[MAXDAT];
 char propietario[MAXCAD];
 char direccion[MAXCAD];
int consumo;
};
/*Definición de las operaciones que se pueden realizar*/
program gestion_dispositivos{
 version gestion_dispositivos_version{
 bool registrar_plctu(datos_plctu dplctu)=1;
 datos_plctu consultar_plctu(int id)=2;
 }=1;
}=0x30000015;
