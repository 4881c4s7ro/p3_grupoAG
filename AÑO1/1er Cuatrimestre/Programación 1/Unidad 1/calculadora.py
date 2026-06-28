

print("Elige una Operación: ")
print("1. Sumar", "2. Restar", "3. Multiplicar", "4. Dividir", "5. Potencia")
opcion = input("Seleccionar: ")
num1 = float(input("Ingrese el primer número: "))
num2 = float(input("Ingrese el segundo número: "))
if opcion == "1":
    resultado = num1 + num2
    print("El resultado de la suma es: ", resultado)
elif opcion == "2":
    resultado = num1 - num2
    print("El resultado de la resta es: ", resultado)
elif opcion == "3":
    resultado = num1 * num2
    print("El resultado de la multiplicación es: ", resultado)
elif opcion == "4":
    resultado = num1 / num2
    if opcion == "4": num2 == 0
    print("Error: No se puede dividir entre cero.")
    exit()    

    print("El resultado de la división es: ", resultado)
elif opcion == "5":
    resultado = num1 ** num2
    print("El resultado de la potencia es: ", resultado)

  