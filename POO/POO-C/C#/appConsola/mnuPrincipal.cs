using System;
using appConsola.Dominio;
namespace appConsola.Dominio
{
	public class mnuPrincipal:clsConsola
	{
		void listaOpcionesPrincipal(int prmOpcion,appAlcancia prmAlcancia, mnuPrefAlcancia prmPref, mnuExtractos prmEx)
		{
			switch (prmOpcion)
			{
				case 1:
					prmPref.EscribirMenuPreferencias(prmAlcancia);
					break;
				case 2:
					prmAlcancia.IngresarMoneda();
					break;
				case 3:
					prmAlcancia.ExtraerMoneda();
					break;
				case 4:
					prmEx.EscribirMenuExtractos(prmAlcancia);
					break;
				default:
					Console.WriteLine("Opcion erronea\n");
					break;
			}
		}

		void ConfigurarMenuPrincipal()
		{
			EscribirCon("appAlcancia - MENUPRINCIPAL\n");
			Console.WriteLine( "1.Establecer Preferencias de la Alcancia --->.\n");
			Console.WriteLine("2.Introducir Moneda.\n");
			Console.WriteLine("3.Extraer Moneda.\n");
			Console.WriteLine("4.Extractos.\n");
			Console.WriteLine("5.Salir.\n");
		}

		public void EscribirMenuPrincipal(appAlcancia prmAlcancia,mnuPrefAlcancia prmPref,mnuExtractos prmEx)
		{
			int atrOpciones = 0;
			Limpiarpantalla();
			do
			{
				ConfigurarMenuPrincipal();
				atrOpciones = LeerVariableEntero("Ingrese un valor entre [1..5] para <Opcion>");
				listaOpcionesPrincipal(atrOpciones,prmAlcancia,prmPref,prmEx);
			} while (atrOpciones != 5);
		}

	}
}
