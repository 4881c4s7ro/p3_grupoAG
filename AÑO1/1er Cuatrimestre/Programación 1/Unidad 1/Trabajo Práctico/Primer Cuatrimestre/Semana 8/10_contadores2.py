def lista_letras():
    lista = []
    for i in range(ord('a'), ord('a') + 26 + 1):
        lista.append(chr(i))
    return lista

def histograma2(cadena):
    # Convierto cadena a minúsculas
    cadena = cadena.lower()
    
    # Hago una lista de letras
    letras = lista_letras()
    
    # Inicializo la lista de contadores en 0
    lista = [0] * 26
    
    # Para cada caracter en cadena
    for cc in cadena:
        if not (cc >= 'a' and cc <= 'z'):
            continue

        indice = ord(cc) - ord('a')
        lista[indice] += 1
    
    return list(zip(letras, lista))

cucaracha = 'cucaracha'
print("histograma(cucaracha):", histograma2(cucaracha))

puente = 'Hoy te busqué... En la rima que duerme...' 
print("\nhistograma(puente):", histograma2(puente))

