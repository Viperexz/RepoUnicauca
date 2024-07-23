using System;

namespace Servicios.Colecciones.Interfaces
{
    interface iCola<Tipo> where Tipo : IComparable
    {
        #region CRUDs
        bool encolar(Tipo prmItem);
    
        bool desencolar(ref Tipo prmItem);

        bool revisar(ref Tipo prmItem);
        #endregion
    }
}
