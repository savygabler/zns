// The animated home screen: sky, neon floor, floating category cubes.
// Moved from the original page; startHero() runs it and returns a function that stops it.
export function startHero({ onPick, onLogo }) {
let dead=false,raf=0;
const $=s=>document.querySelector(s);
const C=[
{n:'Shirts',p:45,i:['Tees','Long sleeve','Polos','Hoodies','Crewnecks'],fx:.1,fy:.34,k:1,fa:15,col:'#4f8cff'},
{n:'Pants',p:85,i:['Jeans','Shorts','Tracksuits','Cargos','Joggers'],fx:.25,fy:.2,k:.9,fa:55,col:'#b8c75a'},
{n:'Jewelry',p:120,i:['Chains','Rings','Bracelets','Earrings'],fx:.75,fy:.2,k:.9,fa:125,col:'#ffd24a'},
{n:'Hats',p:40,i:['Caps','Beanies','Bucket hats','Headbands'],fx:.9,fy:.34,k:1,fa:165,col:'#3ddc97'},
{n:'Mantle',p:220,i:['Puffers','Bombers','Shells','Overcoats'],fx:.12,fy:.58,k:.92,fa:-35,col:'#e0a064'},
{n:'Bags',p:150,i:['Backpacks','Totes','Crossbody','Duffels'],fx:.88,fy:.58,k:.92,fa:215,col:'#ff6b6b'},
{n:'Prints',p:30,i:['Posters','Stickers','Art prints','Patches'],fx:.5,fy:.19,k:1,fa:90,col:'#ff8a5c'}];
C.forEach((c,j)=>{c.ph=j*1.7;c.rx=j;c.ry=j*2;c.vx=.004+.002*(j%3);c.vy=(j%2?-1:1)*(.006+.002*(j%4));c.ox=0;c.oy=0;c.sp=0;c.sub=[];c.hl=0;c.dim=0});
const bgc=$('#bg'),fxc=$('#fx'),txc=$('#tx'),b=bgc.getContext('2d'),f=fxc.getContext('2d'),t=txc.getContext('2d');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let W,H,D,hor,sun,openI=-1,closeAt=0,hint=true;const M={x:.5,y:.5,sx:.5,sy:.5,on:false,fs:0},EM='#ff5a3a';
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),mixc=(a,c,t)=>{const A=hx(a),B=hx(c);return`rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*t))})`};
let logoHot=false;const brand=$('#brand'),sl=$('#slogan'),lg=$('#logo2'),SL=['Where style takes flight','To make the world a better place'];let si=0;sl.textContent=SL[0];

function size(){D=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;for(const c of [bgc,fxc,txc])c.width=W*D,c.height=H*D;for(const x of [b,f,t])x.setTransform(D,0,0,D,0,0);hor=H*.62;brand.style.bottom=(H-hor-8)+'px';
 const R=Math.min(W,H)*.17,o=document.createElement('canvas');o.width=o.height=R*2*D;const s=o.getContext('2d');s.scale(D,D);
 const g=s.createLinearGradient(0,0,0,R*2);g.addColorStop(0,'#fff');g.addColorStop(1,'#8c8c8c');s.fillStyle=g;s.beginPath();s.arc(R,R,R,0,7);s.fill();s.globalCompositeOperation='destination-out';
 for(let i=0;i<7;i++)s.fillRect(0,R+i*R*.15,R*2,2+i*1.6);sun={c:o,R}}
const onResize=()=>{size();C.forEach(c=>c.lay=null)};addEventListener('resize',onResize);size();
txc.addEventListener('pointermove',e=>{M.x=e.clientX/W;M.y=e.clientY/H;M.on=true});
txc.addEventListener('pointerleave',()=>{M.on=false});
const V=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],E=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
function cube(x,y,s,rx,ry,col,blur,al,lw){const cr=Math.cos(rx),sr=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry);
 const P=V.map(([a,c,d])=>{let X=a*cy+d*sy,Z=-a*sy+d*cy,Y=c*cr-Z*sr;Z=c*sr+Z*cr;const q=1/(1+Z*.12);return[x+X*s*q,y+Y*s*q]});
 f.strokeStyle=col;f.lineWidth=lw;f.shadowColor=col;f.shadowBlur=blur;f.globalAlpha=al;f.beginPath();for(const[a,d]of E){f.moveTo(...P[a]);f.lineTo(...P[d])}f.stroke();
 f.shadowBlur=0;f.globalAlpha=al*.12;f.fillStyle=col;f.beginPath();for(let i=0;i<4;i++)f[i?'lineTo':'moveTo'](...P[i]);f.fill();f.globalAlpha=1}
const stars=Array.from({length:60},()=>({x:Math.random(),y:Math.random()*.5,t:Math.random()*6}));
let scroll=0,last=performance.now();
function sky(now){const g=b.createLinearGradient(0,0,0,hor);g.addColorStop(0,'#000');g.addColorStop(.45,'#161616');g.addColorStop(.75,'#3a3a3a');g.addColorStop(1,'#8a8a8a');b.fillStyle=g;b.fillRect(0,0,W,hor+1);
 for(const s of stars){b.globalAlpha=.3+.3*Math.sin(s.t+now/900);b.fillStyle='#fff';b.fillRect(s.x*W,s.y*hor,1.5,1.5)}b.globalAlpha=1}
const HEAT=new Map(),NR=32,CW=7;let pm=null,hue=0,vxG=0;
const wq=q=>CW+(W/18-CW)*q;
function addHeat(x,y){if(y<=hor+3||y>=H)return;const q=(y-hor)/(H-hor),r=Math.pow(q,1/2.3)*NR,i=((Math.floor(r-scroll))%NR+NR)%NR,j=Math.floor((x-vxG)/wq(q));HEAT.set(i+','+j,{i,j,h:1,hu:hue})}
function floor(vx){vxG=vx;space(performance.now());
 const hp=new Path2D(),vp=new Path2D();
 for(let i=0;i<NR;i++){const tt=((i+scroll)%NR)/NR,y=hor+(H-hor)*Math.pow(tt,2.3);hp.moveTo(0,y);hp.lineTo(W,y)}
 for(let j=-36;j<=36;j++){vp.moveTo(vx+j*CW,hor);vp.lineTo(vx+j*W/18,H)}
 b.lineWidth=.9;b.shadowBlur=6;b.shadowColor='#fff';b.strokeStyle='rgba(255,255,255,.5)';b.stroke(hp);b.strokeStyle='rgba(220,220,220,.3)';b.stroke(vp);b.shadowBlur=0;
  for(const[k,c]of HEAT){const r0=(c.i+scroll)%NR,r1=r0+1;if(r1>NR)continue;const y0=hor+(H-hor)*Math.pow(r0/NR,2.3),y1=hor+(H-hor)*Math.pow(r1/NR,2.3),q0=(y0-hor)/(H-hor),q1=(y1-hor)/(H-hor);
  const L=c.h*(1.5+7*q1),X0=vx+c.j*wq(q0),X1=vx+(c.j+1)*wq(q0),X2=vx+(c.j+1)*wq(q1),X3=vx+c.j*wq(q1),u=c.hu,a=c.h;
  b.shadowColor='hsl('+u+',100%,60%)';b.shadowBlur=12*a;
  b.fillStyle='hsla('+u+',85%,34%,'+a*.9+')';b.beginPath();b.moveTo(X3,y1);b.lineTo(X2,y1);b.lineTo(X2,y1-L);b.lineTo(X3,y1-L);b.fill();
  b.beginPath();b.moveTo(X3,y1);b.lineTo(X3,y1-L);b.lineTo(X0,y0-L);b.lineTo(X0,y0);b.fill();
  b.beginPath();b.moveTo(X2,y1);b.lineTo(X2,y1-L);b.lineTo(X1,y0-L);b.lineTo(X1,y0);b.fill();
  b.shadowBlur=0;b.fillStyle='hsla('+u+',95%,64%,'+a*.8+')';b.beginPath();b.moveTo(X0,y0-L);b.lineTo(X1,y0-L);b.lineTo(X2,y1-L);b.lineTo(X3,y1-L);b.closePath();b.fill()}
 const h=b.createLinearGradient(0,hor-24,0,hor+40);h.addColorStop(0,'rgba(255,255,255,0)');h.addColorStop(.4,'rgba(255,255,255,.4)');h.addColorStop(1,'rgba(255,255,255,0)');b.fillStyle=h;b.fillRect(0,hor-24,W,64)}

const STARS=Array.from({length:190},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.2+.3,p:Math.random()*6,z:Math.random()}));
function space(now){const h=H-hor,nx0=M.sx-.5;b.save();b.beginPath();b.rect(0,hor,W,h);b.clip();
 const g=b.createLinearGradient(0,hor,0,H);g.addColorStop(0,'#14141a');g.addColorStop(1,'#000');b.fillStyle=g;b.fillRect(0,hor,W,h);
 const neb=(cx,cy,r,a)=>{const q=b.createRadialGradient(cx,cy,0,cx,cy,r);q.addColorStop(0,'rgba(215,215,235,'+a+')');q.addColorStop(1,'rgba(215,215,235,0)');b.fillStyle=q;b.fillRect(cx-r,cy-r,r*2,r*2)};
 neb(W*.27-nx0*40,hor+h*.55,h*.95,.2);neb(W*.76-nx0*60,hor+h*.4,h*.8,.16);neb(W*.5,hor+h*.95,h*.7,.09);
 b.fillStyle='#fff';for(const s of STARS){const px=(((s.x*W-now/(120+s.z*160)*(.4+s.z)-nx0*30*s.z)%W)+W)%W,py=hor+s.y*h,z=s.r+s.z*.8;b.globalAlpha=(.25+.6*s.z)*(.6+.4*Math.sin(s.p+now/700));b.fillRect(px,py,z,z)}b.globalAlpha=1;
 b.restore()}
const dist=(a,c,d,e)=>Math.hypot(a-d,c-e);
function hitTest(x,y){if(openI>=0){const c=C[openI];for(let i=c.sub.length-1;i>=0;i--){const s=c.sub[i];if(c.sp>.5&&dist(x,y,s.x,s.y)<s.s*1.3)return{ci:openI,si:i}}}
 let best=null,bd=1e9;C.forEach((c,ci)=>{const d=dist(x,y,c.x,c.y);if(d<c.s*1.15&&d<bd){bd=d;best={ci}}});if(best)return best;const r=lg.getBoundingClientRect();return x>r.left&&x<r.right&&y>r.top&&y<r.bottom?{logo:1}:null}
function openC(i){closeAt=0;if(openI===i)return;openI=i;hint=false;$('#hint').style.opacity=0}
function closeAll(){openI=-1;closeAt=0}
txc.addEventListener('click',e=>{M.x=e.clientX/W;M.y=e.clientY/H;const h=hitTest(e.clientX,e.clientY);if(!h)return;if(h.logo)return onLogo();if(h.si!=null)onPick(h.ci,h.si);else if(openI===h.ci)onPick(h.ci);else openC(h.ci)});
function obst(){const lr=lg.getBoundingClientRect(),sr=sl.getBoundingClientRect();return[[-60,-60,W+60,88],[-60,H-72,W+60,H+60],[lr.left-12,lr.top-12,lr.right+12,lr.bottom+12],[sr.left-12,sr.top-10,sr.right+12,sr.bottom+10]]}
function resolveCats(){const X=obst();
 for(let it=0;it<4;it++){
  for(const c of C){const r=c.s*1.3+8;
   for(const q of X){const cy=c.y+c.s*.3,px=Math.max(q[0],Math.min(c.x,q[2])),py=Math.max(q[1],Math.min(cy,q[3]));let dx=c.x-px,dy=cy-py,d=Math.hypot(dx,dy);
    if(d<r){if(d<.01){const o=[cy-q[1],q[3]-cy,c.x-q[0],q[2]-c.x],m=o.indexOf(Math.min(...o));dx=[0,0,-1,1][m];dy=[-1,1,0,0][m];d=1}const k=(r-d)/d;c.x+=dx*k;c.y+=dy*k}}
   c.x=Math.min(Math.max(c.x,c.s*1.4+8),W-c.s*1.4-8)}
  for(let i=0;i<C.length;i++)for(let j=i+1;j<C.length;j++){const a=C[i],b=C[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,m=(a.s+b.s)*1.3+40;if(d<m){const k=(m-d)/2/d;a.x-=dx*k;a.y-=dy*k;b.x+=dx*k;b.y+=dy*k}}}}
function layout(c,ci){const n=c.i.length,ss=c.s*.4,F=obst();
 C.forEach((o,j)=>{const s=(j===ci?1.25:1.3)*o.s;F.push([o.x-s-14,o.y-s-14,o.x+s+14,o.y+s*1.45+34])});
 const R0=c.s*1.7+ss*1.5+22,out=[],placed=[];
 for(let i=0;i<n;i++){const pref=c.fa+(i-(n-1)/2)*34,cand=[];
  for(let ring=0;ring<9;ring++)for(let a=0;a<360;a+=12){const d=Math.abs(((a-pref+540)%360)-180);cand.push([ring*45+d,R0*(1+ring*.26),a])}
  cand.sort((p,q)=>p[0]-q[0]);let pick=null;
  for(const[,r,a]of cand){const x=c.x+r*Math.cos(a*Math.PI/180),y=c.y+r*Math.sin(a*Math.PI/180),B=[x-42,y-ss*1.7,x+42,y+ss*1.3+22];
   if(B[0]<16||B[2]>W-16)continue;let ok=true;for(const q of F.concat(placed)){if(B[0]<q[2]+6&&B[2]>q[0]-6&&B[1]<q[3]+6&&B[3]>q[1]-6){ok=false;break}}
   if(ok){pick=[x,y,B];break}}
  if(!pick){const a=pref*Math.PI/180;pick=[c.x+R0*Math.cos(a),c.y+R0*Math.sin(a),null]}
  if(pick[2])placed.push(pick[2]);out.push([pick[0]-c.x,pick[1]-c.y])}
 return out}
function frame(now){if(dead)return;raf=requestAnimationFrame(frame);
 const dt=Math.min(now-last,50)/16.7;last=now;M.sx+=(M.x-M.sx)*.07*dt;M.sy+=(M.y-M.sy)*.07*dt;const nx=M.sx-.5,ny=M.sy-.5,mx=M.x*W,my=M.y*H;
 M.fs+=(((M.on&&my>hor-40)?1:0)-M.fs)*.1*dt;
 const vx=W/2-nx*W*.1;vxG=vx;if(M.on&&my>hor){if(pm){const d=Math.hypot(mx-pm[0],my-pm[1]),stp=Math.max(1,Math.ceil(d/8));for(let q=1;q<=stp;q++){addHeat(pm[0]+(mx-pm[0])*q/stp,pm[1]+(my-pm[1])*q/stp);hue=(hue+2.2)%360}}pm=[mx,my]}else pm=null;for(const[k,c]of HEAT){c.h-=.012*dt;if(c.h<=0)HEAT.delete(k)}b.clearRect(0,0,W,H);sky(now);floor(vx);if(!RM)scroll+=.02*dt;
 const cx0=W/2,cy0=H*.2;
 C.forEach((c,ci)=>{const k=c.k;c.s=Math.max(26,Math.min(W,H)*.064*k);const bx=c.fx*W-nx*70*k,by=c.fy*H-ny*45*k+Math.sin(now/1500+c.ph)*6;
  const ttx=M.on?(mx-bx)*.02*k:0,tty=M.on?(my-by)*.02*k:0;c.ox+=(ttx-c.ox)*.05*dt;c.oy+=(tty-c.oy)*.05*dt;c.x=bx+c.ox;c.y=by+c.oy;
  const hov=ci===openI;c.hl+=((hov||(M.on&&M.hi===ci)?1:0)-c.hl)*.14*dt;c.dim+=(((openI>=0&&!hov)?1:0)-c.dim)*.12*dt;c.rx+=c.vx*dt*(RM?.2:hov?.3:1);c.ry+=c.vy*dt*(RM?.2:hov?.3:1);c.sp+=((hov?1:0)-c.sp)*.13*dt;
  });
 resolveCats();
 C.forEach((c,ci)=>{const hov=ci===openI,e=c.sp*c.sp*(3-2*c.sp);if(hov&&!c.lay)c.lay=layout(c,ci);if(!hov&&c.sp<.02)c.lay=null;
  c.sub=c.i.map((_,i)=>{const L=c.lay&&c.lay[i]||[0,0];return{x:c.x+L[0]*e,y:c.y+L[1]*e,s:c.s*.4*(.2+.8*e),rx:c.rx*1.3+i,ry:c.ry*1.2+i*2}})});
 let hit=M.on?hitTest(mx,my):null;M.hi=hit&&hit.ci!=null&&hit.si==null?hit.ci:-1;
 if(hit){if(hit.si!=null)closeAt=0;else openC(hit.ci)}else if(openI>=0&&!closeAt)closeAt=now+300;
 if(hit&&hit.si==null&&hit.ci===openI)closeAt=0;
 if(closeAt&&now>closeAt)closeAll();
 const hot=!!(hit&&hit.logo);if(hot!==logoHot){logoHot=hot;brand.classList.toggle('hot',hot);sl.style.opacity=1;sl.textContent=hot?'Exclusive · Members only':SL[si]}
 f.globalCompositeOperation='destination-out';f.fillStyle='rgba(0,0,0,'+(RM?.5:.22)+')';f.fillRect(0,0,W,H);f.globalCompositeOperation='lighter';
 C.forEach((c,ci)=>{const w=c.hl,col=mixc('#f2f2f2',c.col,w),sc=(.5+.5*w)*(1-.14*c.dim);cube(c.x,c.y,c.s*sc,c.rx,c.ry,col,10+14*w,(.8+.2*w)*(1-.45*c.dim),1.4+.8*w)});
 C.forEach((c,ci)=>{if(c.sp<.02)return;c.sub.forEach((s,i)=>{const hv=hit&&hit.ci===ci&&hit.si===i;cube(s.x,s.y,s.s*(hv?1.15:1),s.rx,s.ry,hv?mixc(c.col,'#ffffff',.25):c.col,hv?18:8,c.sp*(hv?1:.8),hv?2:1.2)})});
 f.globalCompositeOperation='source-over';
t.clearRect(0,0,W,H);t.textAlign='center';t.lineJoin='round';t.font='600 12px "Space Grotesk",sans-serif';if('letterSpacing' in t)t.letterSpacing='2.5px';t.lineWidth=5;t.strokeStyle='#000';
 C.forEach((c,ci)=>{t.globalAlpha=1-.4*c.dim;t.fillStyle=mixc('#d8d8d8','#ffffff',c.hl);const y=c.y+c.s*(.5+.5*c.hl)*1.45+14,q=c.n.toUpperCase();t.strokeText(q,c.x,y);t.fillText(q,c.x,y)});t.globalAlpha=1;
 t.font='600 11px "Space Grotesk",sans-serif';if('letterSpacing' in t)t.letterSpacing='.8px';t.lineWidth=4;
 C.forEach((c,ci)=>{if(c.sp<.3)return;c.sub.forEach((s,i)=>{const hv=hit&&hit.ci===ci&&hit.si===i;t.globalAlpha=Math.min(1,c.sp*1.3);t.fillStyle=hv?'#fff':mixc('#fff',c.col,.55);const y=s.y+s.s*1.3+13;t.strokeText(c.i[i],s.x,y);t.fillText(c.i[i],s.x,y)});t.globalAlpha=1});
 if(M.on){t.fillStyle='#fff';t.beginPath();t.arc(mx,my,3.4,0,7);t.fill();t.strokeStyle='rgba(255,255,255,.75)';t.lineWidth=1;t.beginPath();t.arc(mx,my,10,0,7);t.stroke()}}
raf=requestAnimationFrame(frame);
return()=>{dead=true;cancelAnimationFrame(raf);removeEventListener('resize',onResize)};
}
