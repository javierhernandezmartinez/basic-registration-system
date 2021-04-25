import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'
import '../styles/ModalPdf.css'
import {BsPencilSquare, BsTrashFill,BsDashCircleFill,BsEyeFill,BsFillPlusCircleFill} from "react-icons/bs";
import {FaPlus,FaRegTrashAlt,FaTrashAlt} from "react-icons/fa";
import FileBase64 from "./react-file-base64";
import ViewPdf from "./ViewPdf";
import data  from "../assets/data.json"
import Axios from "axios"

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalRegister:false,
            showModalViewPdf:false,
            data:data.registros,
            theand:["ID","NOMBRE","APELLIDO P.","APELLIDO M.","PROFESION","EXPERIENCIA","CV","CERTIFICACIONES"],
            numPages:null,
            pageNumber:1,

            fileCV:null,
            nameCV:"Select to File",

            fileCert:null,
            nameCert:"Select to File",
            cert_Selected:[],

            fileSelected_b64:null,
            nameFileSelected:null,

            profesiones:[],
            experiencias:[],
            certificaciones:[]
        };
    }

    componentDidMount() {
        this.getData()
    }

    resetState=()=>{
        this.setState({
            fileCV:null,
            nameCV:"Select to File",
            cert_Selected:[],
            profesiones:[],
            experiencias:[],
            certificaciones:[]
        })
    }

    handleModalShowRegister=()=>{
        this.setState({showModalRegister:!this.state.showModalRegister})
    }
    handleModalShowPdf=()=>{
        this.setState({showModalViewPdf:!this.state.showModalViewPdf})
    }

    getFilesCV(files){
        this.setState({fileCV: files[0].base64,nameCV:files[0].name});
    }
    getFileCert(files){
        let id = files[0].id
        console.log(files, id)
        /*this.setState({fileCert: files[0].base64,nameCert:files[0].name});*/
        let selected = this.state.cert_Selected
        /*console.log(selected, selected.length)*/

            let ok = selected.find(list => list.id === id)
            console.log(ok)
            let num_id=id.split('')[5]

            if (ok !== undefined){
                console.log("si esta, update")
                Object.keys(selected).forEach(
                    (key)=>{
                        if(selected[key].id == id){
                            selected[key]={
                                id:id,
                                nombre:files[0].name,
                                base64:files[0].base64
                            }
                            this.setState({cert_Selected:selected})
                            console.log()

                            if(document.getElementById(num_id+"L")){
                                document.getElementById(num_id+"L").innerText=files[0].name
                            }
                        }
                    }
                )
            }else {
                console.log("no esta, add-push")
                selected.push(
                    {
                        id:id,
                        nombre:files[0].name,
                        base64:files[0].base64
                    }
                )
                this.setState({cert_Selected:selected})
                if(document.getElementById(num_id+"L")){
                    document.getElementById(num_id+"L").innerText=files[0].name
                }
        }
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
        Axios.get("http://localhost:4000/users/getList")
            .then( res => {
                console.log("listo",res.data.data)
                this.setState({data:res.data.data})
            })
    }

    addData=()=>{
        let nombre=document.getElementById("nomUser").value;
        let apellido1=document.getElementById("ap1User").value;
        let apellido2=document.getElementById("ap2User").value;
        let profesion=[];
        let experiencia=[];
        let cv=[];
        let certificacion=[];

       /* console.log("Daatos sve")
        console.log("nombre: ",nombre)
        console.log("app1: ",apellido1)
        console.log("app2: ",apellido2)
       /!* console.log("cvb64: ",this.state.fileCV)*!/
        console.log("cvname: ",this.state.nameCV)*/

        let profesiones = this.state.profesiones;
        for (let i = 1; i <= profesiones.length; i ++){
            if(document.getElementById(i+"P")){
                let v = document.getElementById(i+"P").value
                if(v !== ""){
                    profesion.push(v)
                }
                /*console.log(v)*/
            }
        }

        let experiencias = this.state.experiencias;
        for (let i = 1; i <= experiencias.length; i ++){
            if(document.getElementById(i+"E")){
                let v = document.getElementById(i+"E").value
                if(v !== ""){
                    experiencia.push(v)
                }
                /*console.log(v)*/
            }
        }

        if (this.state.nameCV !== "Select to File"){
            cv.push(
                {
                    nombre:this.state.nameCV,
                    base64:this.state.fileCV
                }
            )
        }
        let cert_selected = this.state.cert_Selected
       /* console.log(cert_selected)*/
        for (let i = 0; i < cert_selected.length; i ++){
            let num_id=cert_selected[i].id.split('')[5]
            if(document.getElementById(num_id+"C")){
                let v = document.getElementById(num_id+"C").value
                if(v !== ""){
                    certificacion.push(
                        {
                            nombre:v,
                            base64:cert_selected[i].base64
                        }
                        )
                }
                /*console.log(v)*/
            }
        }
        /*console.log("certifi: ", certificacion)*/

        this.resetState()

        Axios.post("http://localhost:4000/users/insert",{
            person:[{
                nombre:nombre,
                apellido1:apellido1,
                apellido2:apellido2,
            }],
            profesion: profesion,
            experiencia: experiencia,
            cv:cv,
            certificacion:certificacion
        } ).then( res => {
                console.log("message",res)
                this.getData()
            })
    }

    updateData=(id_Data)=>{
        let dataLis=this.state.data
        Object.keys(dataLis).forEach(
            function (key){
                if(dataLis[key].id == id_Data){
                    console.log(dataLis[key])
                    dataLis[key]={
                        "id": id_Data,
                        "nombre": "nom1",
                        "apellidoP": "apellidoP",
                        "apellidoM": "apellidoM",
                        "profesion": [
                            "profesion1x",
                            "profesion2x"
                        ],
                        "experiencia": [
                            "experiencia1",
                            "experiencia2"
                        ],
                        "cv": "cv.pdf",
                        "certificacion": [
                            "certificacion1",
                            "certificacion2"
                        ]
                    }
                }
            }
        )
        this.setState({data:dataLis})
    }

    deleteData=(id_Data)=>{
        console.log(id_Data)
        Axios.post("http://localhost:4000/users/delete", {
            id:id_Data
        }).then( res => {
                console.log("message",res)
                this.getData()
            })
    }

    addElementProfesion=()=>{
        let profesiones = this.state.profesiones;
        profesiones.push(
                {
                    id_prof:profesiones.length+1,
                    conteintProsefion:  <div style={{height:"30px"}}>
                                            <input type={'text' } id={profesiones.length+1+"P"} placeholder={`profesión ${profesiones.length+1}`} className={'input_prof'}/>
                                            <FaRegTrashAlt id={profesiones.length+1} className={'icon_right'} onClick={(e)=>{
                                                this.deleteElementProfesion(e.target.id)
                                            }}/>
                                        </div>
                }
            )
        this.setState({profesiones:profesiones})
    }

    deleteElementProfesion=(id_Element)=>{
        let profesiones = this.state.profesiones;
        Object.keys(profesiones).forEach(
            function (key){
                if(profesiones[key].id_prof == id_Element){
                    delete profesiones[key]
                }
            }
        )
        this.setState({profesiones:profesiones})
    }

    addElementExperiencia=()=>{
        let experiencia = this.state.experiencias;
        experiencia.push(
            {
                id_prof:experiencia.length+1,
                conteintProsefion:  <div style={{height:"30px"}}>
                                        <input type={'text' } id={experiencia.length+1+"E"} placeholder={`experiencia ${experiencia.length+1}`}className={'input_prof'}/>
                                        <FaRegTrashAlt id={experiencia.length+1} className={'icon_right'} onClick={(e)=>{
                                            this.deleteElementExperiencia(e.target.id)
                                        }}/>
                                    </div>
            }
        )
        this.setState({experiencias:experiencia})
    }

    deleteElementExperiencia=(id_Element)=>{
        let experiencia = this.state.experiencias;
        Object.keys(experiencia).forEach(
            function (key){
                if(experiencia[key].id_prof == id_Element){
                    delete experiencia[key]
                }
            }
        )
        this.setState({experiencias:experiencia})
    }

    addElementCertificaciones=()=>{
        let certificaciones = this.state.certificaciones;
        certificaciones.push(
            {
                id_prof:certificaciones.length+1,
                conteintProsefion:  <div style={{height:"30px"}}>
                    <label htmlFor={"files"+(certificaciones.length+1)} className="btnFile" ><div id={certificaciones.length+1+"L"}>{this.state.nameCert}</div></label>
                                        <FileBase64 id={"files"+(certificaciones.length+1)} multiple={true} classname={"files"} onDone={(e)=>{this.getFileCert(e)}}/>
                                        <input type={"text"} id={certificaciones.length+1+"C"} className={"input_descrip"} placeholder={"descripción"}/>
                                        <BsEyeFill id={certificaciones.length+1} className={"icon_right"}  onClick={
                                            (e)=>{
                                                console.log(e)
                                                let id = e.target.id
                                                console.log("buscando id:c",id)
                                                let selected =this.state.cert_Selected
                                                Object.keys(selected).forEach(
                                                    (key)=>{
                                                        if(selected[key].id == id){
                                                            console.log("si es")
                                                            this.setState({
                                                                fileSelected_b64:selected[key].base64,
                                                                nameFileSelected:selected[key].nombre
                                                            })
                                                            this.handleModalShowPdf()
                                                        }else {
                                                            console.log("no es")
                                                        }

                                                    }
                                                )


                                            }}
                                        />

                                        <FaRegTrashAlt id={certificaciones.length+1} className={'icon_right'} onClick={(e)=>{
                                            this.deleteElementCertificaciones(e.target.id)
                                        }}/>
                                    </div>
            }
        )
        this.setState({certificaciones:certificaciones})
    }

    deleteElementCertificaciones=(id_Element)=>{
        let certificaciones = this.state.certificaciones;
        Object.keys(certificaciones).forEach(
            function (key){
                if(certificaciones[key].id_prof == id_Element){
                    delete certificaciones[key]
                }
            }
        )
        this.setState({certificaciones:certificaciones})
    }

    separeData=(list)=>{
        return String(list).split(",").map(item=>(<div>{item}</div>))
    }

    render() {
        return (
            <div className={"content"}>
                <div className="row div-row-1">
                    <div className={"col-md-12"}>
                        <p className={"title1"}>
                            SISTEMA DE REGISTRO MARQUEZ
                        </p>
                    </div>
                </div>
                <div className="row div-row-2">
                    <div className={"col-md-2"}/>
                    <div className={"col-md-8 col-table1"}>
                        <Table id={"tabla"}  responsive className={"center table1 table-striped"}>
                            <thead className={"table1-thead"}>
                            <tr className={"title1-thead"}>
                                <th colSpan={10}>REGISTROS</th>
                            </tr>
                            <tr className={"title1-thead"}>
                                <th colSpan={2}>
                                    <select id={"optionSearch"}>
                                        <option>Filtrar por...</option>
                                        {
                                            this.state.theand.map(item=>(<option>{item}</option>))
                                        }
                                    </select>
                                </th>
                                <th colSpan={8}>
                                    <input id={"myInput"} type="text" placeholder={"Search..."}
                                        onKeyUp={(e)=>this.TableFilter()}/>
                                </th>
                            </tr>
                            <tr className={"title2-thead"}>
                                {this.state.theand.map(item=>(<th>{item}</th>))}
                                <th colSpan={2}/>
                            </tr>

                            </thead>
                            <tbody className={"table1-tbody"}>
                            {
                                this.state.data.map(
                                    data=>(
                                        <tr className={"table1-tr"}>
                                            <td>{data.persons_id}</td>
                                            <td>{data.nombre}</td>
                                            <td>{data.persons_ap1}</td>
                                            <td>{data.persons_ap2}</td>
                                            <td>{this.separeData(data.Profesions)}</td>
                                            <td>{this.separeData(data.Experiences)}</td>
                                            <td>{data.CVs}</td>
                                            <td>{
                                                this.separeData(data.Certifications)
                                            }</td>
                                            <td>
                                                <BsPencilSquare className={"icon-table-consultor"} onClick={()=>{this.updateData(data.persons_id)}}/>
                                            </td>
                                            <td>
                                                <BsTrashFill className={"icon-table-consultor"} onClick={()=>{this.deleteData(data.persons_id)}}/>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row div-row-3">
                    <div className={"col-md-2"}/>
                    <div className={"col-md-8"}>
                        <Button className={"button-register"}
                            onClick={()=> this.handleModalShowRegister()}>
                            <p>Nuevo registro</p>
                        </Button>
                    </div>
                </div>

                <Modal  size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModalRegister}
                        dialogClassName={"dialog-modal-register"}
                        contentClassName={"content-modal-register"}
                >
                    <Modal.Header closeButton onClick={() => this.handleModalShowRegister()}>
                        <Modal.Title>NEW REGISTER</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <p>Nombre:</p>
                                <input type={"text"} className={"input_nom"} id={"nomUser"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellido paterno:</p>
                                <input type={"text"} className={"input_nom"} id={"ap1User"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellido materno:</p>
                                <input type={"text"} className={"input_nom"} id={"ap2User"}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p>Profesion:
                                            <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{this.addElementProfesion()}}/>
                                        </p>
                                    </div>
                                    <div className={"col-md-12"} id={"divProfesion"}>
                                        { this.state.profesiones.map(res=>(res.conteintProsefion)) }
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p>Experiencia:
                                            <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{this.addElementExperiencia()}}/>
                                        </p>
                                    </div>
                                    <div className={"col-md-12"} id={"divExperencia"}>
                                        { this.state.experiencias.map(res=>(res.conteintProsefion)) }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                    <p>CV:</p>
                                    <label htmlFor="input_file" className="btnFileCV">{this.state.nameCV}</label>
                                    <FileBase64 id={"input_file"} multiple={true} onDone={this.getFilesCV.bind(this)}/>
                                    <BsEyeFill className={"icon_right"} onClick={
                                        ()=>{
                                            this.setState({
                                                fileSelected_b64:this.state.fileCV,
                                                nameFileSelected:this.state.nameCV
                                            })
                                            this.handleModalShowPdf()
                                        }}
                                    />
                            </div>

                                {/*<div className="col-md-6">
                                    <div className={"preview-admin"}>
                                        <div id={"preview-image"}>
                                            <img  id={"imgSelected"}
                                                  style={{width:"200px",height:"200px"}}
                                                  src={this.state.files[0]}
                                                  onError={
                                                      (e)=>{
                                                          e.target.onerror = null;
                                                          try {
                                                              e.target.src=this.state.files[0].base64
                                                          }
                                                          catch (error){
                                                              e.target.src=""
                                                          }
                                                      }
                                                  }
                                            />
                                        </div>
                                    </div>
                                </div>*/}

                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p>Certificaciones:
                                            <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{this.addElementCertificaciones()}}/>
                                        </p>
                                    </div>
                                    <div className={"col-md-12"} id={"divCertificacion"}>
                                        { this.state.certificaciones.map(res=>(res.conteintProsefion)) }
                                    </div>
                                </div>

                            </div>

                            </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <Button onClick={()=>{
                                    this.addData()
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
                        show={this.state.showModalViewPdf}
                        dialogClassName={"dialog-modal-pdf"}
                        contentClassName={"content-modal-pdf"}
                >
                    <Modal.Header closeButton onClick={() => this.handleModalShowPdf()}>

                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"} style={{width:"100%", height:"100%", margin:"0"}}>
                            <div className={"col-md-12"}>
                                <ViewPdf pdf={this.state.fileSelected_b64} namefile={this.state.nameFileSelected}/>
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