const {Router}=require('express')
const router = Router();
const axios = require('axios')
const{Type}=require('../db.js')

// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y 
// guardarlos en su propia base de datos y luego ya utilizarlos desde all

router.get('/', async(req,res)=>{
     const apiType = await axios.get('https://pokeapi.co/api/v2/type');
    const data= await apiType.data
   
   try{
        for(d of data.results){
            
            const[type,created]=await Type.findOrCreate({
                where:{name: d.name}
            })
        }
        return res.json(await Type.findAll())
    } catch(error){
        return res.status(404).json({error:'Types not found' })}
    
})







module.exports = router;