import json
import concesionaria
import moto
import auto
import cliente
import sucursal
import venta


class ServicioConcesionarias:

    def obtener_por_id(self, concesionaria_id):

        with open("datos.json", "r", encoding="utf-8") as f:
            datos = json.load(f)

        concesionarias = []

        for objeto in datos:
            concesionarias.append(self.__extraer_concesionaria(objeto))

        for conc in concesionarias:
            if conc.obtener_numero_id() == int(concesionaria_id):
                return conc

        return None

    def __extraer_concesionaria(self, objeto):
        conc = concesionaria.Concesionaria(
            objeto.get("numero_id"), objeto.get("nombre")
        )

        clientes = objeto.get("clientes")
        for cli in clientes:
            cliente_registro = cliente.Cliente(
                cli.get("numero_id"),
                cli.get("nombres"),
                cli.get("apellidos"),
                cli.get("email"),
            )
            conc.agregar_cliente(cliente_registro)

        vehiculos = objeto.get("vehiculos")

        for veh in vehiculos:
            match veh.get("tipo"):
                case "auto":
                    vehiculo_registro = auto.Auto(
                        veh.get("numero_id"),
                        veh.get("marca"),
                        veh.get("modelo"),
                        veh.get("anio"),
                        veh.get("sucursal_id"),
                        veh.get("estado_id"),
                        veh.get("airbags"),
                        veh.get("frenos_abs"),
                        veh.get("caballos_fuerza"),
                    )
                    conc.agregar_vehiculo(vehiculo_registro)
                case "moto":
                    vehiculo_registro = moto.Moto(
                        veh.get("numero_id"),
                        veh.get("marca"),
                        veh.get("modelo"),
                        veh.get("anio"),
                        veh.get("sucursal_id"),
                        veh.get("estado_id"),
                        veh.get("cilindrada"),
                    )
                    conc.agregar_vehiculo(vehiculo_registro)

        sucursales = objeto.get("sucursales")

        for suc in sucursales:
            sucursal_registro = sucursal.Sucursal(
                suc.get("numero_id"), suc.get("direccion")
            )

            ventas = suc.get("ventas")

            for ven in ventas:
                venta_registro = venta.Venta(
                    ven.get("numero_id"),
                    ven.get("fecha"),
                    ven.get("cliente_id"),
                    ven.get("vehiculo_id"),
                    ven.get("monto"),
                )
                sucursal_registro.agregar_venta(venta_registro)

            conc.agregar_sucursal(sucursal_registro)

        return conc
