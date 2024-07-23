using System.Collections.Generic;

namespace appAlcancia.Dominio
{
    public class clsAlcancia
    {
        #region Atributos

        #region Propio
        /// <summary>
        /// Limite de monedas en la alcancia.
        /// </summary>
        private int atrCapacidadMonedas = -1;

        /// <summary>
        /// Limite de billetes en la alcancia.
        /// </summary>
        private int atrCapacidadBilletes = -1;

        #endregion

        #region Asociativos
        /// <summary>
        /// 
        /// </summary>
        private List<clsPersona> atrAhorradores = new List<clsPersona>();

        /// <summary>
        /// 
        /// </summary>
        private List<clsMoneda> atrMonedas = new List<clsMoneda>();

        /// <summary>
        /// 
        /// </summary?
        private List<clsBillete> atrBilletes = new List<clsBillete>();

        #endregion

        #region ObjAux
        /// <summary>
        /// Atributo Auxiliar de la clase Persona.
        /// </summary
        private clsPersona auxObjAhorrador = null;
        /// <summary>
        /// Atributo Auxiliar de la clase Moneda.
        /// </summary
        private clsMoneda auxObjMoneda = null;
        /// <summary>
        /// Atributo Auxiliar de la clase Billete.
        /// </summary
        private clsBillete auxObjBillete = null;
        #endregion

        #endregion
        //=================================================
        #region Metodos

        #region Utilitario
        public void generar()
        {
            atrMonedas = new List<clsMoneda>();
            atrMonedas.Add(new clsMoneda(50, 1990));
            atrMonedas.Add(new clsMoneda(100, 1995));
            atrMonedas.Add(new clsMoneda(500, 2000));
            atrMonedas.Add(new clsMoneda(100, 2000));

            atrBilletes = new List<clsBillete>();
            atrBilletes.Add(new clsBillete("5", 5000, 1, 12, 1996));
            atrBilletes.Add(new clsBillete("7", 5000, 1, 12, 1996));
            atrBilletes.Add(new clsBillete("4", 10000, 1, 12, 2000));
            atrBilletes.Add(new clsBillete("1", 20000, 6, 5, 2007));

            atrAhorradores = new List<clsPersona>();
            atrAhorradores.Add(new clsPersona(1, "Fulanito"));
            atrAhorradores.Add(new clsPersona(2, "Menganito"));
            atrAhorradores.Add(new clsPersona(5, "Diana"));
        }
        #endregion

        #region Constructor
        /// <summary>
        /// Crea y devuelve una nueva instancia (objeto de Alcancia - No parametrizado).
        /// </summary>
        public clsAlcancia() 
        { 

        }

        /// <summary>
        /// Crea y devuelve una nueva instancia (objeto de Alcancia).
        /// </summary>
        /// <param name="prmCapacidadMonedas">Valor entero de capacidad monedas.</param>
        /// <param name="prmCapacidadBilletes">Valor entero de capacidad billetes.</param>
        public clsAlcancia(int prmCapacidadMonedas, int prmCapacidadBilletes) 
        {
            atrCapacidadMonedas = prmCapacidadMonedas;
            atrCapacidadBilletes = prmCapacidadBilletes;
        }
        #endregion

        #region Acessores
        /// <summary>
        /// Devuelve la capacidad de la alcancia para monedas.
        /// </summary>
        /// <returns>Valor Entero</returns
        public int darCapacidadMonedas() {
        
            return atrCapacidadMonedas; 
        }
        /// <summary>
        /// Devuelve la capacidad de la alcancia para billetes.
        /// </summary>
        /// <returns>Valor Entero</returns
        public int darCapacidadBilletes()
        {
           
            return atrCapacidadBilletes;
        }
        /// <summary>
        /// Devuelve la lista de ahorradores de la alcancia.
        /// </summary>
        /// <returns>Atributo asociativo de ahorradores</returns
        public List<clsPersona> darAhorradores()
        {
            return atrAhorradores;
        }
        /// <summary>
        /// Devuelve la lista de mondeas de la alcancia.
        /// </summary>
        /// <returns>Atributo asociativo de monedas</returns
        public List<clsMoneda> darMonedas()
        {
            return atrMonedas;
        }
        /// <summary>
        /// Devuelve la lista de billetes de la alcancia.
        /// </summary>
        /// <returns>Atributo asociativo de billletes</returns
        public List<clsBillete> darBilletes()
        {
            return atrBilletes;
        }

        #endregion

        #region Recuperadores

        /// <summary>
        /// Recupera un objeto de la clase persona usando el OID.
        /// </summary>
        /// <param name="prmOID">Valor entero de capacidad monedas.</param>
        /// <param name="prmObjeto">Valor entero de capacidad billetes.</param>
        /// <returns>Valor booleano</returns
        public clsPersona recuperarAhorradorCon(int prmOID)
        {
            for (int varIndice = 0; varIndice < atrAhorradores.Count; varIndice++)
                if (atrAhorradores[varIndice].darOID() == prmOID)
                    return atrAhorradores[varIndice];
            return null;
        }

        /// <summary>
        ///  Recupera un objeto de la clase Moneda usando la Denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <param name="prmObjeto">Valor entero de capacidad billetes.</param>
        /// <returns>Valor booleano</returns
        public clsMoneda recuperarMonedaCon(int prmDenominacion)
        {
            for (int varIndice = 0; varIndice < atrMonedas.Count; varIndice++)
                if (atrMonedas[varIndice].darDenominacion() == prmDenominacion)
                    return atrMonedas[varIndice];
            return null;
        }
        /// <summary>
        /// Recupera un objeto de la clase Billete usando la Denominacion.
        /// </summary>
        /// <param name="prmOID">Valor entero de capacidad monedas.</param>
        /// <param name="prmObjeto">Valor entero de capacidad billetes.</param>
        /// <returns>Valor booleano</returns
        public clsBillete recuperarBilleteCon(int prmDenominacion)
        {
            for (int varIndice = 0; varIndice < atrBilletes.Count; varIndice++)
                if (atrBilletes[varIndice].darDenominacion() == prmDenominacion)
                    return atrBilletes[varIndice];
            return null;
        }
        #endregion

        #region Asociadores
        /// <summary>
        /// Asocia un objeto de la alcancia con persona.
        /// <param name="prmObjeto">Objeto de la clase.</param>
        /// </summary>
        /// <returns>Valor booleano true si fue asociado</returns
        public bool asociarAhorradorCon(clsPersona prmObjeto)
        {
            if (recuperarAhorradorCon(prmObjeto.darOID()) == null)
            {
                atrAhorradores.Add(prmObjeto);
                return true;
            }
            return false;
        }
        /// <summary>
        /// Asocia un objeto de la alcancia con Moneda.
        /// <param name="prmObjeto">Objeto de la clase.</param>
        /// </summary>
        /// <returns>Valor booleano true si fue asociado</returns
        public bool asociarMonedaCon(clsMoneda prmObjeto)
        {
            atrMonedas.Add(prmObjeto);
            return true;
        }
        /// <summary>
        /// Asocia un objeto de la alcancia con Billete.
        /// <param name="prmObjeto">Objeto de la clase.</param>
        /// </summary>
        /// <returns>Valor booleano true si fue asociado</returns
        public bool asociarBilleteCon(clsBillete prmObjeto)
        {
            if (recuperarBilleteCon(prmObjeto.darDenominacion()) == null)
            {
                atrBilletes.Add(prmObjeto);
                return true;
            }
            return false;
        }
        #endregion

        #region Disociadores
        /// <summary>
        /// Disocia un objeto de la alcancia con Persona usando el OID.
        /// </summary>
        /// <param name="prmOID">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public clsPersona disociarAhorradorCon(int prmOID)
        {
            auxObjAhorrador = recuperarAhorradorCon(prmOID);
            atrAhorradores.Remove(auxObjAhorrador);
            return auxObjAhorrador;
        }

        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public bool disociarAhorradorCon(clsPersona prmObjeto)
        {
            disociarMonedasDe(prmObjeto);
            disociarBilletesDe(prmObjeto);
            return atrAhorradores.Remove(prmObjeto);

        }

        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public List<clsPersona> disociarAhorradores()
        {
            List<clsPersona> varPersonas = atrAhorradores;
            for (int varIndice = 0; varIndice < atrMonedas.Count; varIndice++)
            {
                atrMonedas[varIndice].disociarPropietario();
                atrMonedas.Remove(atrMonedas[varIndice]);
            }
            return varPersonas;
        }
        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public clsMoneda disociarMonedaCon(int prmDenominacion)
        {
            auxObjMoneda = recuperarMonedaCon(prmDenominacion);
            atrMonedas.Remove(auxObjMoneda);
            return auxObjMoneda;
        }
        
        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public List<clsMoneda> disociarMonedasDe(clsPersona prmObjeto)
        {
            List<clsMoneda> varMonedasDevueltas = new List<clsMoneda>();
            for(int varIndice=0;varIndice<atrMonedas.Count;varIndice++)
            {
                if(atrMonedas[varIndice].darPropietario()==prmObjeto)
                {
                    varMonedasDevueltas.Add(atrMonedas[varIndice]);
                    atrMonedas[varIndice].disociarAlcancia();
                    atrMonedas.Remove(atrMonedas[varIndice]);
                }
            }
            return varMonedasDevueltas;
        }
        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public List<clsMoneda> disociarMonedas()
        {
            List<clsMoneda> varMonedasDevueltas = atrMonedas;
            for (int varIndice = 0; varIndice < atrMonedas.Count; varIndice++)
            {
                atrMonedas[varIndice].disociarPropietario();
                atrMonedas.Remove(atrMonedas[varIndice]);
            }
            return varMonedasDevueltas;
        }
        /// <summary>
        /// Disocia un objeto de la alcancia con Billete usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Valor booleano</returns
        public clsBillete disociarBilleteCon(int prmDenominacion)
        {
            auxObjBillete = recuperarBilleteCon(prmDenominacion);
            atrBilletes.Remove(auxObjBillete);
            return auxObjBillete;
        }
      
        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public List<clsBillete> disociarBilletesDe(clsPersona prmObjeto)
        {
            List<clsBillete> varBilletesDevueltos = new List<clsBillete>();
            for (int varIndice = 0; varIndice < atrMonedas.Count; varIndice++)
            {
                if (atrMonedas[varIndice].darPropietario() == prmObjeto)
                {
                    varBilletesDevueltos.Add(atrBilletes[varIndice]);
                    atrMonedas[varIndice].disociarAlcancia();
                    atrMonedas.Remove(atrMonedas[varIndice]);
                }
            }
            return varBilletesDevueltos;
        }

        /// <summary>
        /// Disocia un objeto de la alcancia con Moneda usando la denominacion.
        /// </summary>
        /// <param name="prmDenominacion">Valor entero de capacidad monedas.</param>
        /// <returns>Obj disociado - en caso de no encontrar el obj retorna null</returns
        public List<clsBillete> disociarBilletes()
        {
            List<clsBillete> varBilletesDevueltos = atrBilletes;
            for (int varIndice = 0; varIndice < atrMonedas.Count; varIndice++)
            {
                atrMonedas[varIndice].disociarPropietario();
                atrMonedas.Remove(atrMonedas[varIndice]);
            }
            return varBilletesDevueltos;
        }
        #endregion

        #region Destructor
        public clsAlcancia destruir()
        {
            disociarBilletes();
            disociarMonedas();
            return this;
        }
        #endregion

        #endregion
    }
}
