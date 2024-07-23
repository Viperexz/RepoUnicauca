using appAlcancia.Dominio;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace uTestAlcancia
{
    
    [TestClass]
   public  class uTestMoneda
    {
        #region OBJ
        private clsMoneda ObjMoneda;
        private clsPersona ObjPersona;
        private clsAlcancia ObjAlcancia;
        #endregion

        #region testConstructor
        [TestMethod]
        public void uTestConstructor()
        {
            ObjMoneda = new clsMoneda();
            Assert.AreEqual(-1, ObjMoneda.darDenominacion());
            Assert.AreEqual(-1, ObjMoneda.darAño());
        }
        [TestMethod]
        public void uTestConstructorPrm()
        {
            ObjMoneda = new clsMoneda(100,2000);
            Assert.AreEqual(100, ObjMoneda.darDenominacion());
            Assert.AreEqual(2000, ObjMoneda.darAño());
        }
        #endregion

        #region testAcesor
        [TestMethod]
        public void uTestdarDenominacion()
        {
            ObjMoneda = new clsMoneda();
            Assert.AreEqual(-1, ObjMoneda.darDenominacion());
        }
        [TestMethod]
        public void uTestdarAño()
        {
            ObjMoneda = new clsMoneda();
            Assert.AreEqual(-1, ObjMoneda.darAño());
        }
        [TestMethod]
        public void uTestdarPropietario()
        {
            ObjMoneda = new clsMoneda();
            ObjMoneda.generar();
            Assert.AreNotEqual(null, ObjMoneda.darPropietario());
        }

        [TestMethod]
        public void uTestdarAlcancia()
        {
            ObjMoneda = new clsMoneda();
            ObjMoneda.generar();
            Assert.AreNotEqual(null, ObjMoneda.darAlcancia());
        }
        #endregion

        #region testMutador
        [TestMethod]
        public void uTestPonerNombre()
        {
            ObjMoneda = new clsMoneda();
            ObjPersona = new clsPersona();
            Assert.AreEqual(true, ObjMoneda.asociarPropietarioCon(ObjPersona));   
            Assert.AreEqual(ObjPersona, ObjMoneda.darPropietario());
        }

        [TestMethod]
        public void uTestPonerAlcancia()
        {
            ObjMoneda = new clsMoneda();
            ObjAlcancia = new clsAlcancia();
            //Assert.AreEqual(true, ObjMoneda.asociaAlcanciaCon(ObjAlcancia));
            Assert.AreEqual(ObjAlcancia, ObjMoneda.darAlcancia());
        }

        #endregion


    }

}
