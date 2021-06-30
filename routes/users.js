var express = require('express');
var router = express.Router();
const sqlQuery = require('../db/consult')



/* GET users listing. */
router.get('/getList', sqlQuery.sqlSelect_getList);//recupera todos los registros
router.post('/insert', sqlQuery.sqlInsert);//inserta todos los registros
router.post('/delete', sqlQuery.sqlDelete);//Elimina todos los registros e un usuario
router.post('/update', sqlQuery.sqlUpdate);//actualiza
router.post('/getCV', sqlQuery.sqlSelect_getCv);//recupera cv
router.post('/delete/certification', sqlQuery.sqlDeleteCertification);//elimina un certificado
router.post('/get/File/Certification', sqlQuery.sqlSelect_getFileCert);//recupera certificado
router.post('/get/login', sqlQuery.sql_Login);//login
router.post('/status/update/person', sqlQuery.sqlStatusUpdatePerson);//delete logic
router.get('/getList/user', sqlQuery.sqlSelect_getListUser);//recupera todos los registros de usuarios
router.post('/insert/user', sqlQuery.sqlInsertUser);//inserta un usuario
router.post('/delete/user', sqlQuery.sqlDeleteUser);//Elimina un usuario
router.post('/update/user', sqlQuery.sqlUpdateUser);//actualiza un usuario

module.exports = router;