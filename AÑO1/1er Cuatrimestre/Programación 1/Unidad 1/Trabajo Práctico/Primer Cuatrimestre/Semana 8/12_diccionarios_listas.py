def histograma(cadena):
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

def invert_dict(diccionario_param):
    # Creo un diccionario vacío
    invertido = {}
    
    # Para cada clave en el diccionario parámetro
    for clave in diccionario_param:
        #Tomo el valor asociado a esa clave
        valor = diccionario_param[clave]
        
        #Verifico si el valor ya no está como clave en el diccionario invertido
        if valor not in invertido:
            # Si no está lo agrego como una lista de un único elemento
            invertido[valor] = [clave]
        else:
            #Si ya está => agrego al final de la lista
            invertido[valor].append(clave)
            
    return invertido

cucaracha = 'cucaracha'
print("histograma(cucaracha):", histograma(cucaracha))
print("invert_dict(histograma(cucaracha):", invert_dict(histograma(cucaracha)))