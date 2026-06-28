# Creación de tuplas con datos de diferente tipo
tupla1 = (5, 'Bienvenidos', 7, 'Prog1')
print("Tupla con datos de diferente tipo:", tupla1)
 
# Creación de tuplas anidadas
tupla1 = (0, 1, 2, 3)
tupla2 = ('python', 'uner')
tupla3 = (tupla1, tupla2)
print("tuplas anidadas: ", tupla3)
 
# Creación de una tupla con repetición
tupla1 = ('FCAD',) * 3
print("Tupla con repetición:", tupla1)
 
# Creación de una tupla utilizando un bucle
tupla1 = ('Prog1')
n = 5
print("Tupla utilizando un bucle")
for i in range(int(n)):
    tupla1 = (tupla1,)
    print(tupla1)