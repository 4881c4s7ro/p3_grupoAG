class Cancion():

    def __init__(self, nombre: str, duracion: int, genero: str):
        self.nombre = nombre 
        self.duracion = duracion
        self.genero = genero
   
   #Comandos

    def establecer_nombre(self, nombre: str):
        self.nombre = nombre
    
    def establecer_duracion(self, duracion: int):
        self.duracion = duracion
    
    def establecer_genero(self, genero: str):
        self.genero = genero
    
    #Consultas

    def obtener_nombre(self) -> str:
        return self.nombre
    
    def obtener_duracion(self) -> int:
        return self.duracion
    
    def obtener_genero(self) -> str:
        return self.genero
    


