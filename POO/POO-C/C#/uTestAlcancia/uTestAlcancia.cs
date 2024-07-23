using appAlcancia.Dominio;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace uTestAlcancia
{
    [TestClass]
    public class uTetstAlcancia
    {
        #region OBJ
        private clsAlcancia ObjAlcancia;
        private clsPersona ObjPersona;
        private clsMoneda ObjMoneda;
        private clsBillete ObjBillete;
        #endregion

        #region testConstructores

        [TestMethod]
        public void uTestConstructor()
        {
            ObjAlcancia = new clsAlcancia();
            Assert.AreEqual(-1, ObjAlcancia.darCapacidadMonedas());
            Assert.AreEqual(-1, ObjAlcancia.darCapacidadBilletes());
        }

        [TestMethod]
        public void uTestConstructorPrm()
        {
            ObjAlcancia = new clsAlcancia(10, 10);
            Assert.AreEqual(10, ObjAlcancia.darCapacidadMonedas());
            Assert.AreEqual(10, ObjAlcancia.darCapacidadBilletes());
        }
        #endregion

        #region testAccesores
        [TestMethod]
        public void uTestdarCapacidadMonedas()
        {
            ObjAlcancia = new clsAlcancia();
            Assert.AreEqual(-1, ObjAlcancia.darCapacidadMonedas());
        }
        [TestMethod]
        public void uTestdarCapacidadBilletes()
        {
            ObjAlcancia = new clsAlcancia();
            Assert.AreEqual(-1, ObjAlcancia.darCapacidadBilletes());
        }
        #endregion

        #region testAsociar
        [TestMethod]

        public void uTestAsociarPersona()
        {
            clsAlcancia Objeto = new clsAlcancia();
            Objeto.generar();
            clsPersona ObjAsociado = new clsPersona(10031, "Oscar");
            Assert.AreEqual(true, Objeto.asociarAhorradorCon(ObjAsociado));
            clsPersona ObjEsperado = new clsPersona();
            Assert.AreEqual(true, Objeto.recuperarAhorradorCon(10031));
            Assert.AreEqual(ObjEsperado, ObjAsociado);
        }

        [TestMethod]
        public void uTestAsociarMoneda()
        {
            clsAlcancia Objeto = new clsAlcancia();
            Objeto.generar();
            clsMoneda ObjAsociado = new clsMoneda(200, 2012);
            Assert.AreEqual(true, Objeto.asociarMonedaCon(ObjAsociado));
            clsMoneda ObjEsperado = new clsMoneda();
            Assert.AreEqual(true, Objeto.recuperarMonedaCon(200));
            Assert.AreEqual(ObjEsperado, ObjAsociado);
        }
        [TestMethod]
        public void uTestAsociarBillete()
        {
            clsAlcancia Objeto = new clsAlcancia();
            Objeto.generar();
            clsBillete ObjAsociado = new clsBillete("10031",10000, 2000, 05, 12 );
            Assert.AreEqual(true, Objeto.asociarBilleteCon(ObjAsociado));
            clsBillete ObjEsperado = new clsBillete();
            Assert.AreEqual(true, Objeto.recuperarBilleteCon(10000));
            Assert.AreEqual(ObjEsperado, ObjAsociado);
        }

        #endregion

        #region testDisociadores
        [TestMethod]
        public void uTestDisociarPersona()
        {
            clsAlcancia Objeto = new clsAlcancia();
            Objeto.generar();
            clsPersona ObjAsociado = null;
            Assert.AreEqual(true, Objeto.disociarAhorradorCon(10030));
            Assert.AreEqual(10030, ObjAsociado.darOID());
        }
        [TestMethod]
        public void uTestDisociarMoneda()
        {
            clsAlcancia Objeto = new clsAlcancia();
            Objeto.generar();
            clsMoneda ObjAsociado = null;
            Assert.AreEqual(true, Objeto.disociarAhorradorCon(100));
            Assert.AreEqual(100, ObjAsociado.darDenominacion());
        }
        [TestMethod]
        public void uTestDisociarBillete()
        {
            clsAlcancia Objeto = new clsAlcancia();
            Objeto.generar();
            clsBillete ObjAsociado = null;
            Assert.AreEqual(true, Objeto.disociarBilleteCon(1000));
            Assert.AreEqual(1000, ObjAsociado.darDenominacion());
        }
        #endregion

        #region testRecuperadores

        [TestMethod]
        public void uTestRecuperarPersona()
        {
            ObjAlcancia = new clsAlcancia();
            ObjPersona = new clsPersona();
            ObjAlcancia.generar();
            Assert.AreNotEqual(false, ObjAlcancia.recuperarAhorradorCon(10030));
        }


        
        [TestMethod]
        public void uTestRecuperarMoneda()
        {
            ObjAlcancia = new clsAlcancia();
            ObjAlcancia.generar();
            ObjMoneda = new clsMoneda();
            Assert.AreEqual(true, ObjAlcancia.recuperarMonedaCon(500));
        }

        
        [TestMethod]
        public void uTestRecuperarBillete()
        {
            ObjAlcancia = new clsAlcancia();
            ObjBillete = new clsBillete();
            ObjAlcancia.generar();
            Assert.AreNotEqual(false, ObjAlcancia.recuperarBilleteCon(1000));
            Assert.AreNotEqual(null, ObjAlcancia.recuperarBilleteCon(1000));

        }
        #endregion

       

        
    }
}