const messageSchema = table => {
    table.increments('id');
    table.string('message');
    table.string('date');
    table.string('user');
};

module.exports = { messageSchema };