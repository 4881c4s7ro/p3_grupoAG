from empleado import Empleado
from producto import Producto


class Empresa():

    def __init__(self, razonSocial: str):
        self.__razonSocial = razonSocial
        self.__productos = []
        self.__empleados = []

    def __str__(self):
        productos_str = '\n '.join(str(producto) for producto in self.__productos)
        empleados_alta_str = '\n '.join(str(empleado) for empleado in self.obtener_empleados_de_alta())
        return (f"Empresa: {self.__razonSocial}\n"
                f"Productos: [{productos_str}]\n"
                f"Empleados en Alta: [{empleados_alta_str}]")

    # Comandos

    def establecer_razonSocial(self, razonSocial: str):
        self.__razonSocial = razonSocial

    def agregar_producto(self, producto):
        self.__productos.append(producto)
    
    def remover_producto(self, producto):
        self.__productos.remove(producto)
    
    def altaEmpleado(self, empleado: Empleado):
        if len(self.__empleados) == 0:
            nuevo_legajo = 1
        else:
            nuevo_legajo = max(e.obtener_numero_legajo() for e in self.__empleados) + 1

        empleado.establecer_numero_legajo(nuevo_legajo)
        empleado.establecer_estado(Empleado.Estado_Alta)
        self.__empleados.append(empleado)
       
    def bajaEmpleado(self, empleado: Empleado):
        empleado.establecer_estado(Empleado.Estado_Baja)
        # No removemos el empleado de la lista para mantener el histórico

    # Consultas

    def obtener_razonSocial(self) -> str:
        return self.__razonSocial

    def obtener_productos(self) -> list:
        return self.__productos
    
    def obtener_empleados_de_alta(self) -> list:
        empleados_alta = []
        for empleado in self.__empleados:
            if empleado.obtener_estado() == Empleado.Estado_Alta:
                empleados_alta.append(empleado)
        return empleados_alta
    
    def obtener_empleados_historico(self) -> list:
        return self.__empleados

    def __str__(self):
        return f"Empleados_en_alta: {len(self.obtener_empleados_de_alta())}, Empleados_historico: {len(self.obtener_empleados_historico())}, Productos: {len(self.obtener_productos())}"
