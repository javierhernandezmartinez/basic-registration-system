import React from "react";
/*import {pdfjs} from "react-pdf";*/
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../styles/Pdf.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ModalRegister.css';
import { PDFObject } from 'react-pdfobject'
import { LightgalleryProvider,LightgalleryItem,} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
/*
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
*/
/*
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
*/

export default class ViewPdf extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("->",this.props)
        if(this.props?.pdf !== undefined && this.props?.pdf !== 'undefined' && this.props.pdf !== "" && this.props.pdf){
            if(this.props?.pdf.substring(0,20) === "data:application/pdf") {
                return (<PDFObject url={this.props.pdf}/>)
            }else {
                return(
                    <div style={{width:"100%", height:"100%", display:"grid"}}>
                        <LightgalleryProvider group="any" src={this.props.pdf} onCloseAfter={() => this.props.funtionClose()}>
                            <LightgalleryItem group={"any"} src={this.props.pdf} >
                                <img id={"photo"} src={this.props.pdf} style={{width:"100%", height:"100%"}} alt={""}/>
                            </LightgalleryItem>
                        </LightgalleryProvider>
                    </div>
                )
            }
        }else{return (<p>Documento no encontrado</p>)}
    }
}
