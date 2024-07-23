call iniciar.bat

cd src/

echo -----------------------------
echo Grsaa Compilador
echo -----------------------------
javac -d ..\bin grsaa\sop_corba\*.java
javac -d ..\bin grsaa\*.java

echo -----------------------------
echo MMS Compilador
echo -----------------------------
javac -d ..\bin plc_mms\sop_corba\*.java
javac -d ..\bin plc_mms\*.java

echo -----------------------------
echo Tu Compilado
echo -----------------------------
javac -d ..\bin plc_tu\*.java

cd ..
