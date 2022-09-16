const tableCreator = (configDB, tableName, tableSchema) => {

    const knex = require('knex')(configDB);

    knex.schema.createTable(tableName, tableSchema)
        .then(() => console.log(`Tabla ${tableName} Creada`))
        .catch(err => {
            if (err.code === 'ER_TABLE_EXISTS_ERROR' || `${err}`.includes(`SQLITE_ERROR: table \`${tableName}\` already exists`))
                console.log(`La Tabla ${tableName} ya existe`);
            else {
                console.log("Puto error", err);
                throw err;
            }
        })
        .finally(() => {
            knex.destroy();
        });
};

module.exports = { tableCreator };