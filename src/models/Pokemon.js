const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      validate:{
        notString(value){
          if(typeof value!=='number'){
            throw new Error('Error, el id del pokemon solo puede ser integer')
        }
        }
      }

    },
    name: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    weight:{
      type: DataTypes.FLOAT,
      defaultValue:10,
      validate:{
        min:0.1,
        max:1000

      }
    },

    height:{
      type:DataTypes.FLOAT,
      defaultValue:5,
      validate:{
        min:0.1,
        max:20
      }
    },

    hp:{
      type:DataTypes.INTEGER,
      defaultValue:60,
      
    },
    attack:{
      type:DataTypes.INTEGER,
      defaultValue:60,
      
    },
    defense:{
      type:DataTypes.INTEGER,
      defaultValue:60,
      
    },
    speed:{
      type:DataTypes.INTEGER,
      defaultValue:60,
      
    },
    front_default:{
      type:DataTypes.TEXT
      
    }


    
  },  { timestamps: false });
};

