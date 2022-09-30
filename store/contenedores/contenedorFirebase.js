
class contenedorFirebase {
    constructor(db, collectionName) {
        this.container = db.collection(collectionName);
        this.lastId = null;
    }

    async updateMaxId() {
        if (this.lastId === null) {
            const doc = await this.container.orderBy('id', 'desc').limit(1).get();
            this.lastId = 0;
            doc.forEach(doc => {
                this.lastId = doc.data().id;
            });
            console.log("this.lastId: ", this.lastId);
        }
    }

    async save(obj) {
        try {
            const newObj = { id: ++this.lastId, ...obj };
            const res = await this.container.add(newObj);
            console.log("Firestore Res: ", res.id);
            return newObj;
        } catch (error) {
            return "error";
        }
    }

    async getById(id) {
        let rtnObj = null;
        const obj = await this.container.where('id', '==', id).limit(1).get();
        obj.forEach(doc => {
            rtnObj = doc.data();
        });
        return rtnObj;
    }

    async getAll() {
        let allDocs = [];
        const objs = await this.container.orderBy('id').get();
        objs.forEach(doc => {
            allDocs.push(doc.data());
        });
        return allDocs;
    }

    async deleteById(id) {
        let docId = null
        const obj = await this.container.where('id', '==', id).limit(1).get();
        obj.forEach(doc => {
            docId = doc.id;
        });

        await this.container.doc(docId).delete()
        return "Elemento Borrado"
    }

    async deleteAll() {
    }

    async update(id, obj) {
        let docId = null
        const docRef = await this.container.where('id', '==', id).limit(1).get();
        docRef.forEach(doc => {
            docId = doc.id;
        });

        await this.container.doc(docId).update(obj)
        const updatedObj = await this.getById(id);
        return updatedObj;
    }
}

module.exports = { contenedorFirebase };


