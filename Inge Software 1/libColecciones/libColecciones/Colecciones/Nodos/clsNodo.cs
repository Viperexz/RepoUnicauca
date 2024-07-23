using System;

namespace Servicios.Colecciones.Nodos
{
    public class clsNodo<Tipo> where Tipo : IComparable
    {
        #region Atributos

        #region Propio

        private Tipo atrItem = default(Tipo);

        #endregion

        #endregion
        //-------------------------------------
        #region Metodos

        #region Constructor
        public clsNodo()
        {

        }

        public clsNodo(Tipo prmItem)
        {
            //Todo: Implementar
        }
        #endregion
        #region Accesor
        public Tipo darItem()
        {
            //Todo: Implementar
            return default(Tipo);
        }
        #endregion

        #region Mutador
        public void ponerItem (Tipo prmContenido)
        {
            //TODO:Implementar
        }
        #endregion

        #endregion

    }

}
