const express = require('express');
const router = express.Router();
const security = require("../security/verifier");
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------Docente Curso----------------------------------------*/
/*Get-Cursos Docentes*/
router.get('/docente-curso',security,(req,res)=>{
    console.log('get lista docente-curso')
    mysqlConnection.query('select s.id, s.id_docente, p.nombre as docente, s.id_curso, c.nombre as curso, s.stauts, s.fecha_inicio, s.fecha_fin from ul91wq884mhr6noe.curso_docente s join ul91wq884mhr6noe.docente d on d.id = s.id_docente join ul91wq884mhr6noe.curso c on c.id = s.id_curso join ul91wq884mhr6noe.persona p on p.id = d.id_persona',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Cursos Docentes*/
router.get('/docente-curso/:id',security,(req,res)=>{
    console.log('get docente-curso')
    mysqlConnection.query('select s.id, s.id_docente, p.nombre as docente, s.id_curso, c.nombre as curso, s.stauts, s.fecha_inicio, s.fecha_fin from ul91wq884mhr6noe.curso_docente s join ul91wq884mhr6noe.docente d on d.id = s.id_docente join ul91wq884mhr6noe.curso c on c.id = s.id_curso join ul91wq884mhr6noe.persona p on p.id = d.id_persona where s.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Cursos Docentes*/
router.post('/docente-curso',security,(req,res)=>{
    console.log('Insert docente-curso')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into curso_docente (id_docente, id_curso, stauts, fecha_inicio, fecha_fin) values (?,?,?,?,?)',
    [emp.id_docente,emp.id_curso,emp.stauts,emp.fecha_inicio,emp.fecha_fin],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Cursos Docentes*/
router.put('/docente-curso/:id',security,(req,res)=>{
    console.log('Update docente-curso')
    let emp=req.body;
    mysqlConnection.query('update curso_docente set id_docente=?, id_curso=?, stauts=?, fecha_inicio=?, fecha_fin=? where id=?',
    [emp.id_docente,emp.id_curso,emp.stauts,emp.fecha_inicio,emp.fecha_fin,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Cursos Docentes*/
router.delete('/docente-curso/:id',security,(req,res)=>{
    console.log('Delete docente-curso')
    mysqlConnection.query('delete from curso_docente where id = ?',[req.params.id],(err,result)=>{
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