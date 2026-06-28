import os

archivo_libros="libros.txt"
archivo_usuarios="usuarios.txt"
archivo_prestamo="prestamo.txt"

def limpiar_consola():
    os.system("cls" if os.name == "nt" else "clear")

def cargar_libros():
    limpiar_consola()
    libros=[]
    try:
        with open(archivo_libros,"r",encoding="utf-8") as f:
            for linea in f:
                linea = linea.strip()

                if not linea:
                    continue

                partes = linea.split(";")

                if len(partes) == 5:
                    id_libro = int(partes[0].strip())
                    titulo = partes[1].strip()
                    autor = partes[2].strip()
                    anio = int(partes[3].strip())
                    disponible = partes[4].strip().lower() == "true"

                    libros.append({
                        "id": id_libro,
                        "titulo": titulo,
                        "autor": autor,
                        "anio": anio,
                        "disponible": disponible
                    })

    except FileNotFoundError:
        pass

    except ValueError:
        print("[Error] hubo un problema al procesar los datos numericos en libros.txt.")
    return libros

    

def guardar_libros(libros):
    try:
        with open(archivo_libros, "w", encoding="utf-8") as f:
            for libro in libros:
                f.write(f"{libro['id']};{libro['titulo']};{libro['autor']};{libro['anio']};{libro['disponible']}\n")

    except Exception as e:
        print(f"[Error] no se pudo escribir en el archivo de libros: {e}")


def cargar_usuarios():
    usuarios = []

    try:
        with open(archivo_usuarios, "r", encoding="utf-8") as f:

            for linea in f:
                linea = linea.strip()

                if not linea:
                    continue

                partes = linea.split(";")

                if len(partes) == 2:
                    usuarios.append({
                        "dni": partes[0].strip(),
                        "nombre": partes[1].strip()
                    })

    except FileNotFoundError:
        pass

    return usuarios


def guardar_usuarios(usuarios):
    try:
        with open(archivo_usuarios, "w", encoding="utf-8") as f:

            for usuario in usuarios:
                f.write(f"{usuario['dni']};{usuario['nombre']}\n")

    except Exception as e:
        print(f"[error] no se pudo guardar en el archivo de usuarios: {e}")


def cargar_prestamos():
    prestamos=[]

    try:
        with open(archivo_prestamo,"r", encoding="utf-8") as f:

            for linea in f:
                linea = linea.strip()

                if not linea:
                    continue

                partes = linea.split(";")

                if len(partes) == 2:
                    try:
                        prestamos.append({
                            "dni": partes[0].strip(),
                            "id_libro": int(partes[1].strip())
                        })

                    except ValueError:
                        continue

    except FileNotFoundError:
        pass

    return prestamos


def guardar_prestamos(prestamos):
    try:
        with open(archivo_prestamo,"w",encoding="utf-8") as f:

            for prestamo in prestamos:
                f.write(f"{prestamo['dni']};{prestamo['id_libro']}\n")

    except Exception as e:
        print(f"[error] no se pudieron guardar prestamos: {e}")


def buscar_usuario_por_id(libros,id_libro):
    for libro in libros:
        if libro["id"] == id_libro:
            return libro

    return None


def buscar_usuario_por_dni(usuarios, dni):
    for usuario in usuarios:
        if usuario["dni"] == dni:
            return usuario

    return None


def registrar_libro(libros):

    limpiar_consola()

    print("---Registrar Nuevo Libro---")

    try:
        id_input = int(input("Ingrese ID del libro (numérico): ").strip())
        id_libro = int(id_input)

        if buscar_usuario_por_id(libros, id_libro) is not None:
            print("[error] ya existe un libro registrado con ese ID")
            return

        titulo = input("Ingrese el título: ").strip()
        autor = input("Ingrese el autor: ").strip()

        if not titulo or not autor:
            print("[error] el título y el autor no pueden estar vacíos.")
            return

        anio = int(input("ingrese el año de publicacion: ").strip())

        nuevo_libro = {
            "id": id_libro,
            "titulo": titulo,
            "autor": autor,
            "anio": anio,
            "disponible": True
        }

        libros.append(nuevo_libro)

        print(f"¡Libro '{titulo}' registrado con éxitos!")

        guardar_libros(libros)

    except ValueError:
        print("[error] entrada inválida. el ID y el año deben ser enteros.")


def mostrar_catalogo(libros):
    limpiar_consola()

    if not libros:
        print("La biblioteca no tiene libros registrados.")
        return

    print("---Catálogo Completo ---")

    for libro in libros:
        estado ="disponible" if libro["disponible"] else "prestado"

        print(f"ID: {libro['id']} | titulo: {libro['titulo']}| autor: {libro['autor']} ({libro['anio']}) -> [{estado}] ")


def buscar_libros(libros):
    limpiar_consola()

    print("---Buscar Libro por titulo--- ")

    busqueda= input("Ingrese el término de búsqueda: ").strip().lower()

    if not busqueda:
        print("[Error] debe ingresar algún carácter para buscar.")
        return

    encontrado = False

    for libro in libros:
        if busqueda in libro["titulo"].lower():

            estado = "disponible" if libro["disponible"] else "prestado"

            print(f"-> ID: {libro['id']} | '{libro['titulo']}' de {libro['autor']} -> [{estado}]")

            encontrado = True

    if not encontrado:
        print("No se encontraron coincidencias en el catálogo.")


def registrar_usuario(usuarios):
    limpiar_consola()

    print("---Registrar Nuevo Usuario---")

    dni = input("Ingrese el DNI: ").strip()

    if not dni:
        print("[error] el DNI no puede estar vacío.")
        return

    if buscar_usuario_por_dni(usuarios,dni) is not None:
        print("[error] Ya existe un usuario registrado con este DNI.")
        return

    nombre = input("Ingrese nombre y apellido: ").strip()

    if not nombre:
        print("[error] El nombre no puede estar vacio")
        return

    nuevo_usuario = {
        "dni": dni,
        "nombre": nombre,
    }

    usuarios.append(nuevo_usuario)

    print(f"¡Usuario '{nombre}'")

    guardar_usuarios(usuarios)


def mostrar_usuarios(usuarios):
    limpiar_consola()

    print("---Lista de Usuarios Registrados---")

    if not usuarios:
        print("No hay usuarios registrados en el sistema")
        return

    for usuario in usuarios:
        print(f"DNI: {usuario['dni']} | Nombre: {usuario['nombre']}")


def prestar_libro(libros,usuarios,prestamos):
    limpiar_consola()

    print("---Registrar Prestamo---")

    dni = input("Ingrese el DNI del usuario: ").strip()

    usuario = buscar_usuario_por_dni(usuarios,dni)

    if usuario is None:
        print("[error] Operacion cancelada. El libro no existe")
        return

    try:
        id_libro = int(input("ingrese el ID del libro a prestar: ").strip())

        libro = buscar_usuario_por_id(libros, id_libro)

        if libro is None:
            print("[error] operacion cancelada. El libro no existe")
            return

        if not libro["disponible"]:
            print("[error] operacion cancelada. el libro ya se encuentra prestado")
            return

        libro["disponible"] = False

        prestamos.append({
            "dni": dni,
            "id_libro": id_libro,
        })

        print(f"¡prestamo concedido! libro '{libro['titulo']}' asignado a {usuario['nombre']}.")

        guardar_libros(libros)
        guardar_prestamos(prestamos)

    except ValueError:
        print("[error] el ID del libro debe ser un valor numerico")


def devolver_libro(libros,prestamos):
    limpiar_consola()

    print("---Registrar Devolucion---")

    try:
        id_libro = int(input("Ingrese el ID del libro a devolver: ").strip())

        libro = buscar_usuario_por_id(libros,id_libro)

        if libro is None:
            print("[error] operacion cancelada. el libro no existe")
            return

        if libro["disponible"]:
            print("[error] el libro seleccionado no figura como prestado")
            return

        encontrado = False

        for prestamo in prestamos:

            if prestamo["id_libro"] == id_libro:
                prestamos.remove(prestamo)
                encontrado = True
                break

        if encontrado:
            libro["disponible"] = True

            print(f"¡Devolucion exitosa! el libro '{libro['titulo']}' vuelve a estar disponible")

            guardar_libros(libros)
            guardar_prestamos(prestamos)

        else:
            print("[error] No se encontro el registro activo de prestamo para este libro")

    except ValueError:
        print("[error] el ID del libro debe ser un valor numerico entero")


def estadisticas(libros, usuarios):
    limpiar_consola()

    print("---Estadisticas del Sistema---")

    total_libros = len(libros)

    print(f"Total de libros: {total_libros}")

    disponibles = 0
    prestados = 0

    for libro in libros:

        if libro["disponible"]:
            disponibles += 1

        else:
            prestados += 1

    print(f"Libros disponibles: {disponibles}")
    print(f"Libros prestados: {prestados}")
    print(f"Cantidad de usuarios registrados: {len(usuarios)}")

    if total_libros > 0:

        mas_antiguo = libros[0]
        mas_nuevo = libros[0]

        for libro in libros:

            if libro["anio"] < mas_antiguo["anio"]:
                mas_antiguo = libro

            if libro["anio"] > mas_nuevo["anio"]:
                mas_nuevo = libro

        print(f"Libro mas antiguo: {mas_antiguo['titulo']} ({mas_antiguo['anio']})")
        print(f"Libro mas nuevo: {mas_nuevo['titulo']} ({mas_nuevo['anio']})")

    else:
        print("Libro mas antiguo: (sin datos)")
        print("Libro mas nuevo: (sin datos)")


def mostrar_menu():
    print("=====BIBLIOTECA=====")
    print("1. Registrar Libro")
    print("2. Mostrar Catalogo")
    print("3. Buscar libro por titulo")
    print("4. Registrar Usuario")
    print("5. Mostrar Usuarios")
    print("6. Prestar Libro")
    print("7. Devolver Libro")
    print("8. Ver estadisticas")
    print("9. Salir")
    print("=====================")


def menu():
    
    limpiar_consola()

    libros = cargar_libros()
    usuarios = cargar_usuarios()
    prestamos = cargar_prestamos()


    opcion = ""

    while opcion != "9":

        mostrar_menu()

        opcion = input("Elija la opcion que desee: ").strip()

        limpiar_consola()
        
        match opcion:

            case "1":
                registrar_libro(libros)

            case "2":
                mostrar_catalogo(libros)

            case "3":
                buscar_libros(libros)

            case "4":
                registrar_usuario(usuarios)

            case "5":
                mostrar_usuarios(usuarios)

            case "6":
                prestar_libro(libros,usuarios,prestamos)

            case "7":
                devolver_libro(libros,prestamos)

            case "8":
                estadisticas(libros,usuarios)

            case "9":
                print("Guardando datos antes de salir")

            case _:
                print("Opción Invalida")

        input("\nPresione ENTER para continuar...")
        
        

    guardar_libros(libros)
    guardar_usuarios(usuarios)
    guardar_prestamos(prestamos)


menu()