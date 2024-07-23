using System.Collections.Generic;
using System.Security.Policy;

namespace appAlcancia.Dominio
{
    public class clsPersona
    {
        #region Atributos

        #region Propios
        /// <summary>
        /// Atributo identificador unico (Patron OID).
        /// </summar
        private int atrOID = -1;
        /// <summary>
        /// Nombre de la persona.
        /// </summary>
        private string atrNombre = "n.n";
        #endregion

        #region Asociativos
        /// <summary>
        /// Asocia la persona a la clase monedas.
        /// </summary>
        private List<clsMoneda> atrMonedas = new List<clsMoneda>();

        /// <summary>
        /// Asocia la persona a la clase billetes.
        /// </summary>
        private List<clsBillete> atrBilletes = new List<clsBillete>();

        /// <summary>
        /// Asocia la persona a la clase alcancia.
        /// </summary>
        private clsAlcancia atrAlcancia = null;
        #endregion

        #region auxObj
        /// <summary>
        /// Atributo Auxiliar de la clase Moneda.
        /// </summary
        private clsMoneda auxObjMoneda = null;
        /// <summary>
        /// Atributo Auxiliar de la clase Billete.
        /// </summary
        private clsBillete auxObjBillete = null;
        /// <summary>
        /// Atributo Auxiliar de la clase Moneda.
        /// </summary
        private clsAlcancia auxObjAlcancia = null;

        #endregion

        #endregion
        //=================================================
        #region Metodos

        #region Utilitario
        public void generar()
        {
            atrNombre = "Jorge Jair";
            atrOID = 901908;
            atrAlcancia = new clsAlcancia();

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
        }
        #endregion

        #region Constructor
        /// <summary>
        /// Crea y devuelve una nueva instancia (objeto de Persona - No parametrizado).
        /// </summary>
        public clsPersona()
        { 
            
        }

        /// <summary>
        /// Crea y devuelve una nueva instancia (objeto de Persona).
        /// </summary>
        /// <param name="prmOID">Identificador unico (Patron OID).</param>
        /// <param name="prmNombre">Año de Emisión.</param>
        public clsPersona(int prmOID,string prmNombre)
        {
            atrOID = prmOID;
            atrNombre = prmNombre;
        }
        #endregion

        #region Acessores
        /// <summary>
        /// Devuelve el OID de la persona.
        /// </summary>
        /// <returns>Valor Entero</returns>
        public int darOID() 
        {
            return atrOID; 
        }
        /// <summary>
        /// Devuelve el Nombre de la persona.
        /// </summary>
        /// <returns>Valor cadena de caracteres</returns>
        public string darNombre() 
        {
            return atrNombre; 
        }
        /// <summary>
        /// Devuelve la alcancia en la que ahorra la persona.
        /// </summary>
        /// <returns>Valor clase alcancia</returns>
        public clsAlcancia darAlcancia()
        {
            return atrAlcancia;
        }

        /// <summary>
        /// Devuelve una copia de la coleccion de la clase monedas.
        /// </summary>
        /// <returns>Objeto alcancia</returns>
        public List<clsMoneda> darMonedas()
        {
            return atrMonedas;
        }

        /// <summary>
        /// Devuelve una copia de la coleccion de la clase monedas.
        /// </summary>
        /// <returns>Objeto alcancia</returns>
        public List<clsBillete> darBilletes()
        {
            return atrBilletes;
        }


        #endregion

        #region Mutadores
        /// <summary>
        /// Modifica el nombre de la persona.
        /// </summary>
        /// <param name="prmValor">Nombre de la persona.</param>
        public bool ponerNombre(string prmValor)
        {
            atrNombre = prmValor;
            return true;
        }
        #endregion

        #region Recuperadores
        /// <summary>
        /// Recupera un onjeto de la clase Billete usando la Denominacion.
        /// </summary>
        /// <param name="prmOID">Valor entero de capacidad monedas.</param>
        /// <param name="prmObjeto">Valor entero de capacidad billetes.</param>
        /// <returns>Objeto Moneda</returns
        public clsMoneda recuperarMonedaCon(int prmDenominacion)
        {
            for (int varIndice = 0; varIndice < atrMonedas.Count; varIndice++)
                if (atrMonedas[varIndice].darDenominacion() == prmDenominacion)
                    return atrMonedas[varIndice];
            return null;
        }
        /// <summary>
        /// Recupera un onjeto de la clase Billete usando la Denominacion.
        /// </summary>
        /// <param name="prmOID">Valor entero de capacidad monedas.</param>
        /// <param name="prmObjeto">Valor entero de capacidad billetes.</param>
        /// <returns>Objeto billete</returns
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
        /// Asocia la clase Alcancia.
        /// </summary>
        /// <param name="prmObjeto">Objeto de la clase Moneda.</param>
        /// <returns>Valor Boleano</returns>
        public bool asociarAlcanciaCon(clsAlcancia prmObjeto)
        {
            atrAlcancia = prmObjeto;
            return true;
        }

        /// <summary>
        /// Asocia la clase moneda.
        /// </summary>
        /// <param name="prmObjeto">Objeto de la clase Moneda.</param>
        /// <returns>Valor Boleano</returns>
        public bool asociarMonedaCon(clsMoneda prmObjeto)
        {
            atrMonedas.Add(prmObjeto);
            return true;
        }
        /// <summary>
        /// Asocia la clase billete.
        /// </summary>
        /// <param name="prmOID">Objeto de la clase billete</param>
        /// <returns>Valor Boleano</returns>
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
        /// Disocia la clase personas de la clase Moneda. 
        /// </summary>
        /// <param name="prmDenominacion">Denominacion de la moneda.</param>
        /// <param name="prmObjeto">Objeto de la clase moneda.</param>
        /// <returns>Valor Boleano</returns>
        public clsAlcancia disociarAlcancia()
        {
            auxObjAlcancia = atrAlcancia;
            if(auxObjAlcancia != null)
            {
                atrAlcancia.disociarAhorradorCon(this);
                atrAlcancia = null;
            }
            return auxObjAlcancia;
        }
        /// <summary>
        /// Disocia la clase personas de la clase Moneda. 
        /// </summary>
        /// <param name="prmDenominacion">Denominacion de la moneda.</param>
        /// <param name="prmObjeto">Objeto de la clase moneda.</param>
        /// <returns>Valor Boleano</returns>
        public clsMoneda disociarMonedaCon(int prmDenominacion)
        {
            auxObjMoneda = recuperarMonedaCon(prmDenominacion);
            atrMonedas.Remove(auxObjMoneda);
            return auxObjMoneda;
        }
        /// <summary>
        /// Disocia la clase persona de la clase Billete.
        /// </summary>
        /// <param name="prmDenominacion">Denominacion del billete.</param>
        /// <param name="prmObjeto">Objeto de la clase billete.</param>
        /// <returns>Valor Boleano</returns>
        public clsBillete disociarBilleteCon(int prmDenominacion)
        {
            auxObjBillete = recuperarBilleteCon(prmDenominacion);
            atrBilletes.Remove(auxObjBillete);
            return auxObjBillete;
        }
        /// <summary>
        /// Disocia la clase persona de la clase Billete.
        /// </summary>
        /// <param name="prmDenominacion">Denominacion del billete.</param>
        /// <param name="prmObjeto">Objeto de la clase billete.</param>
        /// <returns>Valor Boleano</returns>
        public List<clsMoneda> disociarMonedas()
        {
            List<clsMoneda> varMonedasDevueltas = atrMonedas;
            for(int varIndice = 0; varIndice<atrMonedas.Count;varIndice++)
            {
                atrMonedas[varIndice].disociarPropietario();
                atrMonedas.Remove(atrMonedas[varIndice]);
            }
            return varMonedasDevueltas;
        }
        /// <summary>
        /// Disocia la clase persona de la clase Billete.
        /// </summary>
        /// <param name="prmDenominacion">Denominacion del billete.</param>
        /// <param name="prmObjeto">Objeto de la clase billete.</param>
        /// <returns>Valor Boleano</returns>
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
        public clsPersona destruir()
        {
            disociarAlcancia();
            disociarBilletes();
            disociarMonedas();
            return this;
        }
        #endregion

        #endregion
    }
}
