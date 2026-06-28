class ServicioVehiculos:

    def __init__(self, servicio_concesionarias):
        self.servicio_concesionarias = servicio_concesionarias

    def obtener_vehiculos_por_sucursal_y_estado(self, concesionaria_id: int, sucursal_id: int, estado_id: int) -> list:
        concesionaria_obj = self.servicio_concesionarias.obtener_por_id(concesionaria_id)
        if not concesionaria_obj:
            return []
        
        sucursal_obj = next(
            (s for s in concesionaria_obj.obtener_sucursales() if s.obtener_numero_id() == sucursal_id),
            None)
                
        if not sucursal_obj:
            return []
        
        vehiculos_en_estado = [
            v for v in concesionaria_obj.obtener_vehiculos() if v.estado_id == estado_id and v.sucursal_id == sucursal_id]

        return vehiculos_en_estado

