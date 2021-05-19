import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Header.css"

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typePass: "password"
        }
    }

    render() {
        return(
            <div className={"row header"}>
                <div className={"col-md-12 div-header"}>
                    <div className={"item-menu"}>
                        <p onClick={()=>{window.open("#/", "_self")}}>Salir</p>
                    </div>
                    <div className={"item-menu"}>
                        <p onClick={()=>{window.open("#/perfil", "_self")}}>Perfil</p>
                    </div>
                </div>

            </div>
        )
    }
}