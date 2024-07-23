using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Nodos;

namespace Servicios.Colecciones.Tads
{
    public class clsTADDobleEnlazado<Tipo>: clsTAD<Tipo> , iTADDobleEnlazado<Tipo> where Tipo : IComparable
    {
        #region Atributos
        #region Asociativos
        private clsNodoDobleEnlazado<Tipo> atrNodoPrimero = null;
        private clsNodoDobleEnlazado<Tipo> atrNodoUltimo = null;
        #endregion
        private clsNodoDobleEnlazado<Tipo> atrNodoActual = null;
        private clsNodoDobleEnlazado<Tipo> atrPrimero = null;
        private clsNodoDobleEnlazado<Tipo> atrUltimo = null;

        #endregion

        //-------------------------------------
        #region Metodos
        #region Constuctor
        public clsTADDobleEnlazado()
        {
            //TODO: Implementar
        }
        #endregion
        #region Accesores
        public clsNodoDobleEnlazado<Tipo> darPrimero()
        {
            //TODO Implementar.
            return default(clsNodoDobleEnlazado<Tipo>);
        }

        public clsNodoDobleEnlazado<Tipo> darUltimo()
        {
            //TODO Implementar.
            return default(clsNodoDobleEnlazado<Tipo>);
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
                atrIndiceActual = atrLongitud - 1;
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

        protected override bool retrocederItem()
        {
            atrNodoActual = atrNodoActual.darAnterior();
            atrItemActual = atrNodoActual.darItem();
            atrIndiceActual++;
            return true;
        }

        #endregion
        #endregion
        #endregion

        #endregion


        #endregion

    }
}
