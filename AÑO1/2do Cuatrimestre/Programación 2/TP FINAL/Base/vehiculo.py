import abc


class Vehiculo(abc.ABC):

    ESTADO_DISPONIBLE_ID = 1
    ESTADO_VENDIDO_ID = 2
    ESTADO_BAJA_ID = 3

    def __init__(self, numero_id, marca, modelo, anio, sucursal_id, estado_id):
        self.__numero_id = numero_id
        self.__marca = marca
        self.__modelo = modelo
        self.__anio = anio
        self.__sucursal_id = sucursal_id
        self.__estado_id = estado_id

    def establecer_numero_id(self, numero_id):
        self.__numero_id = numero_id

    def establecer_marca(self, marca):
        self.__marca = marca

    def establecer_modelo(self, modelo):
        self.__modelo = modelo

    def establecer_anio(self, anio):
        self.__anio = anio

    def establecer_sucursal_id(self, sucursal_id):
        self.__sucursal_id = sucursal_id

    def establecer_estado_id(self, estado_id):
        self.__estado_id = estado_id

    def obtener_numero_id(self):
        return self.__numero_id

    def obtener_marca(self):
        return self.__marca

    def obtener_modelo(self):
        return self.__modelo

    def obtener_anio(self):
        return self.__anio

    def obtener_sucursal_id(self):
        return self.__sucursal_id

    def obtener_estado_id(self):
        return self.__estado_id

    @abc.abstractmethod
    def __str__(self):
        pass

#Comparar por ID

def __eq__(self, other):
    if isinstance(other, Vehiculo):
        return self.numero_id == other.numero_id
    return False