const express = require('express');
const router = express.Router();
const security = require('../security/verifier');

const mysqlConnection = require('../configurations/db-conf');
const jwt = require('jsonwebtoken');

/*rutinar*/

router.get('/rutinas',security, (req,res)=>{
    console.log('get lista rutinas')
    mysqlConnection.query('select e.id, e.rutinas, p.lista_rutina from rutinas e join persona p on e.id_persona = p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.get('/rutinas/:id',security, (req,res)=>{
    console.log('get rutinas')
    mysqlConnection.query('select e.id, e.rutinas, p.lista_rutina from rutinas e join persona p on e.id_persona = p.id;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/rutinas',security,(req,res)=>{
    console.log('Insert rutinas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into entrenador (rutinas, lista_rutinas) values (?,?,?,?)',
    [emp.id_persona, emp.status], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.put('/rutinas/:id',security, (req,res)=>{
    console.log('Update rutinas')
    let emp=req.body;
    mysqlConnection.query('update rutinas set rutinas = ?, list_rutinas = ?, where id = ?',
    [emp.rutinas, emp.list_rutinas, req.params.id], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

router.delete('/rutinas/:id',security, (req,res)=>{
    console.log('Delete rutinas')
    mysqlConnection.query('delete from rutinas where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

router.get("/inicio",security,(req, res) => {
    console.log("get lista persona");
    mysqlConnection.query('select p.nombre, p.apellido, e.fecha_nacimiento from estudiante e join persona p on e.id_persona = p.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
}); 

module.exports = router;