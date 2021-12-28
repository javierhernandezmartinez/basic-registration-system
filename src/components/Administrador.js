import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'
import '../styles/ModalPdf.css'
import '../styles/Admin.css'
import {BsPencilSquare, BsTrashFill} from "react-icons/bs";
import Axios from "axios"
import Header from "./Header";
import Session from "./Session"
import iconPlus1 from "../images/iconPlus1.jpeg";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalRegister:false,
            showModalUpdate:false,
            showModalDelete:false,
            data:[],
            theand:["ID","USUARIO","PASSWORD","TIPO DE USUARIO"],
            user_selected:[],
            typeUser:"Normal",
            /*urlApi:'http://www.appcvprot.com:4000'*/
            urlApi:'http://localhost:4000'
        };
    }

    componentDidMount() {
        if (Session.getSession('user') !== null && Session.getSession('user').user_type === "Super_Admin"){
            this.getData()
        }else{
            Session.endSession()
            Session.validateSession()
        }
    }

    handleModalShowRegister=()=>{
        this.setState({showModalRegister:!this.state.showModalRegister})
    }

    handleModalShowUpdate=()=>{
        this.setState({showModalUpdate:!this.state.showModalUpdate})
    }

    handleModalShowDelete=()=>{
        this.setState({showModalDelete:!this.state.showModalDelete})
    }

    TableFilter = ()=>{
        var input, filter, table, tr, td, i, txtValue, optionSearch, index;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("tabla");
        tr = table.getElementsByTagName("tr");
        optionSearch=document.getElementById("optionSearch").value

        for ( var j = 0; j < this.state.theand.length; j ++){
            if(this.state.theand[j] == optionSearch){
                index = j
            }
        }

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[index];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    getData=()=>{
        Axios.get(this.state.urlApi+"/users/getList/user")
            .then( res => {
                console.log("res",res.data.data)
                this.setState({data:res.data.data})
            })
    }

    deleteUser=(id_user)=>{
        Axios.post(this.state.urlApi+"/users/delete/user", {id:id_user}).then( res => {this.getData()})
    }

    registerUser=()=>{
        let nombre = document.getElementById("nom_user").value;
        let pass = document.getElementById("pass_user").value;
        let type_user = this.state.typeUser;
        Axios.post(this.state.urlApi+"/users/insert/user", {
            nombre:nombre,
            pass:pass,
            type:type_user
        }).then( res => {this.getData()})
    }

    updateUser=(id_Data)=>{
        let nombre = document.getElementById("nom_user").value;
        let pass = document.getElementById("pass_user").value;
        let type_user =this.state.typeUser;
        Axios.post(this.state.urlApi+"/users/update/user", {
            nombre:nombre,
            pass:pass,
            type:type_user,
            id:id_Data
        }).then( res => {this.getData()})
    }

    onChangeCheck=(e)=>{
        let typeUser = e.target.value
        if (typeUser === "Normal") {
            document.getElementById("N").checked = true
            document.getElementById("A").checked = false
            document.getElementById("SA").checked = false
        }
        if (typeUser === "Administrador"){
            document.getElementById("N").checked = false
            document.getElementById("A").checked = true
            document.getElementById("SA").checked = false
        }
        if (typeUser === "Super_Admin"){
            document.getElementById("N").checked = false
            document.getElementById("A").checked = false
            document.getElementById("SA").checked = true
        }
        this.setState({typeUser:typeUser})
    }

    render() {

        return (
            <div className={"content"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <Header/>
                    </div>
                </div>

                <div className="row row-content-table">
                    <div className={"col-md-1"}/>
                    <div className={"col-md-10"} style={{display:"flex"}}>

                        <div className={"row"} style={{margin:"auto"}}>
                            <div className={"col-md-12"}>
                                <Table  responsive className={"center table1 table-striped "}>
                                    <thead className={"table1-thead"}>
                                    <tr className={"title1-thead"}>
                                        <th colSpan={9} className={'topRadius'}>  USUARIOS </th>
                                    </tr>
                                    <tr className={"title1-thead"}>
                                        <th colSpan={9}>
                                            <select id={"optionSearch"}>
                                                <option>Filtrar por...</option>

                                                    {this.state.theand.map(item=>(<option>{item}</option>))}

                                            </select>
                                            <input id={"myInput"} type="text" style={{marginLeft:"1%"}} placeholder={"Search..."} onKeyUp={(e)=>this.TableFilter()}/>
                                        </th>
                                    </tr>
                                    <tr className={"title2-thead th-per-prof"}>
                                        {this.state.theand.map(item=>(<th>{item}</th>))}
                                        <th style={{width:"40px"}}>
                                            <img src={iconPlus1} alt={""} className={"iconPlus"} onClick={()=> {this.setState({typeUser:"Normal"});this.handleModalShowRegister()}}/>
                                        </th>
                                        <th style={{width:"40px"}}/>
                                    </tr>
                                    </thead>
                                </Table>
                            </div>
                            <div className={"col-md-12 bottomRadius"} style={{height:"60vh"}}>
                                <Table id={"tabla"}  responsive className={"center table1 table-striped"}>
                                    <tbody className={"table1-tbody"}>
                                    {
                                        this.state.data.map(
                                            data=>(
                                                <tr className={"table1-tr td-per-prof"}>
                                                    <td >{data.user_id}</td>
                                                    <td >{data.user_nom}</td>
                                                    <td >{data.user_pass}</td>
                                                    <td >{data.user_type}</td>
                                                    <td>
                                                        <BsPencilSquare className={"icon-table-consultor"} onClick={
                                                            ()=>{
                                                                this.setState({user_selected:data, typeUser:data.user_type})
                                                                this.handleModalShowUpdate();
                                                            }
                                                        }/>
                                                    </td>
                                                    <td>
                                                        <BsTrashFill className={"icon-table-consultor"} onClick={()=>{this.setState({user_selected:data});this.handleModalShowDelete()}}/>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>











                <Modal  size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModalRegister}
                        dialogClassName={"dialog-modal-register"}
                        contentClassName={"content-modal-register"}
                >
                    <Modal.Header closeButton onClick={() => {this.handleModalShowRegister()}}>
                        <Modal.Title>NUEVO USUARIO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <p>Nombre:</p>
                                <input type={"text"} className={"input_nom"} id={"nom_user"}/>
                            </div>
                            <div className={"col-md-12"}>
                                <p>Contraseña:</p>
                                <input type={"text"} className={"input_nom"} id={"pass_user"}/>
                            </div>
                            <div className={"col-md-12"}>
                                <p>Tipo de usuario:</p>
                                <div className={"row row-check"} >
                                    <div className={"col-md-4 div_check"}>
                                        <input type={"checkbox"} id={"N"} className={"input_check"} value={"Normal"} defaultChecked={true} onClick={(e)=>this.onChangeCheck(e)}/>
                                        <label htmlFor={"N"}>Normal</label>
                                    </div>
                                    <div className={"col-md-4 div_check"}>
                                        <input type={"checkbox"} id={"A"} className={"input_check"} value={"Administrador"} defaultChecked={false} onClick={(e)=>this.onChangeCheck(e)}/>
                                        <label htmlFor={"A"}>Administrador</label>
                                    </div>
                                    <div className={"col-md-4 div_check"}>
                                        <input type={"checkbox"} id={"SA"} className={"input_check"} value={"Super_Admin"} defaultChecked={false} onClick={(e)=>this.onChangeCheck(e)}/>
                                        <label htmlFor={"SA"}>Super Administrador</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <Button onClick={()=>{
                                    this.registerUser()
                                    this.handleModalShowRegister()
                                }}>Guardar
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>



                <Modal  size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModalUpdate}
                        dialogClassName={"dialog-modal-register"}
                        contentClassName={"content-modal-register"}
                >
                    <Modal.Header closeButton onClick={() => {this.handleModalShowUpdate()}}>
                        <Modal.Title>ACTUALIZAR USUARIO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <p>Nombre:</p>
                                <input type={"text"} className={"input_nom"} id={"nom_user"} defaultValue={this.state.user_selected.user_nom}/>
                            </div>
                            <div className={"col-md-12"}>
                                <p>Contraseña:</p>
                                <input type={"text"} className={"input_nom"} id={"pass_user"} defaultValue={this.state.user_selected.user_pass}/>
                            </div>
                            <div className={"col-md-12"}>
                                <p>Tipo de usuario:</p>
                                <div className={"row row-check"} >
                                    <div className={"col-md-4 div_check"}>
                                        <input type={"checkbox"} id={"N"} className={"input_check"} value={"Normal"} defaultChecked={this.state.user_selected.user_type==="Normal"} onClick={(e)=>this.onChangeCheck(e)}/>
                                        <label htmlFor={"N"}>Normal</label>
                                    </div>
                                    <div className={"col-md-4 div_check"}>
                                        <input type={"checkbox"} id={"A"} className={"input_check"} value={"Administrador"} defaultChecked={this.state.user_selected.user_type==="Administrador"} onClick={(e)=>this.onChangeCheck(e)}/>
                                        <label htmlFor={"A"}>Administrador</label>
                                    </div>
                                    <div className={"col-md-4 div_check"}>
                                        <input type={"checkbox"} id={"SA"} className={"input_check"} value={"Super_Admin"} defaultChecked={this.state.user_selected.user_type==="Super_Admin"} onClick={(e)=>this.onChangeCheck(e)}/>
                                        <label htmlFor={"SA"}>Super Administrador</label>
                                    </div>
                                </div>                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <Button onClick={()=>{
                                    this.updateUser(this.state.user_selected.user_id)
                                    this.handleModalShowUpdate()
                                }}>Guardar
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>


                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalDelete}
                >
                    <Modal.Body>
                        <div className={"row div-presentacion"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>
                                    <div className={"col-md-12"}>
                                        <h6>Esta seguro de eliminar a {this.state.user_selected.user_nom}?</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>{
                                        this.deleteUser(this.state.user_selected.user_id);
                                        this.handleModalShowDelete()
                                    }}>Eliminar</Button>
                                    <Button onClick={()=>this.handleModalShowDelete()}>Cancelar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
    )
    }
}