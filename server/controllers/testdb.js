var Sequelize = require('sequelize');
const connection = new Sequelize('mytestdb','root','', {
    define: {
        timestamp: false,
    },
    host: 'localhost',
    dialect: 'mysql'
});

const conversation = connection.define('conversation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
});

const message = connection.define('message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    content: Sequelize.STRING
})

const user = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    // birthday: Sequelize.DATE
})

connection.authenticate().then(function(){
    console.log('connect succesfully');
}).catch(function(){
    console.log('fail to connect');
})

connection.sync().then(function(){
   console.log('success sync');
   // user.create({
   //  name: 'thuy',
   //  birthday: Sequelize.NOW
   // }).then(()=>{
   //  console.log('created user');
   // }).catch(()=>{'cannot creat user'})
}).catch(function(err) {
    console.log(err);
}) 

module.exports.conversation = conversation;
module.exports.message = message;
module.exports.user = user;
