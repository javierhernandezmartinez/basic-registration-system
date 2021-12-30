import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'
import Header from "./Header";
import Session from "./Session"
import imgH from "../images/p5.png"
import Footer from "./Footer"

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeDisplay:"block",
            person_type:'Normal'
        };
    }

    componentDidMount() {
        if (Session.getSession('user') !== null){
            if ( Session.getSession('user').user_type === "Administrador" || Session.getSession('user').user_type === "Super_Admin"){
                this.setState({typeDisplay:"block"})
            }else{
                this.setState({typeDisplay:"none"})
            }
        }else{
            Session.validateSession()
        }
    }

    render() {
        return (
            <div className={"content-home"} >
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <Header/>
                    </div>
                </div>
                <div className={"row"} style={{height:"100%"}}>
                    <div className={"col-md-8"}>
                        <div className={"message-content"}>
                            <div className={"message-home"}>
                                <p className="line anim-typewriter">Sistema de selección de perfiles profesionales.</p>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-4"}>
                        <div className={"img-fondo"}>
                            <img src={imgH} alt={""}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
    )
    }
}