const {Router, application}=require('express')
const axios = require('axios')
const { getpokemosApi } =require('./middleware.js') ;
const router = Router();
const{Op,Pokemon ,Type}=require('../db.js')

router.get('/' ,async(req , res )=>{
    const {name}=req.query
    if(name){
        const op=3;
        const pokeByName= await getpokemosApi(op,null,name)
        if(pokeByName.error){return res.status(404).json(pokeByName)}
        return res.status(200).json(pokeByName)
    }
    const op=1;
    const allPokemons=await getpokemosApi(op)

    try{
        if(allPokemons.error){return res.status(404).json(allPokemons)}
        return res.status(200).json(allPokemons)
    }catch(error){
        return res.status(400).json({error:'no matches to show'})
    }
 
})

router.get('/id',async(req, res)=>{
    const op=4;
    const allPokeId= await getpokemosApi(op)
    
    try{
        if(allPokeId.error){return res.status(404).json(allPokeId)}
        return res.status(200).json(allPokeId)
    }catch(error){
        return res.status(400).json({error:'no matches to show'})
    }
})

router.get('/name',async(req, res)=>{
    const op=5;
    const allPokeName= await getpokemosApi(op)
    try{
        if(allPokeName.error){return res.status(404).json(allPokeName)}
        return res.status(200).json(allPokeName)
    }catch(error){
        return res.status(400).json({error:'no matches to show'})
    }
})

router.post('/',async(req,res)=>{
    let{name, id, weight, height, hp, attack, defense ,speed ,front_default ,types}=req.body;

    if(name && id){
        const findPokemonName= await Pokemon.findOne({where:{name:name}})
        const findPokemonId=await Pokemon.findByPk(id)

       if(findPokemonName){
        return res.status(404).json({error:`Pokemon with name "${name}" already exists.`})}
       if(findPokemonId){
        return res.status(404).json({error:`Pokemon with id "${id}" already exists.`})}

    }
    if(!name || ! id){return res.status(400).json({error:'Incomplete information.'})}

    try{
        const newPokemon= await Pokemon.create(
            {name:name.toLowerCase(),id, weight, height, hp, attack, defense ,speed ,front_default })
        const PokeTypes= await Type.findAll()
        if (types.length===0)types=[Math.floor(Math.random() * (PokeTypes.length))]
        await newPokemon.setTypes(await types)
        return res.status(200).send('Pokemon created successfully.' )

    }catch(error){
        return res.status(404).json({error:error})
    }
})

router.get('/:id',async(req,res)=>{
    let{id}=req.params
    id=parseInt(id,10)
    const op=2;
    if(id){
        const pokeById= await getpokemosApi(op,id)
        if(pokeById.error){return res.status(404).json(pokeById)}
        return res.status(200).json(pokeById)
    }
})



module.exports = router;
