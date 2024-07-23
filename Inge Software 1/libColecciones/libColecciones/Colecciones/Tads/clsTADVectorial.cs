using System;
using Servicios.Colecciones.Interfaces;

namespace Servicios.Colecciones.Tads
{
    public class clsTADVectorial<Tipo> : clsTAD<Tipo>, iTADVectorial<Tipo> where Tipo : IComparable
    {
        #region Atributos

        #region Propio
        private int atrCapacidad;
        private Tipo[] atrItems;
        #endregion

        #endregion
        //-------------------------------------
        #region Metodos

        #region Constructor
        public clsTADVectorial() 
        {
        }

        public clsTADVectorial(int prmCapacidad)
        {
            //TODO Implementar.
        }
        #endregion

        #region Accesor
        public Tipo[] daritems()
        {
            return default(Tipo[]);
        }
        public int darCapacidad()
        {
            //TODO Implementar.
            return -1;
        }
        #endregion

        #region Mutador
        public  bool ponerItems(Tipo[] prmVector)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region CRUDs
        #region Insertador
        protected override bool insertarPrimero(Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected override bool insertarUltimo(Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected override bool insertarEnMedio(int prmIndice, Tipo prmItem)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Extractor
        protected override bool extraerPrimero(ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected override bool extraerUltimo(ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected override bool extraerEnMedio(int prmIdice, ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }
        #endregion
        #region Modificador
        protected bool modificarPrimero(Tipo prmItem)
        {
            if (irPrimero())
            {
                ponerItemActual(prmItem);
                //atrItemActual = prmItem;
                return true;
            }
            return false;
        }

        protected bool modificarUltimo(Tipo prmItem)
        {
            if (irUltimo())
            {
                ponerItemActual(prmItem);
                //atrItemActual = prmItem;
                return true;
            }
            return false;
        }

        protected bool modificarEnMedio(int prmIdice, Tipo prmItem)
        {
            if (irIndice(prmIdice))
            {
                ponerItemActual(prmItem);
                //atrItemActual = prmItem;
                return true;
            }
            return false;
        }




        #endregion
        #endregion


        #region Patron Iterador
        #region Operaciones
        #region Mutadores
        public override void ponerItemActual(Tipo prmItem)
        {
            atrItems[atrIndiceActual] = prmItem;
        }
        #endregion
        #region Posicionadores
        public override bool irPrimero()
        {
            if(!estaVacia())
            {
                atrIndiceActual = 0;
                atrItemActual = atrItems[atrIndiceActual];
                return true;
            }
            atrItemActual = default(Tipo);
            atrIndiceActual = -1;
            return false;
        }
        public override bool irUltimo()
        {
            if (!estaVacia())
            {
                atrIndiceActual = atrLongitud-1;
                atrItemActual = atrItems[atrIndiceActual];
                return true;
            }
            atrItemActual = default(Tipo);
            atrIndiceActual = -1;
            return false;
        }
        protected override bool avanzarItem()
        {
            atrIndiceActual++;
            atrItemActual = atrItems[atrIndiceActual];
            return true;
        }
        protected override bool retrocederItem()
        {
            atrIndiceActual--;
            atrItemActual = atrItems[atrIndiceActual];
            return true;
        }
        public override bool irIndice(int prmIndice)
        {
            if (esValido(prmIndice))
            {
                atrIndiceActual = prmIndice;
                atrItemActual = atrItems[atrIndiceActual];
                return true;
            }
            return false;
        }
        #endregion
        #endregion
        #endregion

        #endregion
    }
}
