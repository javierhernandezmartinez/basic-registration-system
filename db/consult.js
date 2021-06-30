
const consult={};
    consult.sqlConection =()=>{
        var sqlite3=require('sqlite3').verbose()
        var path = require('path')
        let dbPath=path.resolve(__dirname,'../db/register.db')

        let db = new sqlite3.Database(dbPath,sqlite3.OPEN_READWRITE, (err) => {
            if (err) {console.error(err.message);}
            else {console.log('Connected to the chinook database.');}
        });

        return db
    }

    consult.sqlInsert=(req,res)=>{
        let person = req.body.person[0]
        let profesion = req.body.profesion
        let experiencia = req.body.experiencia
        let cv = req.body.cv
        let certificacion = req.body.certificacion
        let licitacion = req.body.licitacion

        var db = consult.sqlConection()
        let query1 = `INSERT INTO  PERSONS (persons_ap,nombre,persons_img,persons_type,id_secundary) VALUES ('${person.apellidos}','${person.nombre}','${person.imgPerfil}','${person.type}','${person.id_secundary}');`
        let query2 = `select max(persons_id) Id from PERSONS;`

        if (person.nombre !== ''){
            db.run(query1, (err, row) => {
                if (err) {console.error(err.message);}

                db.get(query2, (err,row)=>{
                    if (err) {console.error(err.message);}
                    console.log("ultimo id agregado: ",row.Id)
                    let id_agregado = row.Id

                    for (let i = 0; i < profesion.length; i++){
                        db.get(`INSERT INTO PROFESIONS (nombre,persons_id) VALUES ('${profesion[i]}','${id_agregado}')`, (err,row)=>{
                            if (err) {console.error(err.message);}
                        })
                    }

                    for (let i = 0; i < experiencia.length; i++){
                        db.get(`INSERT INTO EXPERIENCES (nombre,persons_id) VALUES ('${experiencia[i]}','${id_agregado}')`, (err,row)=>{
                            if (err) {console.error(err.message);}
                        })
                    }

                    for (let i = 0; i < cv.length; i++) {
                        db.get(`INSERT INTO CVS (nombre_cv,base64_cv,persons_id) VALUES ('${cv[i].nombre}','${cv[i].base64}','${id_agregado}')`, (err, row) => {
                            if (err) {
                                console.error(err.message);
                            }
                        })
                    }

                    for (let i = 0; i < certificacion.length; i++){
                        db.get(`INSERT INTO CERTIFICATIONS (nombre,persons_id,base64_cert) VALUES ('${certificacion[i].nombre}','${id_agregado}','${certificacion[i].base64}')`, (err,row)=>{
                            if (err) {console.error(err.message);}
                        })
                    }

                    for (let i = 0; i < licitacion.length; i++){
                        db.get(`INSERT INTO LICITACIONS (nombre,persons_id) VALUES ('${licitacion[i]}','${id_agregado}')`, (err,row)=>{
                            if (err) {console.error(err.message);}
                        })
                    }
                })

                res.json(
                    {'message':"Data saved" }
                );
                db.close()
            });
        }
        else {
            console.log("no se resivio data")
        }


    };

    consult.sqlUpdate=(req, res)=> {
        let person = req.body.person[0]
        let profesion = req.body.profesion
        let experiencia = req.body.experiencia
        let cv = req.body.cv
        let certificacion = req.body.certificacion
        let licitacion = req.body.licitacion

        var db = consult.sqlConection()

        consult.sqlUpdate_Person(person,db).then(
            resp=>{
                console.log("respond person update")
                consult.sqlUpdate_Certification(certificacion, person,db).then(
                    resp=>{
                        console.log("respond certifi update")
                        consult.sqlUpdate_Cv(cv, person,db).then(
                            resp=>{
                                console.log("respond cv update")
                                consult.sqlUpdate_Experience(experiencia, person,db).then(
                                    resp=>{
                                        console.log("respond experience update")
                                        consult.sqlUpdate_Licitacion(licitacion, person,db).then(
                                            resp=>{
                                                console.log("respond licitacion update")
                                                consult.sqlUpdate_Profesion(profesion, person,db).then(
                                                    resp=>{
                                                        console.log("respond profesion update")
                                                        res.json({'message':"Data saved" })
                                                        db.close()
                                                        console.log('Desconnected to the chinook database.');
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    }

    consult.sqlUpdate_Person=(person,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`UPDATE PERSONS SET persons_ap = '${person.apellidos}', nombre = '${person.nombre}', persons_img = '${person.imgPerfil}' WHERE persons_id = '${person.id}';`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject (err)
                }else {resolve("ok")}
            })
        })
    }

    consult.sqlUpdate_Certification=(certificacion,person,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            if (certificacion.length > 0) {
                for (let i = 0; i < certificacion.length; i++) {
                    if (certificacion[i].id_certification === undefined){
                        db.run(`INSERT INTO CERTIFICATIONS (nombre,persons_id,base64_cert) VALUES ('${certificacion[i].nombre}','${person.id}','${certificacion[i].base64}')`, (err, row) => {
                            if (err) {
                                console.error(err.message);
                                reject (err)
                            }else if(i === certificacion.length -1){resolve("ok")}
                        })
                    }else {
                        if (certificacion[i].base64 === undefined){
                            db.run(`UPDATE CERTIFICATIONS SET nombre ='${certificacion[i].nombre}' WHERE certification_id = '${certificacion[i].id_certification}';`, (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                    reject (err)
                                }else if(i === certificacion.length -1){resolve("ok")}
                            })
                        }else {
                            db.run(`UPDATE CERTIFICATIONS SET nombre ='${certificacion[i].nombre}', base64_cert = '${certificacion[i].base64}' WHERE certification_id = '${certificacion[i].id_certification}';`, (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                    reject (err)
                                }else if(i === certificacion.length -1){resolve("ok")}
                            })
                        }
                    }
                }
            }else {resolve("ok")}
        })
    }

    consult.sqlUpdate_Cv=(cv,person,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.get(`SELECT nombre_cv FROM CVS WHERE persons_id == '${person.id}';`,(err,row)=>{
                if (err){
                    console.log(err.message)
                    reject(err)
                }else {
                    if (row === undefined || row === null){
                        if (cv.length !== 0){
                            for (let i = 0; i < cv.length; i++) {
                                db.get(`INSERT INTO CVS (nombre_cv,base64_cv,persons_id) VALUES ('${cv[i].nombre}','${cv[i].base64}','${person.id}')`, (err, row) => {
                                    if (err) {
                                        console.error(err.message);
                                        reject(err)
                                    }else {resolve("ok")}
                                })
                            }
                        }else {resolve("ok")}
                    }else {
                        if(cv.length !== 0){
                            for (let i = 0; i < cv.length; i++) {
                                db.run(`UPDATE CVS SET nombre_cv ='${cv[i].nombre}', base64_cv = '${cv[i].base64}' WHERE persons_id = '${person.id}';`, (err, row) => {
                                    if (err) {
                                        console.error(err.message);
                                        reject(err)
                                    }else {resolve("ok")}
                                })
                            }
                        }else {resolve("ok")}
                    }
                }
            })
        })
    }

    consult.sqlUpdate_Experience=(experiencia,person,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`DELETE FROM EXPERIENCES WHERE persons_id = '${person.id}';`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {
                    if(experiencia.length !== 0){
                        for (let i = 0; i < experiencia.length; i++) {
                            db.run(`INSERT INTO EXPERIENCES (nombre,persons_id) VALUES ('${experiencia[i]}','${person.id}')`, (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                    reject(err)
                                }else if(i === experiencia.length-1){resolve("ok")}
                            })
                        }
                    }else {resolve("ok")}
                }
            })
        })
    }

    consult.sqlUpdate_Licitacion=(licitacion,person,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`DELETE FROM LICITACIONS WHERE persons_id = '${person.id}';`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {
                    if(licitacion.length !== 0){
                        for (let i = 0; i < licitacion.length; i++) {
                            db.run(`INSERT INTO LICITACIONS (nombre,persons_id) VALUES ('${licitacion[i]}','${person.id}')`, (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                    reject(err)
                                }else if(i === licitacion.length -1){resolve("ok")}
                            })
                        }
                    }else {resolve("ok")}
                }
            })
        })
    }

    consult.sqlUpdate_Profesion=(profesion,person,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`DELETE FROM PROFESIONS WHERE persons_id = '${person.id}';`, (err, row) => {
                if (err) {
                    console.error(err.message);
                   reject(err)
                }else {
                    if(profesion.length !== 0){
                        for (let i = 0; i < profesion.length; i++) {
                            db.run(`INSERT INTO PROFESIONS (nombre,persons_id) VALUES ('${profesion[i]}','${person.id}')`, (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                    reject(err)
                                }else if(i === profesion.length -1){resolve("ok")}
                            })
                        }
                    }else {resolve("ok")}
                }
            })
        })
    }

    
    consult.sqlDelete=(req,res)=>{
        let person_id = req.body.id;
        var db = consult.sqlConection()

        consult.sqlDelete_Profesion(person_id,db).then(
            resp=>{
                console.log("respond profesion delete")
                consult.sqlDelete_Certification(person_id,db).then(
                    resp=>{
                        console.log("respond certifi delete")
                        consult.sqlDelete_Cv(person_id,db).then(
                            resp=>{
                                console.log("respond cv delete")
                                consult.sqlDelete_Experience(person_id,db).then(
                                    resp=>{
                                        console.log("respond experience delete")
                                        consult.sqlDelete_Licitacion(person_id,db).then(
                                            resp=>{
                                                console.log("respond licitacion delete")
                                                consult.sqlDelete_Person(person_id,db).then(
                                                    resp=>{
                                                        console.log("respond person delete")
                                                        res.json({'message':"Person delete" })
                                                        db.close()
                                                        console.log('Desconnected to the chinook database.');
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    }

    consult.sqlDelete_Person=(person_id,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`delete from PERSONS where persons_id == ${person_id} or id_secundary == ${person_id};`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {resolve("ok")}
            });
        })
    }

    consult.sqlDelete_Certification=(person_id,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`delete from CERTIFICATIONS where persons_id == ${person_id};`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {resolve("ok")}
            });
        })
    }

    consult.sqlDelete_Cv=(person_id,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`delete from CVS where persons_id == ${person_id};`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {resolve("ok")}
            });
        })
    }

    consult.sqlDelete_Experience=(person_id,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`delete from EXPERIENCES where persons_id == ${person_id};`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {resolve("ok")}
            });
        })
    }

    consult.sqlDelete_Licitacion=(person_id,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`delete from LICITACIONS where persons_id == ${person_id};`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {resolve("ok")}
            });
        })
    }

    consult.sqlDelete_Profesion=(person_id,db)=>{
        const Promise = require('bluebird')

        return new Promise((resolve, reject)=>{
            db.run(`delete from PROFESIONS where persons_id == ${person_id};`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }else {resolve("ok")}
            });
        })
    }



    consult.sqlSelect_getList=(req, res)=>{
        var db = consult.sqlConection()

        let query=`select a.persons_id, a.nombre, a.persons_ap, a.persons_img, a.status,a.persons_type,a.id_secundary,
                            (select  group_concat('nombre:' || nombre || '-' || 'id:' || certification_id)
                                from CERTIFICATIONS where persons_id == a.persons_id) Certification,
                            (SELECT group_concat(nombre_cv) from CVS               where persons_id == a.persons_id) CVs,
                            (SELECT group_concat(nombre)    from EXPERIENCES       where persons_id == a.persons_id) Experiences,
                            (SELECT group_concat(nombre)    from PROFESIONS        where persons_id == a.persons_id) Profesions,
                            (SELECT group_concat(nombre)    from LICITACIONS       where persons_id == a.persons_id) Licitacions
                    from PERSONS as a
                    where a.persons_id == a.persons_id;`

        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {data:row}
            );
            db.close()
        });
    };

    consult.sqlSelect_getCv=(req, res)=>{
        console.log("-->",req.body)
        console.log("-->",req.body.idUser)
        console.log("-->",req.body.nomCv)
        let idUser = req.body.idUser
        let nomCV = req.body.nomCv

        var db = consult.sqlConection()

        let query=`SELECT nombre_cv, base64_cv FROM CVS WHERE persons_id == '${idUser}' AND nombre_cv = '${nomCV}';`

        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {data:row}
            );
            db.close()
        });
    };

    consult.sqlSelect_getFileCert=(req, res)=>{
        console.log("-->",req.body)
        console.log("-->",req.body.idCert)
        console.log("-->",req.body.nomFile)
        let idCert = req.body.idCert
        let nomFile = req.body.nomFile

        var db = consult.sqlConection()

        let query=`SELECT nombre, base64_cert FROM CERTIFICATIONS WHERE certification_id == '${idCert}' AND nombre == '${nomFile}';`

        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {data:row}
            );
            db.close()
        });
    };
    
    consult.sqlDeleteCertification=(req,res)=>{
        console.log("-->",req.body)
        let certification_id = req.body.id;
        var db = consult.sqlConection()

        db.get(`delete from CERTIFICATIONS where certification_id =='${certification_id}';`, (err, row) => {
            if (err) {console.error(err.message);}
        });
        res.json(
            {'message':"Certification delete" }
        );
        db.close()
    }

    consult.sql_Login=(req,res)=>{
        console.log("-->",req.body)
        let user = req.body;
        console.log(user.user, user.pass)
        var db = consult.sqlConection()
    
        db.get(`SELECT user_id, user_nom, user_type FROM USERS WHERE user_nom == '${user.user}' AND user_pass == '${user.pass}'`,
            (err, row) => {
                 if (err) {console.error(err.message);}
                res.json(
                    {data:row}
                );
                db.close()
        });
    }

    consult.sqlStatusUpdatePerson=(req, res)=> {
        let person = req.body

        var db = consult.sqlConection()
        let update_person = `UPDATE PERSONS  
                                SET status = '${person.status}'
                                WHERE persons_id = '${person.id}' or id_secundary = '${person.id}';`
        db.get(update_person, (err, row) => {
                if (err) {console.error(err.message);}
            res.json(
                {"message":"Satatus Update"}
            );
            db.close()
            }
        )
    }

    consult.sqlSelect_getListUser=(req, res)=>{
        var db = consult.sqlConection()
    
        let query=`select * from USERS ;`
    
        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {data:row}
            );
            db.close()
        });
    };

    consult.sqlInsertUser=(req, res)=>{
        var db = consult.sqlConection()
        var user = req.body
    
        let query=`insert into USERS (user_nom, user_pass, user_type)  values ('${user.nombre}', '${user.pass}', '${user.type}');`
    
        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {"message":"User Inserted"}
            );
            db.close()
        });
    };

    consult.sqlDeleteUser=(req, res)=>{
        var db = consult.sqlConection()
        var user = req.body

        let query=`delete from USERS where user_id == '${user.id}';`

        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {"message":"User Delete"}
            );
            db.close()
        });
    };

    consult.sqlUpdateUser=(req, res)=>{
        var db = consult.sqlConection()
        var user = req.body

        let query=`UPDATE USERS  
                    SET user_nom = '${user.nombre}', user_pass = '${user.pass}', user_type = '${user.type}'
                    WHERE user_id = '${user.id}';`

        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.json(
                {"message":"User Update"}
            );
            db.close()
        });
};

module.exports= consult;