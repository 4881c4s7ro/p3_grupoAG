# analizar_chat.py

# Pedir datos al usuario
nombre_archivo = input("Nombre del archivo (por ejemplo, conversación.txt): ")
palabra = input("Palabra o frase a buscar: ").lower()

# Leer el archivo
with open(nombre_archivo, "r", encoding="utf-8") as f:
    lineas = f.readlines()

# Inicializar contador
conteo = 0

print("\nLíneas donde aparece la palabra/frase:\n")

# Buscar línea por línea
for linea in lineas:
    if palabra in linea.lower():
        conteo += 1
        print(linea.strip())

print(f'\n👉 La palabra/frase "{palabra}" aparece {conteo} veces en total.')