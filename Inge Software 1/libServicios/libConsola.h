#ifndef LIBCONSOLA_H
#define LIBCONSOLA_H

// Liibrerias Lenguaje

#include <stdlib.h>
#include <stdio.h>


//Prototipo

void Limpiarpantalla();
void EsperarTecla();

void EscribirEnteroCon(int prmVariable1,char* prmEtiqueta2);
void EscribirFlotanteCon(float prmVariable1,char* prmEtiqueta2);
void EscribirCaracterCon(char* prmVariable1,char* prmEtiqueta2);

void EscribirEntero(int prmVariable1,char* prmEtiqueta2);
void EscribirFlotante(float prmVariable1,char* prmEtiqueta2);
void EscribirCaracter(char* prmVariable1,char* prmEtiqueta2);


int LeerEntero(char* prmEtiqueta);
float LeerFlotante(char* prmEtiqueta);
char LeerCaracter(char* prmEtiqueta);

int LeerVariableEntero(char* prmEtiqueta);
float LeerVariableFlotante(char* prmEtiqueta);
char LeerVariableCaracter(char* prmEtiqueta);	
#endif
