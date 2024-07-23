using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Servicios.Colecciones.Nodos;

namespace Servicios.Colecciones.Interfaces
{
    interface iNodoDobleEnlazado<Tipo> where Tipo : IComparable 
    {
        #region Accesor
        clsNodoDobleEnlazado<Tipo> darAnterior();
        clsNodoDobleEnlazado<Tipo> darSiguiente();
        #endregion


    }
}
