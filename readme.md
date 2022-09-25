## Motores de plantilla

En el trabajo con hbs, pug y ejs

Elijo hbs, es mas practico y ameno con la sintaxis HTML, sabiendo desarrollo web es sencillo y rapido generar plantillas.

## Base de datos MongoDB
Levanto una base de datos con Docker
```bash
$ docker run --name coder-mongodb -d \
    -e MONGO_INITDB_ROOT_USERNAME=coder-user \
    -e MONGO_INITDB_ROOT_PASSWORD=coder-pass \
    -p 27017:27017 \
    mongo:latest
```

mongodb://coder-user:coder-pass@localhost:27017/coderdb?authSource=admin
mongodb://pepe:asd456@localhost:27017/ecommerce?authSource=admin


## Base de datos MariaDB
Levanto una base de datos con Docker
```bash
$ docker run --name coder-mariadb -d \
    -e MARIADB_DATABASE=coder-db \
    -e MARIADB_USER=coder-user \
    -e MARIADB_PASSWORD=coder-pass \
    -e MARIADB_ROOT_PASSWORD=root-pass \
    -p 3306:3306 \
    mariadb:latest
```

## 6 archivos Importantes.

### dbConfig.js

Contiene la configuracion de ambas bases de datos SQLite y mariaDB

### messageSchema.js y productSchema.js

Contiene los esquemas de las tablas.

### tableCreator.js

Logica para la creacion de las tablas.

### ContenedorDB.js

Tiene la misma logica que Contenedor.js pero implementado con Bases de datos.

### indexContenedor.js

Se instancia y exporta la clase Store para la aplicacion.