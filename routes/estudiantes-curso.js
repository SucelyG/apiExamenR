const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------Estudiante Curso----------------------------------------*/
/*Get-Estudiante Curso*/
router.get('/estudiante-curso',(req,res)=>{
    console.log('get lista estudiante curso')
    mysqlConnection.query('select a.id, a.id_estudiante, p.nombre as estudiante, a.id_curso, c.nombre as curso, a.status, a.fecha_inicio, a.fecha_fin from ul91wq884mhr6noe.estudiante_curso a join ul91wq884mhr6noe.estudiante e on e.id = a.id_estudiante join ul91wq884mhr6noe.curso c on c.id = a.id_curso join ul91wq884mhr6noe.persona p on p.id = e.id_persona;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Estudiante Curso*/
router.get('/estudiante-curso/:id',(req,res)=>{
    console.log('get estudiante curso')
    mysqlConnection.query('select a.id, a.id_estudiante, p.nombre as estudiante, a.id_curso, c.nombre as curso, a.status, a.fecha_inicio, a.fecha_fin from ul91wq884mhr6noe.estudiante_curso a join ul91wq884mhr6noe.estudiante e on e.id = a.id_estudiante join ul91wq884mhr6noe.curso c on c.id = a.id_curso join ul91wq884mhr6noe.persona p on p.id = e.id_persona where a.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Estudiante Curso*/
router.post('/estudiante-curso',(req,res)=>{
    console.log('Insert estudiante curso')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into estudiante_curso (id_estudiante, id_curso, status, fecha_inicio, fecha_fin) values (?,?,?,?,?)',
    [emp.id_estudiante,emp.id_curso,emp.status,emp.fecha_inicio,emp.fecha_fin],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Estudiante Curso*/
router.put('/estudiante-curso/:id',(req,res)=>{
    console.log('Update estudiante curso')
    let emp=req.body;
    mysqlConnection.query('update estudiante_curso set id_estudiante=?, id_curso=?, status=?, fecha_inicio=?, fecha_fin=? where id=?',
    [emp.id_estudiante,emp.id_curso,emp.status,emp.fecha_inicio,emp.fecha_fin,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Estudiante Curso*/
router.delete('/estudiante-curso/:id',(req,res)=>{
    console.log('Delete estudiante curso')
    mysqlConnection.query('delete from estudiante_curso where id = ?',[req.params.id],(err,result)=>{
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