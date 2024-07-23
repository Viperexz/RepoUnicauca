# shellcheck disable=SC2164
cd src/
javac -d ../bin plc_mms/sop_rmi/*.java
javac -d ../bin plc_tu/*.java
javac -d ../bin plc_mms/*.java
javac -d ../bin grsaa/*.java

