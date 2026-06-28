import flask
import servicio_concesionarias
import servicio_clientes
import servicio_vehiculos

app = flask.Flask(__name__)


@app.route("/concesionarias/<concesionaria_id>/", methods=["GET"])
def obtener_concesionaria(concesionaria_id):

    servicio = servicio_concesionarias.ServicioConcesionarias()

    concesiaria_encontrada = servicio.obtener_por_id(concesionaria_id)

    if concesiaria_encontrada is None:
        flask.abort(404)

    return f"<pre>{str(concesiaria_encontrada)}</pre>", 200


@app.route(
    "/concesionarias/<concesionaria_id>/clientes/<id_cliente>/total-ventas/",
    methods=["GET"],
)
def obtener_total_ventas_de_cliente(concesionaria_id, id_cliente):

    servicio = servicio_clientes.ServicioClientes()

    total_ventas = servicio.obtener_total_ventas_por_cliente(
        concesionaria_id, id_cliente
    )

    return str(total_ventas), 200


@app.route(
    "/concesionarias/<concesionaria_id>/sucursales/<sucursal_id>/vehiculos/",
    methods=["GET"],
)
def obtener_vehiculos(concesionaria_id, sucursal_id):

    estado_id = flask.request.args.get("estado_id")

    servicio = servicio_vehiculos.ServicioVehiculos()

    vehiculos = servicio.obtener_vehiculos_por_sucursal_y_estado(
        concesionaria_id, sucursal_id, estado_id
    )

    texto_respuesta = "Vehículos:\n  "

    texto_respuesta = texto_respuesta + "\n  ".join(
        str(vehiculo) for vehiculo in vehiculos
    )

    return f"<pre>{texto_respuesta}</pre>", 200
