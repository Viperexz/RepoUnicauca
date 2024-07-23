using Microsoft.VisualStudio.TestTools.UnitTesting;
using appAlcancia.Dominio;
namespace uTestAlcancia
{
    [TestClass]
    public class uTestSistemas
    {
        #region Obj de prueba
        clsSistema ObjSistema;
        clsPersona ObjPersona;
        clsMoneda ObjMoneda;
        clsBillete ObjBillete;
        #endregion

        #region testAcesores
        [TestMethod]
        public void uTestdarAlcancia()
        {
            ObjSistema = new clsSistema();
            ObjSistema.generar();
            Assert.AreNotEqual(null, ObjSistema.darAlcancia());
        }

        [TestMethod]
        public void uTestRecuperarPersona()
        {
            ObjSistema = new clsSistema();
            ObjPersona = new clsPersona();
            ObjSistema.generar();
            Assert.AreEqual(false, ObjSistema.recuperarAhorradorCon(10031));
        }
        #endregion

        #region testRecuperadores
        [TestMethod]
        public void uTestRecuperarMoneda()
        {
            ObjSistema = new clsSistema();
            ObjSistema.generar();
            ObjMoneda = new clsMoneda();
            Assert.AreEqual(true, ObjSistema.recuperarMonedaCon(500));
        }


        [TestMethod]
        public void uTestRecuperarBillete()
        {
            ObjSistema = new clsSistema();
            ObjBillete = new clsBillete();
            ObjSistema.generar();
            Assert.AreNotEqual(false, ObjSistema.recuperarBilleteCon(1000));
            Assert.AreNotEqual(null, ObjSistema.recuperarBilleteCon(1000));

        }
        #endregion

        #region testAsociadores

        [TestMethod]
        public void uTestAsociarNuevaPersona()
        {
            clsSistema Objeto = new clsSistema();
            Objeto.generar();
            Assert.AreEqual(true, Objeto.asociarAhorradorCon(new clsPersona()));
            Assert.AreEqual(true, Objeto.recuperarAhorradorCon(-1));
        }


        [TestMethod]
        public void uTestAsociarPersonaExistente()
        {
            clsSistema Objeto = new clsSistema();
            Objeto.generar();
            Assert.AreEqual(true, Objeto.asociarAhorradorCon(new clsPersona(10031,"Pablo")));
            Assert.AreEqual(true, Objeto.recuperarAhorradorCon(10031));
            Assert.AreEqual("Pablo", ObjPersona.darNombre());
        }


        [TestMethod]
        public void uTestAsociarMoneda()
        {
            clsSistema Objeto = new clsSistema();
            Objeto.generar();
            clsMoneda ObjAsociado = new clsMoneda(200, 2012);
            Assert.AreEqual(true, Objeto.asociarMonedaCon(ObjAsociado));
            clsMoneda ObjEsperado = new clsMoneda();
            Assert.AreEqual(true, Objeto.recuperarMonedaCon(200));
            Assert.AreEqual(ObjEsperado, ObjAsociado);
        }
        [TestMethod]
        public void uTestAsociarBilleteNuevo()
        {
            clsSistema Objeto = new clsSistema();
            Objeto.generar();
            Assert.AreEqual(true, Objeto.asociarBilleteCon(new clsBillete()));
            Assert.AreEqual(Objeto, Objeto.recuperarBilleteCon(-1));
        }

        #endregion

        #region testDisociar
        [TestMethod]
        public void uTestDisociarMonedasDenominacion()
        {
            clsSistema Objeto = new clsSistema();
            Objeto.generar();
            clsMoneda ObjAsociado = null;
            Assert.AreNotEqual(null, Objeto.disociarMonedaCon(100));
            Assert.AreEqual(100, ObjAsociado.darDenominacion());
        }
        #endregion

        #region testCRUD

        #region testRegistrador
        [TestMethod]
        public void utestRegistrarAlcancia()
        {
            ObjSistema = new clsSistema();
            ObjSistema.registrarAlcanciaCon(400, 100);
            Assert.AreEqual(true, ObjSistema.registrarAlcanciaCon(400, 100));
            Assert.AreEqual(400, ObjSistema.darAlcancia().darCapacidadMonedas());
            Assert.AreEqual(100, ObjSistema.darAlcancia().darCapacidadBilletes());
        }
        [TestMethod]
        public void utestRegistrarPersonaConOID()
        {
            ObjSistema = new clsSistema();
            Assert.AreEqual(true, ObjSistema.registrarAhorradorCon(0031, "Javier"));
            Assert.AreEqual(true, ObjSistema.recuperarAhorradorCon(0031));
        }

        [TestMethod]
        public void utestRegistrarMoneda()
        {
            ObjSistema = new clsSistema();
            Assert.AreEqual(true, ObjSistema.registrarMonedaCon(100, 1999));
            Assert.AreEqual(true, ObjSistema.recuperarMonedaCon(100));
        }

        [TestMethod]
        public void utestRegistrarBillete()
        {
            ObjSistema = new clsSistema();
            Assert.AreEqual(true, ObjSistema.registrarBilleteCon("103194",10000,2000,05,06));
            Assert.AreEqual(true, ObjSistema.recuperarBilleteCon("103194"));
        }
        #endregion

        #region testActualizar
        [TestMethod]
        public void utestActualizarPersona()
        {
            ObjSistema = new clsSistema();
            ObjSistema.generar();
            Assert.AreEqual(true,ObjSistema.actualizarAhorradorCon(5,"Jaime"));
            Assert.AreEqual("Jaime", ObjSistema.recuperarAhorradorCon(5).darNombre());
        }
        #endregion

        #region testEliminar
        //Todo -Implementar
        #endregion

        #endregion

    }

}
