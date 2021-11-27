const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------Dietas----------------------------------------*/
/*Get-Dietas*/
router.get('/dieta',security,(req,res)=>{
    console.log('get lista dieta')
    mysqlConnection.query('select e.id, e.id_persona, p.dietas, p.listado_de_dietas, p.fecha_inicio, p.fecha_fin from dieta e join persona p on e.id_persona = p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Dieta*/
router.get('/dieta/:id',security,(req,res)=>{
    console.log('get dieta')
    mysqlConnection.query('Select * from dieta where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-dieta*/
router.post('/dieta',security,(req,res)=>{
    console.log('Insert dieta')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into dieta (id, dietas, listado_de_dietas, fecha_inicio, fecha_fin, id_persona) values (?,?,?,?,?,?)',
    [emp.dietas,emp.listado_de_dietas,emp.fecha_inicio,emp.fecha_fin,emp.id_persona],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-dieta*/
router.put('/dieta/:id',security,(req,res)=>{
    console.log('Update dieta')
    let emp=req.body;
    mysqlConnection.query('update dieta set dietas=?, listado_de_dietas=?, fecha_inicio=?, fecha_fin=? where id=?',
    [emp.dietas,emp.listado_de_dietas,emp.fecha_inicio,emp.fecha_fin,emp.id_persona,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-dieta*/
router.delete('/dieta/:id',security,(req,res)=>{
    console.log('Delete dieta')
    mysqlConnection.query('delete from dieta where id = ?',[req.params.id],(err,result)=>{
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