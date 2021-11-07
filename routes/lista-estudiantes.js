const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*-----------------------------------------/---------------------------------------*/
/*retorna los datos del estudiante*/
router.get('/',security,(req,res)=>{
    console.log('retornar datos de los estudiante')
    mysqlConnection.query('select e.id, p.nombre, e.carnet from ul91wq884mhr6noe.estudiante e join ul91wq884mhr6noe.persona p on e.id_persona=p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

module.exports = router;