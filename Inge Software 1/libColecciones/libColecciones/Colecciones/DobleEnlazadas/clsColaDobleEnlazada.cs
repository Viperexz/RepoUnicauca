using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Nodos;
using Servicios.Colecciones.Tads;

namespace Servicios.Colecciones.DobleEnlazadas
{
    class clsColaDobleEnlazada<Tipo> : clsTADDobleEnlazado<Tipo>, iCola<Tipo> where Tipo : IComparable
    {
        #region Atributos

        #region Propio

        private int atrLongitud;

        #endregion

        #region Asociativo

        private clsNodoDobleEnlazado<Tipo> atrNodoPrimero;

        private clsNodoDobleEnlazado<Tipo> atrNodoUltimo;

        #endregion

        #endregion
        //-------------------------------------
        #region Metodos

        #region Accesor

        public int darLogitud()
        {
            return atrLongitud;
        }

        public clsNodoDobleEnlazado<Tipo> darPrimero()
        {
            return atrNodoPrimero;
        }

        public clsNodoDobleEnlazado<Tipo> darUltimo()
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
