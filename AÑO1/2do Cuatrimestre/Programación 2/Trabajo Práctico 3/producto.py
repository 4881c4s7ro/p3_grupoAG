class Producto():

    def __init__(self, nombre: str):
        self.__nombre = nombre
    
    def __str__(self):
        return f"Producto: {self.__nombre}"

    def __eq__(self, otro):
        if not isinstance(otro, Producto):
            return False
        return self.__nombre == otro.__nombre

    # Consultas
    
    def obtener_nombre(self):
        return self.__nombre








