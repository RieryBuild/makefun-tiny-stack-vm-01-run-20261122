import{mkdirSync,readFileSync,readdirSync,writeFileSync}from"node:fs";import{join}from"node:path";
const A=process.env.MAKEFUN_INPUT_DIR??"/input",B=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of readdirSync(A).sort()){
const P=readFileSync(join(A,d,"program.bin")),N=readFileSync(join(A,d,"input.bin"));
const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),Y=[];let q=0,c=0,p=0,i=0,t=0,e=0;
X:for(;;){
if(t>=1e6){e=10;break}
if(p<0||p>=P.length){e=9;break}
const o=P[p],L=o==1?1:o==2?4:o>47&&o<52?2:0;
if(o>7&&o<16||o>34&&o<48||o>52&&o<64||o>65&&o<80||o>83){e=5;break}
if(p+1+L>P.length){e=9;break}
t++;const n=p+1+L;p=n;
const R=o>=16&&o<=34;
const a=o==7?3:o==5||o==6||o==65||R&&o!=23&&o!=27&&o!=31?2:o==3||o==4||o==23||o==27||o==49||o==50||o==64||o==80||o==81||o==83?1:0;
const b=o==6||o==7?3:o==4||o==5?2:o==1||o==2||o==52||o==64||R&&o!=31?1:0;
if(q<a){e=2;break}
if(q-a+b>256){e=3;break}
let g=P[n-2]|P[n-1]<<8;g=g>32767?g-65536:g;
switch(o){
case 0:e=0;break X;
case 1:S[q++]=P[n-1]<<24>>24;break;
case 2:S[q++]=P.readInt32LE(n-4);break;
case 3:q--;break;
case 4:S[q]=S[q-1];q++;break;
case 5:{let v=S[q-1];S[q-1]=S[q-2];S[q-2]=v;break}
case 6:S[q]=S[q-2];q++;break;
case 7:{let v=S[q-3];S[q-3]=S[q-2];S[q-2]=S[q-1];S[q-1]=v;break}
case 16:{let v=S[--q];S[q-1]+=v;break}
case 17:{let v=S[--q];S[q-1]-=v;break}
case 18:{let v=S[--q];S[q-1]=Math.imul(S[q-1],v);break}
case 19:{let v=S[--q];if(!v){e=4;break X}S[q-1]/=v;break}
case 20:{let v=S[--q];if(!v){e=4;break X}S[q-1]%=v;break}
case 21:{let v=S[--q];if(!v){e=4;break X}S[q-1]=(S[q-1]>>>0)/(v>>>0);break}
case 22:{let v=S[--q];if(!v){e=4;break X}S[q-1]=(S[q-1]>>>0)%(v>>>0);break}
case 23:S[q-1]=-S[q-1];break;
case 24:{let v=S[--q];S[q-1]&=v;break}
case 25:{let v=S[--q];S[q-1]|=v;break}
case 26:{let v=S[--q];S[q-1]^=v;break}
case 27:S[q-1]=~S[q-1];break;
case 28:{let v=S[--q];S[q-1]<<=v;break}
case 29:{let v=S[--q];S[q-1]>>=v;break}
case 30:{let v=S[--q];S[q-1]>>>=v;break}
case 32:{let v=S[--q];S[q-1]=S[q-1]==v?1:0;break}
case 33:{let v=S[--q];S[q-1]=S[q-1]<v?1:0;break}
case 34:{let v=S[--q];S[q-1]=(S[q-1]>>>0)<(v>>>0)?1:0;break}
case 48:p=n+g;break;
case 49:{let v=S[--q];if(!v)p=n+g;break}
case 50:{let v=S[--q];if(v)p=n+g;break}
case 51:if(c>63){e=7;break X}C[c++]=n;p=g&65535;break;
case 52:if(!c){e=8;break X}p=C[--c];break;
case 64:{let v=S[q-1];if(v<0||v>255){e=6;break X}S[q-1]=M[v];break}
case 65:{let a=S[--q],v=S[--q];if(a<0||a>255){e=6;break X}M[a]=v;break}
case 80:{let v=S[--q],s=""+v;if(Y.length+s.length>65536){e=11;break X}Y.push(...Buffer.from(s));break}
case 81:{let v=S[--q];if(Y.length>65535){e=11;break X}Y.push(v&255);break}
case 82:S[q++]=i<N.length?N[i++]:-1;break;
case 83:e=S[--q]&255;break X;
}
}
mkdirSync(join(B,d),{recursive:!0});writeFileSync(join(B,d,"stdout.bin"),Buffer.from(Y));writeFileSync(join(B,d,"exit.txt"),e+"\n");
}
