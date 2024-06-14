import{P as v,B as S,a as C,u as P,b as N,r as p,j as e,T as k,t as G,c as R}from"./index-FjlUDy0d.js";import{G as T,a as E,S as F}from"./index.esm-cOXdF-3c.js";import{s as m}from"./styled-BkRJrexq.js";import{C as B}from"./Container-Ckq-t6de.js";import{T as u}from"./TextField-kQOROSC3.js";import{A as D}from"./Alert-BVENnwFH.js";import"./mergeSlotProps-oNhFKx-f.js";import"./Modal-D39q_pmH.js";import"./useFormControl-nniu5AtG.js";import"./createSvgIcon-C4trG8XA.js";const I="https://s47-nayan-capstone-libacademy-7yf9.onrender.com/api",W="963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com",A=m(v)(({theme:t})=>({padding:t.spacing(4),marginTop:t.spacing(8),display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:t.palette.background.default,boxShadow:t.shadows[5]})),q=m("form")(({theme:t})=>({width:"100%",marginTop:t.spacing(1)})),O=m(S)(({theme:t})=>({margin:t.spacing(3,0,2),background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",color:t.palette.common.white})),L=m(C)(({theme:t})=>({marginTop:t.spacing(2),width:"100%",display:"flex",justifyContent:"center"})),X=()=>{const t=P(),g=N(),[o,h]=p.useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""}),[x,i]=p.useState(""),[w,s]=p.useState(!1),l=r=>{const{name:n,value:a}=r.target;h(c=>({...c,[n]:a}))},y=r=>{r.preventDefault();const n=r.target;if(n.checkValidity()===!1){n.reportValidity();return}if(o.password!==o.confirmPassword){i("Passwords do not match"),s(!0);return}t(G(o)).then(a=>{console.log("action object--",a),a.type==="tutor/register/fulfilled"?g("/tutor/"):a.type==="tutor/register/rejected"&&(console.error("Registration failed:",a.payload),i(a.payload||"Registration failed"),s(!0))}).catch(a=>{console.error("Registration failed:",a),i(a.message||"Registration failed"),s(!0)})},b=async r=>{var a,c;const{credential:n}=r;try{const d=await R.post(`${I}/tutors/register/google`,{credential:n});localStorage.setItem("token",d.data.token),localStorage.setItem("tutorData",JSON.stringify(d.data.tutor)),g("/tutor/"),window.location.reload()}catch(d){console.error("Error registering with Google OAuth:",d),i(((c=(a=d.response)==null?void 0:a.data)==null?void 0:c.message)||"Google registration failed"),s(!0)}},j=r=>{console.error("Google Sign-In error:",r),i("Google Sign-In failed"),s(!0)},f=()=>{s(!1)};return e.jsxs(B,{component:"main",maxWidth:"xs",children:[e.jsxs(A,{children:[e.jsx(k,{component:"h1",variant:"h5",children:"Tutor Registration"}),e.jsxs(q,{onSubmit:y,noValidate:!0,children:[e.jsx(u,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"firstName",label:"First Name",name:"firstName",type:"text",autoComplete:"fname",autoFocus:!0,value:o.firstName,onChange:l}),e.jsx(u,{variant:"outlined",margin:"normal",fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",type:"text",autoComplete:"lname",value:o.lastName,onChange:l}),e.jsx(u,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",type:"email",autoComplete:"email",value:o.email,onChange:l}),e.jsx(u,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:o.password,onChange:l}),e.jsx(u,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"confirmPassword",label:"Confirm Password",type:"password",id:"confirmPassword",autoComplete:"current-password",value:o.confirmPassword,onChange:l}),e.jsx(O,{type:"submit",fullWidth:!0,variant:"contained",children:"Register"})]}),e.jsx(L,{children:e.jsx(T,{clientId:W,children:e.jsx(E,{onSuccess:b,onFailure:j,scope:"profile email"})})})]}),e.jsx(F,{open:w,autoHideDuration:6e3,onClose:f,children:e.jsx(D,{onClose:f,severity:"error",sx:{width:"100%"},children:x})})]})};export{X as default};