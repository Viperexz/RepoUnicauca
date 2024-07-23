namespace appAlcancia.Dominio
{
    public class clsBillete:clsMoneda
    {
        #region Atributos

        #region Propios
        /// <summary>
        /// Serial que identifica al billete (Patron OID).
        /// </summary
        private string atrSerial = "-1";
        
        /// <summary>
        /// Més de Emisión.
        /// </summary
        private int atrMes = -1;

        /// <summary>
        /// Dia de Emisión.
        /// </summary
        private int atrDia = -1;
        #endregion

        #region Asociativos
        /// <summary>
        /// Atributo asociativo con la clase Persona.
        /// </summary
        protected clsPersona atrPropietario = null;
        /// <summary>
        /// Atributo asociativo con la clase Alcancia.
        /// </summary
        protected clsAlcancia atrAlcancia = null;
        #endregion

        #endregion
        //=================================================
        #region Metodos

        #region Utilitario
        public void generar()
        {
            atrAño = 1973;
            atrMes = 11;
            atrDia = 4;
            atrSerial = "QWERTY123";

        }
        #endregion

        #region Constructor
        /// <summary>
        /// Crea y devuelve una nueva instancia (objeto de Billete - No parametrizado).
        /// </summary>
        public clsBillete() 
        { 

        }
        /// <summary>
        /// Crea y devuelve una nueva instancia (objeto de Billete).
        /// </summary>
        /// <param name="prmDenominacion">Valor Monetario.</param>
        /// <param name="prmDia">Día de Emisión.</param>
        /// <param name="prmMes">Mes de Emisión</param>
        /// <param name="prmAño">Año de Emisión.</param>
        /// <param name="prmSerial">Número de Serie.</param
        public clsBillete(string prmSerial,int prmDenominacion, int prmDia, int prmMes, int prmAño )
        {
            atrDenominacion = prmDenominacion;
            atrAño = prmAño;
            atrMes = prmMes;
            atrDia=prmDia;
            atrSerial = prmSerial;
        }
        #endregion

        #region Acessores
        /// <summary>
        /// Devuelve el mes de emision del billete.
        /// </summary>
        /// <returns>Valor Entero</returns>
        public int darMes()
        {
            return atrMes;
        }

        /// <summary>
        /// Devuelve el dia de emision del billete.
        /// </summary>
        /// <returns>Valor Entero</returns>
        public int darDia()
        {
            return atrDia;
        }

        /// <summary>
        /// Devuelve el serial del billete. Funciona como un Identificador Único de Objeto (Patron OID).
        /// </summary>
        /// <returns>Valor Entero</returns>
        public string darSerial()
        {
            return atrSerial;
        }
        #endregion

        public clsBillete destruir()
        {
            return null;
        }

        #endregion
    }
}
