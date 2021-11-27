const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------PERSONAS------------------------------------------*/
/*Get-Persona*/
router.get('/personas',/*security,*/(req,res)=>{
    console.log('get lista personas')
    mysqlConnection.query('Select * from gym.persona',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Persona*/
router.get('/personas/:id',security,(req,res)=>{
    console.log('get persona')
    mysqlConnection.query('Select * from persona where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/personas',security,(req,res)=>{
    console.log('Insert personas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into persona (nombre, Apellido, edad) values (?,?,?)',
    [emp.nombre,emp.Apellido,emp.edad],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Persona*/
router.put('/personas/:id',security,(req,res)=>{
    console.log('Update personas')
    let emp=req.body;
    mysqlConnection.query('update persona set nombre=?, Apellido=?, edad=? where id=?',
    [emp.nombre,emp.Apellido,emp.edad,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Persona*/
router.delete('/personas/:id',security,(req,res)=>{
    console.log('Delete persona')
    mysqlConnection.query('delete from persona where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;