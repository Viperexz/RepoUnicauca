using appAlcancia.Dominio;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace uTestAlcancia
{
    [TestClass]
    public class uTetstPersona
    {

        #region Obj
        private clsPersona ObjPersona;
        private clsBillete ObjBillete;
        private clsMoneda ObjMoneda;
        private clsAlcancia ObjAlcancia;
        #endregion

        #region testConstructor
       
        [TestMethod]
        public void uTestConstructor()
        {
            ObjPersona = new clsPersona();
            Assert.AreEqual(-1, ObjPersona.darOID());
            Assert.AreEqual("n.n", ObjPersona.darNombre());
        }
        [TestMethod]
        public void uTestConstructorPrm()
        {
            ObjPersona = new clsPersona(1000, "Luis");
            Assert.AreEqual(1000, ObjPersona.darOID());
            Assert.AreEqual("Luis", ObjPersona.darNombre());
        }
       
        #endregion

        #region testAccesores
        [TestMethod]
        public void uTestdarOID()
        {
            ObjPersona = new clsPersona();
            Assert.AreEqual(-1, ObjPersona.darOID());
        }
        [TestMethod]
        public void uTestdarNombre()
        {
            ObjPersona = new clsPersona();
            Assert.AreNotEqual(null, ObjPersona.darNombre());
        }
        #endregion

        #region testMutadores
        [TestMethod]
        public void uTestPonerNombre()
        {
            ObjPersona = new clsPersona();
            ObjPersona.ponerNombre("Luis");
            Assert.AreEqual("Luis", ObjPersona.darNombre());
        }

        [TestMethod]
        public void uTestPonerAlcancia()
        {
            ObjPersona = new clsPersona();
            ObjPersona.asociarAlcanciaCon(ObjAlcancia);
            Assert.AreEqual(ObjAlcancia, ObjPersona.darAlcancia());
        }

        #endregion

        #region testAsociar
      
        [TestMethod]
        public void uTestAsociarMoneda()
        {
            clsPersona Objeto = new clsPersona();
            Objeto.generar();
            clsMoneda ObjAsociado = new clsMoneda(200, 2012);
          //  Assert.AreEqual(true, Objeto.asociar(ObjAsociado));
            clsMoneda ObjEsperado = new clsMoneda();
            Assert.AreEqual(true, Objeto.recuperarMonedaCon(200));
            Assert.AreEqual(ObjEsperado, ObjAsociado);
        }
        [TestMethod]
        public void uTestAsociarBillete()
        {
            clsPersona Objeto = new clsPersona();
            Objeto.generar();
            clsBillete ObjAsociado = new clsBillete("10031",10000, 2000, 05, 12);
            //Assert.AreEqual(true, Objeto.asociar(ObjAsociado));
            clsBillete ObjEsperado = new clsBillete();
            Assert.AreEqual(true, Objeto.recuperarBilleteCon(10000));
            Assert.AreEqual(ObjEsperado, ObjAsociado);
        }

        #endregion

        #region Disociadores
        [TestMethod]
        public void uTestDisociarMoneda()
        {
            clsPersona Objeto = new clsPersona();
            Objeto.generar();
            clsMoneda ObjAsociado = null;
            Assert.AreEqual(true, Objeto.disociarMonedaCon(100));
            Assert.AreEqual(100, ObjAsociado.darDenominacion());
        }

        [TestMethod]
        public void uTestDisociarBillete()
        {
            clsPersona Objeto = new clsPersona();
            Objeto.generar();
            clsBillete ObjAsociado = null;
            Assert.AreEqual(true, Objeto.disociarBilleteCon(1000));
            Assert.AreEqual(1000, ObjAsociado.darDenominacion());
        }
        #endregion

        #region testRecuperadores
        [TestMethod]
        public void uTestRecuperarMoneda()
        {

            ObjPersona = new clsPersona();
            ObjMoneda = new clsMoneda();
            ObjPersona.generar();
            Assert.AreNotEqual(false, ObjPersona.recuperarMonedaCon(500));

        }

        [TestMethod]
        public void uTestRecuperarBillete()
        {

            ObjPersona = new clsPersona();
            ObjBillete = new clsBillete();
            ObjPersona.generar();
            Assert.AreNotEqual(false, ObjPersona.recuperarBilleteCon(1000));

        }
        #endregion

    }
}