


import random   
skins = ['Gold', 'Red', 'Violet', 'Blue', 'Grey']
pesos = [0.8, 1, 10, 30, 40]
color_aleatorio = random.choices(skins, weights =pesos, k=1)[0] 

print(color_aleatorio)