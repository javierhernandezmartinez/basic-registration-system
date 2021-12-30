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
import ojo from "../images/ojo.png";
import ViewPdf from "./ViewPdf";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalRegister:false,
            showModalUpdate:false,
            showModalDelete:false,
            data:[],
            theand:["ID","USUARIO","PASSWORD","TIPO DE USUARIO"],
            theand_m:["NOMBRE"],
            user_selected:[],
            typeUser:"Normal",
            urlApi:'http://www.appcvprot.com:4000',
            /*urlApi:'http://localhost:4000',*/

            radioOption:"user",

            dataManual:[],
            type_action:"insert_m",
            showModalAddManual:false,
            fileB64Manual:"",
            fileNameManual:"Select to file",
            id_manual:null,
            titleModal:"Manual Nuevo",

            showModalViewPdf:false,
            actionViewManual:true
        };
    }

    componentDidMount() {
        if (Session.getSession('user') !== null && Session.getSession('user').user_type === "Super_Admin"){
            this.getData();
            this.getDataManual();
        }else{
            Session.endSession()
            Session.validateSession()
        }
    }

    handleModalShowManual=()=>{
        this.setState({showModalAddManual:!this.state.showModalAddManual})
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

    getDataManual=()=>{
        Axios.get(this.state.urlApi+"/users/getList/manual")
            .then( res => {
                console.log("res",res.data.data)
                this.setState({dataManual:res.data.data})
            })
    }

    insertManual=()=>{
        if(this.state.fileNameManual !== "Select to file" && this.state.fileNameManual !== ""){
            Axios.post(this.state.urlApi+"/users/insert/manual", {
                nombre:this.state.fileNameManual,
                base64:this.state.fileB64Manual,
                type:"manual"
            }).then( res => {this.getDataManual()})
        }
    }

    updateManual=()=>{
        Axios.post(this.state.urlApi+"/users/update/manual", {
            nombre:this.state.fileNameManual,
            base64:this.state.fileB64Manual,
            type:"manual",
            id:this.state.id_manual
        }).then( res => {this.getDataManual()})
    }

    deleteManual=()=>{
        Axios.post(this.state.urlApi+"/users/delete/manual", {
            id:this.state.id_manual
        }).then( res => {this.getDataManual()})
    }

    actionManual=()=>{
        // eslint-disable-next-line default-case
        switch (this.state.type_action){
            case "insert_m":
                this.insertManual()
                break;
            case "update_m":
                this.updateManual()
                break;
            case "delete_m":
                this.deleteManual()
                break;
        }
        this.handleModalShowManual()
    }

    tableUser=()=>{
        return(
            <>
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
            </>
        )
    }

    tableManual=()=>{
        return(
            <>
                <div className={"col-md-12"}>
                    <Table  responsive className={"center table1 table-striped "}>
                        <thead className={"table1-thead"}>
                        <tr className={"title1-thead"}>
                            <th colSpan={9} className={'topRadius'}>  MANUAL </th>
                        </tr>

                        <tr className={"title2-thead th-per-prof"}>
                            {this.state.theand_m.map(item=>(<th>{item}</th>))}
                            <th style={{width:"40px"}}>
                                <img src={iconPlus1} alt={""} className={"iconPlus"}
                                     onClick={()=> {
                                         if(this.state.dataManual.length > 0){
                                             this.setState({
                                                 titleModal:"Update manual",
                                                 type_action:"update_m"
                                             });
                                         }else {
                                             this.setState({
                                                 titleModal:"Nuevo manual",
                                                 type_action:"insert_m",
                                                 fileNameManual:"Select to file",
                                                 fileB64Manual:""
                                             });
                                         }
                                         this.handleModalShowManual()
                                     }}/>
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
                            this.state.dataManual.map(
                                data=>(
                                    <tr className={"table1-tr td-per-prof"}>
                                        <td >{data.nombre}</td>
                                        <td>
                                            <BsPencilSquare className={"icon-table-consultor"} onClick={
                                                ()=>{
                                                    this.setState({
                                                        titleModal:"Update manual",
                                                        type_action:"update_m",
                                                        id_manual:data.certification_id,
                                                        fileNameManual:data.nombre
                                                    });
                                                    this.handleModalShowManual()
                                                }
                                            }/>
                                        </td>
                                        <td>
                                            <BsTrashFill className={"icon-table-consultor"}
                                                         onClick={()=>{
                                                             this.setState({
                                                                 titleModal:"Delete manual",
                                                                 type_action:"delete_m",
                                                                 id_manual:data.certification_id,
                                                                 fileNameManual:data.nombre
                                                             });
                                                             this.handleModalShowManual()
                                                         }}/>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }

    fileRender = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Make a fileInfo Object
            let fileInfo = {
                id: e.target.id,
                name: file.name,
                base64: reader.result,
                file: file,
            };
            this.setState({
                fileB64Manual: fileInfo.base64,
                fileNameManual: fileInfo.name,
                actionViewManual:false
            })
        } // reader.onload
    }

    handleModalShowPdf = () => {
        this.setState({showModalViewPdf: !this.state.showModalViewPdf})
    }

    verManual=()=>{
        if(this.state.actionViewManual){
            Axios.post(this.state.urlApi+"/users/getName/manual", {
                nombre:this.state.fileNameManual
            }).then( res => {
                let manual = res.data.data;
                if(manual.length > 0){
                    this.setState({
                        fileB64Manual: manual[0].base64_cert,
                        fileNameManual: manual[0].nombre
                    })
                    this.handleModalShowPdf()
                }else {
                    this.setState({
                        fileB64Manual: '',
                        fileNameManual: ''
                    })
                    this.handleModalShowPdf()
                }
            })
        }else{
            this.handleModalShowPdf()
        }
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
                            <div className={"col-md-12 inputRadio"}>
                                <input type={"radio"} id={"user"}
                                       onClick={() => this.setState({radioOption: 'user'})}
                                       checked={this.state.radioOption === 'user'}/>
                                <label htmlFor={"user"}>Usuarios</label>
                                <input type={"radio"} id={"manual"} onClick={() => this.setState({radioOption: 'manual'})}
                                       checked={this.state.radioOption === 'manual'}/>
                                <label htmlFor={"manual"}>Manual</label>
                            </div>

                            {
                                this.state.radioOption === 'user'?this.tableUser():this.tableManual()
                            }

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

                <Modal  size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModalAddManual}
                        dialogClassName={"dialog-modal-register"}
                        contentClassName={"content-modal-register"}
                >
                    <Modal.Header closeButton onClick={() => {this.handleModalShowManual()}}>
                        <Modal.Title>{this.state.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <p>Manual:</p>
                            </div>
                            <div className={"col-md-12 input_file_c"}>
                                <label htmlFor={"id_manual"}
                                       id={"CEE"}
                                       className="btnFileCV">{this.state.fileNameManual}</label>
                                <input type={"file"} id={ "id_manual"} disabled={this.state.type_action === "delete_m"}
                                       onChange={(e) => this.fileRender(e)}/>
                                <div className={"icon_right_ojo"}>
                                    <img src={ojo} alt={""} id={ "viewCV"}
                                         onClick={(e) => {
                                            this.verManual()
                                         }
                                         }
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <Button onClick={()=>{
                                    this.actionManual()
                                }}>Guardar
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalViewPdf}
                       dialogClassName={"dialog-modal-pdf"}
                       contentClassName={"content-modal-pdf"}
                >
                    <Modal.Header closeButton onClick={() => this.handleModalShowPdf()}>

                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"} style={{width: "100%", height: "100%", margin: "0"}}>
                            <div className={"col-md-12"}>
                                <ViewPdf pdf={this.state.fileB64Manual} namefile={this.state.fileNameManual}
                                         funtionClose={this.handleModalShowPdf}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

            </div>
    )
    }
}