const mongoose = require('mongoose');

class ContenedorMongo {
    constructor(collectionName, schema) {
        this.container = mongoose.model(collectionName, schema);
        this.lastId = null;
    }

    async updateMaxId() {
        if (this.lastId === null) {
            const id = await this.container.findOne({}, { id: 1 }).sort({ id: -1 });
            this.lastId = id === null ? 0 : id.id;
        }
    }

    async save(obj) {
        const newObj = new this.container({ id: ++this.lastId, ...obj });
        const savedObj = await newObj.save();
        const rtnObj = await this.container.findOne({ _id: savedObj._id }, { _id: 0, __v: 0 });
        return rtnObj;
    }

    async getById(id) {
        const obj = await this.container.findOne({ id }, { _id: 0, __v: 0 });
        if (obj) {
            return { ...obj._doc };
        }
        return null;
    }

    async getAll() {
        const obj = await this.container.find({}, { _id: 0, __v: 0 });
        return obj;
    }

    async deleteById(id) {
        const obj = await this.container.deleteOne({ id });
        if (obj.deletedCount > 0) {
            return "Elemento borrado con exito";
        }
        return "Elemento no encontrado";
    }

    async deleteAll() {
        const obj = await this.container.deleteMany({});
    }

    async update(id, obj) {
        const updateObj = await this.container.updateOne({ id }, { $set: { ...obj } });
        const updatedObj = await this.getById(id);
        return updatedObj;
    }
}

module.exports = { ContenedorMongo };


