import{u as O,r as l,B as P,E as q,K as A,b as K,h,c as i,d,x as Q,w as S,f as n,L as G,g as c,e as m,t as f,n as _,k as H,j as J,A as W,i as X}from"./index-c8ed3a98.js";import{r as Y,v as Z,p as ee,a as ae}from"./filepond-plugin-image-preview.esm-30776ef6.js";import{p as te}from"./filepond-plugin-file-encode.esm-b0bc8408.js";const le={class:"flex justify-center"},se=["onSubmit"],oe={class:"pb-4 text-center va-text-bold"},ne=X(" Update Flight "),ue={class:""},de=n("label",{for:"password"},"name ",-1),ie={key:0,class:"mt-1 mb-5 text-red-500"},ce={class:""},me=n("label",{for:"password"},"link ",-1),re={key:0,class:"mt-1 mb-5 text-red-500"},pe={class:""},ve=n("label",{for:"password"},"discount ",-1),_e={key:0,class:"mt-1 mb-5 text-red-500"},ge=["src"],fe=["src"],he={key:0,class:"mt-1 mb-5 text-red-500"},we={setup(be){Y(te),Z(ae,ee);const b=O(),t=l({name:"",link:"",discount:0});l(null);const x=l([]),N=P(),C=l(0),r=l(""),y=l(""),u=l({});l(0),l(0);const I=l([]),T=l([{name:"en",value:"gb"},{name:"ar",value:"sa"},{name:"az",value:"az"},{name:"ge",value:"ge"},{name:"ru",value:"ru"},{name:"tr",value:"tr"}]),p=l("gb"),s=l(""),L=a=>{console.log(a.files[0]),I.value=a.files,r.value=a.files[0],y.value=URL.createObjectURL(r.value),console.log(r.value)},D=()=>{const a=new FormData;a.append("images",r.value),a.append("name",t.value.name),a.append("link",t.value.link),a.append("discount",t.value.discount),h.defaults.headers.common.local=p.value,h.post(`/api/flights/${u.value.id}/update`,a).then(e=>{s.value=[],C.value=1,u.value=e.data.flight,b.add({severity:"success",summary:"Successful",detail:"Flight Updated",life:3e3})}).catch(e=>{s.value=e.response.data.errors,console.log(s.value)})};return q(p,async(a,e)=>{var g,v;console.log(u.value),t.value.name=((g=u.value)==null?void 0:g.name[a])==null?"":(v=u.value)==null?void 0:v.name[a]}),A(()=>x.value),K(()=>{h.get(`/api/flights/${N.params.id}`).then(e=>{t.value.name=e.data.flight.name[p.value],t.value.link=e.data.flight.link,t.value.descount=e.data.flight.discount,u.value=e.data.flight,console.log(u.value),console.log(x.value),b.add({severity:"success",summary:"Successful",detail:"Offer Created",life:3e3})});const a=document.getElementsByClassName("hidImg");console.log(a[0])}),(a,e)=>{const g=i("Dropdown"),v=i("InputText"),E=i("InputNumber"),$=i("FileUpload"),j=i("Button"),z=i("Toast"),R=i("va-card");return d(),Q(R,{class:"card"},{default:S(()=>{var k,w,V,U;return[n("div",le,[n("form",{onSubmit:G(D,["prevent"]),class:"flex flex-col w-3/4 py-9"},[n("h2",oe,[ne,c(g,{modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=o=>p.value=o),editable:"",options:T.value,optionLabel:"name","option-value":"value",class:"w-28 mx-3 mx-10"},null,8,["modelValue","options"])]),n("div",ue,[de,c(v,{modelValue:t.value.name,"onUpdate:modelValue":e[1]||(e[1]=o=>t.value.name=o),type:"text",class:"mt-3 w-full mb-3"},null,8,["modelValue"]),(k=s.value)!=null&&k.name?(d(),m("div",ie,f(s.value.name[0]),1)):_("",!0)]),n("div",ce,[me,c(v,{modelValue:t.value.link,"onUpdate:modelValue":e[2]||(e[2]=o=>t.value.link=o),type:"text",class:"mt-3 w-full mb-3"},null,8,["modelValue"]),(w=s.value)!=null&&w.link?(d(),m("div",re,f(s.value.link[0]),1)):_("",!0)]),n("div",pe,[ve,c(E,{modelValue:t.value.discount,"onUpdate:modelValue":e[3]||(e[3]=o=>t.value.discount=o),type:"text",class:"mt-3 w-full mb-3"},null,8,["modelValue"]),(V=s.value)!=null&&V.discount?(d(),m("div",_e,f(s.value.discount[0]),1)):_("",!0)]),n("div",null,[c($,{id:"password",onUploader:L,accept:"image/*",required:"true",multiple:"true","custom-upload":!0,autofocus:"",class:W({"p-invalid":a.submitted})},{empty:S(()=>{var o,F,B;return[r.value!=""?(d(),m("img",{key:0,src:y.value,class:"w-[200px] h-[90px]"},null,8,ge)):(F=(o=u.value)==null?void 0:o.media)!=null&&F.length?(d(!0),m(J,{key:1},H((B=u.value)==null?void 0:B.media,M=>(d(),m("img",{src:M.original_url,class:"w-[200px] h-[90px]"},null,8,fe))),256)):_("",!0)]}),_:1},8,["class"]),(U=s.value)!=null&&U.images?(d(),m("div",he,f(s.value.images[0]),1)):_("",!0)]),c(j,{type:"submit",label:"Submit",class:"mt-3"})],40,se)]),c(z)]}),_:1})}}};export{we as default};
