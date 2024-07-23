using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servicios.Colecciones.Interfaces
{
    interface iNodo<Tipo> where Tipo : IComparable
    {
        #region Accesor
        Tipo darItem();
        #endregion

        #region Mutador
        void ponerItem(Tipo prmContenido);
        #endregion


    }
}
