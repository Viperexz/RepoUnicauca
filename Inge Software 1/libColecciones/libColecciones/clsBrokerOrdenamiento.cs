using System;
namespace appColecciones.Dominio

{
    public static class clsBrokerOrdenamiento
    {
        #region Metodos  burbuja
        /// <summary>
        /// Complegidad temporal: O(n^2);
        /// Referencias:
        /// https://guias.makeitreal.camp/algoritmos/complejidad
        /// https://www.youtube.com/watch?v=MyAiCtuhiqQ&ab_channel=ChioCode
        /// https://es.wikipedia.org/wiki/Complejidad_temporal
        /// </summary>
        /// <param name="prmVector"></param>
        public static void MetodoBurbujaSimple(ref int[] prmVector)
        {

            int varPosExterior; // O(1)
            int varElementoTemporal; // O(1)
            int varPosInterior; // O(1)

            for (varPosExterior = 1; varPosExterior < prmVector.Length - 1; varPosExterior++) // O(n)
            {
                for (varPosInterior = 0; varPosInterior < prmVector.Length - varPosExterior - 1; varPosInterior++)// O(n^2)
                {
                    if (prmVector[varPosInterior] > prmVector[varPosInterior + 1])// O(n^2)
                    {
                        varElementoTemporal = prmVector[varPosInterior];// O(n^2)
                        prmVector[varPosInterior] = prmVector[varPosInterior + 1];// O(n^2)
                        prmVector[varPosInterior + 1] = varElementoTemporal;// O(n^2)
                    }
                }
            }
        }

        /// <summary>
        /// Complegidad temporal:  O(n^2)
        /// Referencias:
        /// https://guias.makeitreal.camp/algoritmos/complejidad
        /// https://www.youtube.com/watch?v=MyAiCtuhiqQ&ab_channel=ChioCode
        /// https://es.wikipedia.org/wiki/Complejidad_temporal
        /// </summary>
        /// <param name="prmVector"></param>
        public static void MetodoBurbujaMejorado(ref int[] prmVector)
        {
            int varPosExterior = 1; // O(1)
            int varElementoTemporal; // O(1)
            int varPosInterior; // O(1)
            bool varHuboIntercambio = true; // O(1)

            while ((varPosExterior < prmVector.Length) && (varHuboIntercambio == true)) // O(n)
            {
                varPosExterior = varPosExterior + 1;// O(n)
                varHuboIntercambio = false;// O(n)
                for (varPosInterior = 0; varPosInterior < (prmVector.Length - varPosExterior); varPosInterior++)// O(n^2)
                {
                    if (prmVector[varPosInterior] > prmVector[(varPosInterior + 1)])// O(n^2)
                    {
                        varElementoTemporal = prmVector[varPosInterior];// O(n^2)
                        prmVector[varPosInterior] = prmVector[varPosInterior + 1];// O(n^2)
                        prmVector[varPosInterior + 1] = varElementoTemporal;// O(n^2)
                        varHuboIntercambio = true;// O(n^2)
                    }
                }
            }

        }

        /// <summary>
        /// Complegidad temporal: O(n^2)
        /// Referencias:
        /// https://guias.makeitreal.camp/algoritmos/complejidad
        /// https://www.youtube.com/watch?v=MyAiCtuhiqQ&ab_channel=ChioCode
        /// https://es.wikipedia.org/wiki/Complejidad_temporal
        /// </summary>
        /// <param name="prmVector"></param>
        public static void MetodoBurbujaBiDireccional(ref int[] prmVector)
        {
            bool varHuboIntercambio = false; // O(1)
            int varPos; // O(1)
            int varElementoTemporal; // O(1)
            do // O(1)
            {
                for (varPos = 0; varPos < prmVector.Length - 2; varPos++)
                {
                    if (prmVector[varPos] > prmVector[varPos + 1])
                    {
                        varElementoTemporal = prmVector[varPos];
                        prmVector[varPos] = prmVector[varPos + 1];
                        prmVector[varPos + 1] = varElementoTemporal;
                        varHuboIntercambio = true;
                    }
                }
                if (varHuboIntercambio == false)
                {
                    break;
                }
                varHuboIntercambio = false;
                for (varPos = prmVector.Length - 2; varPos == 0; varPos--)
                {
                    if (prmVector[varPos] > prmVector[varPos + 1])
                    {
                        varElementoTemporal = prmVector[varPos];
                        prmVector[varPos] = prmVector[varPos + 1];
                        prmVector[varPos + 1] = varElementoTemporal;
                        varHuboIntercambio = true;
                    }
                }
            } while (varHuboIntercambio != true);
        }
        #endregion

        #region Otros Metodos

        /// <summary>
        /// Complegidad temporal:  O(n^2)
        /// Referencias:
        /// https://guias.makeitreal.camp/algoritmos/complejidad
        /// https://www.youtube.com/watch?v=MyAiCtuhiqQ&ab_channel=ChioCode
        /// https://es.wikipedia.org/wiki/Complejidad_temporal
        /// </summary>
        /// <param name="prmVector"></param>
        public static void MetodoInsercion(ref int[] prmVector)
        {
            int varPosExterior;
            int varPosInterior;
            int varElementoInsertado;
            for (varPosExterior = 1; varPosExterior > prmVector.Length - 1; varPosExterior++)// n
            {
                varElementoInsertado = prmVector[varPosExterior];
                varPosInterior = varPosExterior - 1;
                while (varPosInterior >= 0 && (prmVector[varPosInterior] != varElementoInsertado) && (prmVector[varPosInterior] > varElementoInsertado))// n^2
                {
                    prmVector[varPosInterior + 1] = prmVector[varPosInterior];
                    varPosInterior = varPosInterior - 1;
                }
                prmVector[varPosInterior + 1] = varElementoInsertado;
            }

        }

        /// <summary>
        /// Complegidad temporal:  O(n^2)
        /// Referencias:
        /// https://guias.makeitreal.camp/algoritmos/complejidad
        /// https://www.youtube.com/watch?v=MyAiCtuhiqQ&ab_channel=ChioCode
        /// https://es.wikipedia.org/wiki/Complejidad_temporal
        /// </summary>
        /// <param name="prmVector"></param>
        public static void MetodoSeleccion(ref int[] prmVector)
        {
            int varPosExterior;
            int varPosInterior;
            int varPosDelMinimo;
            int varElementoTemporal;
            for (varPosExterior = 0; varPosExterior < prmVector.Length - 1; varPosExterior++) // n
            {
                varPosDelMinimo = varPosExterior;
                for (varPosInterior = varPosExterior + 1; varPosInterior < prmVector.Length - 1; varPosInterior++) //n^2
                {
                    if (prmVector[varPosInterior] < prmVector[varPosDelMinimo])
                    {
                        varPosDelMinimo = varPosInterior;
                    }
                }
                if (varPosDelMinimo != varPosExterior)
                {
                    varElementoTemporal = prmVector[varPosDelMinimo];
                    prmVector[varPosDelMinimo] = prmVector[varPosExterior];
                    prmVector[varPosExterior] = varElementoTemporal;
                }
            }

        }

        /// <summary>
        ///Complegidad temporal:   O(n^2)
        /// Referencias:
        /// https://guias.makeitreal.camp/algoritmos/complejidad
        /// https://www.youtube.com/watch?v=MyAiCtuhiqQ&ab_channel=ChioCode
        /// https://es.wikipedia.org/wiki/Complejidad_temporal
        /// </summary>
        /// <param name="prmVector"></param>
        /// <param name="prmPosDelPrimero"></param>
        /// <param name="prmPosDelUltimo"></param>
        public static void MetodoQuickSort(ref int[] prmVector, int prmPosDelPrimero, int prmPosDelUltimo)
        {
            int varPosIzquierdo;
            int varPosDerecho;
            int varElementoPivote;
            int varElementoTemporal;
            varElementoPivote = prmVector[(prmPosDelPrimero + prmPosDelUltimo) / 2];
            varPosIzquierdo = prmPosDelPrimero;
            varPosDerecho = prmPosDelUltimo;
            while (varPosIzquierdo <= varPosDerecho && (prmPosDelUltimo - prmPosDelPrimero) > 0)//n
            {
                while (prmVector[varPosIzquierdo] < varElementoPivote) // n^2
                {
                    varPosIzquierdo = varPosIzquierdo + 1;
                }
                while (prmVector[varPosDerecho] > varElementoPivote) // n^2
                {
                    varPosDerecho = varPosDerecho - 1;
                }
                if (varPosIzquierdo <= varPosDerecho)
                {
                    varElementoTemporal = prmVector[varPosIzquierdo];
                    prmVector[varPosIzquierdo] = prmVector[varPosDerecho];
                    prmVector[varPosDerecho] = varElementoTemporal;
                    varPosIzquierdo = varPosIzquierdo + 1;
                    varPosDerecho = varPosDerecho - 1;
                }
            }
            if (prmPosDelPrimero < varPosDerecho)
            {
                MetodoQuickSort(ref prmVector, prmPosDelPrimero, varPosDerecho);
            }
            if (varPosIzquierdo < prmPosDelUltimo)
            {
                MetodoQuickSort(ref prmVector, varPosIzquierdo, prmPosDelUltimo);
            }

        }

        #endregion

        public static int buscarSecuencial(ref int[] prmVector, int prmItem)
        {
            int Tamaño = prmVector.Length;
            int varPosicion = 0;
            while (varPosicion < Tamaño)
            {
                if (prmVector[varPosicion] == prmItem)
                {
                    return varPosicion;
                }
                else
                    varPosicion++;
            }
            return -1;
        }
        public static int buscarBinario(ref int[] prmVector, int prmTopeInferior, int prmTopeSuperior, int prmItem)
        {
            int varPosicionCentro;
            if (prmTopeInferior >= prmTopeSuperior)
                return -1;
            else
            {
                varPosicionCentro = (prmTopeSuperior + prmTopeInferior) / 2;
                if (prmVector[varPosicionCentro] < prmItem)
                    return buscarBinario(ref prmVector, varPosicionCentro + 1, prmTopeSuperior, prmItem);
                else
                {
                    if (prmVector[varPosicionCentro] > prmItem)
                        return buscarBinario(ref prmVector, prmTopeInferior, varPosicionCentro - 1, prmItem);
                    else
                    {
                        return varPosicionCentro;
                    }
                }
            }
        }

    }
}



