@echo off
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_202
set PATH=%JAVA_HOME%\bin;%PATH%
set CLASSPATH=.;%JAVA_HOME%\lib
echo -----------------------------
echo Variables fijadas
echo -----------------------------

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
