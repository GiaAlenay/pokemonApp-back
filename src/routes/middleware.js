const axios = require('axios')
const{Type,Pokemon}=require('../db.js')

const getpokemosApi= async(op,id,name)=>{    
    
        const pokearray=[]
        const pokeApi= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
        .then( d=>{
            const urlArray=[]
            for(i of d.data.results){
                urlArray.push(i.url)
            }
            return urlArray
        })
        
        for(u of pokeApi){
            const pokemon= await axios.get(u)
            const info= await pokemon.data
            pokearray.push({
                id: info.id,
                name: info.name,
                types: info.types.map((t) => {return { name:t.type.name}}),
                front_default: info.sprites.other["official-artwork"].front_default,
                weight: info.weight,
                height:info.height,
                hp:info.stats[0].base_stat,
                attack:info.stats[1].base_stat,
                defense:info.stats[2].base_stat,
                speed:info.stats[5].base_stat,                
            })
        }

        if(op===1){
            const pokeAllArray=[]
            pokearray.map((p)=>{pokeAllArray.push({id:p.id, name:p.name,types:p.types,front_default:p.front_default})})
            const pokeFoundDb=await Pokemon.findAll(
                {
                    attributes: {
                        exclude: ['weight', 'height','hp','attack','defense','speed']
                    },
                    include: [{ model: Type, attributes: ['name']}],
                  }   
            )
            if(pokeFoundDb){pokeFoundDb.map(p=>pokeAllArray.push(p))}
            const pokeResponse1=pokeAllArray?pokeAllArray:{error:`Not pokemons to show.`}
                  return pokeResponse1
        }
        if(op===2){
            const pokeFoundArray=pokearray.find(p=>p.id===id)
            const pokeFoundDb = await Pokemon.findOne({
                where: {
                  id: id,
                },
                include: [{ model: Type, attributes: ['name']}],
              });
              const pokeResponse2=(pokeFoundArray)? pokeFoundArray : (pokeFoundDb)? pokeFoundDb:{error:`Pokemon with id "${id}"not found`};
              return pokeResponse2;
        }
        if(op===3){           
           
            const pokeFoundDb = await Pokemon.findOne({
                where: {
                  name: name,
                },
                attributes: {
                    exclude: ['weight', 'height','hp','attack','defense','speed']
                },
                include: [{ model: Type, attributes: ['name']}],
              });
              const obj=pokearray.find(p=>p.name===name) 
              let pokeFound={}           
                        
              const pokeResponse3=(obj)?pokeFound={id:obj.id, name:obj.name,types:obj.types,front_default:obj.front_default}:(pokeFoundDb)?pokeFoundDb:{error:`Pokemon by name ${name} not found`}
            return pokeResponse3
        }
        if(op===4){
            const pokeFoundDb= await Pokemon.findAll(
                {attributes:['id']} 
            )
            const pokeAllArray=[]
            pokearray.map((p)=>{pokeAllArray.push(p.id)})
            if(pokeFoundDb){pokeFoundDb.map(p=>pokeAllArray.push(p.id))}
            const pokeResponse4=pokeAllArray?pokeAllArray:{error:`Not pokemons id to show.`}
                  return pokeResponse4
        }
        if(op===5){
            const pokeFoundDb= await Pokemon.findAll(
                {attributes:['name']} 
            )
            const pokeAllArray=[]
            pokearray.map((p)=>{pokeAllArray.push(p.name)})
            if(pokeFoundDb){pokeFoundDb.map(p=>pokeAllArray.push(p.name))}
            const pokeResponse5=pokeAllArray?pokeAllArray:{error:`Not pokemons Name to show.`}
                  return pokeResponse5
        }
        return pokearray
    
}

module.exports={
    getpokemosApi
}