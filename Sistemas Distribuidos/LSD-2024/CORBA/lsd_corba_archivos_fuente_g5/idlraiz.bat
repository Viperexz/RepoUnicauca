call iniciar.bat

cd src/

idlj -fall gesalertas.idl
idlj -fall gesusuarios.idl
idlj -fall gesplctu.idl
idlj -fall gesdispositivos.idl

echo -----------------------------
echo Sop Corba carpeta general compilados.
echo -----------------------------
cd ..