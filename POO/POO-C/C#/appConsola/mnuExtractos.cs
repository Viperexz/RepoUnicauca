using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace appConsola.Dominio
{
	public class mnuExtractos:mnuPrincipal
    {
		
		void listaOpcionesExtractos(int prmOpcion, appAlcancia prmAlcancia)
		{
			switch (prmOpcion)
			{
				case 1:
					prmAlcancia.PrimeraOpcion();
					break;
				case 2:
					prmAlcancia.SegundaOpcion();
					break;
				case 3:
					prmAlcancia.MonedasAlmacenadas();
					break;
				case 4:
					prmAlcancia.CuartaOpcion();
					break;
				case 5:
					EscribirCon("AVISO Ha salido de este Menu.\n");
					EsperarTecla();
					Limpiarpantalla();
					break;
				default:
					Console.WriteLine("Opcion erronea\n");
					break;
			}
		}

		void ConfigurarMenuExtractos()
		{
			EscribirCon("MENU EXTRACTOS ALCANCIA\n");
			Console.WriteLine("1.Saldo total Y Cantidad de Monedas e indice de llenado.\n");
			Console.WriteLine("2..Saldo Total y Cantidad de monedas por Denominacion.\n");
			Console.WriteLine("3.Detalle Monedas almacenadas.\n");
			Console.WriteLine("4.Ver Informe completo.\n");
			Console.WriteLine("5.Regresar al Menu Anterior...\n");
		}

		public void EscribirMenuExtractos(appAlcancia prmAlcancia)
		{
			int atrOpciones;
			Limpiarpantalla();
			do
			{
				ConfigurarMenuExtractos();
				atrOpciones = LeerVariableEntero("Ingrese un valor entre [1..5] para <Opcion>");
				listaOpcionesExtractos(atrOpciones, prmAlcancia);
			} while (atrOpciones != 5);
		}

	}
}
