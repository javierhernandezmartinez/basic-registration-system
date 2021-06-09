import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Login.css"
import {FaUserCircle,FaEye} from "react-icons/fa";
import Axios from "axios";
import Session from "./Session"
import fondoLogin from "../images/fondoLogin.jpeg"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typePass:"password",
            message:"",
            dataUser:null,
            typeUser:null
        }
    }

    componentDidMount() {
        Session.endSession()
    }

    typePass=()=>{
        if(this.state.typePass==="password"){
            this.setState({typePass:"text"})
        }else {
            this.setState({typePass:"password"})
        }
    }

    userLogin=()=>{
        let usuario = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        Axios.post("http://localhost:4000/users/get/login",
            {
                user:usuario,
                pass:pass
            })
            .then(res => {
                    console.log(res.data.data)
                    if (res.data.data === undefined){
                        console.log("no se pudo loguear")
                        this.setState({message:"Usuario o contraseña incorrecto.!"})
                    }
                    else{
                        Session.setSession('user',res.data.data);
                        this.setState({message:""});
                        window.open("#/home", "_self")
                    }
                }
            )
    }

    render() {
            return(
                <div className={"login-content"}>
                    <img src={fondoLogin} alt={""} className={"imgFondo"}/>
                    <div className={"row div-login"}>
                        <div className={"col-md-12"}>
                            <FaUserCircle className={"login-icon"}/>
                        </div>
                        <div className={"col-md-12"}>
                            <div className={"row center"}>
                                <div className={"col-md-4"}>
                                    <p className={"login-p"}>Usuario:</p>
                                </div>
                                <div className={"mol-md-6"}>
                                    <input type={"text"} id={"user"} className={"login-input"} placeholder={"Usuario"}/>
                                </div>
                            </div>
                            <div className={"row center"}>
                                <div className={"col-md-4"}>
                                    <p className={"login-p"}>Contraseña:</p>
                                </div>
                                <div className={"mol-md-6"}>
                                    <input type={this.state.typePass} id={"pass"} className={"login-input"} placeholder={"Contraseña"}/>
                                    <FaEye className={"login-icon-eye"} onClick={()=>this.typePass()}/>
                                </div>
                            </div>
                            <div className={"row center"}>
                                <div className={"col-md-12"}>
                                    <button className={"login-button"} onClick={()=>this.userLogin()}>Iniciar sesión</button>
                                </div>
                            </div>

                        </div>
                        <div className={"col-md-12"}>
                            <p className={"login-message-error"}>{this.state.message}</p>
                        </div>
                    </div>

                </div>
            )
    }
}
