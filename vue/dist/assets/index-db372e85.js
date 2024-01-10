import{a as te,r as i,u as ae,o as le,b as se,F as oe,c as v,d as u,e as r,f as n,g as t,w as o,h as f,i as V,t as g,A as p,n as b}from"./index-c8ed3a98.js";const ie={class:"grid"},ne={class:"col-12"},de=n("div",{class:"my-2"},null,-1),ue={class:"flex flex-column md:flex-row md:justify-between md:align-items-center"},re=n("h5",{class:"m-0"},"Manage drivers",-1),ce={class:"block mt-2 md:mt-0 p-input-icon-left"},me=n("i",{class:"pi pi-search"},null,-1),ve={key:0},pe={key:1},_e={key:0},fe={key:1},be={class:"field mb-5"},he=n("label",{for:"first"},"first name ",-1),ye={key:0,class:"p-invalid"},ge={class:"field mb-5"},we=n("label",{for:"last"},"last name ",-1),ke={key:0,class:"p-invalid"},Ce={class:"field mb-5"},Ve=n("label",{for:"email",class:"mb-3"},"email ",-1),xe={key:0,class:"p-invalid"},Se={class:"field mb-5"},Te=n("label",{for:"password",class:"mb-3"},"password ",-1),De={key:0,class:"p-invalid"},Ue={class:"field mb-5"},Me=n("label",{for:"mobile",class:"mb-3"},"mobile",-1),Ne={key:0,class:"p-invalid"},$e={class:"m-auto"},qe={key:0,class:"mt-4 m-auto text-red-500"},Le={class:"flex align-items-center justify-content-center"},Ae=n("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Oe={key:0},Fe={setup(Pe){const O=te();i(null);const w=ae(),q=i(null),k=i(!0),a=i({}),x=i(""),N=i(null),S=i({tourist_rating:Number,reviewable_id:"",type:0}),T=i(!1),C=i(!1);i(!1);const D=i(!1),P=i({}),U=i(null),L=i(null),M=i({}),d=i(!1);i([{label:"INSTOCK",value:"instock"},{label:"LOWSTOCK",value:"lowstock"},{label:"OUTOFSTOCK",value:"outofstock"}]),le(()=>{H()});const _=()=>{f.get("/api/drivers").then(s=>{console.log(s),k.value=!1,N.value=s.data.drivers,console.log(N.value)})},B=s=>{k.value=!0,f.post(`/api/drivers/${s.id}/active`).then(l=>{_()})},F=s=>{k.value=!0,f.post(`/api/drivers/${s.id}/inActive`).then(l=>{_()})},R=s=>{k.value=!0,f.post(`/api/drivers/${s.id}/changeStatus`).then(l=>{_()})},E=()=>{f.post("/api/rating/create-admin",S.value).then(s=>{_(),w.add({severity:"success",summary:"Successful",detail:"rate send",life:3e3}),C.value=!C.value}).catch(s=>{x.value=s.response.data.errors})};se(()=>{_()});const I=s=>{O.push({name:"drivers-show",params:{id:s}}),console.log(s)},K=()=>{T.value=!1,d.value=!1},j=()=>{d.value=!0,!(!a.value.first_name||!a.value.last_name||!a.value.email||!a.value.mobile_number)&&(a.value.id?(f.post(`/api/users/${a.value.id}/update`,a.value).then(s=>{console.log(s.data),_(),w.add({severity:"success",summary:"Successful",detail:"user updated",life:3e3})}).catch(()=>{}),w.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):f.post("/api/users/create",a.value).then(s=>{console.log(s.data),_(),w.add({severity:"success",summary:"Successful",detail:"user Created",life:3e3})}).catch(()=>{}),T.value=!1,a.value={})},z=s=>{switch(s.status){case 1:return"success";case-1:return"warning";case 0:return"danger";default:return null}},W=s=>{x.value=i(""),S.value.reviewable_id=s,C.value=!0};i("bottom"),i([{value:1},{value:2},{value:3},{value:4},{value:5}]);const G=()=>{L.value.exportCSV()},Y=()=>{q.value=q.value.filter(s=>!U.value.includes(s)),D.value=!1,U.value=null,w.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3})},H=()=>{M.value={global:{value:null,matchMode:oe.CONTAINS}}};return(s,l)=>{const m=v("Button"),J=v("Toolbar"),Q=v("Toast"),h=v("InputText"),c=v("Column"),A=v("Rating"),X=v("Tag"),Z=v("DataTable"),$=v("Dialog"),ee=v("va-card");return u(),r("div",ie,[n("div",ne,[t(ee,{class:"card"},{default:o(()=>[t(J,{class:"mb-4"},{start:o(()=>[de]),end:o(()=>[t(m,{label:"Export",icon:"pi pi-upload",class:"new",onClick:l[0]||(l[0]=e=>G())})]),_:1}),t(Q),t(Z,{ref_key:"dt",ref:L,selection:U.value,"onUpdate:selection":l[2]||(l[2]=e=>U.value=e),value:N.value,loading:k.value,"data-key":"id",paginator:!0,rows:10,filters:M.value,"paginator-template":"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown","rows-per-page-options":[5,10,25],"current-page-report-template":"Showing {first} to {last} of {totalRecords} products","responsive-layout":"scroll"},{header:o(()=>[n("div",ue,[re,n("span",ce,[me,t(h,{modelValue:M.value.global.value,"onUpdate:modelValue":l[1]||(l[1]=e=>M.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),default:o(()=>[t(c,{"selection-mode":"multiple","header-style":"width: 3rem"}),t(c,{field:"name",header:"name",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[V(g(e.data.name),1)]),_:1}),t(c,{field:"gender",header:"Gender",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[e.data.gender==1?(u(),r("span",ve," Men ")):(u(),r("span",pe," Women "))]),_:1}),t(c,{field:"email",header:"Email",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[V(g(e.data.email),1)]),_:1}),t(c,{field:"phone",header:"Phone",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[V(g(e.data.phone),1)]),_:1}),t(c,{field:"bio",header:"bio",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[V(g(e.data.bio),1)]),_:1}),t(c,{field:"rate",header:"rate",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[t(A,{onClick:y=>W(e.data.id),modelValue:e.data.admin_rating,cancel:!1},null,8,["onClick","modelValue"])]),_:1}),t(c,{field:"email_verified",header:"Email Verified",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[V(g(e.data.email_verified),1)]),_:1}),t(c,{field:"status",header:"Status",sortable:!0,"header-style":"width:14%; min-width:10rem;"},{body:o(e=>[t(X,{value:e.data.status==1?"Active":e.data.status==0?"In Active":"pending",severity:z(e.data)},null,8,["value","severity"])]),_:1}),t(c,{"header-style":"min-width:10rem;"},{body:o(e=>[e.data.status==-1?(u(),r("div",_e,[t(m,{icon:"pi pi-times",class:p(["p-button-rounded mr-2","p-button-danger"]),onClick:y=>F(e.data)},null,8,["onClick"]),t(m,{icon:"pi pi-check",class:p(["p-button-rounded mr-2","p-button-success"]),onClick:y=>B(e.data)},null,8,["onClick"])])):(u(),r("div",fe,[t(m,{icon:e.data.status==0?"pi pi-check":"pi pi-times",class:p(["new mr-2",e.data.status==0?"p-button-success":"p-button-danger"]),style:{"border-radius":"50% !important"},onClick:y=>R(e.data)},null,8,["icon","class","onClick"])]))]),_:1}),t(c,{"header-style":"min-width:10rem;"},{body:o(e=>[n("div",null,[t(m,{label:"show",class:p(["pop mr-2","p-button-danger"]),onClick:y=>I(e.data.id)},null,8,["onClick"])])]),_:1})]),_:1},8,["selection","value","loading","filters"]),t($,{visible:T.value,"onUpdate:visible":l[8]||(l[8]=e=>T.value=e),style:{width:"450px"},header:"users form",modal:!0,class:"p-fluid"},{footer:o(()=>[t(m,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:K}),t(m,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:j})]),default:o(()=>[n("div",be,[he,t(h,{class:p(["mt-3",{"p-invalid":d.value&&!a.value.first_name}]),id:"first",modelValue:a.value.first_name,"onUpdate:modelValue":l[3]||(l[3]=e=>a.value.first_name=e),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),d.value&&!a.value.first_name?(u(),r("small",ye,"First Name is required.")):b("",!0)]),n("div",ge,[we,t(h,{class:p(["mt-3",{"p-invalid":d.value&&!a.value.last_name}]),id:"last",modelValue:a.value.last_name,"onUpdate:modelValue":l[4]||(l[4]=e=>a.value.last_name=e),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),d.value&&!a.value.last_name?(u(),r("small",ke,"Last Name is required.")):b("",!0)]),n("div",Ce,[Ve,t(h,{class:p(["mt-3",{"p-invalid":d.value&&!a.value.email}]),id:"email",modelValue:a.value.email,"onUpdate:modelValue":l[5]||(l[5]=e=>a.value.email=e),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),d.value&&!a.value.email?(u(),r("small",xe,"Email is required.")):b("",!0)]),n("div",Se,[Te,t(h,{class:p(["mt-3",{"p-invalid":d.value&&!a.value.password}]),id:"password",modelValue:a.value.password,"onUpdate:modelValue":l[6]||(l[6]=e=>a.value.password=e),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),d.value&&!a.value.password?(u(),r("small",De,"password is required.")):b("",!0)]),n("div",Ue,[Me,t(h,{class:p(["mt-3",{"p-invalid":d.value&&!a.value.mobile_number}]),id:"mobile",modelValue:a.value.mobile_number,"onUpdate:modelValue":l[7]||(l[7]=e=>a.value.mobile_number=e),modelModifiers:{trim:!0},required:"true",autofocus:""},null,8,["modelValue","class"]),d.value&&!a.value.mobile_number?(u(),r("small",Ne,"mobile is required.")):b("",!0)])]),_:1},8,["visible"]),t($,{visible:C.value,"onUpdate:visible":l[10]||(l[10]=e=>C.value=e),style:{width:"450px"},header:"rate",modal:!0},{footer:o(()=>[t(m,{label:"send",icon:"pi pi-check",class:"m-auto",onClick:E})]),default:o(()=>{var e;return[n("div",$e,[t(A,{class:"m-auto",modelValue:S.value.tourist_rating,"onUpdate:modelValue":l[9]||(l[9]=y=>S.value.tourist_rating=y),stars:5,cancel:!1},null,8,["modelValue"])]),(e=x.value)!=null&&e.tourist_rating?(u(),r("div",qe,g(x.value.tourist_rating[0]),1)):b("",!0)]}),_:1},8,["visible"]),t($,{visible:D.value,"onUpdate:visible":l[12]||(l[12]=e=>D.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[t(m,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[11]||(l[11]=e=>D.value=!1)}),t(m,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:Y})]),default:o(()=>[n("div",Le,[Ae,P.value?(u(),r("span",Oe,"Are you sure you want to delete the selected products?")):b("",!0)])]),_:1},8,["visible"])]),_:1})])])}}};export{Fe as default};