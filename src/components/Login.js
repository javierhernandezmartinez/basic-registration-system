import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Login.css"
import {FaUserCircle,FaEye} from "react-icons/fa"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typePass:"password"
        }
    }

    typePass=()=>{
        if(this.state.typePass==="password"){
            this.setState({typePass:"text"})
        }else {
            this.setState({typePass:"password"})
        }
    }

    userLogin=()=>{
        console.log("login")
    }

    render() {
        return(
            <div className={"login-content"}>
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
                                <input type={"text"} className={"login-input"} placeholder={"Usuario"}/>
                            </div>
                        </div>
                        <div className={"row center"}>
                            <div className={"col-md-4"}>
                                <p className={"login-p"}>Contraseña:</p>
                            </div>
                            <div className={"mol-md-6"}>
                                <input type={this.state.typePass} className={"login-input"} placeholder={"Contraseña"}/>
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
                        <p className={"login-message-error"}>Usuario o contraseña incorrecta.!</p>
                    </div>
                </div>

            </div>
        )
    }
}
