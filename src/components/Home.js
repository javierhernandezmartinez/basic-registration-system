import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'
import '../styles/ModalPdf.css'
import {BsPencilSquare, BsTrashFill,BsDashCircleFill,BsEyeFill,BsFillPlusCircleFill} from "react-icons/bs";
import {FaPlus,FaRegTrashAlt,FaTrashAlt,FaTrashRestore} from "react-icons/fa";
import {BsCamera, BsCloudUpload} from "react-icons/bs"
import FileBase64 from "./react-file-base64";
import ViewPdf from "./ViewPdf";
import Axios from "axios"
import img_no_img from "../images/img_no_img.jpg"
import Header from "./Header";
import Camera from 'react-html5-camera-photo';
import ReactDOM from "react-dom";
import Session from "./Session"


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalRegister:false,
            showModalPresent:false,
            showModalUpdate:false,
            showModalViewPdf:false,
            data:[],
            data2:[],
            theand:["ID","NOMBRE","APELLIDOS","PROFESION","EXPERIENCIA","CV","CEDULA Y CERTIFICACIONES"],
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
            certificaciones:[],
            user_selected:[],
            user_selected2:[],

            typeAction:null,

            actionViewCv:true,

            fileImg:null,

            showModalDelete:false,
            showModalDelete2:false,
            showModalPapelera:false,
            showModalRestore:false,
            typeDisplay:"block"
        };
    }

    componentDidMount() {
        if (Session.getSession('user') !== null){
            if ( Session.getSession('user').user_type === "Administrador" || Session.getSession('user').user_type === "Super_Admin"){
                this.setState({typeDisplay:"block"})
            }else{
                this.setState({typeDisplay:"none"})
            }

            this.getData()
            this.addElementProfesion()
            this.addElementExperiencia()
            this.addElementCertificaciones()
        }else{
            Session.validateSession()
        }
    }

    resetState=()=>{
        this.setState({
            fileCV:null,
            nameCV:"Select to File",
            cert_Selected:[],
            fileImg:null,
            profesiones:[
                    {
                    id_prof:1,
                    conteintProsefion:  <div style={{height:"30px"}}>
                                            <input type={'text' } id={1+"P"} placeholder={`profesión 1`} className={'input_prof'}/>
                                            <FaRegTrashAlt id={1} className={'icon_right'} onClick={e => this.deleteElementProfesion(e.target.id)}/>
                                        </div>
                    }
                ],
            experiencias:[
                    {
                    id_prof:1,
                    conteintProsefion:  <div style={{height:"30px"}}>
                                            <input type={'text' } id={1+"E"} placeholder={`experiencia 1`} className={'input_prof'}/>
                                            <FaRegTrashAlt id={1} className={'icon_right'} onClick={e => this.deleteElementExperiencia(e.target.id)}/>
                                        </div>
                    }
                ],
            certificaciones:[
                    {
                        id_prof:1,
                        conteintProsefion:  <div style={{height:"30px"}}>
                                                <label htmlFor={"files"+1} className="btnFile" ><div id={1+"L"}>{this.state.nameCert}</div></label>
                                                <FileBase64 id={"files"+1} multiple={true} classname={"files"} onDone={ e => this.selectFileCert(e)}/>
                                                <input type={"text"} id={1+"C"} className={"input_descrip"} placeholder={"descripción"}/>
                                                <BsEyeFill id={"files"+1} className={"icon_right"}  onClick={
                                                    (e)=>{
                                                        let id = e.target.id, selected = this.state.cert_Selected
                                                        Object.keys(selected).forEach(
                                                            (key)=>{
                                                                if(selected[key].id == id){
                                                                    this.setState({
                                                                        fileSelected_b64:selected[key].base64,
                                                                        nameFileSelected:selected[key].nombre
                                                                    })
                                                                    this.handleModalShowPdf()
                                                                }
                                                            }
                                                        )
                                                    }}
                                                />
                                                <FaRegTrashAlt id={1} className={'icon_right'} onClick={ e => this.deleteElementCertificaciones(e.target.id)}/>
                                            </div>
                    }
                ]
        })
    }

    handleModalShowRegister=()=>{
        this.setState({showModalRegister:!this.state.showModalRegister})
    }

    handleModalShowUpdate=()=>{
        this.setState({showModalUpdate:!this.state.showModalUpdate})
    }

    handleModalShowPdf=()=>{
        this.setState({showModalViewPdf:!this.state.showModalViewPdf})
    }

    handleModalShowPresent=()=>{
        this.setState({showModalPresent:!this.state.showModalPresent})
    }

    handleModalShowDelete=()=>{
        this.setState({showModalDelete:!this.state.showModalDelete})
    }
    handleModalShowDelete2=()=>{
        this.setState({showModalDelete2:!this.state.showModalDelete2})
    }

    handleModalShowRestore=()=>{
        this.setState({showModalRestore:!this.state.showModalRestore})
    }

    handleModalShowPapelera=()=>{
        this.setState({showModalPapelera:!this.state.showModalPapelera})
    }

    getFilesCV(files){
        this.setState({fileCV: files[0].base64,nameCV:files[0].name, actionViewCv:false});
    }

    selectFileCert(files,id_certification){
        let id = files[0].id
        let selected = this.state.cert_Selected

        let ok = selected.find(list => list.id === id)
        let num_id=id.split('')[5]

        if (ok !== undefined){
            Object.keys(selected).forEach(
                (key)=>{
                    if(selected[key].id == id){
                        selected[key]={
                            id_cert:id_certification,
                            id:id,
                            nombre:files[0].name,
                            base64:files[0].base64
                        }
                        this.setState({cert_Selected:selected})

                        if(document.getElementById(num_id+"L")){
                            document.getElementById(num_id+"L").innerText=files[0].name
                        }
                    }
                }
            )
        }else {
            selected.push(
                {
                    id_cert:id_certification,
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
                console.log("res",res.data.data)
                let list = []
                let list2 = []
                res.data.data.map(
                    item => {
                        let certtifi = []
                        let cert=null
                        if (item.Certification !== null){
                            cert = item.Certification.split(",")
                            for( let i=0; i < cert.length; i ++){
                                let cer = cert[i].split("-")
                                certtifi.push(
                                    {
                                        nombre: cer[0].split(":")[1],
                                        id: cer[1].split(":")[1]
                                    }
                                    )
                            }
                        }
                        if(item.status == 1){
                            list.push(
                                {
                                    CVs: item.CVs,
                                    Certification: certtifi,
                                    Experiences: item.Experiences,
                                    Profesions: item.Profesions,
                                    nombre: item.nombre,
                                    persons_ap: item.persons_ap,
                                    persons_id: item.persons_id,
                                    imgPerfil: item.persons_img,
                                    status:item.status
                                }
                            )
                        }else {
                            list2.push(
                                {
                                    CVs: item.CVs,
                                    Certification: certtifi,
                                    Experiences: item.Experiences,
                                    Profesions: item.Profesions,
                                    nombre: item.nombre,
                                    persons_ap: item.persons_ap,
                                    persons_id: item.persons_id,
                                    imgPerfil: item.persons_img,
                                    status:item.status
                                }
                            )
                        }


                }
                )
                this.setState({data:list, data2:list2})
            })
    }

    addData=(id)=>{
        let id_person = id
        let nombre=document.getElementById("nomUser").value;
        let apellidos=document.getElementById("ap1User").value;
        let imgPerfil=this.state.fileImg
        let profesion=[];
        let experiencia=[];
        let cv=[];
        let certificacion=[];

        console.log("Daatos sve")
        console.log("id: ", id_person)
        console.log("nombre: ",nombre)
        console.log("app1: ",apellidos)
        /*console.log("cvb64: ",this.state.fileCV)*/
        console.log("cvname: ",this.state.nameCV)

        let profesiones = this.state.profesiones;
        for (let i = 1; i <= profesiones.length; i ++){
            if(document.getElementById(i+"P")){
                let v = document.getElementById(i+"P").value
                if(v !== ""){
                    profesion.push(v)
                }
                console.log("profesions: ",v)
            }
        }

        let experiencias = this.state.experiencias;
        for (let i = 1; i <= experiencias.length; i ++){
            if(document.getElementById(i+"E")){
                let v = document.getElementById(i+"E").value
                if(v !== ""){
                    experiencia.push(v)
                }
                console.log("Experienci: ",v)
            }
        }

        if (this.state.nameCV !== "Select to File" && this.state.fileCV !== null ){
            cv.push(
                {
                    nombre:this.state.nameCV,
                    base64:this.state.fileCV
                }
            )
        }

            let cert_selected =this.state.cert_Selected
            console.log("---x",cert_selected,"lengh:", cert_selected.length)
            for (let i = 0; i < cert_selected.length; i ++){
                let num_id=cert_selected[i].id.split('')[5]
                if(document.getElementById(num_id+"C")){
                    let v = document.getElementById(num_id+"C").value

                    if(v !== ""){
                        let ok = certificacion.find(list => list.nombre === v)
                        if (ok === undefined){
                            console.log("no esta, add-push")
                            certificacion.push(
                                {
                                    id_certification:cert_selected[i].id_cert,
                                    nombre:v,
                                    base64:cert_selected[i].base64,
                                }
                            )
                        }
                    }
                }
            }

            let cert_selected2 = this.state.certificaciones;
            console.log("---x",cert_selected2,"lengh:", cert_selected2.length)

            for (let i = 0; i < cert_selected2.length; i ++){
                if (cert_selected2[i] !== undefined){
                    let num_id=cert_selected2[i].id_prof
                    if(document.getElementById(num_id+"C")){
                        let v = document.getElementById(num_id+"C").value

                        if(v !== ""){
                            let ok = certificacion.find(list => list.nombre === v)
                            if (ok === undefined){
                                console.log("no esta, add-push")
                                certificacion.push(
                                    {
                                        id_certification:cert_selected2[i].id_cert,
                                        nombre:v,
                                        base64:cert_selected2[i].base64,
                                    }
                                )
                            }
                        }
                    }
                }else {}
            }


        console.log("certifi: ", certificacion)

        this.resetState()
        let Link_request = ""
        if (this.state.typeAction === "update"){
            console.log("bmos a actualisr dataaa")
            Link_request = "http://localhost:4000/users/update"
        }else {
            console.log("bamos gregar un registro")
            Link_request = "http://localhost:4000/users/insert"
        }

        Axios.post(Link_request,{
            person:[{
                id:id_person,
                nombre:nombre,
                apellidos:apellidos,
                imgPerfil:imgPerfil
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

    deleteData=(id_Data)=>{
        Axios.post("http://localhost:4000/users/delete", {id:id_Data}).then( res => {this.getData()})
    }

    statusPerson=(id_Data, status)=>{
        Axios.post("http://localhost:4000/users/status/update/person", {id:id_Data, status:status}).then( res => {this.getData()})
    }

    addElementProfesion=(value)=>{
        let profesiones = this.state.profesiones;
        profesiones.push(
                {
                    id_prof:profesiones.length+1,
                    conteintProsefion:  <div style={{height:"30px"}}>
                                            <input type={'text' } id={profesiones.length+1+"P"} placeholder={`profesión ${profesiones.length+1}`} className={'input_prof'} defaultValue={value}/>
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

    addElementExperiencia=(value)=>{
        let experiencia = this.state.experiencias;
        experiencia.push(
            {
                id_prof:experiencia.length+1,
                conteintProsefion:  <div style={{height:"30px"}}>
                                        <input type={'text' } id={experiencia.length+1+"E"} placeholder={`experiencia ${experiencia.length+1}`} className={'input_prof'} defaultValue={value}/>
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

    addElementCertificaciones=(value,id_certification)=>{
        let certificaciones = this.state.certificaciones;
        let nameCert = this.state.nameCert

        if(value !== undefined){
           nameCert = value
        }

        certificaciones.push(
            {   id_cert:id_certification,
                id_prof:certificaciones.length+1,
                conteintProsefion:  <div style={{height:"30px"}}>
                                        <label htmlFor={"files"+(certificaciones.length+1)} className="btnFile" ><div id={certificaciones.length+1+"L"}>{nameCert}</div></label>
                                        <FileBase64 id={"files"+(certificaciones.length+1)} multiple={true} classname={"files"} onDone={(e)=>{this.selectFileCert(e,id_certification)}}/>
                                        <input type={"text"} id={certificaciones.length+1+"C"} className={"input_descrip"} placeholder={"descripción"} defaultValue={value}/>
                                        <BsEyeFill id={"files"+(certificaciones.length+1)} className={"icon_right"}  onClick={
                                            (e)=>{
                                                let id = e.target.id
                                                let selected =this.state.cert_Selected
                                                let ok = selected.find(list => list.id === id)
                                                console.log(ok)
                                                if (ok !== undefined) {
                                                    Object.keys(selected).forEach(
                                                        (key)=>{
                                                            if(selected[key].id == id){
                                                                this.setState({
                                                                    fileSelected_b64:selected[key].base64,
                                                                    nameFileSelected:selected[key].nombre
                                                                })
                                                                this.handleModalShowPdf()
                                                            }else {
                                                                console.log("no esta")
                                                            }
                                                        }
                                                    )
                                                }else {
                                                    this.getFileCert(id_certification,value)
                                                }
                                            }}
                                        />
                                        <FaRegTrashAlt id={certificaciones.length+1+"-"+id_certification} className={'icon_right'} onClick={(e)=>{
                                            this.deleteElementCertificaciones(e.target.id)
                                        }}/>
                                    </div>
            }
        )
        this.setState({certificaciones:certificaciones})
    }

    deleteElementCertificaciones=(id_Element)=>{
        let id_element = String(id_Element).split("-")[0]
        let id_certification = String(id_Element).split("-")[1]
        let certificaciones = this.state.certificaciones;
        Object.keys(certificaciones).forEach(
            function (key){
                if(certificaciones[key].id_prof == id_element){
                    delete certificaciones[key]
                }
            }
        )
        this.setState({certificaciones:certificaciones})

        if (this.state.typeAction === "update"){
            this.deleteCetificadoDatabase(id_certification)
        }
    }

    deleteCetificadoDatabase=(id)=>{
        Axios.post("http://localhost:4000/users/delete/certification",{
                id:id
        } ).then( res => {
            console.log("message",res)
            this.getData()
        })
    }

    separeData=(list)=>{
        if (  list !== null){
            if (typeof list === "string"){
                return String(list).split(",").map(item=>(<div>{item}</div>))
            }
            else{
                    return list.map(item=>(<div>{item.nombre}</div>))
                }
        }
    }

    getCV =(id,nomFile)=>{
        if (this.state.actionViewCv === true){
            Axios.post("http://localhost:4000/users/getCV",{
                idUser:id,
                nomCv:nomFile
            } ).then( res => {
                console.log("message",res)
                if(res.status===200 && res.statusText === "OK"){
                    let cv = res.data.data[0]
                    console.log(cv)
                    this.setState({
                        fileSelected_b64:cv.base64_cv,
                        nameFileSelected:cv.nombre_cv
                    })
                    this.handleModalShowPdf()
                }
            })
        }else {
            this.setState({
                fileSelected_b64:this.state.fileCV,
                nameFileSelected:this.state.nameCV
            })
            this.handleModalShowPdf()
        }
    }

    getFileCert =(id,nomFile)=>{
            Axios.post("http://localhost:4000/users/get/File/Certification",{
            idCert:id,
            nomFile:nomFile
        } ).then( res => {
            console.log("message",res)
            if(res.status===200 && res.statusText === "OK"){
                let cv = res.data.data[0]
                console.log(cv)
                this.setState({
                    fileSelected_b64:cv.base64_cert,
                    nameFileSelected:cv.nombre
                })
                this.handleModalShowPdf()
            }
        })
    }

    separeCert=(list)=>{
        console.log("--",list)
        if (  list !== null){
            if (typeof list === "string"){
                return String(list).split(",").map(item=>(<div>{item}</div>))
            }
            else{
                return list.map(item=>(<div>{item.nombre}</div>))
            }
        }
    }

    viewRegister=(data, Certification)=>{
        this.setState({user_selected:data,user_selected2:Certification, fileImg:data.imgPerfil});
        this.handleModalShowPresent();
    }

    getFileImgPerfil(files){
        this.setState({ fileImg: files[0].base64});
    }

    render() {

        return (
            <div className={"content"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <Header/>
                    </div>
                </div>
                <div className="row div-row-1">
                    <div className={"col-md-12"}>
                        <p className={"title1"}>
                            PERFILES PROFESIONALES
                        </p>
                    </div>
                </div>
                <div className="row div-row-2">
                    <div className={"col-md-1"}/>
                    <div className={"col-md-10 col-table1"}>
                        <Table id={"tabla"}  responsive className={"center table1 table-striped"}>
                            <thead className={"table1-thead"}>
                                <tr className={"title1-thead"}>
                                    <th colSpan={10}>PERFILES</th>
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
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_id}</td>
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.nombre}</td>
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_ap}</td>
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Profesions)}</td>
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Experiences)}</td>
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.CVs}</td>
                                            <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Certification)}</td>
                                            <td>
                                                <BsPencilSquare className={"icon-table-consultor"} style={{display:this.state.typeDisplay}} onClick={
                                                    ()=>{
                                                        this.setState({typeAction:"update",user_selected:data, actionViewCv:true, fileImg:data.imgPerfil})
                                                        if (data.CVs !== null){this.setState({nameCV:data.CVs})}
                                                        this.deleteElementProfesion(1)
                                                        this.deleteElementExperiencia(1)
                                                        this.deleteElementCertificaciones(1)
                                                        String(data.Profesions).split(",").map(item=> this.addElementProfesion(item))
                                                        String(data.Experiences).split(",").map(item=> this.addElementExperiencia(item))
                                                        data.Certification.map(item=> this.addElementCertificaciones(item.nombre,item.id))
                                                        this.handleModalShowUpdate();
                                                    }
                                                }/>
                                            </td>
                                            <td>
                                                <BsTrashFill className={"icon-table-consultor"} style={{display:this.state.typeDisplay}} onClick={()=>{this.setState({user_selected:data});this.handleModalShowDelete()}}/>
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
                    <div className={"col-md-1"}/>
                    <div className={"col-md-10"}>
                        <div className={"papelera"} onClick={()=>this.handleModalShowPapelera()}>
                            <BsTrashFill/>
                            <p>Papelera</p>
                        </div>

                        <Button className={"button-register"} style={{display:this.state.typeDisplay}}
                            onClick={()=> {this.setState({typeAction:"regisster",});this.handleModalShowRegister()}}>
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
                    <Modal.Header closeButton onClick={() => {this.handleModalShowRegister();this.resetState()}}>
                        <Modal.Title>NUEVO REGISTRO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <div className="container-row" >
                                    <ul className="updateImgPerfil" data-animation="to-top">
                                        <li>
                                            <a>
                                                <img className="profile-pic" src={this.state.fileImg == null?img_no_img: this.state.fileImg} alt={""}/>
                                                <span>
                                                    <div className={"circleP"} >
                                                        <label id={"x2"} title={"Sube una imagen"} htmlFor={"input_imgPerfil"}>
                                                            <BsCloudUpload className={"imgEditP"}/>
                                                        </label>
                                                         <FileBase64 id={"input_imgPerfil"} multiple={true} onDone={this.getFileImgPerfil.bind(this)}/>
                                                    </div>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Nombre:</p>
                                <input type={"text"} className={"input_nom"} id={"nomUser"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellidos:</p>
                                <input type={"text"} className={"input_nom"} id={"ap1User"}/>
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
                                <FaRegTrashAlt className={'icon_right'} onClick={(e)=>{
                                    this.setState({fileCV: null,nameCV: "Select to File"})
                                }}/>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p>Cédula y certificaciones:
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
                                <ViewPdf pdf={this.state.fileSelected_b64} namefile={this.state.nameFileSelected} funtionClose={this.handleModalShowPdf}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal  size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModalUpdate}
                        dialogClassName={"dialog-modal-register"}
                        contentClassName={"content-modal-register"}
                >
                    <Modal.Header closeButton onClick={() => {this.handleModalShowUpdate();this.resetState()}}>
                        <Modal.Title>ACTUALIZAR REGISTRO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <div className="container-row" >
                                    <ul className="updateImgPerfil" data-animation="to-top">
                                        <li>
                                            <a>
                                                <img className="profile-pic" src={this.state.fileImg == "null"?img_no_img:this.state.fileImg} alt={""}/>
                                                <span>
                                                    <div className={"circleP"} >
                                                        <label id={"x2"} title={"Sube una imagen"} htmlFor={"input_imgPerfil"}>
                                                            <BsCloudUpload className={"imgEditP"}/>
                                                        </label>
                                                         <FileBase64 id={"input_imgPerfil"} multiple={true} onDone={this.getFileImgPerfil.bind(this)}/>
                                                    </div>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Nombre:</p>
                                <input type={"text"} className={"input_nom"} id={"nomUser"} defaultValue={this.state.user_selected.nombre}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellidos:</p>
                                <input type={"text"} className={"input_nom"} id={"ap1User"} defaultValue={this.state.user_selected.persons_ap}/>
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
                                        this.getCV(this.state.user_selected.persons_id,this.state.user_selected.CVs)
                                    }}
                                />
                                <FaRegTrashAlt className={'icon_right'} onClick={(e)=>{
                                    this.setState({
                                        fileCV: null,
                                        nameCV: "Select to File"
                                    }
                                    )
                                }}/>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p>Cédula y certificaciones:
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
                                    this.addData(this.state.user_selected.persons_id)
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
                       show={this.state.showModalPresent}
                >
                    <Modal.Body>
                        <div className={"row div-presentacion"}>
                            <div className={"col-md-12 div-container"}></div>
                            <div className={"col-md-4 div-nombre-pres"}>
                                <div className={"row"} style={{position:"absolute"}}>
                                    <div className={"col-md-12"}>
                                        <div className="container-row" >
                                            <img className="profile-pic" src={this.state.user_selected.imgPerfil=="null"?img_no_img:this.state.user_selected.imgPerfil} alt={""}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-8 div-general-skill"}>
                                <div className={"div-skill"}>
                                            <p>{this.state.user_selected.nombre} {this.state.user_selected.persons_ap}</p>
                                </div>
                            </div>
                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>
                                    <div className={"col-md-4 div-prof-pres"}>
                                        <h6>PROFESIONES</h6>
                                        <ul>
                                            {String(this.state.user_selected.Profesions).split(",").map(item=> <li>{item!=="null"?item:""}</li>)}
                                        </ul>
                                    </div>
                                    <div className={"col-md-4 div-exp-pres"}>
                                        <h6>EXPERIENCIAS</h6>
                                        <ul>
                                            {String(this.state.user_selected.Experiences).split(",").map(item=> <li>{item!=="null"?item:""}</li>)}
                                        </ul>
                                    </div>
                                    <div className={"col-md-4 div-cert-pres"}>
                                        <h6>CEDULA Y CERTIFICACIONES</h6>
                                        <ul>
                                            {this.state.user_selected2.map(item=><li id={item.id} onClick={()=> {
                                                this.getFileCert(item.id,item.nombre)

                                            }}>{item.nombre}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <label onClick={
                                        ()=>{
                                            console.log("ppp",this.state.user_selected.CVs)
                                            if(this.state.user_selected.CVs !== null){
                                                this.getCV(this.state.user_selected.persons_id,this.state.user_selected.CVs)
                                            }
                                        }}>{this.state.user_selected.CVs==null?"No existe CV":"CV : "+this.state.user_selected.CVs}</label>
                                    <Button onClick={()=>this.handleModalShowPresent()}>Cerrar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
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
                                        <h6>Esta seguro de eliminar a {this.state.user_selected.nombre}?</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>{
                                        this.statusPerson(this.state.user_selected.persons_id, 0);
                                        this.handleModalShowDelete()
                                    }}>Eliminar</Button>
                                    <Button onClick={()=>this.handleModalShowDelete()}>Cancelar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalDelete2}
                >
                    <Modal.Body>
                        <div className={"row div-presentacion"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>
                                    <div className={"col-md-12"}>
                                        <h6>Esta seguro de eliminar a {this.state.user_selected.nombre}?</h6>
                                        <h6>Si lo elimina no volvera a recuperarlo.</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>{
                                        this.deleteData(this.state.user_selected.persons_id);
                                        this.handleModalShowDelete2()
                                    }}>Eliminar</Button>
                                    <Button onClick={()=>this.handleModalShowDelete2()}>Cancelar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalPapelera}
                       dialogClassName={"dialog-modal-papelera"}
                >
                    <Modal.Body>
                        <div className={"row div-presentacion"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>
                                    <div className={"col-md-12"}>
                                        <div className={"col-table1"}>
                                            <Table id={"tabla"}  responsive className={"center table1 table-striped"}>
                                                <thead className={"table1-thead"}>
                                                <tr className={"title1-thead"}>
                                                    <th colSpan={10}>PERFILES</th>
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
                                                    this.state.data2.map(
                                                        data=>(
                                                            <tr className={"table1-tr"}>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_id}</td>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.nombre}</td>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_ap}</td>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Profesions)}</td>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Experiences)}</td>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.CVs}</td>
                                                                <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Certification)}</td>
                                                                <td>
                                                                    <FaTrashRestore className={"icon-table-consultor"}  style={{display:this.state.typeDisplay}} onClick={()=> {this.setState({user_selected:data});this.handleModalShowRestore()}}/>
                                                                </td>
                                                                <td>
                                                                    <BsTrashFill className={"icon-table-consultor"}  style={{display:this.state.typeDisplay}} onClick={()=>{this.setState({user_selected:data});this.handleModalShowDelete2()}}/>
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
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>this.handleModalShowPapelera()}>Salir de papelera</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalRestore}
                >
                    <Modal.Body>
                        <div className={"row div-presentacion"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>
                                    <div className={"col-md-12"}>
                                        <h6>Esta seguro de restaurar a {this.state.user_selected.nombre}?</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>{
                                        this.statusPerson(this.state.user_selected.persons_id, 1);
                                        this.handleModalShowRestore()
                                    }}>Restaurar</Button>
                                    <Button onClick={()=>this.handleModalShowRestore()}>Cancelar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
    )
    }
}