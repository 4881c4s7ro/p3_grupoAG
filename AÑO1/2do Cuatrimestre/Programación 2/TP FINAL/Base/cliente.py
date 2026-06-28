import vehiculo


class Cliente:


    def __init__(self, numero_id: int, nombres: str, apellidos: str, email: str):
        self.numero_id = numero_id
        self.nombres = nombres
        self.apellidos = apellidos
        self.email = email

#Comandos:

    def establecer_numero_id(self, numero_id):
        self.numero_id = numero_id

    def establecer_nombres(self, nombres):
        self.nombres = nombres

    def establecer_apellidos(self, apellidos):
        self.apellidos = apellidos

    def establecer_email(self, email):
        self.email = email
        
#Consultas:

    def obtener_numero_id(self):
        return self.numero_id
    
    def obtener_nombres(self):
        return self.nombres
    
    def obtener_apellidos(self):
        return self.apellidos
    
    def obtener_email(self):
        return self.email
    
#Comparar por Id:

    def __eq__(self, other):
        if isinstance(other, Cliente):
            return self.numero_id == other.numero_id
        return False

#Retornar Ordenadamente:

    def __str__(self):
        return(f"Cliente ID: {self.numero_id}," 
               f"Nombres: {self.nombres}, "
               f"Apellidos: {self.apellidos}", 
               f"Email: {self.email}")
       
               
             