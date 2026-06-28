from empleado import Empleado
from producto import Producto
from empresa import Empresa

empresa_cristian = Empresa("Cristian Alimentos")

#Empleados

Empleado_Cristian_1 = Empleado("Cristian", "Gomez")
Empleado_Cristian_2 = Empleado("Ana", "Lopez")
Empleado_Cristian_3 = Empleado("Luis", "Martinez")

#Productos

Producto_Cristian_1 = Producto("Arroz")
Producto_Cristian_2 = Producto("Fideos")

empresa_damian = Empresa("Damian Panadería")

#Empleados

Empleado_Damian_1 = Empleado("Damian", "Perez")
Empleado_Damian_2 = Empleado("Maria", "Gonzalez")
Empleado_Damian_3 = Empleado("Jose", "Rodriguez")

#Productos

Producto_Damian_1 = Producto("Pan")
Producto_Damian_2 = Producto("Galletitas")

#Agrego los Empleados y Productos a las Empresas

for emp in [Empleado_Cristian_1, Empleado_Cristian_2, Empleado_Cristian_3]:
    empresa_cristian.altaEmpleado(emp)
for prod in [Producto_Cristian_1, Producto_Cristian_2]:
    empresa_cristian.agregar_producto(prod)

for emp in [Empleado_Damian_1, Empleado_Damian_2, Empleado_Damian_3]:
    empresa_damian.altaEmpleado(emp)
for prod in [Producto_Damian_1, Producto_Damian_2]:
    empresa_damian.agregar_producto(prod)

#Doy de Baja a Dos empleados

empresa_cristian.bajaEmpleado(Empleado_Cristian_1)
empresa_cristian.bajaEmpleado(Empleado_Cristian_2)


#Imprimo la información de cada empresa

print(empresa_cristian)
print("--------")
print(empresa_damian)