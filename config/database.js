if (process.env.NODE_ENV === 'dev') {
    var database = {
        dbHost: "localhost",
        dbPort: "27017",
    };
}

if (process.env.NODE_ENV === 'production') {
    var database = {
        dbHost: "localhost",
        dbPort: "27017",
    };
}    

module.exports = database;