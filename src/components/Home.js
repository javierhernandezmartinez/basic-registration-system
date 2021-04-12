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

            fileSelected_b64:null,
            nameFileSelected:null,

            profesiones:[]
        };
    }

    handleModalShowRegister=()=>{
        this.setState({showModalRegister:!this.state.showModalRegister})
    }
    handleModalShowPdf=()=>{
        this.setState({showModalViewPdf:!this.state.showModalViewPdf})
    }

    getFilesCV(files){
        this.setState(
            {
                fileCV: files[0].base64,
                nameCV:files[0].name,
            });
    }
    getFileCert(files){
        this.setState(
            {
                fileCert: files[0].base64,
                nameCert:files[0].name
            });
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

    addData=()=>{
        let dataLis=this.state.data
        let id = this.state.data.length
        dataLis.push({
            "id": id+1,
            "nombre": "nom1",
            "apellidoP": "apellidoP",
            "apellidoM": "apellidoM",
            "profesion": [
                "profesion1",
                "profesion2"
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
        })
        this.setState({data:dataLis})


    }
    updateData=(id_Data)=>{
        console.log(id_Data)
        console.log(this.state.data)
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

        console.log(this.state.data)
    }
    deleteData=(id_Data)=>{
        console.log(id_Data)
        console.log(this.state.data)
        let dataLis=this.state.data

        Object.keys(dataLis).forEach(
            function (key){
                if(dataLis[key].id == id_Data){
                    console.log(dataLis[key])
                    delete dataLis[key]

                }
            }
        )
        this.setState({data:dataLis})

        console.log(this.state.data)

    }

    addElementProfesion=()=>{
        console.log("add profesion")
        let profesiones = this.state.profesiones;
        profesiones.push(
                {
                    id_prof:profesiones.length+1,
                    conteintProsefion:  <div style={{height:"30px"}}>
                                            <input type={'text' } id={profesiones.length+1+"P"} value={profesiones.length+1} className={'input_prof'}/>
                                            <FaRegTrashAlt id={profesiones.length} className={'icon_right'} onClick={(e)=>{
                                                console.log(e.target.id)
                                                this.deleteElementProfesion(e)
                                            }}/>
                                        </div>
                }
            )
        this.setState({profesiones:profesiones})
    }

    deleteElementProfesion=(id_Element)=>{
        id_Element=id_Element.target.id
        let profesiones = this.state.profesiones;

        Object.keys(profesiones).forEach(
            function (key){
                if(profesiones[key].id_prof == id_Element){
                    console.log(profesiones[key])
                    delete profesiones[key]

                }
            }
        )

        this.setState({profesiones:profesiones})
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
                                {
                                    this.state.theand.map(item=>(<th>{item}</th>))
                                }
                                <th colSpan={2}/>
                            </tr>

                            </thead>
                            <tbody className={"table1-tbody"}>
                            {
                                this.state.data.map(
                                    data=>(
                                        <tr className={"table1-tr"}>
                                            <td>{data.id}</td>
                                            <td>{data.nombre}</td>
                                            <td>{data.apellidoP}</td>
                                            <td>{data.apellidoM}</td>
                                            <td>
                                                {data.profesion.map(
                                                    item=>(
                                                        <div className={"row"}>
                                                            <div className={"col-md-12"}>{item}</div>
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                            <td>
                                                {data.experiencia.map(
                                                    item=>(
                                                        <div className={"row"}>
                                                            <div className={"col-md-12"}>{item}</div>
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                            <td>{data.cv}</td>
                                            <td>
                                                {data.certificacion.map(
                                                    item=>(
                                                        <div className={"row"}>
                                                            <div className={"col-md-12"}>{item}</div>
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                            <td>
                                                <BsPencilSquare className={"icon-table-consultor"} onClick={
                                                    ()=>{
                                                        this.updateData(data.id)
                                                    }
                                                }/>
                                            </td>
                                            <td>
                                                <BsTrashFill className={"icon-table-consultor"} onClick={
                                                    ()=>{
                                                        this.deleteData(data.id)
                                                    }
                                                }/>
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
                                <input type={"text"} className={"input_nom"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellido paterno:</p>
                                <input type={"text"} className={"input_nom"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellido materno:</p>
                                <input type={"text"} className={"input_nom"}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p>Profesion:
                                            <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{
                                                this.addElementProfesion()
                                            }}/>
                                        </p>
                                    </div>
                                    <div className={"col-md-12"} id={"divProfesion"}>
                                        {
                                            this.state.profesiones.map(
                                                res=>(

                                                        res.conteintProsefion

                                                )
                                            )
                                        }


                                    </div>

                                </div>





                            </div>
                            <div className={"col-md-6"}>
                                <p>Experiencia:
                                    <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{
                                        this.addElementProfesion()
                                    }}/>
                                </p>
                                <input type={"text"} className={"input_prof"}/>
                                <FaRegTrashAlt className={"icon_right"}/>
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
                            </div>
                            <div className={"col-md-6"}>
                                <p>Certificaciones:
                                    <FaPlus className={"icon_right"} style={{float:"right"}} onClick={()=>{
                                        this.addElementProfesion()
                                    }}/>
                                </p>
                                <label htmlFor="files" className="btnFile">{this.state.nameCert}</label>
                                <FileBase64 id={"files"} multiple={true} onDone={this.getFileCert.bind(this)}/>
                                <input type={"text"} className={"input_descrip"} placeholder={"descripción"}/>
                                <BsEyeFill className={"icon_right"} onClick={
                                    ()=>{
                                        this.setState({
                                            fileSelected_b64:this.state.fileCert,
                                            nameFileSelected:this.state.nameCert
                                        })
                                        this.handleModalShowPdf()
                                    }}
                                />

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