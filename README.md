# Taxi 24

Este documento README proporciona instrucciones detalladas para clonar, configurar, lanzar y probar el proyecto Taxi24, que se ha desarrollado utilizando las siguientes tecnologías:

- **NestJS:** Framework de JavaScript diseñado para la creación de aplicaciones de servidor escalables.
- **TypeORM:** ORM que facilita la interacción con bases de datos SQL mediante TypeScript.
- **PostgreSQL:** Sistema de gestión de bases de datos relacional.
- **Docker:** Solución para la virtualización de aplicaciones a nivel de sistema operativo.
- **Docker Compose:** Herramienta para definir y gestionar aplicaciones compuestas por múltiples contenedores.
- **Clean Architecture:** Método de diseño que organiza el código en capas claras y definidas, mejorando la modularidad, flexibilidad y capacidad de prueba.

## Configuración y ejecución

### Requisitos previos

Antes de iniciar, asegúrate de tener los siguientes componentes instalados en tu estación de trabajo:

- [NodeJS](https://nodejs.org/) v16.x
- PostgreSQL
- Docker
- Docker Compose (Para utilizar el archivo `docker-compose.yml` proporcionado.)

### Inicialización

#### Clonación del repositorio

Comienza clonando el repositorio en tu estación de trabajo:

```sh
git clone https://github.com/WilmerCastro/Taxi24Qik.git


#### Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto.

```env
API_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=test_user
DB_PASSWORD=test_psw
DB_DATABASE=taxi24_db
DRIVER_RADIUS_DISTANCE=3
```

#### Ejecución

Ejecución del proyecto
Una vez configurado el archivo .env, puedes lanzar el servicio usando Docker Compose con el siguiente comando:



```sh
docker-compose up
```

Este comando tiene varias acciones integradas, incluyendo:

- **Creación de Contenedores**

- **Ejecución de Migraciones** 

- **Carga de Datos Iniciales**

> El servicio estará disponible en <http://localhost:3000/api/>

### Documentación

Para una integración y uso efectivos del API, se proporciona documentación completa en Swagger dentro del proyecto. Esta documentación está disponible en:
```url
http://localhost:3000/api/docs
```

### Pruebas, inicializacion

La base de datos se preconfigura con datos para conductores y pasajeros, facilitando la ejecución de pruebas en la funcionalidad de viajes.

### Conductores

#### Obtener una lista de todos los Conductores

```sh
curl -X GET \
  http://localhost:3000/api/drivers
```

#### Obtener una lista de todos los Conductores disponibles

```sh
curl -X GET \
  http://localhost:3000/api/drivers/availables
```

#### Obtener una lista de todos los Conductores disponibles en un radio de 3KM para una ubicación específica

```sh
curl -X GET \
  http://localhost:3000/api/drivers/nearby \
  -G \
  -d "latitude=-16.31161467716925" \
  -d "longitude=-71.53145554521213"
```


#### Para un pasajero solicitando un viaje, Obtenga una lista de los 3 conductores más cercanos al punto de partida

```sh
curl -X GET \
  http://localhost:3000/api/drivers/nearest \
  -G \
  -d "latitude=-16.322988255711252" \
  -d "longitude=-71.54650071278732"
```


#### Obtener un conductor específico por ID

```sh
curl -X GET \
  http://localhost:3000/api/drivers/60397e16-a8f3-4714-90dc-af26bb9b0d25
```

### Pasajeros

####  Obtener una lista de todos los pasajeros

```sh
curl -X GET \
  http://localhost:3000/api/passengers
```

#### Obtener un pasajero especifico por su ID

```sh
curl -X GET \
  http://localhost:3000/api/passengers/51d0776f-2d94-4c7f-8335-ddf2035ca68d
```

### Viajes

#### Crear una nueva solicitud de "Viaje" asignando un conductor a un pasajero

Para iniciar una solicitud de viaje y asignar un conductor a un pasajero, se requieren los IDs correspondientes del conductor y del pasajero. Estos IDs deben estar disponibles previamente, ya que se crean al inicio del servicio.

Para obtener los IDs necesarios, utilice los endpoints previamente definidos para listar los conductores y pasajeros. A partir de esta información, puede extraer los IDs requeridos para completar esta funcionalidad.

```sh
curl -X POST \
  http://localhost:3000/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "driverId": "714ed6f2-0a40-403d-937f-dc946bfcb035",
    "passengerId": "51d0776f-2d94-4c7f-8335-ddf2035ca68d",
    "originLatitude": -16.357923569913446,
    "originLongitude": -71.56444623590001,
    "destinationLatitude": -16.42519498149658,
    "destinationLongitude": -71.5174453154744,
    "status": "in_progress"
  }'
```

#### 4.3.2 Obtener una lista de todos los viajes activos

```sh
curl -X GET \
  http://localhost:3000/api/trips/actives
```
#### 4.3.3 Completar un viaje

Para completar un viaje, debe utilizar el ID del viaje creado previamente.

Una vez completado el viaje, se generará automáticamente una factura internamente. Puede verificar la creación de la factura observando el campo **"invoice"** en el JSON resultante.

```sh
curl -X PUT \
  http://localhost:3000/api/trips/37cca3d5-647c-46d0-817d-802d99c6f9cd
```
