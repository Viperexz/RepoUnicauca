from query import queryEmb
from generador import generar_preguntas
from pdf import cargaArchivos
#Inicializacion de data
consulta = "Tema: Daniel Pècaut"
chunks = queryEmb(consulta)["documents"][0]
preguntas = generar_preguntas(chunks)
print(preguntas)