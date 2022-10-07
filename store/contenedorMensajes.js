
import { promises as fs } from 'fs';
import { denormalize, normalize, schema } from 'normalizr';

// Define a users schema
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });

// Define your comments schema
const mensajeSchema = new schema.Entity('mensaje', {
    author: authorSchema
});

const mensajesSchema = new schema.Entity('mensajes', {
    mensajes: [mensajeSchema]
});

export class ContenedorMensajes {
    constructor(filePath) {
        this.filePath = filePath;
        this.lastId = 0;
    }

    async save(obj) {
        let data = await this.getAll();
        const newObj = { id: ++this.lastId, ...obj };
        console.log(`Nuevo objeto: `, newObj);
        data = [...data, newObj];
        const dataNormalizada = normalize({ id: "mensajes", mensajes: data }, mensajesSchema);
        await fs.writeFile(this.filePath, JSON.stringify(dataNormalizada, null, 2));
        console.log(`Se creo archivo ${this.filePath}`);
        return newObj;
    }

    async getById(id) {
        let data = await this.getAll();
        return data.find(data => data.id === id);
    }

    async getAll() {
        try {
            let raw = await fs.readFile(this.filePath, 'utf8');
            let dataNormalizada = JSON.parse(raw);
            console.log(dataNormalizada);
            let { mensajes: data } = denormalize(dataNormalizada.result, mensajesSchema, dataNormalizada.entities);
            console.log(data);
            let lastId = [0, ...data.map(item => item.id)];
            this.lastId = Math.max(...lastId);
            console.log(`Se leyo archivo ${this.filePath}, lastId: `, this.lastId);
            return data;
        } catch (e) {
            if (e.code === 'ENOENT') {
                try {
                    await fs.writeFile(this.filePath, JSON.stringify(normalize({ id: "mensajes", mensajes: [] }, mensajesSchema)));
                    console.log(`Se creo archivo ${this.filePath}`);
                    return [];
                } catch (error) {
                    return `No se puede modificar los datos`;
                }
            }
        }
    }

    async getAllNormalized() {
        try {
            let raw = await fs.readFile(this.filePath, 'utf8');
            let dataNormalizada = JSON.parse(raw);
            return dataNormalizada;
        } catch (e) {
            if (e.code === 'ENOENT') {
                try {
                    await fs.writeFile(this.filePath, JSON.stringify(normalize({ id: "mensajes", mensajes: [] }, mensajesSchema)));
                    console.log(`Se creo archivo ${this.filePath}`);
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
        console.log("delete by id", datafiltered);
        try {
            const dataNormalizada = normalize({ id: "mensajes", mensajes: datafiltered }, mensajesSchema);

            await fs.writeFile(this.filePath, JSON.stringify(dataNormalizada, null, 2));
            return `Producto borrado`;
        } catch (error) {
            return `No se puede modificar los datos`;
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(normalize({ id: "mensajes", mensajes: [] }, mensajesSchema)));
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

        const dataNormalizada = normalize({ id: "mensajes", mensajes: datafiltered }, mensajesSchema);
        await fs.writeFile(this.filePath, JSON.stringify(dataNormalizada, null, 2));
        console.log(`Se creo archivo ${this.filePath}`);
        const updatedObj = await this.getById(id);
        return updatedObj;
    }
}

