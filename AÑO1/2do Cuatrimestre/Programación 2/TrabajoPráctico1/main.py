import json 
import os

base_path = os.path.dirname(__file__)
skins_file_path = os.path.join(base_path, "json-files", "skins.json")

def limpiar_consola():
    os.system('cls' if os.name == 'nt' else 'clear')

def get_skins(): 
    with open(skins_file_path, "r", encoding="utf-8") as file:
        skins = json.load(file)
    return skins

def agregar_skin():
    try:
        codigo = input("Ingrese el código de la skin: ")
        nombre = input("Ingrese el nombre de la skin: ")
        coleccion = input("Ingrese la colección de la skin: ")
        rareza = input("Ingrese la rareza de la skin: ")
        desgaste = input("Ingrese el desgaste de la skin: ")
        floatValue = float(input("Ingrese el valor float de la skin: "))
        cantidad = int(input("Ingrese la cantidad de skins: "))
        precio = float(input("Ingrese el precio de la skin: "))

        if guardar_skin(codigo, nombre, coleccion, rareza, desgaste, floatValue, cantidad, precio):
            print(f"Skin '{nombre}' agregada correctamente.\n")
            input("Presione Enter para continuar...")
            return True
        else:
            print(f"No se pudo agregar la skin '{nombre}'.")
            input("Presione Enter para continuar...")
            return False
    except ValueError:
        print(f"Error al ingresar los datos. Por favor, intente nuevamente.")
        input("Presione Enter para continuar...")
        return False

def guardar_skin(codigo, nombre, coleccion, rareza, desgaste, floatValue, cantidad, precio):
    skins = get_skins()

    # valido si existe una skin con el mismo codigo
    for skin in skins:
        if skin["codigo"].upper() == codigo.upper():
            print(f"Ya existe una skin con el codigo'{codigo}'.")
            return False
    
    nuevo_skin = {
        "codigo": codigo,
        "nombre": nombre,
        "coleccion": coleccion,
        "rareza": rareza,
        "desgaste": desgaste,
        "float": floatValue,
        "precio": precio,
        "cantidad": cantidad
    }
    skins.append(nuevo_skin)
    
    with open(skins_file_path, "w", encoding="utf-8") as file:
        json.dump(skins, file, indent=4, ensure_ascii=False)

    return True

def modificar_skin():
    codigo = input("Código de la skin a modificar: ")
    skins = get_skins()

    for skin in skins:
        if skin["codigo"].upper() == codigo.upper():
            print(f"\nEncontramos la skin: {skin['nombre']}")

            print(f"Nombre actual: {skin['nombre']}")
            nombre_input = input("Nuevo nombre (dejar en blanco para mantener): ").strip()
            if nombre_input == "":
                nombre = skin['nombre']
            else:
                nombre = nombre_input

            print(f"Colección actual: {skin['coleccion']}")
            coleccion_input = input("Nueva colección (dejar en blanco para mantener): ").strip()
            if coleccion_input == "":
                coleccion = skin['coleccion']
            else:
                coleccion = coleccion_input

            print(f"Rareza actual: {skin['rareza']}")
            rareza_input = input("Nueva rareza (dejar en blanco para mantener): ").strip()
            if rareza_input == "":
                rareza = skin['rareza']
            else:
                rareza = rareza_input

            print(f"Desgaste actual: {skin['desgaste']}")
            desgaste_input = input("Nuevo desgaste (dejar en blanco para mantener): ").strip()
            if desgaste_input == "":
                desgaste = skin['desgaste']
            else:
                desgaste = desgaste_input

            print(f"Float actual: {skin['float']}")
            float_input = input("Nuevo float (dejar en blanco para mantener): ").strip()
            if float_input == "":
                nuevo_float = skin['float']
            else:
                nuevo_float = float(float_input)

            print(f"Cantidad actual: {skin['cantidad']}")
            cantidad_input = input("Nueva cantidad (dejar en blanco para mantener): ").strip()
            if cantidad_input == "":
                nueva_cantidad = skin['cantidad']
            else:
                nueva_cantidad = int(cantidad_input)

            print(f"Precio actual: {skin['precio']}")
            precio_input = input("Nuevo precio (dejar en blanco para mantener): ").strip()
            if precio_input == "":
                nuevo_precio = skin['precio']
            else:
                nuevo_precio = float(precio_input)

            skin.update({
                "nombre": nombre,
                "coleccion": coleccion,
                "rareza": rareza,
                "desgaste": desgaste,
                "float": nuevo_float,
                "cantidad": nueva_cantidad,
                "precio": nuevo_precio
            })

            with open(skins_file_path, "w", encoding="utf-8") as file:
                json.dump(skins, file, indent=4, ensure_ascii=False)

            print("La skin fue modificada con éxito.")
            input("Presione Enter para continuar...")
            return True

    print("No se encontró ninguna skin con ese código.")
    input("Presione Enter para continuar...")
    return False


def eliminar_skin(codigo):
    skins = get_skins()

    # filtro las skins que no coinciden con el codigo que le pasamos
    skins_filtrados = []
    for skin in skins:
        if skin["codigo"].upper() != codigo.upper():
            skins_filtrados.append(skin)

    with open(skins_file_path, "w", encoding="utf-8") as archivo:
        json.dump(skins_filtrados, archivo, indent=4, ensure_ascii=False)

    if len(skins_filtrados) < len(skins):
        print(f"La skin con código '{codigo}' ha sido eliminada correctamente.")
    else:
        print(f"No se encontró ninguna skin con el código '{codigo}'.")

    input("\nPresione Enter para continuar...")

def get_skins_for_update_delete():
    skins = get_skins()

    if not skins:
        print("No hay skins registradas.")
        return

    for skin in skins:
        print(f"Código: {skin['codigo']}, Nombre: {skin['nombre']}")
    print("")

def buscar_por_criterio():
    try:
        print("Seleccione un criterio de búsqueda:")
        print("1. Nombre")
        print("2. Colección")
        print("3. Rareza")
        print("4. Desgaste")
        print("5. Cantidad")
        print("6. Precio")
        print("7. Float")

        opcion = int(input("\nIngrese el número del criterio: "))
        opciones_validas = [1, 2, 3, 4, 5, 6, 7]

        if opcion not in opciones_validas:
            input("Opción inválida. Por favor, intente nuevamente.")
            limpiar_consola()
            buscar_por_criterio()
        
        match opcion:
            case 1:
                nombre = input("Ingrese el nombre de la skin: ")
                skins = buscar_skin_por_atributo("nombre", nombre)
                print()
                for skin in skins:
                    print(format_skin(skin))
                    print()
            case 2:
                coleccion = input("Ingrese la colección de la skin: ")
                skins = buscar_skin_por_atributo("coleccion", coleccion)
                print()
                for skin in skins:
                    print(format_skin(skin))
                    print()
            case 3:
                rareza = input("Ingrese la rareza de la skin: ")
                skins = buscar_skin_por_atributo("rareza", rareza)
                print()
                for skin in skins:
                    print(format_skin(skin))
                    print()
            case 4:
                desgaste = input("Ingrese el desgaste de la skin: ")
                skins = buscar_skin_por_atributo("desgaste", desgaste)
                print()
                for skin in skins:
                    print(format_skin(skin))
                    print()
            case 5:
                cantidad = int(input("Ingrese la cantidad de skins: "))
                skins = buscar_skin_por_atributo("cantidad", cantidad)
                print()
                for skin in skins:
                    print(format_skin(skin))
                    print()
            case 6:
                precio_minimo = float(input("Ingrese el precio mínimo de la skin: "))
                precio_maximo = float(input("Ingrese el precio máximo de la skin: "))
                skins = buscar_skin_por_rango_precios(precio_minimo, precio_maximo)
                print()
                for skin in skins:
                    print(format_skin(skin))
                    print()
            case _:
                # no deberia entrar aca, pero viste como es esto
                input("Opción inválida. Por favor, intente nuevamente.")
                limpiar_consola()
                buscar_por_criterio()
    except ValueError:
        input("Valor ingresado inválido. Presione Enter para intentarlo nuevamente.")

    input("\nPresione Enter para continuar...")

def buscar_skin_por_atributo(atributo, nombre):
    skins = get_skins()
    skins_filtradas = [] 

    for skin in skins:
        if(skin[atributo] == nombre):
            skins_filtradas.append(skin)

    return skins_filtradas

def buscar_skin_por_rango_precios(precio_minimo, precio_maximo):
    skins = get_skins()
    skins_filtradas = [] 

    for skin in skins:
        if(skin["precio"] >= precio_minimo and skin["precio"] <= precio_maximo):
            skins_filtradas.append(skin)

    return skins_filtradas

def format_skin(skin):
    return f"Código: {skin['codigo']}\nNombre: {skin['nombre']}\nColección: {skin['coleccion']}\nRareza: {skin['rareza']}\nDesgaste: {skin['desgaste']}\nFloat: {skin['float']}\nCantidad: {skin['cantidad']}\nPrecio: {skin['precio']}"

def get_skins_for_list(ordenar, atributo=None):
    skins = get_skins()
    if(skins and ordenar and atributo != None):
        skins = sorted(skins, key=lambda x: x[atributo])

    if not skins:
        print("No hay skins registradas.")
        input("Presione Enter para continuar...")
        return

    print("Lista de skins:\n")
    for skin in skins:
        print(format_skin(skin))
        print("")

    input("\nPresione Enter para continuar...")

def get_sorted():
    return input("¿Desea ordenar las skins? (s/n): ").strip().lower() == 's'

def get_atributo():
    try:
        print("Seleccione el atributo por el cual ordenar:")
        print("1. Código")
        print("2. Nombre")
        print("3. Colección")
        print("4. Rareza")
        print("5. Float")
        print("6. Cantidad")
        print("7. Precio")

        opcion = int(input("\nIngrese el número del atributo: "))
        opciones_validas = [1, 2, 3, 4, 5, 6, 7]

        if opcion not in opciones_validas:
            input("Opción inválida. Por favor, intente nuevamente.")
            return get_atributo()

        match opcion:
            case 1:
                return "codigo"
            case 2:
                return "nombre"
            case 3:
                return "coleccion"
            case 4:
                return "rareza"
            case 5:
                return "float"
            case 6:
                return "cantidad"
            case 7:
                return "precio"
    except ValueError:
        input("Valor ingresado inválido. Presione Enter para intentarlo nuevamente.")
        return get_atributo()

def home():
    limpiar_consola()
    print("Bienvenido al gestor de skins de Counter-Strike\n")
    print("Seleccione una opción:")
    option = int(input("1. Agregar skin\n2. Modificar skin\n3. Eliminar skin\n4. Listar skins\n5. Buscar skin por criterio\n6. Salir\n"))
    match option:
        case 1:
            limpiar_consola()
            agregar_skin()
            home()
        case 2:
            limpiar_consola()
            get_skins_for_update_delete()
            modificar_skin()
            home()
        case 3:
            limpiar_consola()
            get_skins_for_update_delete()
            codigo = input("Ingrese el código de la skin a eliminar: ")
            eliminar_skin(codigo)
            home()
        case 4:
            limpiar_consola()
            ordenar = get_sorted()
            if(ordenar):
                atributo = get_atributo()
            else:
                atributo = None
            get_skins_for_list(ordenar, atributo)
            home()
        case 5:
            limpiar_consola()
            buscar_por_criterio()
            home()
        case 6:
            limpiar_consola()
            print("Saliendo del gestor de skins.")
            return

if(__name__ == "__main__"):
    home()
