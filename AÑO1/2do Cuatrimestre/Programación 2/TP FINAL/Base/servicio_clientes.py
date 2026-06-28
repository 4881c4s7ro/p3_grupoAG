from servicio_concesionarias import ServicioConcesionarias

class ServicioClientes:

    def __init__(self, servicio_concesionarias: ServicioConcesionarias):
        self.servicio_concesionarias = servicio_concesionarias

#Consultas:

    def obtener_total_ventas_por_cliente(self, concesionaria_id: int, cliente_id: int) -> int:

        conc = self.servicio_concesionarias.obtener_por_id(concesionaria_id)
        if not conc:
            return 0
        
        total = 0
    
        for suc in conc.obtener_sucursales():
            for ven in suc.obtener_ventas():
                if ven.cliente_id == cliente_id:
                    total += ven.monto
        
        return total
    
