import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Footer.css"
import {GrBook} from "react-icons/all";
import Axios from "axios";
import {Modal} from "react-bootstrap";
import ViewPdf from "./ViewPdf";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlApi:'http://www.appcvprot.com:4000',
            /*urlApi: 'http://localhost:4000',*/
            fileB64Manual:'',
            fileNameManual:'',
            showModalViewPdf:false,
        }
    }

    componentDidMount() {
    }

    handleModalShowPdf = () => {
        this.setState({showModalViewPdf: !this.state.showModalViewPdf})
    }
    verManual =()=>{
        Axios.get(this.state.urlApi+"/users/getList/manual")
            .then( res => {
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
    }

    render() {
        return(
            <div className={"row m_footer"}>
                <div className={"col-md-12"}>
                    <div className={"manual"}>
                        <GrBook className={"icon_m"}/>
                        <p className={"text_m"} onClick={()=>this.verManual()}> Manual de usuario. </p>
                    </div>
                </div>

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
                                <ViewPdf pdf={this.state.fileB64Manual}
                                         namefile={this.state.fileNameManual}
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