var database = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:3000),
    dbHost: "localhost",
    dbPort: "27017",
    apiHost:process.env.APIHOST || '127.0.0.1',
    apiPort:process.env.APIPORT || '3030',
};

// if (process.env.NODE_ENV === 'dev') {
//     var database = {
//         dbHost: "localhost",
//         dbPort: "27017",
//         apiHost:process.env.APIHOST || '127.0.0.1',
//         apiPort:process.env.APIPORT || '3030',
//     };
// }

// if (process.env.NODE_ENV === 'production') {
//     var database = {
//         dbHost: "localhost",
//         dbPort: "27017",
//         apiHost:process.env.APIHOST || '127.0.0.1',
//         apiPort:process.env.APIPORT || '3030',
//         port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:3000),
//     };
// }    

module.exports = database;