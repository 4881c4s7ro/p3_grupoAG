##########################
# Uso de tuplas para recuperar más de un valor de retorno de una función que retorna una lista
##########################

direccion = 'mfrancisconi@uner.edu.ar'
usuario, dominio = direccion.split('@')

print("dirección:", direccion)
print("usuario:", usuario)
print("dominio:", dominio)

##########################
# Fin de Uso de tuplas para recuperar más de un valor de retorno de una función que retorna una lista
##########################

##########################
# divmod(): retorna como resultado una tupla con el cociente y el resto de la
##########################

print("Cociente y resto de divmod(7, 3)")
cociente, resto = divmod(7, 3)
print("cociente:", cociente)
print("resto:", resto)

##########################
# Fin divmod()
##########################

##########################
# Función que retorna una tupla
##########################

def min_max(lista):
    minimo = min(lista)
    maximo = max(lista)
    return (minimo, maximo)

lista = [10, 51, 14, 5, 22]
print("lista:", lista)
print("mínimo y máximo:", min_max(lista)) 