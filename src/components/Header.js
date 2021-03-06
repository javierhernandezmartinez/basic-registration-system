import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Header.css"
import Session from "./Session";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typePass: "password",
            typeDisplay:"grid"
        }
    }

    componentDidMount() {
        if (Session.getSession('user') !== null) {
            if (Session.getSession('user').user_type === "Super_Admin") {
                this.setState({typeDisplay: "grid"})
            } else {
                this.setState({typeDisplay: "none"})
            }
        }
    }

    render() {
        return(
            <div className={"row header"}>
                <div className={"col-md-12 div-header"}>
                    <div className={"item-menu"} onClick={()=>{window.open("#/", "_self")}}>
                        <p>Salir</p>
                    </div>
                    <div className={"item-menu"} style={{display:this.state.typeDisplay}} onClick={()=>{window.open("#/admin", "_self")}}>
                        <p>Admin</p>
                    </div>
                    <div className={"item-menu"} onClick={()=>{window.open("#/perfiles", "_self")}}>
                        <p>Perfiles</p>
                    </div>
                    <div className={"item-menu"} onClick={()=>{window.open("#/home", "_self")}}>
                        <p>Home</p>
                    </div>
                </div>

            </div>
        )
    }
}