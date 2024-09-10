const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
router.get('/',(req,res)=>{
    conexion.query('SELECT * FROM users', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results:results});
        }
    });
})

router.get('/create', (req,res)=>{
    res.render('create');
})

//Ruta editar registros
router.get('/edit/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]});
        }
    })
});

const crud = require('./controllers/crud');
router.post('/save',crud.save);
router.post('/update',crud.update);

//Ruta eliminar registro
router.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
    conexion.query("DELETE FROM users WHERE id = ?",[id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;