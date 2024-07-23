call iniciar.bat

cd src/

idlj -fall -pkgPrefix sop_corba plc_tu gesalertas.idl
idlj -fall -pkgPrefix sop_corba plc_mms gesusuarios.idl
idlj -fall -pkgPrefix sop_corba plc_mms gesplctu.idl
idlj -fall -pkgPrefix sop_corba grsaa gesdispositivos.idl

echo -----------------------------
echo Sop Corba compilados.
echo -----------------------------
cd ..