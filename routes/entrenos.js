const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------Entreno----------------------------------------*/
/*Get-entreno*/
router.get('/entrenos',security,(req,res)=>{
    console.log('get entrenos')
    mysqlConnection.query('select e.id, e.id_persona, p.id_rutinas from entrenos e join persona p on e.id_persona = p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-entrenos*/
router.get('/entrenos/:id',security,(req,res)=>{
    console.log('get entrenos')
    mysqlConnection.query('select e.id, e.id_persona, p.id_rutinas, from entrenos e join persona p on e.id_persona = p.id;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-entrenos*/
router.post('/estudiantes',security,(req,res)=>{
    console.log('Insert estudiantes')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into entrenos (id_persona, id_rutinas) values (?,?,?,?)',
    [emp.id_persona, emp.id_rutinas], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-entrenos*/
router.put('/entrenos/:id',security,(req,res)=>{
    console.log('Update entrenos')
    let emp=req.body;
    mysqlConnection.query('update entrenos set id_persona = ?, id_rutinas = ?, where id = ?',
    [emp.id_persona, emp.id_rutinas, req.params.id], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-entreno*/
router.delete('/entrenos/:id',security,(req,res)=>{
    console.log('Delete entrenos')
     mysqlConnection.query('delete from entrenos where id = ?',[req.params.id],(err,result)=>{
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