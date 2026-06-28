    class cancion():

    def __init__(self, nombre, artista, duracion):
        self.nombre = nombre
        self.artista = artista
        self.duracion = duracion

    def __str__(self):
        return f'Nombre: {self.nombre}, Artista: {self.artista}, Duracion: {self.duracion} seg'