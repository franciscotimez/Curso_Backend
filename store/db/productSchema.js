export const productSchema = table => {
    table.increments('id');
    table.string('title');
    table.float('price');
    table.string('thumbnail');
};
