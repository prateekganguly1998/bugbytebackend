const Sequelize=require('sequelize');
const db=require('../db/db');

module.exports=db.sequelize.define('user',
{
    id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:Sequelize.STRING},
    password:{type:Sequelize.STRING},
    createdAt:{type:Sequelize.DATE,defaultValue:Sequelize.NOW}
},
{
    timestamps:false
})

db.sequelize.sync().then(()=>
{
    console.log('Everything is synced')
})