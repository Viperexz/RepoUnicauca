using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Tads;
namespace Servicios.Colecciones.Vectoriales
{
    public class clsPilaVector<Tipo> : clsTADVectorial<Tipo>, iPila<Tipo> where Tipo : IComparable
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
        public clsPilaVector()
        {
        }

        public clsPilaVector(int prmCapacidad) : base(prmCapacidad)
        {
            atrCapacidad = prmCapacidad;
        }

        #endregion

        #region Mutador

        public void ponerItems()
        {
            throw new NotImplementedException();
        }

        public Tipo[] darItems()
        {
            return atrItems;
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
