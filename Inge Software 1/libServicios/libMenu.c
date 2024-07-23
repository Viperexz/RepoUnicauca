#include "libMenu.h"

void EscribirMenuCaracteres(){
	for(int varIteradora=0;varIteradora<atrNumeroItems; varIteradora++){
		printf("%s\n",atrVectorItemsCaracteres[varIteradora]);
	}
}	
void EscribirMenuEnteros(){
	for(int varIteradora=0;varIteradora<atrNumeroItems; varIteradora++){
		printf("%d\n",atrVectorItemsEntero[varIteradora]);
	}
}	
