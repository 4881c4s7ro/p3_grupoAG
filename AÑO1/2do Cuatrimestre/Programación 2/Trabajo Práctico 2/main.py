from cancion import Cancion
from circulo import Circulo


#Ejercicio 2

cancion1 = Cancion("Californication", "329", "Rock")
cancion2 = Cancion("Gravity", "245", "Rock")
cancion3 = Cancion("Snow (Hey Oh)", "334", "Rock")

#Ejercicio 3

print("Género de la cancion 1:", cancion1.obtener_genero(),
    "\nGénero de la cancion 2:", cancion2.obtener_genero(),
    "\nGénero de la cancion 3:", cancion3.obtener_genero())



#Ejercicio 4
print()
cancion2.establecer_genero("Pop")
print("Género de la cancion 2 Corregido:", cancion2.obtener_genero())

#Ejercicio 6

Circulo1 = Circulo(5)
Circulo2 = Circulo(10)
Circulo3 = Circulo(15)

#Ejercicio 7

print()
print("Diámetro del círculo 1:", Circulo1.obtener_diametro(),
    "\nDiámetro del círculo 2:", Circulo2.obtener_diametro(),
    "\nDiámetro del círculo 3:", Circulo3.obtener_diametro())
print()

#Ejercicio 8

#PI es un atributo de clase, no de instancia, por lo tanto, es siempre igual

print("Valor de PI en Círculo 1:", Circulo1.PI)
print("Valor de PI en Círculo 2:", Circulo2.PI)
print("Valor de PI en Círculo 3:", Circulo3.PI)
print()

#Ejercicio 9

Circulo4 = Circulo(20)
Circulo5 = Circulo(20)

print("Compáración de los Círculos 4 y 5:")
if Circulo4.obtener_radio() == Circulo5.obtener_radio():
    print("Los círculos son iguales")
else:
    print("Los círculos son diferentes")
print()

#Ejercicio 10

print("Comparación del perímetro del Círculo 4 y 5")
if Circulo4.obtener_perimetro() == Circulo5.obtener_perimetro():
    print("Los perímetros son iguales")
else:
    print("Los perímetros son diferentes")
print()