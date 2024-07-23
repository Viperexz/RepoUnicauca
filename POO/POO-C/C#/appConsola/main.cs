using appAlcancia.Dominio;
namespace appConsola.Dominio
{
 
    public class main
    {
        public static void Main()
        {
            appAlcancia atrAlcancia = new appAlcancia();
            mnuPrincipal atrPrincipal = new mnuPrincipal();
            mnuPrefAlcancia mnuPref = new mnuPrefAlcancia();
            mnuExtractos mnuEx = new mnuExtractos();

            atrPrincipal.EscribirMenuPrincipal(atrAlcancia,mnuPref,mnuEx);

        }
      
    }
}
