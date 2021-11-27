const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------entrenador----------------------------------------*/
/*Get-entrenador*/
router.get('/entrenador',security,(req,res)=>{
    console.log('get lista entrenador')
    mysqlConnection.query('select e.id, e.id_persona, p.status from entrenador e join persona p on e.id_persona = p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-entrenador*/
router.get('/entrenador/:id',security,(req,res)=>{
    console.log('get entrenador')
    mysqlConnection.query('select e.id, e.id_persona, p.id_rutinas, from entrenos e join persona p on e.id_persona = p.id where a.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-entrenador*/
router.post('/entrenador',security,(req,res)=>{
    console.log('Insert entrenador')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into entrenador (id, id_persona, status) values (?,?,?)',
    [emp.id,emp.id_persona,emp.status],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-entrenador*/
router.put('/entrenador/:id',security,(req,res)=>{
    console.log('Update entrenador')
    let emp=req.body;
    mysqlConnection.query('update entrenador set id_persona=?, status=? where id=?',
    [emp.id_persona,emp.status,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-entrenador*/
router.delete('/entrenador/:id',security,(req,res)=>{
    console.log('Delete entrenador')
    mysqlConnection.query('delete from entrenador where id = ?',[req.params.id],(err,result)=>{
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