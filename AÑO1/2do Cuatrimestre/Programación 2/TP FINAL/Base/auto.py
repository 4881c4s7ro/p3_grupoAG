import vehiculo

class Auto(vehiculo.Vehiculo):

    
    def __init__(self, numero_id: int, marca: str, modelo: str, anio: int, sucursal_id: int, estado_id: int, airbags: int, frenosAbs: bool, caballosFuerza:int):
        super().__init__(numero_id, marca, modelo, anio, sucursal_id, estado_id)
        self.airbags = airbags
        self.frenosAbs = frenosAbs
        self.caballosFuerza = caballosFuerza

#Comandos:

    def establecer_airbags(self, airbags):
        self.airbags = airbags
    
    def establecer_frenosAbs(self, frenosAbs):
        self.frenosAbs = frenosAbs
    
    def establecer_CaballosFuerza(self, CaballosFuerza):
        self.caballosFuerza = CaballosFuerza

#Consultas:

    def obtener_airbags(self):
        return self.airbags
    
    def obtener_frenosAbs(self):
        return self.frenosAbs
    
    def obtener_caballosFuerza(self):
        return self.caballosFuerza
    

 
#Retornar Ordenadamente:

    def __str__(self):
        return (f"Auto ID: {self.numero_id}, Marca: {self.marca}, Modelo: {self.modelo}, Año: {self.anio}, "
            f"Sucursal ID: {self.sucursal_id}, Estado ID: {self.estado_id}, "
            f"Airbags: {self.airbags}, Frenos ABS: {self.frenosAbs}, "
            f"Caballos de Fuerza: {self.caballosFuerza}")
    


