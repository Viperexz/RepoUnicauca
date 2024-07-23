
using System;

namespace Servicios.Colecciones.Interfaces
{
    public interface iTAD<Tipo> where Tipo : IComparable
    {
        #region Accesor
        int darLongitud();
        #endregion
        #region Consultores
        bool esValido(int Indice);
        bool encontrar(Tipo prmItem, ref int prmIndice);
        bool estaVacia();

        #endregion
    }
}
