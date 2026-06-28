# Acceso a los elementos de una tupla por indexación
tupla1 = ("Unidad", "Nº 6", "Semana", "9")
print("Primer elemento de la tupla:", tupla1[0])

##########################
# Concatenación de tuplas
##########################
tupla1 = (0, 1, 2, 3)
tupla2 = ('UNER', 'FCAD', 'Prog1')
 
tupla3 = tupla1 + tupla2
 
# Impresión de primera tupla
print("tupla1:", tupla1)
 
# Impresión de segunda tupla
print("tupla2:", tupla2)
 
# Impresión de tupla resultante
print("tupla3 (resultado):", tupla3)

##########################
# Fin Concatenación de tuplas
##########################

##########################
# Slicing de un tupla
##########################

# Creación de una tupla
tupla1 = ('a', 'b', 'c', 'd', 'e')
 
# Obtener un slice sin el primer elemento
print("Slice omitiendo el primer elemento", tupla1[1:])
 
# Invirtiendo la tupla
print("Invirtiendo la secuencia:", tupla1[::-1])
 
# Impresión de un rango de elementos de la tupla
print("Elementos en el rango de 4-9:", tupla1[4:9])

##########################
# Fin de Slicing de un tupla
##########################

