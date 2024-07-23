#include <stdio.h>
#include <stdlib.h>
#include "gestionUsuarios.h"
#include "gestionPlctu.h"
#include <stdbool.h>
#include <time.h>


int numLecturas = 0;
/* Cliente 1 */

CLIENT *clnt;
	bool_t  *result_1;
	datos_sesion  abrirsesion_1_arg;
	datos_usuario  *result_2;
	int  consultarusuario_1_arg;
	int opcion;
	int opcionInicio;
	int id;
	char clave[MAXDAT];
	char usuario[MAXDAT];

/*Datos TU*/

	char id_plctu[MAXDAT];
    char propietario[MAXCAD];
    char tipo_iden[MAXTP];
    char num_iden[MAXNUMID];
    char direccion[MAXCAD];
    int estrato;
    char fecha_registro[MAXCAD];
    int consumo;
     int num_leidos;
    int dia, mes, anio;

/* Cliente 2 */

CLIENT *clnt2;
bool_t  *result_3;
datos_plctu  registrar_plctu_2_arg;
datos_plctu  *result_4;
datos_plctu  resultadosConsulta;
int  consultar_plctu_2_arg;

void abrirSesion();
void menuOperador();
void menuUsuario();
void menuSesion();
void consultarPlc();


/* Cliente 1 */
void initClnt(char *host){
	clnt = clnt_create (host, gestion_usuarios, gestion_usuarios_version, "udp");
	if (clnt == NULL) {
		clnt_pcreateerror (host);
		exit (1);
	}
}

void abrirSesion() {
    abrirsesion_1_arg.id = id;
    strcpy(abrirsesion_1_arg.usuario, usuario);
    strcpy(abrirsesion_1_arg.clave, clave);

    // Llamada RPC para abrir sesión
    result_1 = abrirsesion_1(&abrirsesion_1_arg, clnt);

    // Manejar resultados de la llamada RPC
    if (result_1 != NULL && *result_1) {
        menuOperador();
    } else {
        // Manejar caso de error en la llamada RPC
        printf("Error al abrir sesión.\n");
		menuUsuario();
        // Puedes agregar más lógica de manejo de errores aquí, si es necesario.
    }
}



void clntDestroy()
{
	clnt_destroy (clnt);
	clnt_destroy(clnt2);
}




/* Cliente 2 */
void initClnt2(char *host){
	clnt2 = clnt_create (host, gestion_dispositivos, gestion_dispositivos_version, "udp");
	if (clnt2 == NULL) {
		clnt_pcreateerror (host);
		exit (1);
	}
}

void registrarPlc()
{
	strcpy(registrar_plctu_2_arg.id_plctu, id_plctu);
    strcpy(registrar_plctu_2_arg.propietario, propietario);
    strcpy(registrar_plctu_2_arg.tipo_iden, tipo_iden);
    strcpy(registrar_plctu_2_arg.num_iden, num_iden);
    strcpy(registrar_plctu_2_arg.direccion, direccion);
    registrar_plctu_2_arg.estrato = estrato;
    strcpy(registrar_plctu_2_arg.fecha_registro, fecha_registro);
    registrar_plctu_2_arg.consumo = consumo;

	result_3 = registrar_plctu_1(&registrar_plctu_2_arg, clnt2);
		if (result_3 == (bool_t *) NULL) {
			clnt_perror (clnt2, "call failed");
		}
    printf("Se registro exitosamente: \n");
    consultarPlc();
    printf("Id obtenido: %s \n", resultadosConsulta.id_plctu);

}

void consultarPlc() {
    datos_plctu *result_4;

    // Llama al método consultar_plctu_1 con consultar_plctu_2_arg y clnt2
    result_4 = consultar_plctu_1(&consultar_plctu_2_arg, clnt2);
    resultadosConsulta = *result_4;
    if (result_4 == (datos_plctu *)NULL) {
        clnt_perror(clnt2, "call failed");
    } else {
        // Imprime toda la información obtenida del dispositivo consultado
        printf("ID: %s\n", result_4->id_plctu);
        printf("Propietario: %s\n", result_4->propietario);
        printf("Tipo de identificacion: %s\n", result_4->tipo_iden);
        printf("Numero de identificacion: %s\n", result_4->num_iden);
        printf("Direccion: %s\n", result_4->direccion);
        printf("Estrato: %d\n", result_4->estrato);
        printf("Fecha de registro: %s\n", result_4->fecha_registro);
        printf("Consumo: %d\n", result_4->consumo);
    }
}


void consultarConsumos()
{
    // Incrementar el contador de lecturas
    numLecturas++;

    // Obtener la fecha actual
    time_t now;
    struct tm *local;
    char fechaActual[20]; // para almacenar la fecha formateada
    time(&now);
    local = localtime(&now);

    // Formatear la fecha como dd/mm/aaaa
    strftime(fechaActual, sizeof(fechaActual), "%d/%m/%Y", local);

    // Mostrar la fecha formateada
    printf("Fecha de consulta: %s\n", fechaActual);

    // Mostrar otros datos
    printf("Bienvenido: %s\n", resultadosConsulta.propietario);
    printf("=========================\n");
    printf("Dirección de residencia: %s\n", resultadosConsulta.direccion);
    printf("Consumo: %d (Kwh)\n", resultadosConsulta.consumo);
    printf("Número de lecturas llevadas a cabo hasta la fecha: %d\n", numLecturas);
}


/* Menu */



void menuOperador() {
    int opcionOperador = 0;
    do {
        printf("=== Menu Operador ===\n");
        printf("1. Registrar Dispositivo\n");
        printf("2. Consultar Dispositivo\n");
        printf("3. Salir\n");
        printf("=========================\n");
        printf("Seleccione una opcion: \n");

        if (scanf("%d", &opcionOperador) != 1) {
            // Manejar entrada no válida (por ejemplo, si se ingresa una letra en lugar de un número)
            printf("Entrada no válida. Intente de nuevo.\n");
            while (getchar() != '\n'); // Limpiar el búfer de entrada
            continue;
        }

        switch (opcionOperador) {
            case 1:
                getchar(); // Para consumir el '\n' pendiente en el búfer del teclado
                printf("Ingrese el nombre del Propietario: \n");
                fgets(propietario, sizeof(propietario), stdin);
                propietario[strcspn(propietario, "\n")] = '\0'; 
                printf("Ingrese el tipo de identificacion: \n");
                fgets(tipo_iden, sizeof(tipo_iden), stdin);
                tipo_iden[strcspn(tipo_iden, "\n")] = '\0'; 
                getchar(); 
                printf("Ingrese el numero de identificacion: \n");
                fgets(num_iden, sizeof(num_iden), stdin);
                num_iden[strcspn(num_iden, "\n")] = '\0'; 
                printf("Ingrese la direccion: \n");
                fgets(direccion, sizeof(direccion), stdin);
                direccion[strcspn(direccion, "\n")] = '\0'; 
               do {
                    printf("Ingrese el estrato (valores válidos: 1 a 5): \n");
                    scanf("%d", &estrato);

                    if (estrato < 1 || estrato > 5) {
                        printf("El estrato ingresado no es válido. Por favor, ingrese un valor dentro del rango especificado.\n");
                    }
                } while (estrato < 1 || estrato > 5);
                 do {
                    printf("Ingrese la fecha de registro en formato dd-mm-aaaa: \n");
                    num_leidos = scanf("%d-%d-%d", &dia, &mes, &anio);
                    if (num_leidos != 3) {
                        printf("Formato de fecha incorrecto. Por favor, ingrese la fecha en formato dd-mm-aaaa.\n");
                        while (getchar() != '\n'); // Limpiar el búfer de entrada
                    }
                } while (num_leidos != 3);
                sprintf(fecha_registro, "%02d-%02d-%04d", dia, mes, anio);
                printf("Ingrese el consumo: \n");
                scanf("%d", &consumo);
                registrarPlc();
                break;
            case 2:
                printf("Ingrese ID_TU: \n");
                scanf("%d", &consultar_plctu_2_arg); // Leer el ID
                consultarPlc();
                break;
            case 3:
                printf("Cerrando Sesion...\n");
                break;
            case 4:
                printf("Cerrando...\n");
                exit(0);
            default:
                printf("Opcion no valida. Intente de nuevo.\n");
                break;
        }

        // Limpiar el búfer de entrada después de cada entrada de usuario
        while (getchar() != '\n');

    } while (opcionOperador != 3);
}



void menuUsuario() {
	int opcionUsuario=0;
	    do {
		printf("=== Menu Usuario ===\n");
		printf("1. Consultar consumo\n");
		printf("2. Salir\n");
		printf("=========================\n");
		printf("Seleccione una opcion: \n");
		scanf("%d", &opcionUsuario);
		switch(opcionUsuario) {
            case 1:
                consultarConsumos();
				break;
			case 2:
				printf("Saliendo del programa...\n");
				exit(0);
            default:
                printf("Opcion no valida. Intente de nuevo.\n");
                break;
        }
		    while (getchar() != '\n');

    } while (opcionUsuario != 3);
}

void menuSesion() {
      do {
    int opcion;
    printf("=== Menu Abrir Sesion ===\n");
    printf("1. Abrir Sesion\n");
    printf("2. Menu Usuario\n");
    printf("2. Salir\n");
    printf("====================\n");
    printf("Seleccione una opcion: \n");
    scanf("%d", &opcion);

    switch (opcion) {
        case 1:
            // Lógica para abrir sesión
            printf("Ingrese ID: \n");
            scanf("%d", &id); 
            
            printf("Ingrese el Usuario: \n");
            scanf("%s", usuario); 
            
            printf("Ingrese la clave: \n");
            scanf("%s", clave); 

            abrirSesion();
            break;
        case 2:
            menuUsuario();
            break;    
        case 3:
            printf("Saliendo del programa...\n");
            exit(0);
        default:
            printf("Opcion no valida. Intente de nuevo.\n");
            break;
    }
       while (getchar() != '\n');

    } while (opcion != 3);
	
}






int main (int argc, char *argv[])
{
	char *host;

	if (argc < 2) {
		printf ("usage: %s server_host\n", argv[0]);
		exit (1);
	}
	host = argv[1];
	printf("Cargando host: %s",host);
	
	initClnt(host);
	initClnt2(host);
 	menuSesion();
	clntDestroy();
exit (0);
}