class Termostato():
    def __init__(self, vsensado, vpanel):
        self.vsensado = vsensado
        self.vpanel = vpanel


    def establecer_sensado(s):
        self.vsensado = s
    
    def establecer_panel(p):
        self.vpanel = p

    def obtener_sensado(self):
        return self.vsensado

    def obtener_panel(self):
        return self.vpanel

    def regulado(self):
        return true if self.vsensado == self.vpanel else False
    