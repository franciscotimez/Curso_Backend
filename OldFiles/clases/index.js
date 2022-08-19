
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas = [...this.mascotas, mascota];
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros = [...this.libros, { nombre: nombre, autor: autor }];
    }

    getBookNames() {
        return this.libros.map( libro =>  libro.nombre )
    }
}

const usuario1 = new Usuario("Elon", "Musk", [{ nombre: "Harry Potter", autor: "J.K. Rowling" }], ["perro"]);

console.group("usuario1");

usuario1.addMascota("gato");
usuario1.addBook("El senior de las moscas", "William Golding");
usuario1.addBook("Fundacion", "Isaac Asimov");

console.log("Nombre -> ", usuario1.getFullName());
console.log("Mascotas -> ", usuario1.countMascotas(), " -> ", usuario1.mascotas);
console.log("Libros -> ", usuario1.getBookNames());
console.groupEnd("usuario1");