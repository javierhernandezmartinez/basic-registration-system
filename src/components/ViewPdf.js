import React from "react";
import { Document, Page, pdfjs} from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../styles/Pdf.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Embed from "react-embed";
import {BsPencilSquare, BsTrashFill, BsCloudDownload, BsPlus, BsDash, BsDownload} from "react-icons/bs";

/*pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;*/
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class ViewPdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages:null,
            pageNumber:null,
            pdf:this.props.pdf,
            zoomPdf:100
        }
    }

    onDocumentLoadSuccess=({numPages} )=> {
        this.setState({numPages:numPages})
    }
    changePage=(offset)=> {
        this.setState({pageNumber:prevPageNumber => prevPageNumber + offset})
    }
    nextPage=()=> {
        this.changePage(1);
    }
    previousPage=()=> {
        this.changePage(-1);
    }

    zoomUp=()=>{
        this.setState({zoomPdf:this.state.zoomPdf+1})
    }
    zoomDown=()=>{
        this.setState({zoomPdf:this.state.zoomPdf-1})
    }
    prit(){
        console.log("x")
    }

    render() {
        return(
            <div className={"row"} style={{width:"100%", height:"100%", margin:"0"}}>
                <div className={"col-md-12"}>
                    <div className={"row header-pdf"}>
                        <div className={"colo-md-1 num-page-pdf"}>Pages : {this.state.numPages}</div>
                        <div className={"col-md-3 zoom-page-pdf"}>
                            <button className={"button-header-pdf"} onClick={()=>{
                                this.zoomDown();
                               /* document.getElementById("zpdf").value=this.state.zoomPdf+"%"*/
                            }
                            }><BsDash/></button>
                            <label className={"label-zoom-pdf"}>{this.state.zoomPdf}%</label>
                            {/*<input type={"text"} id={"zpdf"} value={this.state.zoomPdf+"%"}/>*/}
                            <button className={"button-header-pdf"} onClick={this.zoomUp}><BsPlus/></button>
                        </div>
                        <div className={"col-md-1 down-page-pdf"}>
                            <button className={"button-header-pdf"} onClick={this.zoomUp}><BsDownload/></button>
                        </div>
                    </div>
                </div>

                <div className={"col-md-1"}/>
                <div className={"col-md-10"}>
                    <div style={{zoom:this.state.zoomPdf+"%"}}>
                        <Document
                            id={"idPdf"}
                            file={this.state.pdf}
                            onLoadSuccess={this.onDocumentLoadSuccess}

                        >

                            {
                                Array.from(new Array(this.state.numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        scale={2}
                                        onRenderSuccess={this.prit}
                                    />
                                ))}
                        </Document>
                    </div>

                </div>

                <div className={"col-md-1"}/>
            </div>

        )
    }
}
