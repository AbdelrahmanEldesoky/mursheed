import{p as A,v as F,q as T,r as h,K as C,c as l,d as r,e as u,g as s,w as a,f as i,t as d,l as t,T as b,i as I,j as N,k as S,x as q,n as D}from"./index-c8ed3a98.js";const K={class:"icon-set"},G={class:"icon-set__header__size col-span-full md:col-span-5 flex items-center"},H={key:0},J={class:"vuestic-icon mb-4 text-center"},M={class:"w-15 truncate text-center"},P=A({props:{name:null,sets:null},setup(w){const g=w,{colors:v}=F(),{t:f}=T(),_=h(""),m=h(30),y=h({formatter:e=>`${e}px`,min:20,max:40}),p=C(()=>{for(const e of g.sets)if(e.href===g.name)return e;return{name:"",href:"",prefix:"",lists:[],filteredLists:[]}}),B=C(()=>{if(!_.value)return p.value.lists;const e=[];return p.value.lists.forEach(o=>{o.icons.forEach(c=>{c.toUpperCase().includes(_.value.toUpperCase())&&(e.includes(c)||e.push(c))})}),[{name:"Found Icons",icons:e}]}),U=e=>`${p.value.prefix}-${e}`;return(e,o)=>{const c=l("va-card-title"),$=l("va-button"),k=l("va-icon"),E=l("va-input"),L=l("va-slider"),V=l("va-card-content"),z=l("va-card");return r(),u("div",K,[s(z,{class:"icon-set__header mb-8 pb-4"},{default:a(()=>[s(c,null,{default:a(()=>[i("h2",{class:"ml-2",style:b({color:t(v).dark})},d(t(p).name),5)]),_:1}),s(V,{class:"grid grid-cols-12 gap-6 items-start justify-between"},{default:a(()=>[s($,{class:"col-span-full md:col-span-2",preset:"outline","border-color":"primary",color:"primary",to:{name:"icon-sets"}},{default:a(()=>[I(d(t(f)("icons.back")),1)]),_:1}),s(E,{modelValue:_.value,"onUpdate:modelValue":o[0]||(o[0]=n=>_.value=n),class:"col-span-full md:col-span-5",label:t(f)("icons.search"),clearable:""},{prependInner:a(()=>[s(k,{class:"icon-left input-icon",name:"search"})]),_:1},8,["modelValue","label"]),i("div",G,[i("span",{class:"m-2 pr-2 icon-set__header__size--smaller",style:b({color:t(v).dark})},"A",4),s(L,{modelValue:m.value,"onUpdate:modelValue":o[1]||(o[1]=n=>m.value=n),class:"flex-1","label-value":`${m.value}px`,min:y.value.min,max:y.value.max,"value-visible":""},null,8,["modelValue","label-value","min","max"]),i("span",{class:"m-2 pl-2 icon-set__header__size--bigger",style:b({color:t(v).dark})},"A",4)])]),_:1})]),_:1}),(r(!0),u(N,null,S(t(B),(n,j)=>(r(),q(z,{key:j,class:"col-span-12 text-[0.6rem]"},{default:a(()=>[s(c,null,{default:a(()=>[I(d(n.name),1)]),_:2},1024),s(V,{class:"grid grid-cols-4 md:grid-cols-12 gap-4"},{default:a(()=>[n.icons.length?D("",!0):(r(),u("span",H,d(t(f)("icons.none")),1)),(r(!0),u(N,null,S(n.icons,x=>(r(),u("div",{key:x,class:"flex flex-col"},[i("div",J,[s(k,{name:U(x),size:m.value},null,8,["name","size"])]),i("div",M,d(x),1)]))),128))]),_:2},1024)]),_:2},1024))),128))])}}});export{P as default};