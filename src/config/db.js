const {Pool} = require("pg")

module.exports = new Pool({
    user: "", // INSERT YOUR USER ON POSTGRE
    password: "", // INSERT YOUR PASSWORD ON POSTGRE
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
})