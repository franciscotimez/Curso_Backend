import { ContenedorMongo } from "../contenedores/contenedorMongo.js";
import { userSchema } from "./userSchema.js";

const collectionName = "user";

export class UsersDaoMongoDB extends ContenedorMongo {
    constructor() {
        super(collectionName, userSchema);
    }
}
