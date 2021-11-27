const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------progresos----------------------------------------*/
/*Get-progresos*/
router.get('/progresos',security,(req,res)=>{
    console.log('get progresos')
    mysqlConnection.query('select e.id, e.id_persona, p.peso_inicial, p.peso_meta, p.talla_inicial, p.talla_meta from progreso e join persona p on e.id_persona = p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-progresos*/
router.get('/progresos/:id',security,(req,res)=>{
    console.log('get progresos')
    mysqlConnection.query('select e.id, e.id_persona, p.peso_inicial, p.peso_meta, p.talla_inicial, p.talla_meta from progreso e join persona p on e.id_persona = p.id;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-progreso*/
router.post('/progresos',security,(req,res)=>{
    console.log('Insert progreso')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into progreso (id_persona, peso_inicial, peso_meta, talla_inicial, talla_meta) values (?,?,?,?)',
    [emp.id_persona, emp.peso_inicial, emp.peso_meta, emp.talla_inicial, emp.talla_meta], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-progreso*/
router.put('/progresos/:id',security,(req,res)=>{
    console.log('Update progreso')
    let emp=req.body;
    mysqlConnection.query('update progreso set id_persona = ?, peso_inicial = ?, peso_meta = ?, talla_inicial = ?, talla_meta = ? where id = ?',
    [emp.id_persona, emp.peso_meta, emp.talla_inicial, emp.talla_meta, emp.talla_meta, req.params.id], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-progreso*/
router.delete('/progresos/:id',security,(req,res)=>{
    console.log('Delete progreso')
    mysqlConnection.query('Delete progreso')
    mysqlConnection.query('delete from progreso where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{ss
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;