(this["webpackJsonpsystem-register-marquez"]=this["webpackJsonpsystem-register-marquez"]||[]).push([[0],{55:function(e,i,c){},56:function(e,i,c){},57:function(e,i,c){},58:function(e,i,c){},80:function(e,i){},81:function(e,i){},82:function(e,i){},83:function(e,i){},84:function(e,i){},88:function(e,i,c){},93:function(e,i,c){"use strict";c.r(i);var n=c(0),t=c.n(n),o=c(16),a=c.n(o),l=(c(55),c(56),c(19)),s=c(20),r=c(22),d=c(21),p=c(96),j=c(98),f=c(97),h=(c(36),c(57),c(58),c(17)),b=c(2),m=function(e){Object(r.a)(c,e);var i=Object(d.a)(c);function c(e){var n;return Object(l.a)(this,c),(n=i.call(this,e)).state={files:[]},n}return Object(s.a)(c,[{key:"handleChange",value:function(e){for(var i=this,c=e.target.files,n=[],t=function(){var e=c[o],t=new FileReader;t.readAsDataURL(e),t.onload=function(){var o={name:e.name,type:e.type,size:Math.round(e.size/1e3)+" kB",base64:t.result,file:e};n.push(o),n.length==c.length&&(i.props.multiple?i.props.onDone(n):i.props.onDone(n[0]))}},o=0;o<c.length;o++)t()}},{key:"render",value:function(){return Object(b.jsx)("input",{id:this.props.id,type:"file",onChange:this.handleChange.bind(this)})}}]),c}(t.a.Component);m.defaultProps={multiple:!1};var x=c(23);c(87),c(88),c(89);x.c.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(x.c.version,"/pdf.worker.js");var u=function(e){Object(r.a)(c,e);var i=Object(d.a)(c);function c(e){var n;return Object(l.a)(this,c),(n=i.call(this,e)).onDocumentLoadSuccess=function(e){var i=e.numPages;n.setState({numPages:i})},n.changePage=function(e){n.setState({pageNumber:function(i){return i+e}})},n.nextPage=function(){n.changePage(1)},n.previousPage=function(){n.changePage(-1)},n.zoomUp=function(){n.setState({zoomPdf:n.state.zoomPdf+1})},n.zoomDown=function(){n.setState({zoomPdf:n.state.zoomPdf-1})},n.state={numPages:null,pageNumber:null,pdf:n.props.pdf,zoomPdf:100},n}return Object(s.a)(c,[{key:"prit",value:function(){console.log("x")}},{key:"render",value:function(){var e=this;return Object(b.jsxs)("div",{className:"row",style:{width:"100%",height:"100%",margin:"0"},children:[Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsxs)("div",{className:"row header-pdf",children:[Object(b.jsxs)("div",{className:"colo-md-1 num-page-pdf",children:["Pages : ",this.state.numPages]}),Object(b.jsxs)("div",{className:"col-md-3 zoom-page-pdf",children:[Object(b.jsx)("button",{className:"button-header-pdf",onClick:function(){e.zoomDown()},children:Object(b.jsx)(h.a,{})}),Object(b.jsxs)("label",{className:"label-zoom-pdf",children:[this.state.zoomPdf,"%"]}),Object(b.jsx)("button",{className:"button-header-pdf",onClick:this.zoomUp,children:Object(b.jsx)(h.d,{})})]}),Object(b.jsx)("div",{className:"col-md-1 down-page-pdf",children:Object(b.jsx)("button",{className:"button-header-pdf",onClick:this.zoomUp,children:Object(b.jsx)(h.b,{})})})]})}),Object(b.jsx)("div",{className:"col-md-1"}),Object(b.jsx)("div",{className:"col-md-10",children:Object(b.jsx)("div",{style:{zoom:this.state.zoomPdf+"%"},children:Object(b.jsx)(x.a,{id:"idPdf",file:this.state.pdf,onLoadSuccess:this.onDocumentLoadSuccess,children:Array.from(new Array(this.state.numPages),(function(i,c){return Object(b.jsx)(x.b,{pageNumber:c+1,scale:2,onRenderSuccess:e.prit},"page_".concat(c+1))}))})})}),Object(b.jsx)("div",{className:"col-md-1"})]})}}]),c}(t.a.Component),O=function(e){Object(r.a)(c,e);var i=Object(d.a)(c);function c(e){var n;return Object(l.a)(this,c),(n=i.call(this,e)).handleModalShowRegister=function(){n.setState({showModalRegister:!n.state.showModalRegister})},n.handleModalShowPdf=function(){n.setState({showModalViewPdf:!n.state.showModalViewPdf})},n.TableFilter=function(){var e,i,c,t,o,a;e=document.getElementById("myInput").value.toUpperCase(),i=document.getElementById("tabla").getElementsByTagName("tr"),o=document.getElementById("optionSearch").value;for(var l=0;l<n.state.theand.length;l++)n.state.theand[l]==o&&(a=l);for(t=0;t<i.length;t++)(c=i[t].getElementsByTagName("td")[a])&&((c.textContent||c.innerText).toUpperCase().indexOf(e)>-1?i[t].style.display="":i[t].style.display="none")},n.state={showModalRegister:!1,showModalViewPdf:!1,data:[{id:1,nombre:"Leonardo",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:2,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:3,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:4,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:5,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:6,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:7,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:8,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:9,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:10,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:11,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:12,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:13,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:14,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:15,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:16,nombre:"nom1",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion2"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]},{id:17,nombre:"nom3",apellidoP:"apellidoP",apellidoM:"apellidoM",profesion:["profesion1","profesion3"],experiencia:["experiencia1","experiencia2"],cv:"cv.pdf",certificacion:["certificacion1","certificacion2"]}],theand:["ID","NOMBRE","APELLIDO P.","APELLIDO M.","PROFESION","EXPERIENCIA","CV","CERTIFICACIONES"],numPages:null,pageNumber:1,files:null},n}return Object(s.a)(c,[{key:"getFiles",value:function(e){this.setState({files:e[0].base64})}},{key:"render",value:function(){var e=this;return Object(b.jsxs)("div",{className:"content",children:[Object(b.jsx)("div",{className:"row div-row-1",children:Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsx)("p",{className:"title1",children:"SISTEMA DE REGISTRO MARQUEZ"})})}),Object(b.jsxs)("div",{className:"row div-row-2",children:[Object(b.jsx)("div",{className:"col-md-2"}),Object(b.jsx)("div",{className:"col-md-8 col-table1",children:Object(b.jsxs)(p.a,{id:"tabla",responsive:!0,className:"center table1 table-striped",children:[Object(b.jsxs)("thead",{className:"table1-thead",children:[Object(b.jsx)("tr",{className:"title1-thead",children:Object(b.jsx)("th",{colSpan:10,children:"REGISTROS"})}),Object(b.jsxs)("tr",{className:"title1-thead",children:[Object(b.jsx)("th",{colSpan:2,children:Object(b.jsxs)("select",{id:"optionSearch",children:[Object(b.jsx)("option",{children:"Filtrar por..."}),this.state.theand.map((function(e){return Object(b.jsx)("option",{children:e})}))]})}),Object(b.jsx)("th",{colSpan:8,children:Object(b.jsx)("input",{id:"myInput",type:"text",placeholder:"Search...",onKeyUp:function(i){return e.TableFilter()}})})]}),Object(b.jsxs)("tr",{className:"title2-thead",children:[this.state.theand.map((function(e){return Object(b.jsx)("th",{children:e})})),Object(b.jsx)("th",{colSpan:2})]})]}),Object(b.jsx)("tbody",{className:"table1-tbody",children:this.state.data.map((function(e){return Object(b.jsxs)("tr",{className:"table1-tr",children:[Object(b.jsx)("td",{children:e.id}),Object(b.jsx)("td",{children:e.nombre}),Object(b.jsx)("td",{children:e.apellidoP}),Object(b.jsx)("td",{children:e.apellidoM}),Object(b.jsx)("td",{children:e.profesion.map((function(e){return Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:e})})}))}),Object(b.jsx)("td",{children:e.experiencia.map((function(e){return Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:e})})}))}),Object(b.jsx)("td",{children:e.cv}),Object(b.jsx)("td",{children:e.certificacion.map((function(e){return Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:e})})}))}),Object(b.jsx)("td",{children:Object(b.jsx)(h.c,{className:"icon-table-consultor"})}),Object(b.jsx)("td",{children:Object(b.jsx)(h.e,{className:"icon-table-consultor"})})]})}))})]})})]}),Object(b.jsxs)("div",{className:"row div-row-3",children:[Object(b.jsx)("div",{className:"col-md-2"}),Object(b.jsx)("div",{className:"col-md-8",children:Object(b.jsx)(j.a,{className:"button-register",onClick:function(){return e.handleModalShowRegister()},children:Object(b.jsx)("p",{children:"Nuevo registro"})})})]}),Object(b.jsxs)(f.a,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:this.state.showModalRegister,children:[Object(b.jsx)(f.a.Header,{closeButton:!0,onClick:function(){return e.handleModalShowRegister()},children:Object(b.jsx)(f.a.Title,{children:"NEW REGISTER"})}),Object(b.jsxs)(f.a.Body,{children:[Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col-md-4",children:[Object(b.jsx)("p",{children:"Nombre:"}),Object(b.jsx)("input",{type:"text"})]}),Object(b.jsxs)("div",{className:"col-md-4",children:[Object(b.jsx)("p",{children:"Apellido paterno:"}),Object(b.jsx)("input",{type:"text"})]}),Object(b.jsxs)("div",{className:"col-md-4",children:[Object(b.jsx)("p",{children:"Apellido materno:"}),Object(b.jsx)("input",{type:"text"})]})]}),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsxs)("p",{children:["Profesion: ",Object(b.jsx)(h.d,{})]}),Object(b.jsx)("input",{type:"text"})]}),Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsx)("p",{children:"Experiencia:"}),Object(b.jsx)("input",{type:"text"})]})]}),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsx)("p",{children:"CV:"}),Object(b.jsx)(m,{multiple:!0,onDone:this.getFiles.bind(this)}),Object(b.jsx)(j.a,{onClick:function(){e.handleModalShowPdf()},children:"Abrir CV"})]}),Object(b.jsxs)("div",{className:"col-md-6",children:[Object(b.jsx)("p",{children:"Certificaciones:"}),Object(b.jsx)("input",{type:"text"})]})]})]}),Object(b.jsx)(f.a.Footer,{children:Object(b.jsx)("div",{className:"row",children:Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsx)(j.a,{children:"Guardar"})})})})]}),Object(b.jsxs)(f.a,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:this.state.showModalViewPdf,dialogClassName:"dialog-modal-pdf",contentClassName:"content-modal-pdf",children:[Object(b.jsx)(f.a.Header,{closeButton:!0,onClick:function(){return e.handleModalShowPdf()}}),Object(b.jsx)(f.a.Body,{children:Object(b.jsx)("div",{className:"row",style:{width:"100%",height:"100%",margin:"0"},children:Object(b.jsx)("div",{className:"col-md-12",children:Object(b.jsx)(u,{pdf:this.state.files})})})}),Object(b.jsx)(f.a.Footer,{})]})]})}}]),c}(t.a.Component),v=c(48),P=c(6);var N=function(){return Object(b.jsx)(v.a,{children:Object(b.jsx)("div",{id:"App",children:Object(b.jsx)(P.c,{children:Object(b.jsx)(P.a,{path:"/",exact:!0,to:"/",component:O})})})})},g=function(e){e&&e instanceof Function&&c.e(16).then(c.bind(null,189)).then((function(i){var c=i.getCLS,n=i.getFID,t=i.getFCP,o=i.getLCP,a=i.getTTFB;c(e),n(e),t(e),o(e),a(e)}))};a.a.render(Object(b.jsx)(t.a.StrictMode,{children:Object(b.jsx)(N,{})}),document.getElementById("root")),g()}},[[93,1,2]]]);
//# sourceMappingURL=main.d7aa5bad.chunk.js.map