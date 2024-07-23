using System;
using Servicios.Colecciones.Interfaces;
using Servicios.Colecciones.Nodos;
using Servicios.Colecciones.Tads;

namespace Servicios.Colecciones.DobleEnlazadas
{
    class clsListaDobleEnlazada<Tipo> : clsTADDobleEnlazado<Tipo>, iLista<Tipo> where Tipo : IComparable
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
        public bool agregar(Tipo prmItem)
        {
            return insertarUltimo(prmItem);
        }
        public bool insertar(int prmIndice, Tipo prmItem)
        {
            return insertarEn(prmIndice, prmItem);
        }

        public bool remover(int prmIndice, ref Tipo prmItem)
        {
            return ExtraerEn(prmIndice, ref prmItem);
        }

        public bool modificar(int prmIndice, Tipo prmItem)
        {
            return modificarEn(prmIndice, prmItem);
        }

        public bool recuperar(int prmIndice, ref Tipo prmItem)
        {
            return recuperarEn(prmIndice, ref prmItem);
        }

        #endregion

        #endregion
    }
}
