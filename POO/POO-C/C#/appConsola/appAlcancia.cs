using appAlcancia.Dominio;
using appConsola.Dominio;
using System.Collections.Generic;
using System;
using System.Linq;

namespace appConsola.Dominio
{
	public class appAlcancia
	{
        #region Asociativos
        //Variables locales
        int atrDenomincionesAceptadas = 0;
		clsConsola atrConsola = new clsConsola();
		clsSistema atrSistema = new clsSistema();
		public int atrCapacidadMonedas=0,atrCapacidadBilletes=0,atrNumerodeMonedas=0;
		float atrIndicedellenado = 0;
		List<int> vecDenominaciones = new List<int>();
		List<clsMoneda> atrHistorialMonedas = new List<clsMoneda>();
		List<clsBillete> atrHistorialBilletes = new List<clsBillete>();
        #endregion

        #region Impresion
        public void ImpTotalMonedas()
		{
			atrConsola.EscribirCon("El valor de <Numero Total de Monedas> es: "+atrNumerodeMonedas+"\n");
		}
		public void ImpTotalBilletes()
		{
			atrConsola.EscribirCon("El valor de <Numero Total de Monedas> es: "+ atrSistema.darBilletes().Count +"\n");
		}

		public void ImpSaldoTotal()
		{
			int atrSaldoTotal = 0;
			for (int varContador1 = 0; varContador1 < atrSistema.darMonedas().Count; varContador1++)
			{
				atrSaldoTotal = atrSaldoTotal + (atrSistema.darMonedas()[varContador1].darDenominacion());
				atrConsola.EscribirCon("El valor de <Saldo Total de Monedas> es: " + atrSaldoTotal + "\n");
			}
		}

		public void ImpIndiceLlenado()
		{
			atrIndicedellenado = 0;
			if (atrCapacidadMonedas != 0)
			{
				atrIndicedellenado = (atrNumerodeMonedas * 100) / atrCapacidadMonedas;
			}
			atrConsola.EscribirCon("El valor de <Indice (%) de llenado de Alcancia> es: " + atrIndicedellenado + "\n");
			atrConsola.EsperarTecla();
		}

		public void ImpresionVectorDenominaciones()
		{
			int varAux = 0;
			atrConsola.EscribirCon("AVISO: Impresion de Datos Provenientes del Vector <Cantidad Monedas x Denominacion de>\n");
			for (int varContador1 = 0; varContador1 < atrSistema.darMonedas().Count; varContador1++)
			{
				if (vecDenominaciones[varContador1] == atrSistema.darMonedas()[varContador1].darDenominacion())
                {
					varAux++;
                }
                else
                {
					Console.WriteLine("Cantidad Monedas x Denominacion de [" + vecDenominaciones[varContador1] + "] " + 0 + "\n");
				}
				Console.WriteLine("Cantidad Monedas x Denominacion de [" + vecDenominaciones[varContador1]+"] "+varAux+"\n");
				varAux = 0;
			}
			atrConsola.Escribir("-------------------------------------------------------------------------------\n");
			atrConsola.EsperarTecla();
		}

		public void ImpVecDenoTotal()
		{
			atrConsola.EscribirCon("AVISO: Impresion de Datos Provenientes del Vector <Saldo Monedas x Denominacion de>\n");
			for (int varContador = 0; varContador <atrNumerodeMonedas; varContador++)
			{
				Console.WriteLine("<Saldo monedas x Denominaciones>" + vecDenominaciones[varContador], (vecDenominaciones[varContador] * atrSistema.darMonedas()[varContador].darDenominacion()));
			}
			atrConsola.Escribir("-------------------------------------------------------------------------------\n");
			atrConsola.EsperarTecla();
		}

		public void ImpVecHistorial()
		{
			
			for (int varContador = 0; varContador < atrCapacidadBilletes; varContador++)
			{
				Console.WriteLine(" Moneda \n", varContador + 1, atrHistorialMonedas[varContador]);
			}

			for (int varContador = 0; varContador < atrHistorialBilletes.Count; varContador++)
			{
				Console.WriteLine(" Billetes\n", varContador + 1, atrHistorialBilletes[varContador]);
			}
		}

		public void ImprimirDatosParciales()
		{
			atrConsola.Escribir("-------------------------------------------------------------------------------\n");
			ImpTotalMonedas();
			ImpSaldoTotal();
			ImpIndiceLlenado();
			atrConsola.Escribir("-------------------------------------------------------------------------------\n");
			atrConsola.EsperarTecla();
		}
        #endregion

        #region mnuPreferencias
        //MENU PREFERENCIAS *******************************************************************************

        public void CapacidadMonedas()
		{
			atrConsola.Limpiarpantalla(); 
			atrConsola.EscribirCon("Ejecutando: CONFIGURAR LA CAPACIDAD EN MONEDAS PARA LA ALCANCIA\n");
			atrCapacidadMonedas = atrConsola.LeerEntero("Ingrese un valor entre [1..1000] para <Capacidad Monedas>");
			if (atrCapacidadMonedas> 1000)
			{
				atrConsola.EscribirCon("ALERTA Valor superado\n");
				atrCapacidadMonedas = 0;
			}
			else
			{
				atrConsola.EscribirCon("CONFIRMACION La Capacidad de la Alcancia se establecio con Exito\n");
			}
			atrNumerodeMonedas = 0;
			atrConsola.EsperarTecla(); 
			atrConsola.Limpiarpantalla(); 
		}

		public void DenominacionesAlcancia()
		{
			atrConsola.Limpiarpantalla();
			atrConsola.EscribirCon("Ejecutando: CONFIGURAR DENOMINACIONES ACPETADAS\n");
			atrDenomincionesAceptadas = atrConsola.LeerEntero("Ingrese un valor entre [1..6] para <DENOMINACIONES ACEPTADAS>");
			if (atrDenomincionesAceptadas > 6)
			{
				atrConsola.EscribirCon("ALERTA: Valor superado\n");
				atrDenomincionesAceptadas = 0;
			}
			else
			{
				atrConsola.EscribirCon("CONFIRMACION La cantidad de denominaciones aceptadas por la Alcancia se ha establecido con exito\n");
				atrConsola.EsperarTecla();
				atrConsola.Limpiarpantalla();
				atrConsola.EscribirCon("Ejecutando: DENOMINACIONES ACEPTADAS POR LA ALCANCIA\n");
				for (int varContadorIn = 0; varContadorIn < atrDenomincionesAceptadas; varContadorIn++)
				{
					int atrAux;
					atrAux = atrConsola.LeerEntero("Ingrese un valor entre [1..1000] para <Denominacion> [" + varContadorIn + "] ");
					if (atrAux > 1000)
					{
						atrConsola.EscribirCon("ALERTA: Valor superado\n");
					}
					else
					{
						vecDenominaciones.Add(atrAux);
					}
				}
			}
			atrConsola.EsperarTecla();
			atrConsola.Limpiarpantalla();
		}

		public void PreferenciasAlcanciaMenu2()
		{
			int varAux = 0;
			atrConsola.Limpiarpantalla();
			atrConsola.EscribirCon("Ejecutando: PreferenciasAlcancia\n");
			atrConsola.Escribir("El valor de <Capacidad de Monedas> es: "+ atrCapacidadMonedas+"\n");
			atrConsola.Escribir("El valor de <Numero Total de Monedas> es: "+ atrNumerodeMonedas + "\n");
			ImpSaldoTotal();
			atrIndicedellenado = (atrNumerodeMonedas * 100) / atrCapacidadMonedas;
			atrConsola.Escribir("El valor de <Indice (%) de llenado de Alcancia> es: "+atrIndicedellenado + "\n");
			atrConsola.Escribir("El valor de <Denomiaciones aceptadas> es; "+ atrDenomincionesAceptadas + "\n");
			atrConsola.EscribirCon("[AVISO: Impresion de Datos Provenientes del Vector <Cantidad Monedas x Denominacion de>] " + "\n");
			for (int varContador1 = 0; varContador1 < atrSistema.darMonedas().Count; varContador1++)
			{
				if (vecDenominaciones[varContador1] == atrSistema.darMonedas()[varContador1].darDenominacion())
				{
					varAux++;
				}
				else
				{
					Console.WriteLine("Cantidad Monedas x Denominacion de [" + vecDenominaciones[varContador1] + "] " + 0 + "\n");
				}
				Console.WriteLine("Cantidad Monedas x Denominacion de [" + vecDenominaciones[varContador1] + "] " + varAux + "\n");
				varAux = 0;
			}
			atrConsola.EscribirCon("AVISO: Final de Datos Vector\n");
			atrConsola.EsperarTecla();
			atrConsola.Limpiarpantalla();
		}
        #endregion

        #region mnuExtractos
        //MENU EXTRACTOS *******************************************************************************

        public void PrimeraOpcion()
		{
			atrConsola.Limpiarpantalla();
			atrConsola.EscribirCon("Ejecutando: EXTRACTO DE SALDO Y CANTIDAD TOTAL DE MONEDAS\n");
			ImpTotalMonedas();
			ImpSaldoTotal();
			ImpIndiceLlenado();
			atrConsola.Limpiarpantalla();

		}

		public void SegundaOpcion()
		{
			atrConsola.Limpiarpantalla();
			atrConsola.EscribirCon("Ejecutando: EXTRACTO DE SALDO Y CANTIDAD TOTAL DE MONEDAS POR DENOMINACION\n");
			ImpresionVectorDenominaciones();
			ImpVecDenoTotal();
			atrConsola.Limpiarpantalla();
		}


		public void MonedasAlmacenadas()
		{
			atrConsola.Limpiarpantalla();
			atrConsola.EscribirCon("Ejecutando: EXTRACTO DE SALDO Y CANTIDAD TOTAL DE MONEDAS\n");
			ImpVecHistorial();
			atrConsola.EscribirCon("AVISO: Fin de Datos del Vector\n");
			atrConsola.EsperarTecla();
			atrConsola.Limpiarpantalla();
		}

		public void CuartaOpcion()
		{
			atrConsola.Limpiarpantalla();
			atrConsola.EscribirCon("Ejecutando: Informe Completo\n");
			ImpTotalMonedas();
			ImpSaldoTotal();
			ImpIndiceLlenado();
			ImpresionVectorDenominaciones();
			ImpVecDenoTotal();
			ImpVecHistorial();
			atrConsola.Limpiarpantalla();
		}
        #endregion

        #region mnuPrincipal
        //MENU PRINCIPAL *******************************************************************************

        public void IngresarMoneda()
		{
			atrConsola.Limpiarpantalla();
			int varDenominacion = 0, varAño=0, varAux2 = 0;
			atrConsola.EscribirCon("Ejecutando: INSERTAR MONEDA EN MONEDAS ALCANCIA\n");
			Console.Write("Ingrese un valor para Denominacion contemplado entre");
			
			for (int varContador = 0; varContador < vecDenominaciones.Count; varContador++)
			{
				Console.Write("["+vecDenominaciones[varContador]+"]");

			}
			varDenominacion = atrConsola.LeerEntero("");
			atrConsola.Escribir("Ingrese el año de creacion de la moneda");
			varAño = atrConsola.LeerEntero("");
			if (atrNumerodeMonedas >= atrCapacidadMonedas)
			{
				atrConsola.Limpiarpantalla();
				atrConsola.Escribir("Error la moneda no se ha podido ingresar debido a:\n");
				atrConsola.Escribir("No hay espacio en la alcancia:\n");
				atrConsola.EsperarTecla();
			}
			else
			{
				for (int varContador = 0; varContador < atrDenomincionesAceptadas; varContador++)
				{
					varAux2 = vecDenominaciones[varContador];

					if (varDenominacion == varAux2)
					{
						atrSistema.registrarMonedaCon(varDenominacion,varAño);
						atrHistorialMonedas = atrSistema.darMonedas();
						atrConsola.EscribirCon("CONFIRMACION: La Moneda ha sido ingresada exitosamente.\n");
						atrNumerodeMonedas++;
					}
                    else
                    {
						atrConsola.EscribirCon("Aviso:La denominacion ingresada no existe.\n");
					}
				}
				ImpresionVectorDenominaciones();
				ImprimirDatosParciales();
				atrConsola.Limpiarpantalla();

			}

		}

		public void ExtraerMoneda()
		{
			atrConsola.Limpiarpantalla();
			int varMoneda = 0, varAux = 0, varAux2 = 0;
			ImpresionVectorDenominaciones();
			atrConsola.EscribirCon("Ejecutando: EXTRAER MONEDA DE LA ALCANCIA\n");
			atrConsola.Escribir("Ingrese un valor para Denominacion contemplado entre\n");
			for (int varContador = 0; varContador < atrDenomincionesAceptadas; varContador++)
			{
				Console.WriteLine(vecDenominaciones[varContador]);
			}
			varMoneda = atrConsola.LeerEntero("");
			for (int varContador = 0; varContador < atrDenomincionesAceptadas; varContador++)
			{
				varAux2 = vecDenominaciones[varContador];
				if (varMoneda == varAux2)
				{
					varAux = atrSistema.recuperarMonedaCon(varMoneda).darDenominacion();
					if (varAux == 0)
					{
						atrConsola.Escribir("No hay monedas con esta denominacion\n");
					}
					else
					{
						atrSistema.eliminarMonedaCon(varMoneda);
						atrConsola.EscribirCon("Aviso: Moneda Extraida\n");
						atrNumerodeMonedas--;
						ImprimirDatosParciales();
						atrConsola.Limpiarpantalla();
					}

				}
			}
			atrConsola.Limpiarpantalla();
		}

        #endregion

    }
}
