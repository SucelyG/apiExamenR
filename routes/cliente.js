const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------cliente----------------------------------------*/
/*Get-cliente*/
router.get('/cliente',security,(req,res)=>{
    console.log('get lista cliente')
    mysqlConnection.query('select c.id, c.id_persona, c.id_rutina, c.id_entrenos, c.id_dieta, c.status from gym.cliente c join gym.persona p on p.id =  c.id_persona  join gym.rutinas r on r.id = c.id_rutina join gym.entrenos e on e.id = c.id_entrenos join gym.dieta d on d.id = c.id_dieta',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-cliente*/
router.get('/cliente/:id',security,(req,res)=>{
    console.log('get cliente')
    mysqlConnection.query('select c.id, c.id_persona, c.id_rutina, c.id_entrenos, c.id_dieta, c.status from gym.cliente c join gym.persona p on p.id =  c.id_persona  join gym.rutinas r on r.id = c.id_rutina join gym.entrenos e on e.id = c.id_entrenos join gym.dieta d on d.id = c.id_dieta where s.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-cliente*/
router.post('/cliente',security,(req,res)=>{
    console.log('Insert cliente')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into cliente (id_persona, id_rutina, id_entrenos, id_dieta, status) values (?,?,?,?,?)',
    [emp.id_persona,emp.id_rutina,emp.id_entrenos,emp.id_dieta,emp.status],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-cliente*/
router.put('/cliente/:id',security,(req,res)=>{
    console.log('Update cliente')
    let emp=req.body;
    mysqlConnection.query('update cliente set id_persona=?, id_rutina=?, id_entrenos=?, id_dieta=?, status=? where id=?',
    [emp.id_persona,emp.id_rutina,emp.id_entrenos,emp.id_dieta,emp.status],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-cliente*/
router.delete('/cliente/:id',/*security,*/(req,res)=>{
    console.log('Delete cliente')
    mysqlConnection.query('delete from cliente where id = ?',[req.params.id],(err,result)=>{
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