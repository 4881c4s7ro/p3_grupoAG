class Concesionaria:

    def __init__(self, numero_id, nombre):
        self.__numero_id = numero_id
        self.__nombre = nombre
        self.__clientes = []
        self.__sucursales = []
        self.__vehiculos = []

    def establecer_numero_id(self, numero_id):
        self.__numero_id = numero_id

    def establecer_nombre(self, nombre):
        self.__nombre = nombre

    def agregar_cliente(self, cliente):
        self.__clientes.append(cliente)

    def remover_cliente(self, cliente):
        self.__clientes.remove(cliente)

    def agregar_sucursal(self, sucursal):
        self.__sucursales.append(sucursal)

    def remover_sucursal(self, sucursal):
        self.__sucursales.remove(sucursal)

    def agregar_vehiculo(self, vehiculo):
        self.__vehiculos.append(vehiculo)

    def remover_vehiculo(self, vehiculo):
        self.__vehiculos.remove(vehiculo)

    def obtener_numero_id(self):
        return self.__numero_id

    def obtener_nombre(self):
        return self.__nombre

    def obtener_clientes(self):
        return self.__clientes

    def obtener_sucursales(self):
        return self.__sucursales

    def obtener_vehiculos(self):
        return self.__vehiculos

#Comparar por ID:

    def __eq__(self, other):
        if isinstance(other, Concesionaria):
            return self.obtener_numero_id() == other.obtener_numero_id()
        return False

#Retornar Ordenadamente:

    def __str__(self):
        return (
            f"Concesionaria ID: {self.obtener_numero_id()}, "
            f"Nombre: {self.obtener_nombre()}, "
            f"Clientes: {[str(c) for c in self.obtener_clientes()]}, "
            f"Sucursales: {[str(s) for s in self.obtener_sucursales()]}, "
            f"Vehículos: {[str(v) for v in self.obtener_vehiculos()]}")
    
    