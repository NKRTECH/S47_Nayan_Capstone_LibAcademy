import{s as p,e as m,B as a,r as e,u as x,a as g,j as t,f}from"./index-CVHsgGyL.js";import{C}from"./CourseCard-DxIk2bBA.js";import{G as u}from"./Grid-CP7ihQWX.js";import"./Modal-D9nivw5Y.js";import"./mergeSlotProps-CCCx748f.js";import"./Card-Cku0rfI7.js";import"./CardContent-BKlm-_CF.js";import"./createSvgIcon-CRBgYmHc.js";const h="https://s47-nayan-capstone-libacademy.onrender.com/api",y=p(m)(({theme:r})=>({marginBottom:r.spacing(2),backgroundColor:r.palette.primary.main,color:r.palette.primary.contrastText,"&:hover":{backgroundColor:r.palette.primary.dark}})),B=p(a)(({theme:r})=>({padding:r.spacing(2),backgroundColor:r.palette.error.main,color:r.palette.error.contrastText,marginBottom:r.spacing(2)}));function w(){const[r,l]=e.useState([]),{tutorData:n}=x(o=>o.tutor),[i,c]=e.useState(null),d=g();return e.useEffect(()=>{n&&(async()=>{try{const s=await f.get(`${h}/courses/fetchCoursesByTutor/${n._id}`);l(s.data.courses),c(null)}catch(s){console.error("Error fetching courses:",s),c(s.response.data.message)}})()},[n]),e.useEffect(()=>{console.log("Tutor courses:",r)},[r]),t.jsxs(a,{sx:{padding:"16px",minHeight:"100vh",width:"100%"},children:[t.jsx(a,{sx:{display:"flex",justifyContent:"left",marginBottom:"16px"},children:t.jsx(y,{variant:"contained",onClick:()=>d("/tutor/courses/create"),children:"Create Course"})}),i&&t.jsx(B,{children:i}),t.jsx(u,{container:!0,spacing:2,children:r.map(o=>t.jsx(u,{item:!0,xs:12,sm:6,md:4,children:t.jsx(a,{sx:{height:"100%"},children:t.jsx(C,{course:o})})},o._id))})]})}export{w as default};