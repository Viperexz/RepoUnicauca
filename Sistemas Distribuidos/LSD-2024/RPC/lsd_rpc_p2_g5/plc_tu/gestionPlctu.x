/*Declaración de datos a transferir entre el plc_tu y el plc_mms*/
/*Declaración de constantes*/
const MAXID = 8;
const MAXCAD = 64;
const MAXTP = 3;
const MAXNUMID = 15;


/*Declaración de la estructura que permite almacenar los datos de un 
plc_tu*/
struct datos_plctu{
    char id_plctu[MAXID];
    char propietario[MAXCAD];
    char tipo_iden[MAXTP];
    char num_iden[MAXNUMID];
    char direccion[MAXCAD];
    int estrato;
    char fecha_registro[MAXCAD];
    int consumo;
};
/*Definición de las operaciones que se pueden realizar*/
program gestion_dispositivos{
 version gestion_dispositivos_version{
 bool registrar_plctu(datos_plctu dplctu)=1;
 datos_plctu consultar_plctu(int id)=2;
 }=1;
}=0x30000015;
