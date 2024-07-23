package plc_tu;
import plc_mms.sop_corba.GestionPlcTu;
import plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO;
import plc_mms.sop_corba.GestionPlcTuPackage.ListaDto;
import plc_mms.sop_corba.GestionPlcTuPackage.ListaDtoHolder;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.rmi.RemoteException;
import java.util.ArrayList;


public class gestionDispositivos extends JFrame {
    private JPanel paneGestion;
    private JButton btnConsultar;
    private JButton btnActualizar;
    private JButton btnEliminar;
    private JTable tblDispositivos;
   ListaDtoHolder listTU = new ListaDtoHolder();

    public gestionDispositivos(GestionPlcTu objPLC) {
        setContentPane(paneGestion);
        setTitle("Gestion Dispositivos");
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        setSize(1000, 600);
        setLocationRelativeTo(null);
        setVisible(true);

        // Inicializar el modelo de tabla y agregar las columnas en el constructor
        DefaultTableModel modelo = new DefaultTableModel();
        modelo.addColumn("ID PLC/TU");
        modelo.addColumn("Propietario");
        modelo.addColumn("Tipo de Identificación");
        modelo.addColumn("Número de Identificación");
        modelo.addColumn("Dirección");
        modelo.addColumn("Estrato");
        modelo.addColumn("Fecha de Registro");
        modelo.addColumn("Lectura");
        modelo.addColumn("Consumo");
        modelo.setRowCount(0);
        tblDispositivos.setModel(modelo); // Asignar el modelo de tabla a la JTable

        btnConsultar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Limpiar la tabla antes de agregar nuevas filas
                modelo.setRowCount(0);
                tblDispositivos.setModel(modelo); // Asignar el modelo de tabla a la JTable
                if (!objPLC.recuperarLista(listTU)) {
                    JOptionPane.showMessageDialog(
                            null, "No se encontraron TU conectados. ", "Error remoto", JOptionPane.ERROR_MESSAGE);
                } else {
                    // Agregar filas al modelo de tabla
                    for (DatosPlcTu_DTO dato : listTU.value.listTU) {
                        modelo.addRow(new Object[]{
                                dato.id_plctu,
                                dato.propietario,
                                dato.tipoIden,
                                dato.numIden,
                                dato.direccion,
                                dato.estrato,
                                dato.fechaRegistro,
                                dato.lectura,
                                dato.consumo
                        });
                    }
                }

            }
        });
        btnActualizar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Obtener los nuevos datos de la tabla
                ListaDto listNuevos = new ListaDto();
                ArrayList<DatosPlcTu_DTO> nuevosDatos = new ArrayList<>();

                for (int i = 0; i < modelo.getRowCount(); i++) {
                    String id_plctu = modelo.getValueAt(i, 0).toString();
                    String propietario = modelo.getValueAt(i, 1).toString();
                    String tipoIden = modelo.getValueAt(i, 2).toString();
                    String numIden = modelo.getValueAt(i, 3).toString();
                    String direccion = modelo.getValueAt(i, 4).toString();
                    String estrato = modelo.getValueAt(i, 5).toString();
                    String fechaRegistro = modelo.getValueAt(i, 6).toString();
                    int lectura = Integer.parseInt(modelo.getValueAt(i, 7).toString());
                    int consumo = Integer.parseInt(modelo.getValueAt(i, 8).toString());

                    DatosPlcTu_DTO nuevoDato = new DatosPlcTu_DTO(id_plctu, propietario, tipoIden, numIden, direccion, estrato, fechaRegistro, lectura, consumo);
                    nuevosDatos.add(nuevoDato);
                }
                listNuevos.listTU = nuevosDatos.toArray(new DatosPlcTu_DTO[0]);
                objPLC.actualizarLista(listNuevos);

            }
        });
        btnEliminar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int rowIndex = tblDispositivos.getSelectedRow();

                String id_plctu = (String) tblDispositivos.getValueAt(rowIndex, 0).toString();

                if (objPLC.eliminarTU(id_plctu)) {
                    JOptionPane.showMessageDialog(
                            null, "Se elimino correctamente. ", "Eliminado", JOptionPane.INFORMATION_MESSAGE);
                } else JOptionPane.showMessageDialog(
                        null, "Error al eliminar. ", "Error remoto", JOptionPane.ERROR_MESSAGE);
            }
        });
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
        paneGestion = new JPanel();
        paneGestion.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(3, 3, new Insets(0, 0, 0, 0), -1, -1));
        final JLabel label1 = new JLabel();
        label1.setText("Gestion Dispostivos");
        paneGestion.add(label1, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 3, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        btnConsultar = new JButton();
        btnConsultar.setText("Consultar");
        paneGestion.add(btnConsultar, new com.intellij.uiDesigner.core.GridConstraints(2, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        btnActualizar = new JButton();
        btnActualizar.setText("Actualizar");
        paneGestion.add(btnActualizar, new com.intellij.uiDesigner.core.GridConstraints(2, 1, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        btnEliminar = new JButton();
        btnEliminar.setText("Eliminar");
        paneGestion.add(btnEliminar, new com.intellij.uiDesigner.core.GridConstraints(2, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        final JScrollPane scrollPane1 = new JScrollPane();
        paneGestion.add(scrollPane1, new com.intellij.uiDesigner.core.GridConstraints(1, 0, 1, 3, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
        tblDispositivos = new JTable();
        scrollPane1.setViewportView(tblDispositivos);
    }

    /**
     * @noinspection ALL
     */
    public JComponent $$$getRootComponent$$$() {
        return paneGestion;
    }

}
