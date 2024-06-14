import{P as w,B as j,a as b,u as v,b as C,r as c,j as t,T as k,d as E,c as T}from"./index-FjlUDy0d.js";import{G,a as A,S as B}from"./index.esm-cOXdF-3c.js";import{s as i}from"./styled-BkRJrexq.js";import{C as F}from"./Container-Ckq-t6de.js";import{T as g}from"./TextField-kQOROSC3.js";import{A as I}from"./Alert-BVENnwFH.js";import"./mergeSlotProps-oNhFKx-f.js";import"./Modal-D39q_pmH.js";import"./useFormControl-nniu5AtG.js";import"./createSvgIcon-C4trG8XA.js";const L="https://s47-nayan-capstone-libacademy-7yf9.onrender.com/api",P="963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com",D=i(w)(({theme:e})=>({padding:e.spacing(4),marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:e.palette.background.default,boxShadow:e.shadows[5]})),O=i("form")(({theme:e})=>({width:"100%",marginTop:e.spacing(1)})),W=i(j)(({theme:e})=>({margin:e.spacing(3,0,2),background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",color:e.palette.common.white})),V=i(b)(({theme:e})=>({marginTop:e.spacing(2),width:"100%",display:"flex",justifyContent:"center"})),K=()=>{const e=v(),d=C(),[l,p]=c.useState({email:"",password:""}),[m,a]=c.useState(!1),[h,s]=c.useState(""),u=r=>{const{name:n,value:o}=r.target;p(S=>({...S,[n]:o}))},f=r=>{r.preventDefault();const n=r.target;if(n.checkValidity()===!1){n.reportValidity();return}e(E(l)).then(o=>{o.type==="tutor/login/fulfilled"?d("/tutor/"):o.type==="tutor/login/rejected"&&(s(o.payload),a(!0))}).catch(o=>{console.error("Error logging in:",o),s("An error occurred while logging in."),a(!0)})},x=async r=>{const{credential:n}=r;try{const o=await T.post(`${L}/tutors/login/google`,{credential:n});localStorage.setItem("token",o.data.token),localStorage.setItem("tutorData",JSON.stringify(o.data.tutor)),d("/tutor/"),window.location.reload()}catch(o){console.error("Error logging in with Google OAuth:",o),s(o.response.data.message),a(!0)}},y=r=>{console.error("Google Sign-In error:",r),s("An error occurred during Google Sign-In."),a(!0)};return t.jsxs(F,{component:"main",maxWidth:"xs",children:[t.jsxs(D,{children:[t.jsx(k,{component:"h1",variant:"h5",children:"Tutor Login"}),t.jsxs(O,{onSubmit:f,noValidate:!0,children:[t.jsx(g,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",type:"email",autoComplete:"email",autoFocus:!0,value:l.email,onChange:u}),t.jsx(g,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:l.password,onChange:u}),t.jsx(W,{type:"submit",fullWidth:!0,variant:"contained",children:"Login"})]}),t.jsx(V,{children:t.jsx(G,{clientId:P,children:t.jsx(A,{onSuccess:x,onFailure:y,scope:"profile email"})})})]}),t.jsx(B,{open:m,autoHideDuration:6e3,onClose:()=>a(!1),children:t.jsx(I,{onClose:()=>a(!1),severity:"error",sx:{width:"100%"},children:h})})]})};export{K as default};