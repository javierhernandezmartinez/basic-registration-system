import React, { Component } from 'react';


var Session  =(()=>{
    let session = {};

    let validateSession = () =>{
        if(Session.getSession('user') === null){
            window.location= "/";
        }
    }

    let setSession = (key, object)=>{
        sessionStorage.setItem(key, JSON.stringify(object));
    };

    let getSession = (key) =>{
        let obj = sessionStorage.getItem(key);
        if(obj !== undefined ){
            return JSON.parse(obj)

        }else{
            return undefined;
        }
    };

    let endSession=()=> {
        sessionStorage.removeItem('user');
        sessionStorage.clear();
        console.log("Fin de sesion")
    };

    return {
        setSession : setSession,
        getSession : getSession,
        endSession : endSession,
        validateSession: validateSession
    }


})();

export default Session;