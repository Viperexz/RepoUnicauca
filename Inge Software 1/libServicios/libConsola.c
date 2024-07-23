#include "libConsola.h"

void Limpiarpantalla(){
	
system("cls");
	
}

void EsperarTecla()
{
	system("Pause");
}

void EscribirEnteroCon(int prmVariable1,char* prmEtiqueta2)
{
	printf(prmEtiqueta2,prmVariable1);
}
void EscribirFlotanteCon(float prmVariable1,char* prmEtiqueta2)
{
	printf(prmEtiqueta2,prmVariable1);
}

void EscribirCaracterCon(char* prmVariable1,char* prmEtiqueta2){
	printf(prmVariable1,prmEtiqueta2);
}	


void EscribirEntero(int prmVariable1,char* prmEtiqueta2){
	printf("*********************************************************************************\n");
	EscribirEnteroCon(prmVariable1,prmEtiqueta2);
	printf("*********************************************************************************\n");
}
	

void EscribirFlotante(float prmVariable1,char* prmEtiqueta2){
	printf("*********************************************************************************\n");
	EscribirFlotante(prmVariable1,prmEtiqueta2);
	printf("*********************************************************************************\n");
}

void EscribirCaracter(char* prmVariable1,char* prmEtiqueta2){
	printf("*********************************************************************************\n");
	printf("[%s]:%s \n",prmVariable1,prmEtiqueta2);
	printf("*********************************************************************************\n");
}
	

int LeerEntero(char* prmEtiqueta){
	int varResultado;
	printf("%s:-",prmEtiqueta);
	scanf("%i",&varResultado);
	return varResultado;	
}	

float LeerFlotante(char* prmEtiqueta){
	float varResultado;
	printf("%s:-",prmEtiqueta);
	scanf("%f",&varResultado);
	return varResultado;	
}	

char LeerCaracter(char* prmEtiqueta){
	char varResultado;
	printf("%s:-",prmEtiqueta);
	scanf("%s",&varResultado);
	return varResultado;	
}		
	
int LeerVariableEntero(char* prmEtiqueta){
	int varResultado;
	printf("***************************************\n");
	varResultado=LeerEntero(prmEtiqueta);
	return varResultado;	
}		

float LeerVariableFlotante(char* prmEtiqueta){
	float varResultado;
	printf("***************************************\n");
	varResultado=LeerFlotante(prmEtiqueta);
	return varResultado;	
}

char LeerVariableCaracter(char* prmEtiqueta){
	char varResultado;
	printf("***************************************\n");
	varResultado=LeerCaracter(prmEtiqueta);
	return varResultado;		
}		
