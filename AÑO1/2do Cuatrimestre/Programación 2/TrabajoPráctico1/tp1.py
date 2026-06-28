from impresiones import declarar_comida_favorita



#Ejercicio Número 1

import os

def limpiar_consola():
    os.system('cls' if os.name == 'nt' else 'clear')




def realizar_calculo():
    limpiar_consola()
    match input("Ingrese una Operación (1: Suma, 2: Resta, 3: Multiplicación, 4: División) ").strip().lower():
        case "1":
            num1 = float(input("Ingrese el primer número: "))
            num2 = float(input("Ingrese el segundo número: "))
            print(f"La suma es: {num1 + num2}")
        case "2":
            num1 = float(input("Ingrese el primer número: "))   
            num2 = float(input("Ingrese el segundo número: "))
            print(f"La resta es: {num1 - num2}")
        case "3":
            num1 = float(input("Ingrese el primer número: "))
            num2 = float(input("Ingrese el segundo número: "))
            print(f"La multiplicación es: {num1 * num2}")
        case "4":
            num1 = float(input("Ingrese el primer número: "))
            num2 = float(input("Ingrese el segundo número: "))
            if num2 != 0:
                print(f"La división es: {num1 / num2}")
            else:
                print("Error: División por cero no permitida.")
    
        case _:
            print("Operación no válida. Por favor, intente de nuevo.")


realizar_calculo()

print()
#Ejercicio Número 2

def numeros_en_orden_ascendente(numero):
    limpiar_consola()
    
    digitos = [int(d) for d in str(numero)]
    for i in range(len(digitos) -1):
        if digitos[i] > digitos[i + 1]:
            return ("Los números no están en orden ascendente.")
    return ("Los números están en orden ascendente.")


numero = int(input("Ingrese un número entero positivo: "))
print(numeros_en_orden_ascendente(numero))
print()
#Ejercicio Número 3

def numeros_impares_juntos():
    impares = []  
    entrada = input ("Ingrese números enteros positivos: ")
    
    for n in entrada:
        numero = int(n)
        if numero % 2 != 0:
            impares.append(numero)
    
    return impares  

impares = numeros_impares_juntos()
print("Números impares:", impares)
print()

#Ejercicio Número 4

lista1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 17]
lista2 = [7, 2, 5, 11, 16, 17, 18, 1, 20, 3, 12]

def numeros_comunes(lista1, lista2):
    comunes = []
    for num in lista1:
        if num in lista2:
            comunes.append(num)
    return comunes

print("Números comunes:", numeros_comunes(lista1, lista2))
print()

#Ejercicio Número 5

def clave_valida(clave):
    limpiar_consola()
    input("Ingrese una clave: ")
    retorna = True
    if(len(clave) < 6 or len(clave) > 20):
        retorna = False

    tieneDigito = False
    for n in clave:
        if n == " ":
            retorna = False
            break

        if n.isdigit():
            tieneDigito = True
            break

    if not tieneDigito:
       retorna = False 

    return retorna

print("Clave Válida:", clave_valida("Clave123"))
print()

#Ejercicio Número 6

def persona_mayor_de_edad(edad):
    limpiar_consola()
    return edad >= 18
    
print("¿Es mayor de edad?", persona_mayor_de_edad(int(input("Ingrese la edad: "))))
print()

#Ejercicio Número 7

def comida_favorita():
    limpiar_consola()
    nombre = input("Ingrese su nombre: ")
    comida = input("Ingrese su comida favorita: ")
    print(f"{nombre}, tu comida favorita es {comida}.")
comida_favorita()    
print()

#Ejercicio Número 8

nombre_persona = input("Ingrese su nombre: ")
nombre_comida = input("Ingrese su comida favorita: ")
print(declarar_comida_favorita(nombre_persona, nombre_comida))


#Ejercicio Número 9

def cuenta_regresiva(n):
    if n < 0:
        return
    print(n)
    cuenta_regresiva(n - 1)

cuenta_regresiva(120)
print()

#Ejercicio Número 10

print("La expresión simplificada es: True")
print()




