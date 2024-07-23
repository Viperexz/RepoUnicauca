using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Nodos;
using Servicios.Colecciones.Tads;

namespace Servicios.Colecciones.Enlazadas
{
    class clsColaEnlazada<Tipo> : clsTADEnlazado<Tipo>, iCola<Tipo> where Tipo : IComparable
    {
        #region Atributos

        #region Propio

        private int atrLongitud;

        #endregion

        #region Asociativo

        private clsNodoEnlazado<Tipo> atrNodoPrimero;

        private clsNodoEnlazado<Tipo> atrNodoUltimo;

        #endregion

        #endregion
        //-------------------------------------
        #region Metodos

        #region Accesor

        public int darLogitud()
        {
            return atrLongitud;
        }

        public clsNodoEnlazado<Tipo> darPrimero()
        {
            return atrNodoPrimero;
        }

        public clsNodoEnlazado<Tipo> darUltimo()
        {
            return atrNodoUltimo;
        }



        #endregion

        #region CRUDs

        public bool encolar(Tipo prmItem)
        {
            return insertarUltimo(prmItem);
        }

        public bool desencolar(ref Tipo prmItem)
        {
            return extraerPrimero(ref prmItem);
        }

        public bool revisar(ref Tipo prmItem)
        {
            return recuperarPrimero(ref prmItem);
        }


        #endregion

        #endregion
    }
}
