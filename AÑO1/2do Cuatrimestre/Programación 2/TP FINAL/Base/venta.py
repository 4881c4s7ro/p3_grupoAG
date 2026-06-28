


class Venta:
 
    def __init__(self, numero_id: int, fecha: str, cliente_id: int, vehiculo_id: int, monto: int):
        self.numero_id = numero_id
        self.fecha = fecha
        self.cliente_id = cliente_id
        self.vehiculo_id = vehiculo_id
        self.monto = monto

    
#Comandos:

    def establecer_numero_id(self, numero_id):
        self.numero_id = numero_id
    
    def establecer_fecha(self, fecha):
        self.fecha = fecha
        
    def establecer_cliente_id(self, cliente_id):
        self.cliente_id = cliente_id

    def establecer_vehiculo_id(self, vehiculo_id):
        self.vehiculo_id = vehiculo_id

    def establecer_monto(self, monto):
        self.monto = monto

#Consultas:

    def obtener_numero_id(self):
        return self.numero_id
    
    def obtener_fecha(self):
        return self.fecha
    
    def obtener_cliente_id(self):
        return self.cliente_id
    
    def obtener_vehiculo_id(self):
        return self.vehiculo_id
    
    def obtener_monto(self):
        return self.monto
    

#Comparar por ID

def __eq__(self, other):
    if isinstance(other, Venta):
        return self.numero_id == other.numero_id
    return False

#Retornar Ordenado

def __str__(self):
    return (f"Venta ID: {self.numero_id}, Fecha: {self.fecha}",
           f"Cliente ID: {self.cliente_id}, Vehículo ID: {self.vehiculo_id}",
           f"Monto: {self.monto}")

