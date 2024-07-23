using appAlcancia.Dominio;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace uTestAlcancia
{
    [TestClass]
    public class uTetstBillete
    {
        #region OBJ
        private clsBillete ObjBillete;
        #endregion

        #region testConstructor
        [TestMethod]
        public void uTestConstructor()
        {
            ObjBillete = new clsBillete();
            Assert.AreEqual(-1, ObjBillete.darDenominacion());
            Assert.AreEqual(-1, ObjBillete.darAño());
            Assert.AreEqual(-1, ObjBillete.darMes());
            Assert.AreEqual(-1, ObjBillete.darDia());
            Assert.AreEqual("-1", ObjBillete.darSerial());
        }
        [TestMethod]
        public void uTestConstructorPrm()
        {
            ObjBillete = new clsBillete("1000", 1000, 2000, 02, 15);
            Assert.AreEqual(1000, ObjBillete.darDenominacion());
            Assert.AreEqual(2000, ObjBillete.darAño());
            Assert.AreEqual(02, ObjBillete.darMes());
            Assert.AreEqual(15, ObjBillete.darDia());
            Assert.AreEqual("1000", ObjBillete.darSerial());
        }
        #endregion

        #region testAcesor

        [TestMethod]
        public void uTestdarMes()
        {
            ObjBillete = new clsBillete();
            Assert.AreEqual(-1, ObjBillete.darMes());
        }
        [TestMethod]
        public void uTestdarDia()
        {
            ObjBillete = new clsBillete();
            Assert.AreEqual(-1, ObjBillete.darDia());
        }
        #endregion

    }
}