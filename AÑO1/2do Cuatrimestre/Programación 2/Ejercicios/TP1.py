


#9 

numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

while numeros:
    numeros = [x -1 for x in numeros if x > 1]
    print(numeros)