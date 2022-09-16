

class ContenedorDB {
    constructor(options, tableName) {
        this.tableName = tableName;
        this.knex = require('knex')(options);
    }

    async save(obj) {
        const res = await this.knex(this.tableName).insert(obj);
        const newObjRaw = await this.knex.from(this.tableName).select("*").where("id", `${res[0]}`);
        const newObj = JSON.parse(JSON.stringify(newObjRaw[0]));
        return newObj;
    }

    async getById(id) {
        const objRaw = await this.knex.from(this.tableName).select("*").where("id", `${id}`);
        let obj = undefined;
        if (objRaw.length > 0)
            obj = JSON.parse(JSON.stringify(objRaw[0]));
        return obj;
    }

    async getAll() {
        const objRaw = await this.knex.from(this.tableName).select("*");
        const obj = JSON.parse(JSON.stringify(objRaw));
        return obj;
    }

    async deleteById(id) {
        const objRaw = await this.knex.from(this.tableName).where("id", `${id}`).del();
        if (objRaw)
            return `Elemento borrado`;
        else
            return `No se puede modificar los datos`;
    }

    async deleteAll() {
        const objRaw = await this.knex.from(this.tableName).del();
        return `Elementos borrados: ${objRaw}`;
    }

    async update(id, obj) {
        const objRaw = await this.knex.from(this.tableName).where("id", `${id}`).update(obj);
        const updatedObj = await this.getById(id);
        return updatedObj;
    }
}

module.exports = { ContenedorDB };


