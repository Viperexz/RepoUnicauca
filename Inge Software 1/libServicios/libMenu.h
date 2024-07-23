#ifndef LIBMENU_H
#define LIBMENU_H


//Lib Lenguaje
#include <stdio.h>
//Lib Programador

#include "libColec.h"

//Atributos

int atrNumeroItems;
int atrOpciones;
int atrOpcionSalir;	
char** atrVectorItemsCaracteres;
int** atrVectorItemsEntero;
//Prototipo
void EscribirMenuCaracteres();
void EscribirMenuEnteros();
#endif
