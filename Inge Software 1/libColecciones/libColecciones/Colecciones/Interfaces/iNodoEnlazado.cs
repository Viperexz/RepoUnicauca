using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Servicios.Colecciones.Nodos;

namespace Servicios.Colecciones.Interfaces
{
    interface iNodoEnlazado<Tipo> where Tipo : IComparable
    {
        #region Accesor
        clsNodoEnlazado<Tipo> darSiguiente();
        #endregion

    }
}
