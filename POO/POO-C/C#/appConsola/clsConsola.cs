using System;

namespace appConsola.Dominio
{
	public class clsConsola
	{
		public void Limpiarpantalla()
		{
			Console.Clear();
		}

		public void EsperarTecla()
		{
			Console.WriteLine("Presione cualquier tecla...");
			Console.ReadKey();
		}

		public void Escribir(string prmEtiqueta)
		{
			Console.Write(prmEtiqueta);
		}


		public void EscribirCon(string prmEtiqueta)
		{
			Console.Write("*********************************************************************************\n");
			Escribir(prmEtiqueta);
			Console.Write("*********************************************************************************\n");
		}

		public int LeerEntero(string prmEtiqueta)
		{
			Console.Write(prmEtiqueta + ":-");
			int varResultado = int.Parse(Console.ReadLine());
			return varResultado;
		}

		public double LeerFlotante(string prmEtiqueta)
		{
			Console.Write(prmEtiqueta+":-");
			double varResultado = Convert.ToDouble(Console.ReadLine());
			return varResultado;
		}

		public string LeerCaracter(string prmFormato, string prmEtiqueta)
		{

			Console.Write(prmFormato, prmEtiqueta);
			string varResultado = Console.ReadLine();
			Console.Write(varResultado); 
			return varResultado;
		}

		public int LeerVariableEntero(string prmEtiqueta)
		{
			int varResultado;
			Console.Write("***************************************\n");
			varResultado = LeerEntero(prmEtiqueta);
			return varResultado;
		}

		public double LeerVariableFlotante(string prmEtiqueta)
		{
			double varResultado;
			Console.Write("***************************************\n");
			varResultado = LeerFlotante(prmEtiqueta);
			return varResultado;
		}

		public string LeerVariableCaracter(string prmFormato, string prmEtiqueta)
		{
			string varResultado;
			Console.Write("***************************************\n");
			varResultado = LeerCaracter(prmFormato, prmEtiqueta);
			return varResultado;
		}

	}
}
