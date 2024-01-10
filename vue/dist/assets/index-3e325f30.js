import{u as H,a as J,r as o,o as Q,b as X,F as Z,c as d,d as r,e as c,f as s,g as a,w as i,h as C,i as D,t as P,A as b,n as v}from"./index-c8ed3a98.js";const ee={class:"grid"},le={class:"col-12"},te=s("div",{class:"my-2"},null,-1),ae={class:"flex flex-column md:flex-row md:justify-between md:align-items-center"},se=s("h5",{class:"m-0"},"Manage pages",-1),oe={class:"block mt-2 md:mt-0 p-input-icon-left"},ie=s("i",{class:"pi pi-search"},null,-1),ne={class:"field mb-5"},ue=s("label",{for:"first"},"first name ",-1),de={key:0,class:"p-invalid"},re={class:"field mb-5"},ce=s("label",{for:"last"},"last name ",-1),me={key:0,class:"p-invalid"},ve={class:"field mb-5"},pe=s("label",{for:"email",class:"mb-3"},"email ",-1),fe={key:0,class:"p-invalid"},_e={class:"field mb-5"},be=s("label",{for:"password",class:"mb-3"},"password ",-1),ge={key:0,class:"p-invalid"},he={class:"field mb-5"},ye=s("label",{for:"mobile",class:"mb-3"},"mobile",-1),ke={key:0,class:"p-invalid"},we={class:"flex align-items-center justify-content-center"},xe=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Ve={key:0},Ce=D("Are you sure you want to delete "),De=D("?"),Se={class:"flex align-items-center justify-content-center"},Te=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Pe={key:0},qe={setup(Ue){const f=H(),M=J(),U=o(null),N=o(null),q=o(null),L=o([{name:"en",value:"gb"},{name:"ar",value:"sa"},{name:"az",value:"az"},{name:"ge",value:"ge"},{name:"ru",value:"ru"},{name:"tr",value:"tr"}]),_=o("gb"),S=o(!0),e=o({});o(null);const g=o(!1),h=o(!1),y=o(!1),O=o({}),k=o(null),B=o(null),w=o({}),n=o(!1);o([{label:"INSTOCK",value:"instock"},{label:"LOWSTOCK",value:"lowstock"},{label:"OUTOFSTOCK",value:"outofstock"}]),Q(()=>{j()});const x=()=>{C.get("/api/pages").then(u=>{S.value=!1,N.value=u.data.pages})};X(()=>{x()});const F=()=>{console.log(_.value)},z=()=>{g.value=!1,n.value=!1},A=()=>{n.value=!0,!(!e.value.first_name||!e.value.last_name||!e.value.email||!e.value.mobile_number)&&(e.value.id?(C.post(`/api/accommodition/${accommodition.value.id}/update`,e.value).then(u=>{console.log(u.data),x(),f.add({severity:"success",summary:"Successful",detail:"user updated",life:3e3})}).catch(()=>{}),f.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):C.post("/api/users/create",e.value).then(u=>{console.log(u.data),x(),f.add({severity:"success",summary:"Successful",detail:"user Created",life:3e3})}).catch(()=>{}),g.value=!1,e.value={})},$=u=>{e.value={...u},M.push({name:"pages-update",params:{id:e.value.id}})},I=()=>{S.value=!0,C.delete(`/api/pages/${q.value.id}/delete`).then(u=>{console.log(u.data),h.value=!1,x(),f.add({severity:"success",summary:"Successful",detail:"pages deleted",life:3e3})}).catch(()=>{})},R=()=>{U.value=U.value.filter(u=>!k.value.includes(u)),y.value=!1,k.value=null,f.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3})},j=()=>{w.value={global:{value:null,matchMode:Z.CONTAINS}}};return(u,t)=>{const K=d("Dropdown"),E=d("Toolbar"),Y=d("Toast"),p=d("InputText"),V=d("Column"),m=d("Button"),W=d("DataTable"),T=d("Dialog"),G=d("va-card");return r(),c("div",ee,[s("div",le,[a(G,{class:"card"},{default:i(()=>[a(E,{class:"mb-4"},{start:i(()=>[te]),end:i(()=>[a(K,{modelValue:_.value,"onUpdate:modelValue":t[0]||(t[0]=l=>_.value=l),onClick:F,editable:"",options:L.value,optionLabel:"name","option-value":"value",class:"w-48 mx-3"},null,8,["modelValue","options"])]),_:1}),a(Y),a(W,{ref_key:"dt",ref:B,selection:k.value,"onUpdate:selection":t[2]||(t[2]=l=>k.value=l),value:N.value,loading:S.value,"data-key":"id",paginator:!0,rows:10,filters:w.value,"paginator-template":"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown","rows-per-page-options":[5,10,25],"current-page-report-template":"Showing {first} to {last} of {totalRecords} products","responsive-layout":"scroll"},{header:i(()=>[s("div",ae,[se,s("span",oe,[ie,a(p,{modelValue:w.value.global.value,"onUpdate:modelValue":t[1]||(t[1]=l=>w.value.global.value=l),placeholder:"Search..."},null,8,["modelValue"])])])]),default:i(()=>[a(V,{"selection-mode":"multiple","header-style":"width: 3rem"}),a(V,{field:"title",header:"title",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:i(l=>[D(P(l.data.title[_.value]),1)]),_:1}),a(V,{field:"description",header:"Description",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:i(l=>[D(P(l.data.description[_.value]),1)]),_:1}),a(V,{"header-style":"min-width:10rem;"},{body:i(l=>[a(m,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:Ne=>$(l.data)},null,8,["onClick"])]),_:1})]),_:1},8,["selection","value","loading","filters"]),a(T,{visible:g.value,"onUpdate:visible":t[8]||(t[8]=l=>g.value=l),style:{width:"450px"},header:"users form",modal:!0,class:"p-fluid"},{footer:i(()=>[a(m,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:z}),a(m,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:A})]),default:i(()=>[s("div",ne,[ue,a(p,{class:b(["mt-3",{"p-invalid":n.value&&!e.value.first_name}]),id:"first",modelValue:e.value.first_name,"onUpdate:modelValue":t[3]||(t[3]=l=>e.value.first_name=l),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),n.value&&!e.value.first_name?(r(),c("small",de,"First Name is required.")):v("",!0)]),s("div",re,[ce,a(p,{class:b(["mt-3",{"p-invalid":n.value&&!e.value.last_name}]),id:"last",modelValue:e.value.last_name,"onUpdate:modelValue":t[4]||(t[4]=l=>e.value.last_name=l),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),n.value&&!e.value.last_name?(r(),c("small",me,"Last Name is required.")):v("",!0)]),s("div",ve,[pe,a(p,{class:b(["mt-3",{"p-invalid":n.value&&!e.value.email}]),id:"email",modelValue:e.value.email,"onUpdate:modelValue":t[5]||(t[5]=l=>e.value.email=l),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),n.value&&!e.value.email?(r(),c("small",fe,"Email is required.")):v("",!0)]),s("div",_e,[be,a(p,{class:b(["mt-3",{"p-invalid":n.value&&!e.value.password}]),id:"password",modelValue:e.value.password,"onUpdate:modelValue":t[6]||(t[6]=l=>e.value.password=l),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),n.value&&!e.value.password?(r(),c("small",ge,"password is required.")):v("",!0)]),s("div",he,[ye,a(p,{class:b(["mt-3",{"p-invalid":n.value&&!e.value.mobile_number}]),id:"mobile",modelValue:e.value.mobile_number,"onUpdate:modelValue":t[7]||(t[7]=l=>e.value.mobile_number=l),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),n.value&&!e.value.mobile_number?(r(),c("small",ke,"mobile is required.")):v("",!0)])]),_:1},8,["visible"]),a(T,{visible:h.value,"onUpdate:visible":t[10]||(t[10]=l=>h.value=l),style:{width:"450px"},header:"Confirm",modal:!0},{footer:i(()=>[a(m,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:t[9]||(t[9]=l=>h.value=!1)}),a(m,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:I})]),default:i(()=>[s("div",we,[xe,e.value?(r(),c("span",Ve,[Ce,s("b",null,P(e.value.first_name),1),De])):v("",!0)])]),_:1},8,["visible"]),a(T,{visible:y.value,"onUpdate:visible":t[12]||(t[12]=l=>y.value=l),style:{width:"450px"},header:"Confirm",modal:!0},{footer:i(()=>[a(m,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:t[11]||(t[11]=l=>y.value=!1)}),a(m,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:R})]),default:i(()=>[s("div",Se,[Te,O.value?(r(),c("span",Pe,"Are you sure you want to delete the selected products?")):v("",!0)])]),_:1},8,["visible"])]),_:1})])])}}};export{qe as default};