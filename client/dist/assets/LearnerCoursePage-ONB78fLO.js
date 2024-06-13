import{j as t,b as w,a2 as S,T as l,a as k,P as $,R as I,e as R,D as E,r as d,c as P}from"./index-5YDDZEYf.js";import{s}from"./styled-DroEBEMi.js";import{C as B}from"./Card-D3QlhdJY.js";import{c as M}from"./createSvgIcon-DOW--3JM.js";import{C as _}from"./CardContent-TTItIO5e.js";import{C as D}from"./CircularProgress-DLmZsOVJ.js";const F=M(t.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1z"}),"Lock"),N=s(B)(({theme:o})=>({cursor:"pointer",position:"relative",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",transition:"background 0.5s","&:hover":{background:"linear-gradient(135deg, #fd746c 0%, #ff9068 100%)","&::before":{content:'""',position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",animation:"$etherealEffect 2s linear infinite",zIndex:-1}},"@keyframes etherealEffect":{"0%":{backgroundPosition:"0 0"},"100%":{backgroundPosition:"100% 0"}}})),T=s(F)(({theme:o})=>({position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",animation:"$drop 0.8s ease-in-out infinite","@keyframes drop":{"0%, 100%":{transform:"translate(-50%, -50%)"},"50%":{transform:"translate(-50%, 10%)"}}})),z=({lesson:o,isEnrolled:i})=>{const f=w(),e=S(),c=()=>{i?f(`${e.pathname}/lessons/${o._id}`):(alert("You need to enroll in this course to access the lesson."),console.log("Not enrolled"))};return t.jsx(N,{onClick:c,children:t.jsxs(_,{children:[t.jsx(l,{variant:"h5",sx:{fontWeight:"bold"},children:o.title}),t.jsxs(l,{variant:"body1",gutterBottom:!0,children:["Overview: ",o.content.text]}),!i&&t.jsx(T,{})," "]})})},A="https://s47-nayan-capstone-libacademy.onrender.com/api",H=s(k)(({theme:o})=>({padding:o.spacing(4),background:"linear-gradient(to bottom, #0c1445, #0d1142)",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#ffffff",fontFamily:"'Roboto', sans-serif"})),V=s($)(({theme:o})=>({padding:o.spacing(4),backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"15px",boxShadow:o.shadows[5],maxWidth:"900px",width:"100%",marginBottom:o.spacing(2),position:"relative",overflow:"hidden"})),W=I.memo(s("div")(({theme:o})=>({position:"absolute",borderRadius:"50%",background:"rgba(255, 255, 255, 0.5)",width:"2px",height:"2px",animation:"$twinkle 1s infinite",zIndex:1}))),O=s(l)(({theme:o})=>({color:"#ffffff",marginBottom:o.spacing(2),textShadow:"2px 2px 4px rgba(0,0,0,0.3)",fontFamily:"'Roboto Slab', serif"})),U=s(l)(({theme:o})=>({color:"#ffffff",marginBottom:o.spacing(3),textShadow:"1px 1px 3px rgba(0,0,0,0.2)",fontFamily:"'Roboto Slab', serif"})),Y=s(l)(({theme:o})=>({color:"#ff1744",backgroundColor:"#f8bbd0",padding:o.spacing(1),borderRadius:o.shape.borderRadius,boxShadow:o.shadows[1],fontFamily:"'Roboto', sans-serif"})),q=s(D)(({theme:o})=>({color:"#ffffff",display:"block",margin:`${o.spacing(4)} auto`})),G=s(k)(({theme:o})=>({marginTop:o.spacing(4),display:"grid",gap:o.spacing(2)})),to=()=>{var h,u,b;const o=R(r=>{var a;return(a=r.learner.learnerData)==null?void 0:a._id}),{courseId:i}=E(),e=(h=S().state)==null?void 0:h.course,[c,v]=d.useState([]),[p,g]=d.useState(null),[j,m]=d.useState(!1),[C,L]=d.useState(!0);return d.useEffect(()=>{(async()=>{var a,x,y;try{const n=await P.post(`${A}/lessons/fetchLessonsByCourseId/${i}`,{learnerId:o});console.log("Lessons fetched successfully by courseId:",n.data),v(n.data.lessons),m(n.data.isEnrolled),g(null)}catch(n){console.error("Error fetching lessons:",((a=n.response)==null?void 0:a.data)||n.message),g(((y=(x=n.response)==null?void 0:x.data)==null?void 0:y.message)||"An error occurred while fetching lessons."),m(!1)}finally{L(!1)}})()},[i,o]),t.jsx(H,{children:t.jsxs(V,{elevation:0,children:[[...Array(200)].map((r,a)=>t.jsx(W,{style:{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*3}s`}},a)),t.jsxs(O,{variant:"h2",children:["Lessons for ",e==null?void 0:e.title]}),t.jsxs(U,{variant:"h5",children:["Instructor:"," ",`${(u=e==null?void 0:e.tutorId)==null?void 0:u.firstName} ${(b=e==null?void 0:e.tutorId)==null?void 0:b.lastName}`]}),C?t.jsx(q,{}):p?t.jsx(Y,{variant:"body1",children:p}):t.jsx(G,{children:c==null?void 0:c.map(r=>t.jsx(z,{lesson:r,isEnrolled:j},r._id))})]})})};export{to as default};
