using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Nodos;
using Servicios.Colecciones.Tads;

namespace Servicios.Colecciones.DobleEnlazadas
{
    public class clsPilaDobleEnlazada<Tipo> : clsTADDobleEnlazado<Tipo>, iPila<Tipo> where Tipo : IComparable
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

        public bool apilar(Tipo prmItem)
        {
            return insertarPrimero(prmItem);
        }

        public bool desapilar(ref Tipo prmItem)
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
