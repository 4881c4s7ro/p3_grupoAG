
class NaveEspacial():
    maxDeposito = 1000
    parsec = 100

    def __init__(self, o, c):
        
        self.color=o
        if c > self.maxDeposito:
            self.combustible = self.maxDeposito
        else:
            self.combustible = c

    def establecerColor(self, o):
        self.color = o
    
    def establecerCombustible(self, c):
        if c > self.maxDeposito:
            self.combustible = self.maxDeposito
        else:
            self.combustible = c
        
    def llenarDeposito(self):
        self.combustible = self.maxDeposito
    
    def obtener_color(self):
        return self.color
    def obtener_combustible(self):
        return self.combustible
    def obtener_autonomía(self):
        return self.combustible / self.parsec



