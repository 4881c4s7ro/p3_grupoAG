numero_1 = int(input("Ingrese el primer número: "))
numero_2 = int(input("Ingrese el segundo número: "))

def comparar_numeros(numero_1, numero_2):
    if numero_1 < numero_2:
        print("El primer número es menor que el segundo")
    elif numero_1 > numero_2:
        print("El segundo número es menor que el primero")
    else:
        print("Los números son iguales")

comparar_numeros(numero_1, numero_2)

