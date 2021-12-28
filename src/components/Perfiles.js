import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Perfiles.css'
import '../styles/ModalPdf.css'
import {BsPencilSquare, BsTrashFill,BsDashCircleFill,BsEyeFill,BsFillPlusCircleFill} from "react-icons/bs";
import {FaPlus,FaRegTrashAlt,FaTrashAlt,FaTrashRestore} from "react-icons/fa";
import {BsCloudUpload} from "react-icons/bs"
import FileBase64 from "./react-file-base64";
import ViewPdf from "./ViewPdf";
import Axios from "axios"
import img_no_img from "../images/img_no_img.jpg"
import Header from "./Header";
import Session from "./Session"
import iconPlus1 from '../images/iconPlus1.jpeg'
import {AiOutlinePlus} from "react-icons/all";
import ojo from "../images/ojo.png"


export default class Perfiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalRegister:false,
            showModalPresent:false,
            showModalUpdate:false,
            showModalViewPdf:false,
            data:[],
            data2:[],
            theandN:["ID","NOMBRE","APELLIDOS","PROFESION","EXPERIENCIA","CV","DOCUMENTOS"],
            theandP:["ID","NOMBRE","APELLIDOS","PROFESION","EXPERIENCIA","CV","DOCUMENTOS","LICITACION"],
            numPages:null,
            pageNumber:1,

            fileCV:null,
            nameCV:"Select to File",

            fileCom:null,
            nameCom:"Select to File",

            fileCert:null,
            nameCert:"Select to File",
            cert_Selected:[],

            fileSelected_b64:null,
            nameFileSelected:null,

            profesiones:[],
            experiencias:[],
            certificaciones:[],
            licitaciones:[],
            user_selected:[],
            user_selected2:[],

            typeAction:null,

            actionViewCv:true,

            fileImg:null,

            showModalDelete:false,
            showModalDelete2:false,
            showModalPapelera:false,
            showModalRestore:false,
            showModalAddPlus:false,
            typeDisplay:"block",

            person_type:'Normal',

            showModalNormal:false,
            data_perfil_selected:[],
            /*urlApi:'http://www.appcvprot.com:4000'*/
            urlApi:'http://localhost:4000',

            activeLic:false,
            nameCE:"Comprobante",

            filesComExp:[],

            experiencesDelete:[]

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
            filesComExp:[],
            experiencesDelete:[],
            profesiones:[],
            experiencias:[],
            certificaciones:[],
            licitaciones:[],

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

    handleModalShowNormal=()=>{
        this.setState({showModalNormal:!this.state.showModalNormal})
    }

    handleModalShowAddPlus=()=>{
        this.setState({showModalAddPlus:!this.state.showModalAddPlus})
    }

    getFilesCV(files){
        this.setState({fileCV: files[0].base64,nameCV:files[0].name, actionViewCv:false});
    }
    getFilesCom(files){
        this.setState({fileCom: files[0].base64,nameCom:files[0].name, actionViewCv:false});
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

    TableFilter = (id_input, id_table, id_optionSearch)=>{
        var input, filter, table, tr, td, i, txtValue, optionSearch, index;
        input = document.getElementById(id_input);
        filter = input.value.toUpperCase();
        table = document.getElementById(id_table);
        tr = table.getElementsByTagName("tr");
        optionSearch=document.getElementById(id_optionSearch).value

        let theand = this.state.person_type === 'Normal'?this.state.theandN:this.state.theandP

        for ( var j = 0; j < theand.length; j ++){
            if(theand[j] === optionSearch){
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
        this.setState({data2:[],data:[]})
        Axios.get(this.state.urlApi+"/users/getList")
            .then( res => {
                console.log("res",res.data.data)
                let list = []
                let list2 = []
                res.data.data.map(
                    item => {
                        let certtifi = []
                        let cert=null
                        let licit = []
                        let lic=[]

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
                        if (item.Licitacions !== null){
                            let l = item.Licitacions.split(",")
                            for (let x = 0; x < l.length; x++){
                                    lic.push(l[x])
                            }
                            for( let i=0; i < lic.length; i ++){
                                let li = lic[i].split("-")

                                licit.push(
                                    {
                                        nombre: li[0].split(":")[1],
                                        active_lic: li[1].split(":")[1],
                                        descripcion: li[2].split(":")[1]
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
                                    status:item.status,
                                    persons_type:item.persons_type,
                                    Licitacions:licit,
                                    activo:item.activo
                                }
                            )
                            this.setState({data:list})
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
                                    status:item.status,
                                    persons_type:item.persons_type,
                                    Licitacions:licit,
                                    activo:item.activo
                                }
                            )
                            this.setState({data2:list2})
                        }
                }
                )
            })
    }

    addData=(id,dataPlusSelect)=>{
        let id_person = id
        let nombre
        let apellidos
        let id_secundary
        let profesion=[];
        let licitacion=[];
        if (dataPlusSelect !== undefined){
            nombre = dataPlusSelect.nombre
            apellidos = dataPlusSelect.persons_ap
            id_secundary = dataPlusSelect.persons_id
        }else {
            nombre=document.getElementById("nomUser").value;
            apellidos=document.getElementById("ap1User").value;
        }

        let imgPerfil=this.state.fileImg

        let experiencia=[];
        let cv=[];
        let certificacion=[];

        let profesiones = this.state.profesiones;
        for (let i = 1; i <= profesiones.length; i ++){
            if(document.getElementById(i+"P")){
                let v = document.getElementById(i+"P").value
                if(v !== ""){
                    profesion.push(v)
                }
            }
        }

        let experiencias = this.state.experiencias;

        for (let i = 1; i <= experiencias.length; i ++){
            if(document.getElementById(i+"E")){
                let nom_exp = document.getElementById(i+"E").value
                if(nom_exp !== ""){
                    experiencia.push(
                        {
                            nom:nom_exp,
                            nom_com:this.searchExp(i+"CE")?.name,
                            b64_com:document.getElementById(i+"CE_B64").value,
                            exp_id:document.getElementById(i+"CE_ID").value,
                        }
                    )
                }
            }else{console.log("No encontrado",i+"CE")}
        }

        for(let i = 0; i < this.state.experiencesDelete.length; i++ ){
            Axios.post(this.state.urlApi+"/users/delete/experience/id",{
                id:this.state.experiencesDelete[i]
            } ).then( res => {
                console.log("message",res)
            })
        }

        let licitaciones = this.state.licitaciones;
        for (let i = 1; i <= licitaciones.length; i ++){
            if(document.getElementById(i+"Li") &&
                document.getElementById(i+"LiA") &&
                document.getElementById(i+"LiD")
            ){
                let v = document.getElementById(i+"Li").value
                let va = document.getElementById(i+"LiA").checked
                let vd = document.getElementById(i+"LiD").value
                if(v !== ""){
                    licitacion.push(
                        {
                            licitacion:v,
                            activo:va?1:0,
                            descripcion:vd
                        }
                        )
                }
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
            for (let i = 0; i < cert_selected.length; i ++){
                let num_id=cert_selected[i].id.split('')[5]
                if(document.getElementById(num_id+"C")){
                    let v = document.getElementById(num_id+"C").value

                    if(v !== ""){
                        let ok = certificacion.find(list => list.nombre === v)
                        if (ok === undefined){
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

            for (let i = 0; i < cert_selected2.length; i ++){
                if (cert_selected2[i] !== undefined){
                    let num_id=cert_selected2[i].id_prof
                    if(document.getElementById(num_id+"C")){
                        let v = document.getElementById(num_id+"C").value

                        if(v !== ""){
                            let ok = certificacion.find(list => list.nombre === v)
                            if (ok === undefined){
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


        let Link_request = ""

        if (this.state.typeAction === "update"){
            Link_request = this.state.urlApi+"/users/update"
        }else {
            Link_request = this.state.urlApi+"/users/insert"
        }

        Axios.post(Link_request,{
            person:[{
                id:id_person,
                nombre:nombre,
                apellidos:apellidos,
                imgPerfil:imgPerfil,
                type:this.state.person_type,
                id_secundary:id_secundary
            }],
            profesion: profesion,
            experiencia: experiencia,
            cv:cv,
            certificacion:certificacion,
            licitacion:licitacion
        } ).then( res => {
                this.resetState()
                this.getData()
            })
    }

    fileRender=(e)=>{
        let file = e.target.files[0];
        var allFiles = [];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Make a fileInfo Object
            let fileInfo = {
                id:e.target.id,
                name: file.name,
                base64: reader.result,
                file: file,
            };
            allFiles.push(fileInfo);
            this.state.filesComExp.push(fileInfo)
            this.setState({
                filesComExp: this.state.filesComExp,
                fileCom:fileInfo.base64,
                nameCom:fileInfo.name,
                actionViewCv:false
            })
            document.getElementById(e.target.id+"E").innerText=file.name;
            document.getElementById(e.target.id+"_B64").value=fileInfo.base64;
        } // reader.onload
        return allFiles
    }
    searchExp=(id)=>{
        let experiences = this.state.filesComExp
        for(var x in experiences){
            if(experiences[x].id === id){
                return experiences[x]
            }
        }
    }
    deleteData=(id_Data)=>{
        Axios.post(this.state.urlApi+"/users/delete", {id:id_Data}).then( res => {this.getData()})
    }

    statusPerson=(id_Data, status)=>{
        Axios.post(this.state.urlApi+"/users/status/update/person",
            {
                id:id_Data,
                status:status
            }
        ).then(
            res => {
                if(res.statusText === "OK" && res.status ===200){
                    this.getData()
                }
            })
    }

    addElementProfesion=(value)=>{
        let profesiones = this.state.profesiones;
        profesiones.push(
                {
                    id_prof:profesiones.length+1,
                    conteintProsefion:  <div style={{height:"30px"}}>
                                            <input type={'text' } id={profesiones.length+1+"P"} placeholder={`profesión`} className={'input_prof'} defaultValue={value}/>
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

    addElementLicitacion=(value, active, descripcion)=>{
        let licitaciones = this.state.licitaciones;
        licitaciones.push(
            {
                id_licit:licitaciones.length+1,
                conteintProsefion:  <div  className={"row"}>
                    <div className={"col-md-4"}>
                        <input type={'text' } id={licitaciones.length+1+"Li"} placeholder={`licitación`} className={'input_prof'} defaultValue={value}/>
                        <FaRegTrashAlt id={licitaciones.length+1} className={'icon_right'} onClick={(e)=>{
                            this.deleteElementLicitacion(e.target.id)
                        }}/>
                    </div>
                    <div className={"col-md-2"}>
                        <input type={"checkbox"} id={licitaciones.length+1+"LiA"} defaultChecked={active === '1'}/>
                        <label htmlFor={licitaciones.length+1+"LiA"}>Activo</label>
                    </div>

                    <div className={"col-md-6"}>
                        <textarea id={licitaciones.length+1+"LiD"}
                                  className={"areatext"}
                                  placeholder={"Descripcion ..."}
                        >
                            {descripcion}
                        </textarea>
                    </div>
                </div>
            }
        )
        this.setState({licitaciones:licitaciones})
    }

    deleteElementLicitacion=(id_Element)=>{
        let licitaciones = this.state.licitaciones;
        Object.keys(licitaciones).forEach(
            function (key){
                if(licitaciones[key].id_licit == id_Element){
                    delete licitaciones[key]
                }
            }
        )
        this.setState({licitaciones:licitaciones})
    }

    addElementExperiencia=(user_id)=>{
        let experiencia = this.state.experiencias;
        if (user_id){
            Axios.post(this.state.urlApi+"/users/getCExperience_id",{
                idUser:user_id
            } ).then( res => {
                if(res.status===200 && res.statusText === "OK"){
                    let responds = res.data.data
                    responds.map(
                        item=> {
                            let nom_com = "Select to File"
                            if (item?.nombre_e && item?.nombre_e !== "undefined" && item?.nombre_e !== "" ) {
                                nom_com = item?.nombre_e
                            }
                            experiencia.push(
                                {
                                    id_prof: experiencia.length + 1,
                                    conteintProsefion:
                                        <div className={"row"}>
                                            <div className={"col-md-12"}>
                                                <div style={{height: "30px"}}>
                                                    <input type={'text'} id={experiencia.length + 1 + "E"}
                                                           placeholder={`experiencia ${experiencia.length + 1}`}
                                                           className={'input_prof'} defaultValue={item.nombre}/>
                                                    <FaRegTrashAlt id={experiencia.length + 1} className={'icon_right'}
                                                                   onClick={(e) => {
                                                                       this.deleteElementExperiencia(e.target.id)
                                                                       this.state.experiencesDelete.push(item?.experience_id)
                                                                   }}/>
                                                </div>
                                            </div>
                                            <div className={"col-md-12 input_file_c"}>
                                                <label htmlFor={experiencia.length + 1 + "CE"}
                                                       id={experiencia.length + 1 + "CEE"}
                                                       className="btnFileCV">{nom_com}</label>
                                                <input type={"file"} id={experiencia.length + 1 + "CE"}
                                                       onChange={(e) => this.fileRender(e)}/>
                                                <div className={"icon_right_ojo"}>
                                                    <img src={ojo} alt={""} id={experiencia.length + 1 + "iojo"}
                                                         onClick={(e) => {
                                                             let xe = document.getElementById(e.target.id).parentElement.previousElementSibling
                                                             this.setState({
                                                                 fileCom: this.searchExp(xe.id)?.base64,
                                                                 nameCom: item.nombre
                                                             })
                                                             this.getComExperience(user_id, item.nombre)
                                                         }
                                                         }
                                                    />
                                                </div>
                                            </div>
                                            <div className={"col-md-2"}>
                                                <input type={"text"} id={experiencia.length + 1 + "CE_ID"}
                                                       className={'input_prof'} defaultValue={item?.experience_id}
                                                       disabled={true} style={{display:"none"}}
                                                />
                                            </div>
                                            <div className={"col-md-10"}>
                                                <input type={"text"} id={experiencia.length + 1 + "CE_B64"}
                                                       className={'input_prof'} disabled={true} style={{display:"none"}}/>
                                            </div>
                                        </div>

                                }
                            )
                            this.setState({experiencias:experiencia})
                        }
                    )
                }
            })
        }else {
            let nom_com = "Select to File"

            experiencia.push(
                {
                    id_prof: experiencia.length + 1,
                    conteintProsefion:
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <div style={{height: "30px"}}>
                                    <input type={'text'} id={experiencia.length + 1 + "E"}
                                           placeholder={`experiencia`}
                                           className={'input_prof'}/>
                                    <FaRegTrashAlt id={experiencia.length + 1} className={'icon_right'}
                                                   onClick={(e) => {
                                                       this.deleteElementExperiencia(e.target.id)
                                                   }}/>
                                </div>
                            </div>
                            <div className={"col-md-12 input_file_c"}>
                                <label htmlFor={experiencia.length + 1 + "CE"}
                                       id={experiencia.length + 1 + "CEE"}
                                       className="btnFileCV">{nom_com}</label>
                                <input type={"file"} id={experiencia.length + 1 + "CE"}
                                       onChange={(e) => this.fileRender(e)}/>
                                <div className={"icon_right_ojo"}>
                                    <img src={ojo} alt={""} id={experiencia.length + 1 + "iojo"}
                                         onClick={(e) => {
                                             let xe = document.getElementById(e.target.id).parentElement.previousElementSibling
                                             this.setState({
                                                 fileCom: this.searchExp(xe.id)?.base64,
                                                 nameCom: nom_com
                                             })
                                             this.getComExperience(user_id, nom_com)
                                         }
                                         }
                                    />
                                </div>
                            </div>
                            <div className={"col-md-2"}>
                                <input type={"text"} id={experiencia.length + 1 + "CE_ID"} className={'input_prof'}
                                       disabled={true} style={{display:"none"}}/>
                            </div>
                            <div className={"col-md-10"}>
                                <input type={"text"} id={experiencia.length + 1 + "CE_B64"} className={'input_prof'}
                                       disabled={true} style={{display:"none"}}/>
                            </div>
                        </div>

                }
            )
            this.setState({experiencias:experiencia})
        }

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
        this.setState({experiencias:experiencia, fileCom:null, nameCom:"Select to File",})
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
        Axios.post(this.state.urlApi+"/users/delete/certification",{
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
            Axios.post(this.state.urlApi+"/users/getCV",{
                idUser:id,
                nomCv:nomFile
            } ).then( res => {
                console.log("message",res)
                if(res.status===200 && res.statusText === "OK"){
                    let cv = res.data.data[0]
                    //console.log(cv)
                    if(cv){
                        this.setState({
                            fileSelected_b64:cv.base64_cv,
                            nameFileSelected:cv.nombre_cv
                        })
                    }else{
                        this.setState({
                            fileSelected_b64:"",
                            nameFileSelected:""
                        })
                    }
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
    getComExperience =(id,nomE)=>{
        if (this.state.actionViewCv === true){
            Axios.post(this.state.urlApi+"/users/getCExperience",{
                idUser:id,
                nomE:nomE
            } ).then( res => {
                console.log("message",res)
                if(res.status===200 && res.statusText === "OK"){
                    let ex = res.data.data[0]
                    if (ex !== undefined){
                        this.setState({
                            fileSelected_b64:ex.base64_e,
                            nameFileSelected:ex.nombre_e
                        })
                        this.handleModalShowPdf()
                    }else{
                        this.setState({
                            fileSelected_b64:'',
                            nameFileSelected:''
                        })
                        this.handleModalShowPdf()
                    }
                }
            })
        }else {
            this.setState({
                fileSelected_b64:this.state.fileCom,
                nameFileSelected:this.state.nameCom
            })
            this.handleModalShowPdf()
        }
    }

    getFileCert =(id,nomFile)=>{
            Axios.post(this.state.urlApi+"/users/get/File/Certification",{
            idCert:id,
            nomFile:nomFile
        } ).then( res => {
            console.log("message",res)
            if(res.status===200 && res.statusText === "OK"){
                let cv = res.data.data[0]
                this.setState({
                    fileSelected_b64:cv.base64_cert,
                    nameFileSelected:cv.nombre
                })
                this.handleModalShowPdf()
            }
        })
    }

    viewRegister=(data, Certification)=>{
        this.setState({user_selected:data,user_selected2:Certification, fileImg:data.imgPerfil, actionViewCv:true});
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

                <div className={"row row-content-table"}>
                    <div className={"col-md-1"}/>
                    <div className={"col-md-10"} style={{display:"flex"}}>
                        <div className={"row"} style={{margin:"auto"}}>
                            <div className={"col-md-12 inputRadio"}>
                                <input type={"radio"} id={"normal"} onClick={()=>this.setState({person_type:'Normal'})} checked={this.state.person_type === 'Normal'}/>
                                <label htmlFor={"normal"}>Perfil normal</label>
                                <input type={"radio"} id={"plus"} onClick={()=>this.setState({person_type:'Plus'})} checked={this.state.person_type === 'Plus'}/>
                                <label htmlFor={"plus"}>Perfiles licitatorios</label>
                            </div>
                            <div className={"col-md-12"}>
                                <Table  responsive className={"center table1 table-striped "}>
                                    <thead className={"table1-thead"}>
                                        <tr className={"title1-thead"}>
                                            <th colSpan={10} className={'topRadius'}>  PERFILES PROFESIONALES</th>
                                        </tr>
                                        <tr className={"title1-thead"}>
                                            <th colSpan={10}>
                                                <select id={"optionSearch"}>
                                                    <option>Filtrar por...</option>
                                                    {this.state.person_type==='Normal'?this.state.theandN.map(item=>(<option>{item}</option>)):this.state.theandP.map(item=>(<option>{item}</option>))}
                                                </select>
                                                <input id={"myInput"} type="text" style={{marginLeft:"1%"}} placeholder={"Search..."} onKeyUp={(e)=>this.TableFilter("myInput","tabla","optionSearch")}/>
                                            </th>
                                        </tr>
                                        <tr className={"title2-thead th-per-prof"}>
                                            {this.state.person_type==='Normal'?this.state.theandN.map(item=>(<th>{item}</th>)):this.state.theandP.map(item=>(<th>{item}</th>))}
                                            <th style={{width:"40px"}}>
                                                <img src={iconPlus1} alt={""} className={"iconPlus"} style={{display:this.state.typeDisplay}}
                                                     onClick={() => {
                                                         if (this.state.person_type === 'Normal') {
                                                             this.setState({typeAction: "regisster",});
                                                             this.handleModalShowRegister()
                                                         } else {
                                                             this.handleModalShowNormal()
                                                         }
                                                     }
                                                     }
                                                />

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
                                                data.persons_type===this.state.person_type?
                                                <tr className={"table1-tr td-per-prof"}>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_id}</td>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.nombre}</td>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_ap}</td>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Profesions)}</td>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Experiences)}</td>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.CVs}</td>
                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Certification)}</td>
                                                    <td  style={{display:this.state.person_type==='Normal'?"none":"table-cell"}} onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Licitacions)}</td>
                                                    {/*
                                                    <td  style={{display:this.state.person_type==='Normal'?"none":"table-cell"}} onClick={()=>this.viewRegister(data,data.Certification)}>{data.activo}</td>
                                                    */}
                                                    <td style={{width:"40px"}}>
                                                        <BsPencilSquare className={"icon-table-consultor"} style={{display:this.state.typeDisplay}} onClick={
                                                            ()=>{
                                                                this.setState({typeAction:"update",user_selected:data, actionViewCv:true, fileImg:data.imgPerfil})
                                                                if (data.CVs !== null){this.setState({nameCV:data.CVs})}
                                                                String(data.Profesions).split(",").map(item=> {if(item !== "null"){this.addElementProfesion(item)}})
                                                                this.addElementExperiencia(data.persons_id)
                                                                data.Licitacions.map(item=> this.addElementLicitacion(item.nombre,item.active_lic, item.descripcion))
                                                                data.Certification.map(item=> this.addElementCertificaciones(item.nombre,item.id))
                                                                this.handleModalShowUpdate();
                                                            }
                                                        }/>
                                                    </td>
                                                    <td style={{width:"40px"}}>
                                                        <BsTrashFill className={"icon-table-consultor"} style={{display:this.state.typeDisplay}} onClick={()=>{this.setState({user_selected:data});this.handleModalShowDelete()}}/>
                                                    </td>
                                                </tr>:<tr/>
                                            )
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                       </div>
                    </div>
                    <div className={"col-md-1"}>
                        <div className={"papelera"} onClick={()=>this.handleModalShowPapelera()}>
                            <BsTrashFill/>
                            <p>Papelera</p>
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
                                        <p>Documentos:
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
                                        <p>Documentos:
                                            <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{this.addElementCertificaciones()}}/>
                                        </p>
                                    </div>
                                    <div className={"col-md-12"} id={"divCertificacion"}>
                                        { this.state.certificaciones.map(res=>(res.conteintProsefion)) }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.person_type!=='Normal'?<div className={"row"}>
                                                                    <div className={"col-md-12"}>
                                                                        <div className={"row"}>
                                                                            <div className={"col-md-12"}>
                                                                                <p>Licitación:
                                                                                    <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{this.addElementLicitacion()}}/>
                                                                                </p>
                                                                            </div>
                                                                            <div className={"col-md-12"} id={"divProfesion"}>
                                                                                { this.state.licitaciones.map(res=>(res.conteintProsefion)) }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>:<div/>
                        }
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
                                            {String(this.state.user_selected.Experiences).split(",").map(item=>
                                                <li onClick={(e)=>{
                                                    this.getComExperience(this.state.user_selected.persons_id,e.target.textContent)
                                                }}>{item!=="null"?item:""}</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className={"col-md-4 div-cert-pres"}>
                                        <h6>DOCUMENTOS</h6>
                                        <ul>
                                            {this.state.user_selected2.map(item=><li id={item.id} onClick={()=> {
                                                this.getFileCert(item.id,item.nombre)
                                            }}>{item.nombre}</li>)}
                                        </ul>
                                    </div>

                                    {
                                        this.state.person_type !== 'Normal'?<>
                                            <Table id={"tabla"}  responsive className={"center table1 table-striped"}>
                                                <thead>
                                                <tr>
                                                    <div className={"div-cert-pres"}>
                                                        <h6>LICITACIONES</h6>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Estatus</th>
                                                    <th>Descripcion</th>
                                                </tr>
                                                </thead>
                                                <tbody className={"table1-tbody"}>

                                                    {this.state.user_selected.Licitacions?.map(item=>
                                                        <tr className={"table1-tr td-per-prof"}>
                                                            <td>
                                                                {item.nombre}
                                                            </td>
                                                            <td>
                                                                {item.active_lic=='1'?"Activo":"Inactivo"}
                                                            </td>
                                                            <td>
                                                                {item.descripcion}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            </>:<div/>
                                    }
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
                        <div className={"row div-cesto"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>

                                    <div className={"col-md-1"}/>
                                    <div className={"col-md-10"} style={{display:"flex"}}>
                                        <div className={"row"} style={{margin:"auto"}}>
                                            <div className={"col-md-12"}>
                                                <Table  responsive className={"center table1 table-striped "}>
                                                    <thead className={"table1-thead"}>
                                                    <tr className={"title1-thead"}>
                                                        <th colSpan={10} className={'topRadius'}>  PERFILES ELIMINADOS</th>
                                                    </tr>
                                                    <tr className={"title1-thead"}>
                                                        <th colSpan={10}>
                                                            <select id={"optionSearch_p"}>
                                                                <option>Filtrar por...</option>
                                                                {this.state.theandP.map(item=>(<option>{item}</option>))}
                                                            </select>
                                                            <input id={"myInput_p"} type="text" style={{marginLeft:"1%"}} placeholder={"Search..."} onKeyUp={(e)=>this.TableFilter("myInput_p","tabla_p","optionSearch_p")}/>
                                                        </th>
                                                    </tr>
                                                    <tr className={"title2-thead th-per-prof"}>
                                                        {this.state.theandP.map(item=>(<th>{item}</th>))}
                                                        <th style={{width:"40px"}}>
                                                        </th>
                                                        <th style={{width:"40px"}}/>
                                                    </tr>
                                                    </thead>
                                                </Table>
                                            </div>
                                            <div className={"col-md-12 bottomRadius"} style={{height:"60vh"}}>
                                                <Table id={"tabla_p"}  responsive className={"center table1 table-striped"}>
                                                    <tbody className={"table1-tbody"}>
                                                    {
                                                        this.state.data2.map(
                                                            data=>(
                                                                <tr className={"table1-tr td-per-prof"}>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_id}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.nombre}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_ap}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Profesions)}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Experiences)}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.CVs}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Certification)}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Licitacions)}</td>
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

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalNormal}
                       dialogClassName={"dialog-modal-papelera"}
                >
                    <Modal.Body>
                        <div className={"row div-cesto"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>

                                    <div className={"col-md-1"}/>
                                    <div className={"col-md-10"} style={{display:"flex"}}>
                                        <div className={"row"} style={{margin:"auto"}}>
                                            <div className={"col-md-12"}>
                                                <Table  responsive className={"center table1 table-striped "}>
                                                    <thead className={"table1-thead"}>
                                                    <tr className={"title1-thead"}>
                                                        <th colSpan={10} className={'topRadius'}>PERFILES</th>
                                                    </tr>
                                                    <tr className={"title1-thead"}>
                                                        <th colSpan={10}>
                                                            <select id={"optionSearch_p"}>
                                                                <option>Filtrar por...</option>
                                                                {this.state.theandN.map(item=>(<option>{item}</option>))}
                                                            </select>
                                                            <input id={"myInput_p"} type="text" style={{marginLeft:"1%"}} placeholder={"Search..."} onKeyUp={(e)=>this.TableFilter("myInput_p","tabla_p","optionSearch_p")}/>
                                                        </th>
                                                    </tr>
                                                    <tr className={"title2-thead th-per-prof"}>
                                                        {this.state.theandN.map(item=>(<th>{item}</th>))}
                                                        <th style={{width:"40px"}}>
                                                        </th>
                                                        <th style={{width:"40px"}}/>
                                                    </tr>
                                                    </thead>
                                                </Table>
                                            </div>
                                            <div className={"col-md-12 bottomRadius"} style={{height:"60vh"}}>
                                                <Table id={"tabla_p"}  responsive className={"center table1 table-striped"}>
                                                    <tbody className={"table1-tbody"}>
                                                    {
                                                        this.state.data.map(
                                                            data=>(
                                                            data.persons_type==='Normal'?
                                                                <tr className={"table1-tr td-per-prof"}>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_id}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.nombre}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.persons_ap}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Profesions)}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Experiences)}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{data.CVs}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Certification)}</td>
                                                                    <td  onClick={()=>this.viewRegister(data,data.Certification)}>{this.separeData(data.Licitacions)}</td>
                                                                    <td style={{width:"40px"}}>
                                                                        <AiOutlinePlus className={"icon-table-consultor"}  onClick={
                                                                            ()=>{
                                                                                this.setState({user_selected:data, fileImg:data.imgPerfil,person_type:"Plus"})
                                                                                this.handleModalShowAddPlus()
                                                                            }}/>
                                                                    </td>
                                                                </tr>:<tr></tr>
                                                            )
                                                        )
                                                    }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>this.handleModalShowNormal()}>Cerrar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalAddPlus}
                >
                    <Modal.Body>
                        <div className={"row div-presentacion"}>

                            <div className={"col-md-12 div-general-skill"}>
                                <div className={"row div-skill"}>
                                    <div className={"col-md-12"}>
                                        <h6>Esta seguro de agregar a {this.state.user_selected.nombre} a perfiles plus?</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-12 div-cv-pres"}>
                                <div>
                                    <Button onClick={()=>{
                                        this.addData(undefined,this.state.user_selected);
                                        this.handleModalShowAddPlus()
                                        this.handleModalShowNormal()
                                    }}>Agregar</Button>
                                    <Button onClick={()=>this.handleModalShowAddPlus()}>Cancelar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
    )
    }
}