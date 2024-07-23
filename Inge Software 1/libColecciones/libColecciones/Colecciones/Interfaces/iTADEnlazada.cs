
using System;
using Servicios.Colecciones.Nodos;

namespace Servicios.Colecciones.Interfaces
{
    interface iTADEnlazado<Tipo> where Tipo : IComparable
    {
        #region Accesor
        clsNodoEnlazado<Tipo> darPrimero();
        clsNodoEnlazado<Tipo> darUltimo();
        #endregion
    }
}
