const configMariaDb = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'coder-user',
        password: 'coder-pass',
        database: 'coder-db'
    }
};

const configSQlite3 = {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "./messages.sqlite"
    },
    useNullAsDefault: true
};

module.exports = {
    configMariaDb,
    configSQlite3
};