import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'
import '../styles/ModalPdf.css'
import {BsPencilSquare, BsTrashFill,BsCloudDownload,BsPlus} from "react-icons/bs";
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
            files:null,
        };
    }

    handleModalShowRegister=()=>{
        this.setState({showModalRegister:!this.state.showModalRegister})
    }
    handleModalShowPdf=()=>{
        this.setState({showModalViewPdf:!this.state.showModalViewPdf})
    }

    getFiles(files){
        this.setState({ files: files[0].base64});
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
                                                <BsPencilSquare className={"icon-table-consultor"}/>
                                            </td>
                                            <td>
                                                <BsTrashFill className={"icon-table-consultor"}/>
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

                <Modal size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       show={this.state.showModalRegister}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowRegister()}>
                        <Modal.Title>NEW REGISTER</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <p>Nombre:</p>
                                <input type={"text"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellido paterno:</p>
                                <input type={"text"}/>
                            </div>
                            <div className={"col-md-4"}>
                                <p>Apellido materno:</p>
                                <input type={"text"}/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <p>Profesion: <BsPlus/></p>

                                <input type={"text"}/>

                            </div>
                            <div className={"col-md-6"}>
                                <p>Experiencia:</p>
                                <input type={"text"}/>
                            </div>

                        </div>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <p>CV:</p>
                                <FileBase64 multiple={true} onDone={this.getFiles.bind(this)}/>
                                <Button onClick={()=>{this.handleModalShowPdf()}}>
                                    Abrir CV
                                </Button>
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
                                <p>Certificaciones:</p>
                                <input type={"text"}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <Button>Guardar
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
                                <ViewPdf pdf={this.state.files}/>
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