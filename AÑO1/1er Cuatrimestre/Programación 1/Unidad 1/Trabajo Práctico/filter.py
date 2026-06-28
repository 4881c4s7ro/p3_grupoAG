#Filtrar Números Pares
lista_numeros = [1,2,3,4,5,6,7,8,9,10]
Numeros_pares = list(filter(lambda x: x % 2 == 0, lista_numeros))
print(Numeros_pares)

#Filtrar Números Impares
lista_numeros = [1,2,3,4,5,6,7,8,9,10]
Numeros_pares = list(filter(lambda x: x % 2 == 1, lista_numeros))
print(Numeros_pares)