const { DataTypes } = require('sequelize');


module.exports=(sequelize)=>{
    sequelize.define('type',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(12),
            allowNull: false,
          }
    } ,
    { timestamps: false })
}
