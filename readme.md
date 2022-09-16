## Motores de plantilla

En el trabajo con hbs, pug y ejs

Elijo hbs, es mas practico y ameno con la sintaxis HTML, sabiendo desarrollo web es sencillo y rapido generar plantillas.

## Base de datos
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