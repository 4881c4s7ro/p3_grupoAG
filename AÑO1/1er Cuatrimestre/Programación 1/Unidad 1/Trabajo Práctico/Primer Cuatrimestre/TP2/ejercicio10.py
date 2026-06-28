numero = int(input("Escribe un número positivo: "))
for i in range(1, numero +1):
    if i % 2 == 1:
        print(i, end=", ")

for i in range(numero, -1, -1):
        print(i, end=", ")


def es_primo(numero):
    if numero < 2:
        return False
    for i in range(2, int(numero**0.5) + 1):
        if numero % i == 0:
            return False
    return True

if es_primo(numero):
    print(f"{numero} \n Es un número primo.")
else:
    print(f"{numero} \n No es un número primo.")
