
using System;

namespace Servicios.Colecciones.Interfaces
{
    public interface iTADVectorial<Tipo> where Tipo : IComparable
    {
      

        #region Accesor
        Tipo[] daritems();
        int darCapacidad();
        #endregion

        #region Mutador
        bool ponerItems(Tipo[] prmVector);
        #endregion
    }
}
