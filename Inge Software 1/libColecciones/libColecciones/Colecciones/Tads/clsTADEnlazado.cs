using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Nodos;

namespace Servicios.Colecciones.Tads
{
    public class clsTADEnlazado<Tipo> : clsTAD<Tipo>, iTADEnlazado<Tipo> where Tipo : IComparable
    {
        #region Atributos
        #region Asociativos
        private clsNodoEnlazado<Tipo> atrNodoPrimero = null;
        private clsNodoEnlazado<Tipo> atrNodoUltimo = null;
        private clsNodoEnlazado<Tipo> atrNodoActual = null;
        #endregion
        private clsNodoEnlazado<Tipo> atrPrimero = null;
        private clsNodoEnlazado<Tipo> atrUltimo = null;
        #endregion
        //-------------------------------------
        #region Metodos

        #region Constructor
        public clsTADEnlazado()
        {
            //TODO: Implementar
        }
        #endregion

        #region Accesor
  
        public int darCapacidad()
        {
            //TODO Implementar.
            return -1;
        }
        public clsNodoEnlazado<Tipo> darPrimero()
        {
            //TODO Implementar.
            return default(clsNodoEnlazado<Tipo>);
        }

        public clsNodoEnlazado<Tipo> darUltimo()
        {
            //TODO Implementar.
            return default(clsNodoEnlazado<Tipo>);
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

        protected override bool extraerEnMedio(int prmIdice,ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }
        #endregion
        
        #endregion

        #region Patron Iterador

        #region Operaciones
        #region Mutadores
        public override void ponerItemActual(Tipo prmItem)
        {
            atrItemActual = prmItem;
            atrNodoActual.ponerItem(atrItemActual);
        }
        #endregion
        #region Posicionadores
        public override bool irPrimero()
        {
            if (!estaVacia())
            {
                atrNodoActual = atrPrimero;
                atrItemActual = atrNodoActual.darItem();
                atrIndiceActual = 0;
                return true;
            }
            atrNodoActual = null;
            atrItemActual = default(Tipo);
            atrIndiceActual = -1;
            return false;
        }

        public override bool irUltimo()
        {
            if (!estaVacia())
            {
                atrNodoActual = atrUltimo;
                atrItemActual = atrNodoActual.darItem();
                atrIndiceActual = atrLongitud-1;
                return true;
            }
            atrNodoActual = null;
            atrItemActual = default(Tipo);
            atrIndiceActual = -1;
            return false;
        }

        protected override bool avanzarItem()
        {
            atrNodoActual = atrNodoActual.darSiguiente();
            atrItemActual = atrNodoActual.darItem();
            atrIndiceActual++;
            return true;
        }


        #endregion
        #endregion

        #endregion

        #endregion

    }
}
