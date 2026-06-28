class SecuenciaEnteros:


def __init__(self, cant: int):
        if cant <= 10:
            raise ValueError("La cantidad debe ser mayor a 10")
        self.secuencia = [0] * cant


#comandos


def establecerEntero(self, p: int, n: int):
    if 0 <= p < len(self.secuencia):
        self.secuencia[p] = n
    else:
        raise IndexError("Posición fuera de rango")
    
def reemplazar(self, n1: int, n2: int):
    for i in range(len(self.secuencia)):
        if self.secuencia[i] == n1:
            self.secuencia[i] = n2


def reemplazarPrimUltimo(self, n: int):
    if len(self.secuencia) > 0:
        self.secuencia[0] = n
        self.secuencia[-1] = n

def intercambiar(self, p1: int, p2: int) -> bool:
    if 0 <= p1 < len(self.secuencia) and 0 <= p2 < len(self.secuencia):
        self.secuencia[p1], self.secuencia[p2] = self.secuencia[p2], self.secuencia[p1]
    else:
        raise IndexError("Posición fuera de rango")


def copy(self, a: "SecuenciaEnteros") -> bool:
    if a is None:
        return False
    if len(self.secuencia) != len(a.secuencia):
        return False
    for i in range(len(self.secuencia)):
        self.secuencia[i] = a.secuencia[i]
    return True

#Consultas

def obtenerEntero(self, p: int) -> int:
    if 0 <= p < len(self.secuencia):
        return self.secuencia[p]
    else:
        raise IndexError("Posición fuera de rango")
    

def cantidadElementos(self) -> int:
    return len(self.secuencia)
