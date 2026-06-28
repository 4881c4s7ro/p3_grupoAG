print("Ingrese una palabra o texto y Te Indicaremos si es Palíndromo o No: ")
input_texto = input()
texto = str(input_texto)
if texto == texto[::-1]:
    print("Es Palíndromo")
else:
    print("No es Palíndromo")

