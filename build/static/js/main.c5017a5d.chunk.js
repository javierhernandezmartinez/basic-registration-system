(this["webpackJsonpsystem-register-marquez"]=this["webpackJsonpsystem-register-marquez"]||[]).push([[0],{45:function(e){e.exports=JSON.parse('{"registros":[{"id":1,"nombre":"Leonardo","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":2,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":3,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":4,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":5,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":6,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":7,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":8,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":9,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":10,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]},{"id":11,"nombre":"nom1","apellidoP":"apellidoP","apellidoM":"apellidoM","profesion":["profesion1","profesion2"],"experiencia":["experiencia1","experiencia2"],"cv":"cv.pdf","certificacion":["certificacion1","certificacion2"]}]}')},53:function(e,i,c){},54:function(e,i,c){},55:function(e,i,c){},56:function(e,i,c){},79:function(e,i){},80:function(e,i){},81:function(e,i){},82:function(e,i){},83:function(e,i){},87:function(e,i,c){},91:function(e,i,c){"use strict";c.r(i);var t=c(0),n=c.n(t),a=c(16),o=c.n(a),s=(c(53),c(54),c(18)),l=c(19),r=c(21),d=c(20),p=c(94),j=c(96),h=c(95),f=(c(34),c(55),c(56),c(17)),b=c(2),m=function(e){Object(r.a)(c,e);var i=Object(d.a)(c);function c(e){var t;return Object(s.a)(this,c),(t=i.call(this,e)).state={files:[]},t}return Object(l.a)(c,[{key:"handleChange",value:function(e){for(var i=this,c=e.target.files,t=[],n=function(){var e=c[a],n=new FileReader;n.readAsDataURL(e),n.onload=function(){var a={name:e.name,type:e.type,size:Math.round(e.size/1e3)+" kB",base64:n.result,file:e};t.push(a),t.length==c.length&&(i.props.multiple?i.props.onDone(t):i.props.onDone(t[0]))}},a=0;a<c.length;a++)n()}},{key:"render",value:function(){return Object(b.jsx)("input",{id:this.props.id,type:"file",onChange:this.handleChange.bind(this)})}}]),c}(n.a.Component);m.defaultProps={multiple:!1};var x=c(22);c(86),c(87);x.c.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(x.c.version,"/pdf.worker.js");var u=function(e){Object(r.a)(c,e);var i=Object(d.a)(c);function c(e){var t;return Object(s.a)(this,c),(t=i.call(this,e)).onDocumentLoadSuccess=function(e){var i=e.numPages;t.setState({numPages:i})},t.changePage=function(e){t.setState({pageNumber:function(i){return i+e}})},t.nextPage=function(){t.changePage(1)},t.previousPage=function(){t.changePage(-1)},t.zoomUp=function(){t.setState({zoomPdf:t.state.zoomPdf+1})},t.zoomDown=function(){t.setState({zoomPdf:t.state.zoomPdf-1})},t.state={numPages:null,pageNumber:null,pdf:t.props.pdf,nameFile:t.props.namefile,zoomPdf:100},t}return Object(l.a)(c,[{key:"prit",value:function(){console.log("x")}},{key:"render",value:function(){var e=this;return Object(b.jsxs)("div",{className:"row",style:{width:"100%",height:"100%",margin:"0"},children:[Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsxs)("div",{className:"row header-pdf",children:[Object(b.jsx)("div",{className:"colo-md-6 name-file-pdf",children:Object(b.jsx)("p",{children:this.state.nameFile})}),Object(b.jsxs)("div",{className:"colo-md-1 num-page-pdf",children:["Pages : ",this.state.numPages]}),Object(b.jsxs)("div",{className:"col-md-3 zoom-page-pdf",children:[Object(b.jsx)("button",{className:"button-header-pdf",onClick:function(){e.zoomDown()},children:Object(b.jsx)(f.a,{})}),Object(b.jsxs)("label",{className:"label-zoom-pdf",children:[this.state.zoomPdf,"%"]}),Object(b.jsx)("button",{className:"button-header-pdf",onClick:this.zoomUp,children:Object(b.jsx)(f.d,{})})]}),Object(b.jsx)("div",{className:"col-md-1 down-page-pdf",children:Object(b.jsx)("button",{className:"button-header-pdf",onClick:this.zoomUp,children:Object(b.jsx)(f.b,{})})})]})}),Object(b.jsx)("div",{className:"col-md-1"}),Object(b.jsx)("div",{className:"col-md-10",children:Object(b.jsx)("div",{style:{zoom:this.state.zoomPdf+"%"},children:Object(b.jsx)(x.a,{id:"idPdf",file:this.state.pdf,onLoadSuccess:this.onDocumentLoadSuccess,children:Array.from(new Array(this.state.numPages),(function(i,c){return Object(b.jsx)(x.b,{pageNumber:c+1,scale:2,onRenderSuccess:e.prit},"page_".concat(c+1))}))})})}),Object(b.jsx)("div",{className:"col-md-1"})]})}}]),c}(n.a.Component),O=c(45),v=function(e){Object(r.a)(c,e);var i=Object(d.a)(c);function c(e){var t;return Object(s.a)(this,c),(t=i.call(this,e)).handleModalShowRegister=function(){t.setState({showModalRegister:!t.state.showModalRegister})},t.handleModalShowPdf=function(){t.setState({showModalViewPdf:!t.state.showModalViewPdf})},t.TableFilter=function(){var e,i,c,n,a,o;e=document.getElementById("myInput").value.toUpperCase(),i=document.getElementById("tabla").getElementsByTagName("tr"),a=document.getElementById("optionSearch").value;for(var s=0;s<t.state.theand.length;s++)t.state.theand[s]==a&&(o=s);for(n=0;n<i.length;n++)(c=i[n].getElementsByTagName("td")[o])&&((c.textContent||c.innerText).toUpperCase().indexOf(e)>-1?i[n].style.display="":i[n].style.display="none")},t.state={showModalRegister:!1,showModalViewPdf:!1,data:O.registros,theand:["ID","NOMBRE","APELLIDO P.","APELLIDO M.","PROFESION","EXPERIENCIA","CV","CERTIFICACIONES"],numPages:null,pageNumber:1,files:null,nameFile:null},t}return Object(l.a)(c,[{key:"getFiles",value:function(e){this.setState({files:e[0].base64,nameFile:e[0].name})}},{key:"render",value:function(){var e=this;return Object(b.jsxs)("div",{className:"content",children:[Object(b.jsx)("div",{className:"row div-row-1",children:Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsx)("p",{className:"title1",children:"SISTEMA DE REGISTRO MARQUEZ"})})}),Object(b.jsxs)("div",{className:"row div-row-2",children:[Object(b.jsx)("div",{className:"col-md-2"}),Object(b.jsx)("div",{className:"col-md-8 col-table1",children:Object(b.jsxs)(p.a,{id:"tabla",responsive:!0,className:"center table1 table-striped",children:[Object(b.jsxs)("thead",{className:"table1-thead",children:[Object(b.jsx)("tr",{className:"title1-thead",children:Object(b.jsx)("th",{colSpan:10,children:"REGISTROS"})}),Object(b.jsxs)("tr",{className:"title1-thead",children:[Object(b.jsx)("th",{colSpan:2,children:Object(b.jsxs)("select",{id:"optionSearch",children:[Object(b.jsx)("option",{children:"Filtrar por..."}),this.state.theand.map((function(e){return Object(b.jsx)("option",{children:e})}))]})}),Object(b.jsx)("th",{colSpan:8,children:Object(b.jsx)("input",{id:"myInput",type:"text",placeholder:"Search...",onKeyUp:function(i){return e.TableFilter()}})})]}),Object(b.jsxs)("tr",{className:"title2-thead",children:[this.state.theand.map((function(e){return Object(b.jsx)("th",{children:e})})),Object(b.jsx)("th",{colSpan:2})]})]}),Object(b.jsx)("tbody",{className:"table1-tbody",children:this.state.data.map((function(e){return Object(b.jsxs)("tr",{className:"table1-tr",children:[Object(b.jsx)("td",{children:e.id}),Object(b.jsx)("td",{children:e.nombre}),Object(b.jsx)("td",{children:e.apellidoP}),Object(b.jsx)("td",{children:e.apellidoM}),Object(b.jsx)("td",{children:e.profesion.map((function(e){return Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:e})})}))}),Object(b.jsx)("td",{children:e.experiencia.map((function(e){return Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:e})})}))}),Object(b.jsx)("td",{children:e.cv}),Object(b.jsx)("td",{children:e.certificacion.map((function(e){return Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:e})})}))}),Object(b.jsx)("td",{children:Object(b.jsx)(f.c,{className:"icon-table-consultor"})}),Object(b.jsx)("td",{children:Object(b.jsx)(f.e,{className:"icon-table-consultor"})})]})}))})]})})]}),Object(b.jsxs)("div",{className:"row div-row-3",children:[Object(b.jsx)("div",{className:"col-md-2"}),Object(b.jsx)("div",{className:"col-md-8",children:Object(b.jsx)(j.a,{className:"button-register",onClick:function(){return e.handleModalShowRegister()},children:Object(b.jsx)("p",{children:"Nuevo registro"})})})]}),Object(b.jsxs)(h.a,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:this.state.showModalRegister,children:[Object(b.jsx)(h.a.Header,{closeButton:!0,onClick:function(){return e.handleModalShowRegister()},children:Object(b.jsx)(h.a.Title,{children:"NEW REGISTER"})}),Object(b.jsxs)(h.a.Body,{children:[Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col-md-4",children:[Object(b.jsx)("p",{children:"Nombre:"}),Object(b.jsx)("input",{type:"text"})]}),Object(b.jsxs)("div",{className:"col-md-4",children:[Object(b.jsx)("p",{children:"Apellido paterno:"}),Object(b.jsx)("input",{type:"text"})]}),Object(b.jsxs)("div",{className:"col-md-4",children:[Object(b.jsx)("p",{children:"Apellido materno:"}),Object(b.jsx)("input",{type:"text"})]})]}),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsxs)("p",{children:["Profesion: ",Object(b.jsx)(f.d,{})]}),Object(b.jsx)("input",{type:"text"})]}),Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsx)("p",{children:"Experiencia:"}),Object(b.jsx)("input",{type:"text"})]})]}),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsx)("p",{children:"CV:"}),Object(b.jsx)(m,{multiple:!0,onDone:this.getFiles.bind(this)}),Object(b.jsx)(j.a,{onClick:function(){e.handleModalShowPdf()},children:"Abrir CV"})]}),Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsx)("p",{children:"Certificaciones:"}),Object(b.jsx)("input",{type:"text"})]})]})]}),Object(b.jsx)(h.a.Footer,{children:Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsx)(j.a,{children:"Guardar"})})})})]}),Object(b.jsxs)(h.a,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:this.state.showModalViewPdf,dialogClassName:"dialog-modal-pdf",contentClassName:"content-modal-pdf",children:[Object(b.jsx)(h.a.Header,{closeButton:!0,onClick:function(){return e.handleModalShowPdf()}}),Object(b.jsx)(h.a.Body,{children:Object(b.jsx)("div",{className:"row",style:{width:"100%",height:"100%",margin:"0"},children:Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsx)(u,{pdf:this.state.files,namefile:this.state.nameFile})})})}),Object(b.jsx)(h.a.Footer,{})]})]})}}]),c}(n.a.Component),N=c(47),g=c(6);var P=function(){return Object(b.jsx)(N.a,{children:Object(b.jsx)("div",{id:"App",children:Object(b.jsx)(g.c,{children:Object(b.jsx)(g.a,{path:"/",exact:!0,to:"/",component:v})})})})},w=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,97)).then((function(i){var c=i.getCLS,t=i.getFID,n=i.getFCP,a=i.getLCP,o=i.getTTFB;c(e),t(e),n(e),a(e),o(e)}))};o.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(P,{})}),document.getElementById("root")),w()}},[[91,1,2]]]);
//# sourceMappingURL=main.c5017a5d.chunk.js.map