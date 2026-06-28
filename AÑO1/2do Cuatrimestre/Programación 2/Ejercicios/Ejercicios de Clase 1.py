#Ejercicio de Clase 1
def recibir ():
    nombre = input("Ingrese su nombre: ")
    print(f"Hola, {nombre}!")


recibir()

# Ejercicio de Clase 2


def numero_no_contiene_digitos(numero, digitos_prohibidos):
    for digito in str(numero):
        for digito_prohibido in map(str, digitos_prohibidos):
            if digito == (digito_prohibido):
                return False
    return True

print(numero_no_contiene_digitos(1234567, []))  
print(numero_no_contiene_digitos(1234567, [8, 3]))  
print(numero_no_contiene_digitos(1234567, [8, 9, ]))  


#Ejercicio de Clase 3

def invertir_palabras(entrada):
    entrada_a_lista = entrada.split()
    entrada_a_lista.reverse()
    return ','.join(entrada_a_lista)

print(invertir_palabras("Hola mundo soy un programador"))

#Ejercicio de Clase 4

def numeros_pares_elevados(entrada):
    numeros_pares_elevados_al_cuadrado = []
    for numero in entrada:
        if numero % 2 == 0:
            numeros_pares_elevados_al_cuadrado.append(numero ** 2)
    return numeros_pares_elevados_al_cuadrado
print(numeros_pares_elevados([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))


#Ejercicio de Clase 5

def edad_valida(edad):
    return type(edad)== int and 1 < edad < 120
        
print(edad_valida("hola"))
print(edad_valida(25))
print(edad_valida(-5))
print(edad_valida(130))

#Ejercicio de Clase 7
import Pitagoras as pitagoras
print(pitagoras.calcular_hipotenusa(-3, 4))  # Debería imprimir 5.0


#Ejercicio de Clase 9

def suma(entero_positivo):
    if entero_positivo == 1:
        return 1
    else:
        valor = entero_positivo + suma(entero_positivo - 1)
        return valor
    
print(suma(5))  # Debería imprimir 15 (1 + 2 + 3 + 4 + 5)
