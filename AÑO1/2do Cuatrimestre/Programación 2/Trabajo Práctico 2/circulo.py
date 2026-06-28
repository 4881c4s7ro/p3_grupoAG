#Ejercicio 5
class Circulo():
    PI = 3.14159

    def __init__(self, radio: float):
        self.radio = radio 

#Comandos

    def establecer_radio(self, radio: float):
        self.radio = radio #esto está en centímetros

#Consultas

    def obtener_radio(self) -> float:
        return self.radio
    
    def obtener_area(self) -> float:
        return self.PI * (self.radio ** 2)
         
    def obtener_perimetro(self) -> float:
        return 2 * self.PI * self.radio
        
    def obtener_diametro(self) -> float:
        return 2 * self.radio
        

