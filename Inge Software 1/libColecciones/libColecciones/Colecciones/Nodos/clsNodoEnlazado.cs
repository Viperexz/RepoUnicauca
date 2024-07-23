using System;

namespace Servicios.Colecciones.Nodos
{
    public class clsNodoEnlazado<Tipo>:clsNodo<Tipo> where Tipo : IComparable
    {
        #region Atributos
        #region Asociativo

        private clsNodoEnlazado<Tipo> atrSiguiente;

        #endregion
        #endregion
        //-------------------------------------
        #region Metodos
        #region Constructor
        public clsNodoEnlazado()
        {

        }

        public clsNodoEnlazado(Tipo prmItem)
        {
            //Todo: Implementar
        }
        #endregion
        #region Operaciones
        public clsNodoEnlazado<Tipo> darSiguiente()
        {
            return atrSiguiente;
        }
        #endregion

        #endregion
    }
}
