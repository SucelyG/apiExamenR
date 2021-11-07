const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------PERSONAS------------------------------------------*/
/*Get-Persona*/
router.get('/personas',(req,res)=>{
    console.log('get lista personas')
    mysqlConnection.query('Select * from persona',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Persona*/
router.get('/personas/:id',(req,res)=>{
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

router.post('/personas',(req,res)=>{
    console.log('Insert personas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento, Direccion) values (?,?,?,?)',
    [emp.nombre,emp.apellido,emp.fecha_nacimiento,emp.Direccion],(err,result)=>{
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
router.put('/personas/:id',(req,res)=>{
    console.log('Update personas')
    let emp=req.body;
    mysqlConnection.query('update persona set nombre=?, apellido=?, fecha_nacimiento=?, Direccion=? where id=?',
    [emp.nombre,emp.apellido,emp.fecha_nacimiento,emp.Direccion,req.params.id],(err,result)=>{
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
router.delete('/personas/:id',(req,res)=>{
    console.log('Delete estudiante')
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