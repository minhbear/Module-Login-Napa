const express = require("express");
const app = express();


const configExpress = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    console.log("config express")

    return app;
}

module.exports = {
    configExpress
}