
class Empleado:

    # Atributos de Clase

    Estado_Alta = 1
    Estado_Baja = 2

    def __init__(self, nombres: str, apellidos: str):
        self.__nombre = nombres
        self.__apellido = apellidos
        self.__estado = Empleado.Estado_Alta
        self.__numero_legajo = 0
    
    def __str__(self):
        return f"Empleado: {self.__nombre}, Legajo: {self.__numero_legajo}, Estado: {self.obtener_estado()}"

    def __eq__(self, otro):
        if not isinstance(otro, Empleado):
            return False
        return self.__numero_legajo == otro.__numero_legajo
    
    # Comandos 

    def establecer_nombres(self, nombres: str):
        self.__nombre = nombres
    
    def establecer_apellidos(self, apellidos: str):
        self.__apellido = apellidos
    
    def establecer_estado(self, estado: int):
        self.__estado = estado
    
    def establecer_numero_legajo(self, numero_legajo: int):
        self.__numero_legajo = numero_legajo

    # Consultas
    
    def obtener_nombres(self) -> str:
        return self.__nombre
    
    def obtener_apellidos(self) -> str:
        return self.__apellido
    
    def obtener_estado(self) -> int:
        return self.__estado
    
    def obtener_numero_legajo(self) -> int:
        return self.__numero_legajo