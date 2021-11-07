const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------Cursos----------------------------------------*/
/*Get-Cursos*/
router.get('/cursos',(req,res)=>{
    console.log('get lista cursos')
    mysqlConnection.query('Select * from curso',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Cursos*/
router.get('/cursos/:id',(req,res)=>{
    console.log('get cursos')
    mysqlConnection.query('Select * from curso where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Cursos*/
router.post('/cursos',(req,res)=>{
    console.log('Insert cursos')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into curso (nombre, descripcion) values (?,?)',
    [emp.nombre,emp.descripcion],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Cursos*/
router.put('/cursos/:id',(req,res)=>{
    console.log('Update cursos')
    let emp=req.body;
    mysqlConnection.query('update curso set nombre=?, descripcion=? where id=?',
    [emp.nombre,emp.descripcion,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Cursos*/
router.delete('/cursos/:id',(req,res)=>{
    console.log('Delete cursos')
    mysqlConnection.query('delete from curso where id = ?',[req.params.id],(err,result)=>{
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