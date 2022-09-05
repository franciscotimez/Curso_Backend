
const { promises: fs } = require('fs');

class Contenedor {
    constructor(filePath) {
        this.filePath = filePath;
        this.lastId = 0;
    }

    async save(obj) {
        let data = await this.getAll();
        const newObj = { id: ++this.lastId, ...obj };
        // console.log(`Nuevo objeto: `, newObj);
        data = [...data, newObj];

        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        // console.log(`Se creo archivo ${this.filePath}`);
        return newObj;
    }

    async getById(id) {
        let data = await this.getAll();
        return data.find(data => data.id === id);
    }

    async getAll() {
        try {
            let raw = await fs.readFile(this.filePath, 'utf8');
            let data = JSON.parse(raw);
            let lastId = [0, ...data.map(item => item.id)];
            this.lastId = Math.max(...lastId);
            // console.log(`Se leyo archivo ${this.filePath}, lastId: `, this.lastId);
            return data;
        } catch (e) {
            if (e.code === 'ENOENT') {
                try {
                    await fs.writeFile(this.filePath, JSON.stringify([]));
                    // console.log(`Se creo archivo ${this.filePath}`);
                    return [];
                } catch (error) {
                    return `No se puede modificar los datos`;
                }
            }
        }
    }

    async deleteById(id) {
        let data = await this.getAll();
        let datafiltered = data.filter(item => item.id != id);
        // console.log("delete by id", datafiltered);
        try {
            await fs.writeFile(this.filePath, JSON.stringify(datafiltered, null, 2));
            return `Producto borrado`;
        } catch (error) {
            return `No se puede modificar los datos`;
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify([]));
        } catch (error) {
            return `No se puede modificar los datos`;
        }
    }

    async update(id, obj) {
        let data = await this.getAll();
        let newData = data.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    ...obj
                };
            }
            return item;
        });

        await fs.writeFile(this.filePath, JSON.stringify(newData, null, 2));
        // console.log(`Se creo archivo ${this.filePath}`);
        const updatedObj = await this.getById(id);
        return updatedObj;
    }
}

module.exports = { Contenedor };


