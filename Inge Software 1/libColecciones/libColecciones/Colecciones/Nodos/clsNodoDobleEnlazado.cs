using System;

namespace Servicios.Colecciones.Nodos
{
    public class clsNodoDobleEnlazado<Tipo>:clsNodo<Tipo> where Tipo : IComparable
    {
        #region Atributos

        #region Asociativo

        private clsNodoDobleEnlazado<Tipo> atrSiguiente;

        private clsNodoDobleEnlazado<Tipo> atrAnterior;
        #endregion

        #endregion
        //-------------------------------------
        #region Constructor
        public clsNodoDobleEnlazado()
        {

        }

        public clsNodoDobleEnlazado(Tipo prmItem):base(prmItem)
        {
            //Todo: Implementar
        }

        internal clsNodoDobleEnlazado<Tipo> darSiguiente()
        {
            return darSiguiente();
        }

        internal clsNodoDobleEnlazado<Tipo> darAnterior()
        {
            return darAnterior();
        }
        #endregion
    }
}
