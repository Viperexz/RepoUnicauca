#include "libMate.h"

void Suma()
{
	EscribirEntero(LeerVariableEntero("Ingrese el valor de la primera Operador\n") + LeerVariableEntero("Ingrese el valor de la primera Operador\n"),"Es el resultado \n");	
}	
void Resta()
{
	EscribirEntero(LeerVariableEntero("Ingrese el valor de la primera Operador\n") - LeerVariableEntero("Ingrese el valor de la primera Operador\n"),"Es el resultado \n");	

}	
void Multiplicacion(){
	EscribirEntero(LeerVariableEntero("Ingrese el valor de la primera Operador\n") * LeerVariableEntero("Ingrese el valor de la primera Operador\n"),"Es el resultado \n");	

}
void Division(){
	float varOperador1, varOperador2,varResultado;
	varOperador1=LeerVariableEntero("Ingrese el valor de la primera Operador\n");
	varOperador2=LeerVariableEntero("Ingrese el valor de la primera Operador\n");
	varResultado=varOperador1/varOperador2;
	if(varOperador2<=0){
		printf("El resultado no esta definido\n");
	}else{
		EscribirFlotanteCon(varResultado,"El Resultado es: %f\n");
	}
}
