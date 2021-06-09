import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Perfil.css"
import {FaUserCircle,FaEye} from "react-icons/fa"
import Header from "./Header";
import Session from "./Session"

export default class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message_pass:"",
            user: Session.getSession('user')
        }
    }

    componentDidMount() {
       Session.validateSession()
    }

    cancel=()=>{
        document.getElementById("user_perfil").value="";
        document.getElementById("pas1_perfil").value="";
        document.getElementById("pas2_perfil").value="";
        this.setState({message_pass:""})
    }

    actulizar=()=>{
        let user = document.getElementById("user_perfil").value;
        let pas1 = document.getElementById("pas1_perfil").value;
        let pas2 = document.getElementById("pas2_perfil").value;

        if(pas2 === pas1){
            this.setState({message_pass:""})
        }else {
            this.setState({message_pass:"Las contraseñas no coinciden."})
        }
    }

    render() {
        return(
            <div className={"row perfil"}>
                <div className={"col-md-12"}>
                    <Header/>
                </div>
                <div className={"col-md-12"}>
                    <div className={"col-md-12 div-perfil-title"}>
                        <p>Perfil</p>
                    </div>
                    <div className={"row div-perfil"}>
                        <div className={"col-md-6"}>
                            <p>Usuario:</p>
                        </div>
                        <div className={"col-md-6"}>
                            <input type={"text"} id={"user_perfil"} placeholder={"usuario"}/>
                        </div>
                        <div className={"col-md-6"}>
                            <p>Contraseña:</p>
                        </div>
                        <div className={"col-md-6"}>
                            <input type={"text"} id={"pas1_perfil"} placeholder={"contraseña"}/>
                        </div>
                        <div className={"col-md-6"}>
                            <p>Verificar contraseña:</p>
                        </div>
                        <div className={"col-md-6"}>
                            <input type={"text"} id={"pas2_perfil"} placeholder={"contraseña"}/>
                        </div>

                        <div className={"col-md-12 message-pass-perfil"}>
                            <p>{this.state.message_pass}</p>
                        </div>
                        <div className={"col-md-12 button-perfil"}>
                            <button onClick={()=>this.actulizar()}>Actualizar</button>
                            <button onClick={()=>this.cancel()}>Cancelar</button>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}