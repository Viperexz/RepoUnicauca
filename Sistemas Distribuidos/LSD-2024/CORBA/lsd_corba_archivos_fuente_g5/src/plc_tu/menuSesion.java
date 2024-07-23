package plc_tu;

import org.omg.CORBA.ORB;
import org.omg.CORBA.ORBPackage.InvalidName;
import org.omg.CORBA.Object;
import org.omg.CosNaming.NameComponent;
import org.omg.CosNaming.NamingContextExt;
import org.omg.CosNaming.NamingContextExtHelper;
import org.omg.CosNaming.NamingContextPackage.CannotProceed;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.omg.PortableServer.POA;
import org.omg.PortableServer.POAHelper;
import org.omg.PortableServer.POAManagerPackage.AdapterInactive;
import org.omg.PortableServer.POAPackage.ServantNotActive;
import org.omg.PortableServer.POAPackage.WrongPolicy;
import plc_mms.sop_corba.GestionPlcTu;
import plc_mms.sop_corba.GestionPlcTuHelper;
import plc_mms.sop_corba.GestionUsuarios;
import plc_mms.sop_corba.GestionUsuariosHelper;

import plc_tu.sop_corba.GestionAlertas;
import plc_tu.sop_corba.GestionAlertasHelper;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.rmi.RemoteException;

public class menuSesion extends JFrame {
    private JButton a3SalirButton;
    private JButton a1AbrirSesionButton;
    private JButton a2MenuUsuarioButton;
    private JPanel SesionPane;


    public menuSesion(GestionUsuarios objGestion, GestionPlcTu objTu, GestionAlertas objAlertas) {
        setContentPane(SesionPane);
        setTitle("Login");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(300, 250);
        setLocationRelativeTo(null);
        setVisible(true);

        a1AbrirSesionButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new Login(objGestion, objTu, objAlertas);
                dispose();
            }
        });
        a2MenuUsuarioButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    new menuUsuario(objTu, objAlertas);
                } catch (RemoteException ex) {
                    throw new RuntimeException(ex);
                }
                dispose();
            }
        });
        a3SalirButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose();
            }
        });
    }


    public static void main(String[] args) {
        try {
            System.out.println("1. Crea e inicia el ORB");
            ORB orb = ORB.init(args, null);

            System.out.println("2. Obtiene una referencia al servicio de nombrado por medio del orb");
            Object objRefNameService = orb.resolve_initial_references("NameService");

            POA rootpoa = POAHelper.narrow(orb.resolve_initial_references("RootPOA"));
            System.out.println("3. Activa el POAManager");
            rootpoa.the_POAManager().activate();
            System.out.println("3. Convierte la ref genErica a ref de NamingContextExt");
            NamingContextExt refContextoNombrado = NamingContextExtHelper.narrow(objRefNameService);

            System.out.println("4. Resuelve la referencia del objeto en el N_S.");

            String identificadorServant = "ServUsuarios";
            String identificadorServant1 = "ServGesTU";

            NameComponent path[] = refContextoNombrado.to_name(identificadorServant);
            NameComponent path1[] = refContextoNombrado.to_name(identificadorServant1);

            Object objRef = refContextoNombrado.resolve(path);
            Object objRef1 = refContextoNombrado.resolve(path1);

            System.out.println("5. Convierte la referencia de un objeto genErico a una referencia al servant ");

            GestionUsuarios objUsuarios = GestionUsuariosHelper.narrow(objRef);
            System.out.println("Se obtuvo Obj usuarios");


            GestionPlcTu objTu = GestionPlcTuHelper.narrow(objRef1);
            System.out.println("Se obtuvo Obj Tu");
            System.out.println("InvocaciOn de los metodos como si fueran locales");


            System.out.println("7. Crea el objeto servant callback");
            UsuarioCllbckImpl objRefCllbck = new UsuarioCllbckImpl();
            objRefCllbck.setORB(orb);

            System.out.println("8. Convierte la referencia de un objeto genErico a una referencia al servant callback");
            Object ref = rootpoa.servant_to_reference(objRefCllbck);
            GestionAlertas objAlertasCallback = GestionAlertasHelper.narrow(ref);
            new menuSesion(objUsuarios, objTu, objAlertasCallback);

        } catch (InvalidName | CannotProceed | org.omg.CosNaming.NamingContextPackage.InvalidName | NotFound e) {
            System.out.println("ERROR : " + e.getMessage());
            e.printStackTrace(System.out);
        } catch (
                WrongPolicy e) {
            throw new RuntimeException(e);
        } catch (
                AdapterInactive e) {
            throw new RuntimeException(e);
        } catch (
                ServantNotActive e) {
            throw new RuntimeException(e);
        }

    }


    {
// GUI initializer generated by IntelliJ IDEA GUI Designer
// >>> IMPORTANT!! <<<
// DO NOT EDIT OR ADD ANY CODE HERE!
        $$$setupUI$$$();
    }

    /**
     * Method generated by IntelliJ IDEA GUI Designer
     * >>> IMPORTANT!! <<<
     * DO NOT edit this method OR call it in your code!
     *
     * @noinspection ALL
     */
    private void $$$setupUI$$$() {
        final JPanel panel1 = new JPanel();
        panel1.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 1, new Insets(0, 0, 0, 0), -1, -1));
        SesionPane = new JPanel();
        SesionPane.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(4, 1, new Insets(15, 40, 15, 40), -1, -1));
        panel1.add(SesionPane, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
        final JLabel label1 = new JLabel();
        label1.setText("MENU ABRIR SESION");
        SesionPane.add(label1, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        a3SalirButton = new JButton();
        a3SalirButton.setText("3. Salir");
        SesionPane.add(a3SalirButton, new com.intellij.uiDesigner.core.GridConstraints(3, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        a1AbrirSesionButton = new JButton();
        a1AbrirSesionButton.setText("1. Abrir Sesion");
        SesionPane.add(a1AbrirSesionButton, new com.intellij.uiDesigner.core.GridConstraints(1, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        a2MenuUsuarioButton = new JButton();
        a2MenuUsuarioButton.setText("2. Menu Usuario");
        SesionPane.add(a2MenuUsuarioButton, new com.intellij.uiDesigner.core.GridConstraints(2, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
    }
}
