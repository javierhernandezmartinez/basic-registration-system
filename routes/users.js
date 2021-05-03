var express = require('express');
var router = express.Router();
const sqlQuery = require('../db/consult')


/* GET users listing. */
router.get('/getList', sqlQuery.sqlSelect_getList);//recupera todos los registros
router.post('/insert', sqlQuery.sqlInsert);//inserta todos los registros
router.post('/delete', sqlQuery.sqlDelete);//Elimina todos los registros e un usuario
router.post('/update', sqlQuery.sqlUpdate);//actualiza
router.post('/getCV', sqlQuery.sqlSelect_getCv);//recupera cv
router.post('/delete/certification', sqlQuery.sqlDeleteCertification);//recupera cv
router.post('/get/File/Certification', sqlQuery.sqlSelect_getFileCert);//recupera certificado

module.exports = router;



/*
function(req, res, next) {
  res.send(
      {bd:result }
  );
}*/
