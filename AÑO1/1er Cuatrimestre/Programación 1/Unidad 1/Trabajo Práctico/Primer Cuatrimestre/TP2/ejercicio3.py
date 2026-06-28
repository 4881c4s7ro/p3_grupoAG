numero = int(input("Escribe un número y te indicaremos cuanto valdria con IVA: "))
iva = 0.21
precio = numero * (1 + iva)
print("El precio con IVA es: " + str(precio))