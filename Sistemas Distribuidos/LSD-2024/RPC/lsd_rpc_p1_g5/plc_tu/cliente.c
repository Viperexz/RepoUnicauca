#include <stdio.h>
#include <stdlib.h>
#include "gestionUsuarios.h"
#include <stdbool.h>

void menuOperador() {
	int opcionOperador;
		printf("=== Menu Operador ===\n");
		printf("1. Registrar Dispositivo\n");
		printf("2. Consultar Dispotivio\n");
		printf("3. Salir\n");
		printf("=========================\n");
		printf("Seleccione una opcion: \n");
		scanf("%d", &opcionOperador);
		switch(opcionOperador) {
            case 1:
                // Lógica para abrir sesión
                printf("Registrando...\n");
                break;
            case 2:
                printf("Consultando...\n");
				break;
			case 3:
				printf("Saliendo del programa...\n");
				exit(0);
            default:
                printf("Opcion no valida. Intente de nuevo.\n");
                break;
        }
}


void menuUsuario() {
	int opcionUsuario;
		printf("=== Menu Usuario ===\n");
		printf("1. Consultar Dispotivio\n");
		printf("2. Salir\n");
		printf("=========================\n");
		printf("Seleccione una opcion: \n");
		scanf("%d", &opcionUsuario);
		switch(opcionUsuario) {
            case 1:
                printf("Consultando...\n");
				break;
			case 2:
				printf("Saliendo del programa...\n");
				exit(0);
            default:
                printf("Opcion no valida. Intente de nuevo.\n");
                break;
        }
}




void
gestion_usuarios_1(char *host)
{
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

#ifndef	DEBUG
	clnt = clnt_create (host, gestion_usuarios, gestion_usuarios_version, "udp");
	if (clnt == NULL) {
		clnt_pcreateerror (host);
		exit (1);
	}
#endif	/* DEBUG */

	printf("=== Menu Abrir Sesion ===\n");
	printf("1. Abrir Sesion\n");
    printf("2. Salir\n");
    printf("====================\n");
    printf("Seleccione una opcion: \n");
    scanf("%d", &opcion);
        
        switch(opcion) {
            case 1:
                // Lógica para abrir sesión
                printf("Ingrese ID: \n");
                scanf("%d", &id); // Leer el ID
                
                printf("Ingrese el Usuario: \n");
                scanf("%s", usuario); // Leer el usuario
                
                printf("Ingrese la clave: \n");
                scanf("%s", clave); // Leer la clave

				abrirsesion_1_arg.id=id;
				strcpy(abrirsesion_1_arg.usuario, usuario);
				strcpy(abrirsesion_1_arg.clave, clave);
				result_1 = abrirsesion_1(&abrirsesion_1_arg, clnt);
				if(result_1){
					menuOperador();
				}
				else
				{
					menuUsuario();
				}break;
            case 2:
                printf("Saliendo del programa...\n");
                exit(0);
            default:
                printf("Opcion no valida. Intente de nuevo.\n");
                break;
        }

	
	/*if (result_1 == (bool_t *) NULL) {
		clnt_perror (clnt, "call failed");
	}*/
	

	result_2 = consultarusuario_1(&consultarusuario_1_arg, clnt);
	if (result_2 == (datos_usuario *) NULL) {
		clnt_perror (clnt, "call failed");
	}
#ifndef	DEBUG
	clnt_destroy (clnt);
#endif	 /* DEBUG */
}

int main (int argc, char *argv[])
{
	char *host;

	if (argc < 2) {
		printf ("usage: %s server_host\n", argv[0]);
		exit (1);
	}
	host = argv[1];
	gestion_usuarios_1 (host);

exit (0);
}