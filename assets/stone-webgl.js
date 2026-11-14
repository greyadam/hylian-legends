(() => {
  'use strict';
  const board = document.querySelector('#codex .virtues');
  if (!board || board.dataset.webglStones === 'ready') return;
  board.dataset.webglStones = 'ready';
  if (!document.getElementById('spiritual-stone-spheres-style')) {
    const link = document.createElement('link');
    link.id = 'spiritual-stone-spheres-style';
    link.rel = 'stylesheet';
    link.href = 'assets/spiritual-stone-spheres.css';
    document.head.append(link);
  }
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const definitions = {
    COURAGE: {name:"Kokiri's Emerald",cls:'stone-emerald',color:[46/255,204/255,113/255]},
    WISDOM: {name:"Zora's Sapphire",cls:'stone-sapphire',color:[52/255,152/255,219/255]},
    POWER: {name:"Goron's Ruby",cls:'stone-ruby',color:[231/255,76/255,60/255]}
  };
  const positions = [], indices = [];
  for (let y=0;y<=24;y++) {
    const theta=y*Math.PI/24;
    for (let x=0;x<=32;x++) {
      const phi=x*2*Math.PI/32;
      positions.push(Math.sin(theta)*Math.cos(phi),Math.cos(theta),Math.sin(theta)*Math.sin(phi));
    }
  }
  for (let y=0;y<24;y++) for (let x=0;x<32;x++) {
    const a=y*33+x,b=a+33;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  const vertices = new Float32Array(positions), elements = new Uint16Array(indices);
  const vertexSource = `attribute vec3 aPosition;
uniform float uAngle;
varying vec3 vLocal;varying vec3 vWorld;
void main(){float c=cos(uAngle),s=sin(uAngle);vec3 p=vec3(c*aPosition.x+s*aPosition.z,aPosition.y,-s*aPosition.x+c*aPosition.z);vLocal=aPosition;vWorld=p;gl_Position=vec4(p.xy*3.0,(2.0-p.z)*0.1,3.5-p.z);}`;
  const fragmentSource = `precision mediump float;
uniform vec3 uColor;varying vec3 vLocal;varying vec3 vWorld;
void main(){vec3 n=normalize(vWorld);vec3 l=normalize(vec3(-0.55,0.65,1.0));vec3 eye=normalize(vec3(0.0,0.0,4.0)-vWorld);float diffuse=max(dot(n,l),0.0);float sheen=pow(max(dot(n,normalize(l+eye)),0.0),48.0);float grain=0.93+0.07*sin(14.0*atan(vLocal.z,vLocal.x)+6.0*vLocal.y);vec3 color=uColor*grain*(0.22+0.78*diffuse)+vec3(0.8)*sheen*0.65;gl_FragColor=vec4(color,1.0);}`;
  const states = [];
  let frame=0,last=0,lastDraw=0,angle=0;
  function runnable(){return !document.hidden&&!motion.matches&&states.some(s=>s.active&&s.visible);}
  function sync(){
    if(frame){cancelAnimationFrame(frame);frame=0;}
    last=0;lastDraw=0;
    for(const state of states) if(state.active&&state.visible) state.draw(angle);
    if(runnable()) frame=requestAnimationFrame(tick);
  }
  function tick(now){
    frame=0;
    if(!runnable()){last=0;return;}
    if(last) angle=(angle+Math.min(now-last,100)*Math.PI*2/8000)%(Math.PI*2);
    last=now;
    if(now-lastDraw>=1000/30){for(const state of states) if(state.active&&state.visible) state.draw(angle);lastDraw=now;}
    frame=requestAnimationFrame(tick);
  }
  function build(host,color){
    const canvas=document.createElement('canvas');
    const size=Math.round(64*Math.min(devicePixelRatio||1,2));
    canvas.width=size;canvas.height=size;canvas.setAttribute('aria-hidden','true');
    let gl;
    try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,premultipliedAlpha:true});}catch{return;}
    if(!gl)return;
    const shaders=[],buffers=[];let program;
    const clean=()=>{for(const b of buffers)gl.deleteBuffer(b);for(const s of shaders)gl.deleteShader(s);if(program)gl.deleteProgram(program);};
    try{
      function compile(type,source){const shader=gl.createShader(type);if(!shader)throw Error('Shader unavailable');shaders.push(shader);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('Shader compile failed');return shader;}
      program=gl.createProgram();if(!program)throw Error('Program unavailable');
      gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource));
      gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentSource));
      gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader link failed');
      gl.useProgram(program);
      function buffer(target,data){const b=gl.createBuffer();if(!b)throw Error('Buffer unavailable');buffers.push(b);gl.bindBuffer(target,b);gl.bufferData(target,data,gl.STATIC_DRAW);}
      buffer(gl.ARRAY_BUFFER,vertices);buffer(gl.ELEMENT_ARRAY_BUFFER,elements);
      const attribute=gl.getAttribLocation(program,'aPosition');
      if(attribute<0)throw Error('Attribute unavailable');
      gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,3,gl.FLOAT,false,0,0);
      const rotation=gl.getUniformLocation(program,'uAngle');
      gl.uniform3fv(gl.getUniformLocation(program,'uColor'),color);
      gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);gl.viewport(0,0,size,size);
      const state={host,active:true,visible:true,draw(value){gl.useProgram(program);gl.uniform1f(rotation,value);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.drawElements(gl.TRIANGLES,elements.length,gl.UNSIGNED_SHORT,0);}};
      state.draw(0);if(gl.getError()!==gl.NO_ERROR)throw Error('Initial render failed');
      canvas.addEventListener('webglcontextlost',()=>{state.active=false;host.classList.remove('is-webgl');canvas.remove();sync();},{once:true});
      host.append(canvas);host.classList.add('is-webgl');states.push(state);
    }catch{clean();}
  }
  board.querySelectorAll('.panel').forEach(card=>{
    const def=definitions[card.querySelector('h3')?.textContent.trim().toUpperCase()];
    if(!def)return;
    const previous=card.querySelector('.spiritual-stone-icon,.virtue-stone,.diamond');
    if(!previous)return;
    const host=document.createElement('span');
    host.className='spiritual-stone-icon '+def.cls;
    host.setAttribute('role','img');host.setAttribute('aria-label',def.name);host.title=def.name;
    previous.replaceWith(host);
    build(host,def.color);
  });
  if(!states.length)return;
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){const state=states.find(s=>s.host===entry.target);if(state)state.visible=entry.isIntersecting;}sync();});
    for(const state of states)observer.observe(state.host);
  }
  document.addEventListener('visibilitychange',sync);
  if(motion.addEventListener)motion.addEventListener('change',sync);else motion.addListener(sync);
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;last=0;});
  window.addEventListener('pageshow',sync);
  sync();
})();
