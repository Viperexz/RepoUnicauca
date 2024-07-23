using System;

namespace Servicios.Colecciones.Interfaces
{
    public interface iPila<Tipo> where Tipo : IComparable
    {
        #region CRUDs
        bool apilar(Tipo prmItem);

        bool desapilar(ref Tipo prmItem);

        bool revisar(ref Tipo prmItem);
        #endregion
    }
}
