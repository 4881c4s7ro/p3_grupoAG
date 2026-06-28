def histograma3(cadena):
    # Convierto cadena a minúsculas
    cadena = cadena.lower()
        
    # Inicializo la lista de contadores en 0
    diccionario = {}
    
    # Para cada caracter en cadena
    for cc in cadena:
        if not (cc >= 'a' and cc <= 'z'):
            continue
        
        if cc in diccionario:
            diccionario[cc] += 1
        else:
            diccionario[cc] = 1
    
    return diccionario
    # return sorted(diccionario.items())
    
cucaracha = 'cucaracha'    
print("(histograma(cucaracha):", histograma3(cucaracha))
        
puente = 'Hoy te busqué... En la rima que duerme...' 
print("\nhistograma(puente):", histograma3(puente))

