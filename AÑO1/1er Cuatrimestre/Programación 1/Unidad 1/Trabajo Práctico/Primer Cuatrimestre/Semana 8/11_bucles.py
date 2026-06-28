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

# Recorrido de un diccionario con for
def d_print(dict):
    for c in dict:
        print(c, dict[c])

d_print(histograma('Santiago'))
print("")

# Recorrido de un diccionario previo ordenación de claves con sorted

def d_print_sorted(dict):
    for key in sorted(dict):
        print(key, dict[key])

d_print_sorted(histograma('Santiago'))