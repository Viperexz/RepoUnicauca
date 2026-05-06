import argparse
import json

from src.generador import generar_preguntas
from src.pdf import carga_archivos_nuevos
from src.query import query_embeddings


def ejecutar_pipeline(
	tema: str,
	cantidad: int = 6,
	tema_usuario: str = "",
	dificultad: str = "",
	max_distance: float | None = 0.6,
	min_chunk_chars: int = 80,
) -> dict:
	ingestion = carga_archivos_nuevos()
	contextos = query_embeddings(tema, n_results=max(cantidad, 6), max_distance=max_distance)
	contextos = [c for c in contextos if c.get("text") and len(c.get("text", "")) >= min_chunk_chars]
	preguntas, gen_tokens = generar_preguntas(
		contextos,
		cantidad=cantidad,
		tema_usuario=tema_usuario or tema,
		dificultad=dificultad,
	)
	return {
		"tema": tema,
		"ingestion": ingestion,
		"contextos": contextos,
		"preguntas": preguntas,
		"generated_tokens": gen_tokens,
	}


def main() -> None:
	parser = argparse.ArgumentParser(description="Pipeline RAG para generar preguntas.")
	parser.add_argument("--tema", default="Tema general", help="Tema de consulta para recuperar chunks")
	parser.add_argument("--cantidad", type=int, default=6, help="Numero de preguntas")
	parser.add_argument("--dificultad", default="", help="Nivel de dificultad (facil/media/dificil)")
	args = parser.parse_args()

	resultado = ejecutar_pipeline(tema=args.tema, cantidad=args.cantidad, dificultad=args.dificultad)
	print(json.dumps(resultado, ensure_ascii=False, indent=2))


if __name__ == "__main__":
	main()
