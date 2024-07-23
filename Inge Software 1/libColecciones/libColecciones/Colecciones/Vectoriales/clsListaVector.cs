using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Tads;
namespace Servicios.Colecciones.Vectoriales
{
    public class clsListaVector<Tipo> : clsTADVectorial<Tipo>, iLista<Tipo> where Tipo : IComparable
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
        public clsListaVector()
        {
        }

        public clsListaVector(int prmCapacidad) : base(prmCapacidad)
        {
            atrCapacidad = prmCapacidad;
        }

        #endregion

        #region Mutador

        public void ponerItems()
        {
            //TODO Implementar
        }



        #endregion

        #region CRUDs
        public bool agregar(Tipo prmItem)
        {
            return insertarUltimo(prmItem);
        }
        public bool insertar(int prmIndice, Tipo prmItem)
        {
            return insertarEn(prmIndice, prmItem);
        }

        public bool remover(int prmIndice,ref Tipo prmItem)
        {
            return ExtraerEn(prmIndice, ref prmItem);
        }

        public bool modificar(int prmIndice, Tipo prmItem)
        {
            return  modificarEn(prmIndice, prmItem);
        }

        public bool recuperar(int prmIndice, ref Tipo prmItem)
        {
            return  recuperarEn(prmIndice, ref prmItem);
        }

        #endregion

        #endregion
    }
}
