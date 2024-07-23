using appAlcancia.Dominio;
using System;


namespace appConsola.Dominio
{
    public class mnuPrefAlcancia:mnuPrincipal
    {
		
		void listaOpcionesPreferencias(int prmOpcion,appAlcancia prmAlcancia)
		{
			switch (prmOpcion)
			{
				case 1:
					prmAlcancia.CapacidadMonedas();
					break;
				case 2:
					prmAlcancia.DenominacionesAlcancia();
					break;
				case 3:
					prmAlcancia.PreferenciasAlcanciaMenu2();
					break;
				case 4:
					EscribirCon("AVISO Ha salido de este Menu.\n");
					EsperarTecla();
					Limpiarpantalla();
					break;
				default:
					Console.WriteLine("Opcion erronea\n");
					break;
			}
		}
		 void ConfigurarMenuPreferencias()
		{ 
			EscribirCon("appAlcancia - MENU PRINCIPAL\n");
			Console.WriteLine("1.Establecer Capicadad en Monedas.\n");
			Console.WriteLine("2.Establecer Denomincaciones Aceptadas.\n");
			Console.WriteLine("3.Ver Preferencias y Estado de la Alcancia.\n");
			Console.WriteLine("4.Regresar al Menu Anterio....\n");

		}

		public void EscribirMenuPreferencias(appAlcancia prmAlcancia)
		{
			Limpiarpantalla();
			int varOpcion;
			do
			{
				ConfigurarMenuPreferencias();
				varOpcion = LeerVariableEntero("Ingrese un valor entre [1..4] para <Opcion>");
				listaOpcionesPreferencias(varOpcion,prmAlcancia);
			} while (varOpcion != 4);
		}


	}
}
