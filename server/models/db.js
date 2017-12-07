'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var sequelize = new Sequelize("chatangular", "root", "", {
    dialect: 'mysql'
});
var db = {};
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
sequelize.sync().then(()=>{
    console.log('sync success', db.User);
}).catch(err=>{
    console.log('sync err');
})

db.Conversation.belongsToMany(db.User, {
    through : 'user_conversation',
    foreignKey: 'conversation_id'
});
db.User.belongsToMany(db.Conversation, {
    through : 'user_conversation',
    foreignKey: 'user_id'
});
db.Conversation.hasMany(db.Message, {
    foreignKey: {
        name: 'conversation_id',
        allowNull: false
    }
})

var models = sequelize.models;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
