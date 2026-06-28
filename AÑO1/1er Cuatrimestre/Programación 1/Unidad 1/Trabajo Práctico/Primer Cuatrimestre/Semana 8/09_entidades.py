# Diccionario para representar las múltiples propiedades de una entidad
vehiculo1 = {'tipo': 'Automóvil', 'año': 2022, 'marca': 'Ford', 'modelo': 'Focus ST', 'color': 'Azul'}
print("vehiculo1:", vehiculo1)

vehiculo2 = {'tipo': 'Motocicleta', 'año': 2018, 'marca': 'Yamaha', 'modelo': 'FZ16', 'color': 'Negro'}
print(vehiculo2)

lista = [vehiculo1, vehiculo2]
lista.append({'tipo': 'Camioneta', 'año': 2017, 'marca': 'Volkswagen', 'modelo': 'Saveiro Doble Cabina', 'color': 'Negro'})
lista.append({'tipo': 'Automóvil', 'año': 2017, 'marca': 'Peugeot', 'modelo': '408', 'color': 'Blanco'})

# Devuelve una sublista con todos los vehículos cuyo año coincida con el pasado por parámetro
def filtro_por_anio_v1(lista, anio): 
    res = []
    for v in lista:
        if (v['año'] == anio):
            res.append(v)
    return res

#Pruebo la lista y la función
print("lista:", lista)
print("lista[0]:", lista[0])
print("Vehículos del 2017:", filtro_por_anio_v1(lista, 2017))