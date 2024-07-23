#include "libColec.h"

char** DimensionarCadenas(int prmNumCadenas, int prmLongitudCadena)
{
	char** varVectorCadenas=malloc(prmNumCadenas*sizeof(char*));
	for(int varCadena=0;varCadena<prmNumCadenas;varCadena++)
	{
		varVectorCadenas[varCadena]=(char*)malloc(prmLongitudCadena);
	}
							
return varVectorCadenas;	
}

int** DimensionarEnteros(int prmNumCadenas, int prmLongitudCadena)
{
	int** varVectorCadenas=malloc(prmNumCadenas*sizeof(int*));
	for(int varCadena=0;varCadena<prmNumCadenas;varCadena++)
	{
		varVectorCadenas[varCadena]=(int*)malloc(prmLongitudCadena);
	}
return varVectorCadenas;	
}
