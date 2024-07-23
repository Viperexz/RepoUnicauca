#include "gestionPlctu.h"
#include "gestionSaa.h"
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>

#define MAX_TU 5

datos_plctu list_tu[MAX_TU];
char *host = "localhost";
int varContador = 0;
CLIENT *clnt;
void *result_1;
void notificar();
void generar_id_plctu(int numero, char *id_plctu);



void registrarPlctuEnArchivo(struct datos_plctu *argp) {
    FILE *archivo;
    char nombreArchivo[MAXID + 5]; // +5 para espacio adicional y extensión .txt
    sprintf(nombreArchivo, "%s.txt", argp->id_plctu); // Nombre del archivo es el id_plctu con extensión .txt
   
    archivo = fopen(nombreArchivo, "w"); // Abre el archivo en modo "escritura" (write)

    if (archivo == NULL) {
        printf("Error al abrir el archivo.\n");
        return;
    }

    fprintf(archivo, "ID_TU: %s\n", argp->id_plctu);
    fprintf(archivo, "Propietario: %s\n", argp->propietario);
    fprintf(archivo, "Tipo de identificacion: %s\n", argp->tipo_iden);
    fprintf(archivo, "Numero de identificacion: %s\n", argp->num_iden);
    fprintf(archivo, "Direccion: %s\n", argp->direccion);
    fprintf(archivo, "Estrato: %d\n", argp->estrato);
    fprintf(archivo, "Fecha de registro: %s\n", argp->fecha_registro);
    fprintf(archivo, "Consumo: %d\n", argp->consumo);

    fclose(archivo);
    
     printf("%d fue registrado, en un archivo.", argp->id_plctu);
}



bool_t *registrar_plctu_1_svc(datos_plctu *argp, struct svc_req *rqstp) {
    static bool_t result;
    printf("Se está registrando... \n");


    //Inicializar la semilla de rand() con el tiempo actual
    srand(time(NULL));

    // Generar un número aleatorio entre 1 y 99
    int numero_aleatorio = rand() % 99 + 1;

    // Generar el ID
    char id_plctu[MAXCAD];
    generar_id_plctu(numero_aleatorio, id_plctu);

    // Agregar el ID generado a la estructura
    strcpy(argp->id_plctu, id_plctu);

    
    // Agrega mensajes para verificar los datos recibidos
    printf("ID_TU: %s\n", argp->id_plctu);
    printf("Propietario: %s\n", argp->propietario);
    printf("Tipo de identificacion: %s\n", argp->tipo_iden);
    printf("Numero de identificacion: %s\n", argp->num_iden);
    printf("Direccion: %s\n", argp->direccion);
    printf("Estrato: %d\n", argp->estrato);
    printf("Fecha de registro: %s\n", argp->fecha_registro);
    printf("Consumo: %d\n", argp->consumo);
    registrarPlctuEnArchivo(argp);

    if (argp->id_plctu[0] != '\0' && argp->propietario[0] != '\0' && argp->direccion[0] != '\0') {
        if (varContador < MAX_TU) {
            list_tu[varContador] = *argp;
            varContador++;
            result = true;
            printf("Se registró correctamente: %s\n", argp->id_plctu);

            // Agrega mensajes para verificar el estado de varContador
            printf("Número de dispositivos registrados: %d\n", varContador);

            if (varContador == MAX_TU) {
                notificar();
            }
        } else {
            result = false;
            printf("No se puede registrar más dispositivos... \n");
        }
    } else {
        result = false;
        printf("Datos de registro no válidos... \n");
    }

    // Agrega mensajes para verificar el valor de result
    printf("Resultado del registro: %s\n", result ? "true" : "false");

    return &result;
}


datos_plctu *consultar_plctu_1_svc(int *argp, struct svc_req *rqstp)
{
    static datos_plctu result;
    char strArgp[20];  // Ajusta el tamaño según tus necesidades

    // Convertir el entero a una cadena de caracteres
     sprintf(strArgp, "plctu%02d", *argp); 

    printf("Se está consultando el dispositivo con ID: %d \n", *argp);
      printf("Comparando con dispositivo ID: %s\n", strArgp);

    if ( varContador > 0)
    {
        for (int varCon = 0; varCon < varContador; varCon++)
        {
            printf("Comparando con dispositivo ID: %s\n", strArgp);
          

            if (strcmp(list_tu[varCon].id_plctu, strArgp) == 0)
            {
                printf("Dispositivo encontrado... \n");

               // Mostrar toda la información del dispositivo
                printf("ID: %s \n", list_tu[varCon].id_plctu);
                printf("Propietario: %s \n", list_tu[varCon].propietario);
                printf("Tipo de identificación: %s \n", list_tu[varCon].tipo_iden);
                printf("Número de identificación: %s \n", list_tu[varCon].num_iden);
                printf("Dirección: %s \n", list_tu[varCon].direccion);
                printf("Estrato: %d \n", list_tu[varCon].estrato);
                printf("Fecha de registro: %s \n", list_tu[varCon].fecha_registro);
                printf("Consumo: %d \n", list_tu[varCon].consumo);

                result = list_tu[varCon];
                return &result;
            }
        }
    }

    printf("Dispositivo no encontrado \n");
    return &result;
}



void initClnt()
{
    clnt = clnt_create(host, gestion_saa, gestion_saa_version, "udp");
    if (clnt == NULL)
    {
        clnt_pcreateerror(host);
        exit(1);
    }
}

void notificar()
{
    int notificarplcmms_1_arg = 01; // Define el valor que deseas enviar como argumento
    initClnt();
    result_1 = notificarplcmms_1(&notificarplcmms_1_arg, clnt);
    if (result_1 == (void *)NULL)
    {
        clnt_perror(clnt, "call failed");
    }
}

void generar_id_plctu(int numero, char *id_plctu) {
    sprintf(id_plctu, "plctu%02d", numero); 
}