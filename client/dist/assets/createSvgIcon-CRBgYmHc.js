import{C as z,D as I,s as C,G as v,r as g,I as w,w as R,_ as S,j as f,x as b,A as j}from"./index-CVHsgGyL.js";function A(o){return z("MuiSvgIcon",o)}I("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const N=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],B=o=>{const{color:e,fontSize:t,classes:n}=o,i={root:["root",e!=="inherit"&&`color${v(e)}`,`fontSize${v(t)}`]};return j(i,A,n)},M=C("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.color!=="inherit"&&e[`color${v(t.color)}`],e[`fontSize${v(t.fontSize)}`]]}})(({theme:o,ownerState:e})=>{var t,n,i,p,m,a,h,u,d,r,s,c,l;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:e.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=o.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(i=o.transitions)==null||(i=i.duration)==null?void 0:i.shorter}),fontSize:{inherit:"inherit",small:((p=o.typography)==null||(m=p.pxToRem)==null?void 0:m.call(p,20))||"1.25rem",medium:((a=o.typography)==null||(h=a.pxToRem)==null?void 0:h.call(a,24))||"1.5rem",large:((u=o.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[e.fontSize],color:(r=(s=(o.vars||o).palette)==null||(s=s[e.color])==null?void 0:s.main)!=null?r:{action:(c=(o.vars||o).palette)==null||(c=c.action)==null?void 0:c.active,disabled:(l=(o.vars||o).palette)==null||(l=l.action)==null?void 0:l.disabled,inherit:void 0}[e.color]}}),y=g.forwardRef(function(e,t){const n=w({props:e,name:"MuiSvgIcon"}),{children:i,className:p,color:m="inherit",component:a="svg",fontSize:h="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:r,viewBox:s="0 0 24 24"}=n,c=R(n,N),l=g.isValidElement(i)&&i.type==="svg",x=S({},n,{color:m,component:a,fontSize:h,instanceFontSize:e.fontSize,inheritViewBox:d,viewBox:s,hasSvgAsChild:l}),$={};d||($.viewBox=s);const _=B(x);return f.jsxs(M,S({as:a,className:b(_.root,p),focusable:"false",color:u,"aria-hidden":r?void 0:!0,role:r?"img":void 0,ref:t},$,c,l&&i.props,{ownerState:x,children:[l?i.props.children:i,r?f.jsx("title",{children:r}):null]}))});y.muiName="SvgIcon";function E(o,e){function t(n,i){return f.jsx(y,S({"data-testid":`${e}Icon`,ref:i},n,{children:o}))}return t.muiName=y.muiName,g.memo(g.forwardRef(t))}export{E as c};
