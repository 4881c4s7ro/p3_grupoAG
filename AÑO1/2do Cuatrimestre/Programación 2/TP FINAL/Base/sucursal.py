from venta import Venta

class Sucursal:

    def __init__(self, numero_id: int, direccion: str, ventas=None):
        self.numero_id = numero_id
        self.direccion = direccion
        self.ventas = ventas if ventas is not None else []

    def __eq__(self, other):
        return isinstance(other, Sucursal) and self.numero_id == other.numero_id


    def __str__(self):
        ventas_str = "\n".join(str(v) for v in self.ventas) if self.ventas else "Sin ventas registradas"
        return f"Sucursal {self.numero_id} - Dirección: {self.direccion}\nVentas:\n{ventas_str}"

#Comandos:

    def establecer_numero_id(self, numero_id):
        self.numero_id = numero_id

    def establecer_direccion(self, direccion):
        self.direccion = direccion

    def agregar_venta(self, venta):
        self.ventas.append(venta)

    def remover_venta(self, venta):
        if venta in self.ventas:
            self.ventas.remove(venta)

#Consultas:

    def obtener_numero_id(self):
        return self.numero_id

    def obtener_direccion(self):
        return self.direccion

    def obtener_ventas(self):
        return self.ventas