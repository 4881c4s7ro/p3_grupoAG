import vehiculo


class Moto(vehiculo.Vehiculo):

    def __init__(
        self, numero_id, marca, modelo, anio, sucursal_id, estado_id, cilindrada
    ):
        super().__init__(numero_id, marca, modelo, anio, sucursal_id, estado_id)
        self.__cilindrada = cilindrada

    def establecer_cilindrada(self, cilindrada):
        self.__cilindrada = cilindrada

    def obtener_cilindrada(self):
        return self.__cilindrada

    def __str__(self):
        return (f"Moto ID: {self.numero_id}, Marca: {self.marca}, Modelo: {self.modelo}, Año: {self.anio}, "
            f"Sucursal ID: {self.sucursal_id}, Estado ID: {self.estado_id}"
            f"Cilindrada: {self.__cilindrada}")