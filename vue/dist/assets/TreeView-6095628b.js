import{c as s,d as v,x as k,p as C,r as E,e as x,f as y,g as e,w as a,i as u,a4 as g,n as A,l as f,a5 as N,j as D,_ as $,q as B,t as w}from"./index-c8ed3a98.js";const K={setup(h){const n=[{id:1,label:"Electronics",children:[{id:2,label:"Cellphones"},{id:3,label:"Camera Body Kits"},{id:6,label:"External HDDs"}]},{id:7,label:"Products",children:[{id:8,label:"Cables",children:[{id:9,label:"Audio"},{id:10,label:"Video"},{id:11,label:"Optical"}]},{id:12,label:"Monitors"},{id:13,label:"Keyboards"}]},{id:14,label:"Apparel",children:[{id:15,label:"Jackets"},{id:16,label:"Pants"},{id:17,label:"Skirts"}]}],l=[1];return(i,t)=>{const o=s("va-tree-view");return v(),k(o,{expanded:l,"onUpdate:expanded":t[0]||(t[0]=d=>l=d),nodes:n})}}},M={setup(h){let n=0;const l=()=>n++,i=[{id:l(),label:"Images",icon:"images",children:[{id:l(),label:"sick_cats_cuddling.jpg",icon:"image"},{id:l(),label:"pins-and-needles.jpg",icon:"image"},{id:l(),label:"avatar_50x50.jpg",icon:"image"}]},{id:l(),label:"Music",icon:"star_outline",children:[{id:l(),label:"Taylor_swift_hello.mp3",icon:"musical_notes"},{id:l(),label:"straight_to_the_bank.wav",icon:"musical_notes"},{id:l(),label:"imagine_dragons_promo.mp3",icon:"musical_notes"}]},{id:l(),label:"Miscellaneous",icon:"list",children:[{id:l(),label:"Tdump.sql",icon:"grid"},{id:l(),label:"unknown-file",icon:"help"},{id:l(),label:"secure.key",icon:"key"}]}];return(t,o)=>{const d=s("va-tree-view");return v(),k(d,{nodes:i})}}},I=C({setup(h){const n=[{id:1,label:"Electronics",children:[{id:2,label:"Cellphones"},{id:3,label:"Camera Body Kits"},{id:6,label:"External HDDs"}]},{id:7,label:"Products",children:[{id:8,label:"Cables",children:[{id:9,label:"Audio"},{id:10,label:"Video"},{id:11,label:"Optical"}]},{id:12,label:"Monitors"},{id:13,label:"Keyboards"}]},{id:14,label:"Apparel",children:[{id:15,label:"Jackets"},{id:16,label:"Pants"},{id:17,label:"Skirts"}]}],l=E([]);return(i,t)=>{const o=s("va-tree-view");return v(),k(o,{checked:l.value,"onUpdate:checked":t[0]||(t[0]=d=>l.value=d),nodes:n,selectable:""},null,8,["checked"])}}});const L={class:"tree-view-advanced-preview"},T={class:"tree-view-advanced-preview__buttons"},U=u("EXPAND ALL"),S=u("COLLAPSE ALL"),j={class:"tree-view-advanced-preview__icon-square"},H={setup(h){const n=[{id:1,label:"Electronics",children:[{id:2,label:"Cellphones"},{id:3,label:"Camera Body Kits"},{id:6,label:"External HDDs"}]},{id:7,label:"Products",children:[{id:8,label:"Cables",children:[{id:9,label:"Audio"},{id:10,label:"Video"},{id:11,label:"Optical"}]},{id:12,label:"Monitors"},{id:13,label:"Keyboards"}]},{id:14,label:"Apparel",children:[{id:15,label:"Jackets"},{id:16,label:"Pants"},{id:17,label:"Skirts"}]}],l=E([1]),i=d=>{const _=[],c=b=>!!b.children,m=b=>{for(const r of b)c(r)&&(_.push(r.id),m(r.children))};return m(d),_},t=()=>{l.value=i(n)},o=()=>{l.value=[]};return(d,_)=>{const c=s("va-button"),m=s("va-icon"),b=s("va-tree-view");return v(),x("div",L,[y("div",T,[e(c,{class:"mr-2",onClick:t},{default:a(()=>[U]),_:1}),e(c,{onClick:o},{default:a(()=>[S]),_:1})]),e(b,{ref:"treeView",expanded:l.value,"onUpdate:expanded":_[0]||(_[0]=r=>l.value=r),nodes:n},{"icon-toggle":a(({expanded:r})=>[y("div",j,[e(m,{color:"backgroundPrimary",name:r?"remove":"add"},null,8,["name"])])]),_:1},8,["expanded"])])}}},O={key:0,class:"tree-node-editable flex flex-1 flex-wrap items-center"},q=u(" Add new product "),J=C({setup(h){const n=g([1,2]),l=g([{id:3,label:"Cellphones"},{id:4,label:"Camera Body Kits"},{id:5,label:"External HDDs"}]);let i=g([{id:6,label:"Cables"},{id:7,label:"Monitors"},{id:8,label:"Keyboards"}]);const t=[{label:"Electronics",id:1,children:l},{label:"Products",id:2,children:i}];function o(){i.push({id:Math.floor(Math.random()*1e5),label:"New product"})}function d(_){i.splice(i.findIndex(c=>c.id===_.id),1)}return(_,c)=>{const m=s("va-input"),b=s("va-icon"),r=s("va-tree-view"),P=s("va-button");return v(),x(D,null,[e(r,{expanded:f(n),"onUpdate:expanded":c[0]||(c[0]=p=>N(n)?n.value=p:n=p),nodes:t},{content:a(p=>[p.hasChildren?A("",!0):(v(),x("div",O,[e(m,{modelValue:p.label,"onUpdate:modelValue":V=>p.label=V,class:"mb-0"},null,8,["modelValue","onUpdate:modelValue"]),e(b,{name:"md_close",color:"info",class:"ml-2 cursor-pointer",onClick:V=>d(p)},null,8,["onClick"])]))]),_:1},8,["expanded"]),e(P,{class:"mb-2",onClick:c[1]||(c[1]=p=>o())},{default:a(()=>[q]),_:1})],64)}}});const F=$(J,[["__scopeId","data-v-c3ee02c1"]]),R={class:"tree-view sets-list grid grid-cols-12 items-start gap-6"},z=C({setup(h){const{t:n}=B();return(l,i)=>{const t=s("va-card-title"),o=s("va-card-content"),d=s("va-card");return v(),x("div",R,[e(d,{class:"lg:col-span-6 col-span-12"},{default:a(()=>[e(t,null,{default:a(()=>[u(w(f(n)("treeView.basic")),1)]),_:1}),e(o,null,{default:a(()=>[e(K)]),_:1})]),_:1}),e(d,{class:"lg:col-span-6 col-span-12"},{default:a(()=>[e(t,null,{default:a(()=>[u(w(f(n)("treeView.icons")),1)]),_:1}),e(o,null,{default:a(()=>[e(M)]),_:1})]),_:1}),e(d,{class:"lg:col-span-6 col-span-12"},{default:a(()=>[e(t,null,{default:a(()=>[u(w(f(n)("treeView.advanced")),1)]),_:1}),e(o,null,{default:a(()=>[e(H)]),_:1})]),_:1}),e(d,{class:"lg:col-span-6 col-span-12"},{default:a(()=>[e(t,null,{default:a(()=>[u(w(f(n)("treeView.editable")),1)]),_:1}),e(o,null,{default:a(()=>[e(F)]),_:1})]),_:1}),e(d,{class:"lg:col-span-6 col-span-12"},{default:a(()=>[e(t,null,{default:a(()=>[u(w(f(n)("treeView.selectable")),1)]),_:1}),e(o,null,{default:a(()=>[e(I)]),_:1})]),_:1})])}}});export{z as default};
