var Sequelize = require('sequelize');
const connection = new Sequelize('testdb','root','', {
    define: {
        timestamp: false,
    },
    host: 'localhost',
    dialect: 'mysql'
});

const user = connection.define('conversation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
});

connection.authenticate().then(function(){
    console.log('connect succesfully');
}).catch(function(){
    console.log('fail to connect');
})

connection.sync().then(function(){
    user.create({
        name: 'conversation 1'
    }).then(function() {
        console.log("ok");
    })
})

