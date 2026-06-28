#Diccionario español - inglés

#Diccionario completo
diccionario = {'uno': 'one', 'dos': 'two', 'tres': 'three'}
print("diccionario:", diccionario)

# Acceso a elemento del diccionario con clave 'dos'
print("dicionario['dos']:",diccionario['dos'])

# Longitud del diccionario con función len()
print("len(diccionario):", len(diccionario))

# Verificación de pertenencia con in (solo verifica en claves)
print("'uno' in diccionario:", 'uno' in diccionario)
print("'cinco' in diccionario:", 'cinco' in diccionario)

# Verificación de pertenencia en valores debe utilizar el método values()
print("'one' in diccionario.values()", 'one' in diccionario.values())
print("'five' in diccionario.values():", 'five' in diccionario.values())

# Eliminación de un elemento del diccionario con del
del diccionario['uno']
print("diccionario después de eliminar el elemento con clave 'uno", diccionario)