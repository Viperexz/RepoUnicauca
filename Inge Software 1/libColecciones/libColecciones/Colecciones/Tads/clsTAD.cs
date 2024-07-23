
using System;
using Servicios.Colecciones.Interfaces;

namespace Servicios.Colecciones.Tads
{
    public class clsTAD<Tipo> : iTAD<Tipo> where Tipo:IComparable
    {
        #region Atributos

        #region Propio
        protected int atrLongitud;
        #endregion

        #region Iterador
        protected int atrIndiceActual;
        protected Tipo atrItemActual;
        #endregion
        #endregion
        //-------------------------------------
        #region Metodos

        #region Constructor
        public clsTAD()
        {
        }
        #endregion

        #region Accesores
        public int darLongitud()
        {
            return atrLongitud;
        }
        #endregion

        #region CRUDs

        #region Consultores
        public bool esValido(int prmIndice)
        {
            return (prmIndice >= 0 && prmIndice < atrLongitud);
        }
        public bool estaVacia()
        {
            return atrLongitud == 0;
        }
        #endregion 

        #region Insertador
        protected virtual  bool insertarPrimero(Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected virtual bool insertarUltimo(Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected virtual bool insertarEnMedio(int prmIndice, Tipo prmItem)
        {
            throw new NotImplementedException(); 
        }

        protected virtual bool insertarEn(int prmIndice, Tipo prmItem)
        {
            if (prmIndice == 0) return insertarPrimero(prmItem);
            if (prmIndice == atrLongitud) return insertarUltimo(prmItem);
            if (esValido(prmIndice)) return insertarEnMedio(prmIndice, prmItem);
            return false;
        }
        #endregion

        #region Extractor
        protected virtual bool extraerPrimero(ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected virtual bool extraerUltimo(ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected virtual bool extraerEnMedio(int prmIdice,ref Tipo prmItem)
        {
            throw new NotImplementedException();
        }

        protected bool ExtraerEn(int prmIndice,ref Tipo prmItem)
        {
            if (prmIndice == 0) return extraerPrimero(ref prmItem);
            if (prmIndice == atrLongitud-1) return extraerUltimo(ref prmItem);
            if (esValido(prmIndice)) return extraerEnMedio(prmIndice, ref prmItem);
            return false;
        }

        #endregion

        #region Modificador
        protected bool modificarPrimero(Tipo prmItem)
        {
          if(irPrimero())
            {
                atrItemActual = prmItem;
                return true;
            }
            return false;
        }

        protected bool modificarUltimo(Tipo prmItem)
        {
            if (irUltimo())
            {
                atrItemActual = prmItem;
                return true;
            }
            return false;
        }

        protected  bool modificarEnMedio(int prmIdice, Tipo prmItem)
        {
            if (irIndice(prmIdice))
            {
                atrItemActual = prmItem;
                return true;
            }
            return false;
        }

        protected bool modificarEn(int prmIndice, Tipo prmItem)
        {
            if (prmIndice == 0) return modificarPrimero(prmItem);
            if (prmIndice == atrLongitud-1) return modificarUltimo(prmItem);
            if (esValido(prmIndice)) return modificarEnMedio(prmIndice, prmItem);
            return false;
        }

        #endregion

        #region Recuperador
        protected  bool recuperarPrimero(ref Tipo prmItem)
        {
            if (irPrimero())
            {
                prmItem = atrItemActual;
                return true;
            }
            prmItem = default(Tipo);
            return false;
        }
        protected  bool recuperarUltimo(ref Tipo prmItem)
        {
            if (irUltimo())
            {
                prmItem = atrItemActual;
                return true;
            }
            prmItem = default(Tipo);
            return false;
        }
        protected  bool recuperarEnMedio(int prmIdice, ref Tipo prmItem)
        {
            if (irIndice(prmIdice))
            {
                prmItem = atrItemActual;
                return true;
            }
            prmItem = default(Tipo);
            return false;
        }
        protected bool recuperarEn(int prmIndice , ref Tipo prmItems)
        {
            if (prmIndice == 0) return recuperarPrimero(ref prmItems);
            if (prmIndice == atrLongitud - 1) return recuperarUltimo(ref prmItems);
            if (esValido(prmIndice)) return recuperarEnMedio(prmIndice, ref prmItems);
            return false;
        }
        public bool encontrar(Tipo prmItem, ref int prmIndice)
        {
            if (irPrimero())
            {
                for (prmIndice= 0; prmIndice < atrLongitud; prmIndice++)
                {
                    if (atrItemActual.CompareTo(prmItem)==0) 
                        return true;
                    irSiguiente();   
                }
            }
            prmIndice = -1;
            return false;
        }

        #endregion

        #endregion

        #region Patron Iterador

        #region Operaciones

        #region Accesores
        public int darIndiceActual()
        {
            return atrIndiceActual;
        }
        public Tipo darItemActual()
        {
            return atrItemActual;
        }
        #endregion
        #region Mutadores
        public virtual void ponerItemActual(Tipo prmItem)
        {
        }
        #endregion
        #region Posicionadores
        public virtual bool irPrimero()
        {
            return false;
        }
        public virtual bool irUltimo()
        {
            return false;
        }
        public bool irAnterior()
        {
            if (hayAnterior())
            {
                return retrocederItem();
            }
            return false;
        }
        public bool irSiguiente()
        {
            if (haySiguiente())
            {
                return avanzarItem();
            }
            return false;
        }
        public virtual bool irIndice(int prmIndice)
        {
            if (prmIndice == 0) return irPrimero();
            if (prmIndice == atrLongitud - 1) return irUltimo();
            if (esValido(prmIndice))
            {
                irPrimero();
                while (atrIndiceActual < prmIndice)
                {
                    irSiguiente();
                    return true;
                }
            }
            return false;
        }
        protected virtual bool avanzarItem()
        {
            return false;
        }
        protected virtual bool retrocederItem()
        {
            return false;
        }

        #endregion
        #region Consultores
        public bool hayAnterior()
        {
            return (estaVacia() == false && atrIndiceActual > 0);
        }
        public bool haySiguiente()
        {
            return (estaVacia() == false && (atrIndiceActual > -1));
        }

        #endregion
        #endregion

        #endregion

        #endregion
    }
}
