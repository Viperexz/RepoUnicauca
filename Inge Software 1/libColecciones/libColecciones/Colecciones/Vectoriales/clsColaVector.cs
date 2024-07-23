using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Tads;
namespace Servicios.Colecciones.Vectoriales
{ 
    public class clsColaVector<Tipo> : clsTADVectorial<Tipo>, iCola<Tipo> where Tipo : IComparable
    {

        #region Atributos

        #region Propio

        private int atrCapacidad;

        private int atrLongitud;

        private Tipo[] atrItems;

        #endregion

        #endregion
        //-------------------------------------
        #region Metodos

        #region Constructor
        public clsColaVector()
        {
        }

        public clsColaVector(int prmCapacidad):base(prmCapacidad)
        {
            atrCapacidad = prmCapacidad;
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
