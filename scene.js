(function () {
  'use strict';
  let renderer, scene, camera, root, canvas, observer;
  let host = null, loading = null, generation = 0, animation = null;
  let paused = false, reduced = false, destroyed = false;
  const resources = new Set();
  const documents = [], chunks = [];
  const own = resource => { resources.add(resource); return resource; };
  function loadThree() {
    if(window.THREE) return Promise.resolve();
    if(!loading) loading = new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src='vendor/three.min.js';
      script.onload=resolve;script.onerror=reject;document.head.appendChild(script);
    });
    return loading;
  }
  function texture(title, subtitle, number, tint) {
    const surface=document.createElement('canvas');surface.width=640;surface.height=900;
    const context=surface.getContext('2d');
    context.fillStyle='#ffffff';context.fillRect(0,0,640,900);
    context.fillStyle=tint;context.fillRect(0,0,640,16);
    context.font='26px -apple-system, PingFang SC, sans-serif';context.fillStyle='#65716e';
    context.fillText(subtitle,55,93);
    context.font='600 60px -apple-system, PingFang SC, sans-serif';context.fillStyle='#142825';context.fillText(title,50,194);
    context.fillStyle=tint;context.font='500 210px Arial, sans-serif';context.fillText(number,43,425);
    context.font='29px -apple-system, PingFang SC, sans-serif';context.fillStyle='#65716e';context.fillText(number==='7'?'个自然日内申请':'历史版本 · 已废止',55,486);
    context.fillStyle='#e2eae4';for(let i=0;i<6;i++)context.fillRect(55,560+i*42,i===5?310:520,8);
    context.fillStyle='#edf4ef';context.fillRect(50,830,540,2);
    context.font='21px -apple-system, PingFang SC, sans-serif';context.fillStyle='#65716e';context.fillText('教学模拟 · 证据保留来源',55,870);
    const result=own(new THREE.CanvasTexture(surface));result.colorSpace=THREE.SRGBColorSpace;return result;
  }
  function evidenceTexture(title, version, tint) {
    const surface=document.createElement('canvas');surface.width=700;surface.height=330;
    const context=surface.getContext('2d');
    context.fillStyle='#ffffff';context.fillRect(0,0,700,330);
    context.fillStyle=tint;context.fillRect(0,0,13,330);
    context.font='25px -apple-system, PingFang SC, sans-serif';context.fillStyle=tint;context.fillText(version,42,62);
    context.fillStyle='#142825';context.font='600 39px -apple-system, PingFang SC, sans-serif';context.fillText(title,42,128);
    context.fillStyle='#d4e9df';context.fillRect(42,174,600,34);
    context.fillStyle='#a1bcae';context.fillRect(42,234,520,7);context.fillRect(42,265,410,7);
    const result=own(new THREE.CanvasTexture(surface));result.colorSpace=THREE.SRGBColorSpace;return result;
  }
  function meshBox(w,h,d,color) {
    const geometry=own(new THREE.BoxGeometry(w,h,d));
    const material=own(new THREE.MeshStandardMaterial({color,roughness:.75}));
    const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;return mesh;
  }
  function makeDocument(x,y,z,title,version,number,color,rz) {
    const group=new THREE.Group();
    for(let i=0;i<4;i++){
      const page=meshBox(2.65,3.72,.027,i===3?'#ffffff':'#e9f0e9');
      page.position.set(i*.035,-i*.035,i*.035);group.add(page);
    }
    const face=new THREE.Mesh(own(new THREE.PlaneGeometry(2.65,3.72)),own(new THREE.MeshBasicMaterial({map:texture(title,version,number,color),toneMapped:false})));
    face.position.set(.105,-.105,.125);group.add(face);
    const tab=meshBox(.45,.65,.03,color);tab.position.set(1.45,.9,.03);group.add(tab);
    group.position.set(x,y,z);group.rotation.set(-.14,-.16,rz);scene.add(group);documents.push(group);return group;
  }
  function initialize() {
    const probe=document.createElement('canvas');
    if(!probe.getContext('webgl2')) throw new Error('WebGL2 unavailable');
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
    renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
    canvas=renderer.domElement;canvas.setAttribute('aria-hidden','true');
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();host?.classList.remove('has-webgl');animation?.kill();});
    scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-4.8,4.8,4,-4,.1,80);
    camera.position.set(0,4.6,12);camera.lookAt(0,0,0);
    scene.add(new THREE.AmbientLight('#ffffff',1));
    const key=new THREE.DirectionalLight('#fff7e9',2.5);key.position.set(-3,8,6);key.castShadow=true;
    key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.05;
    scene.add(key);
    const fill=new THREE.DirectionalLight('#d3e7ff',2);fill.position.set(5,3,-3);scene.add(fill);
    const ground=new THREE.Mesh(own(new THREE.PlaneGeometry(30,30)),own(new THREE.ShadowMaterial({opacity:.10})));
    ground.rotation.x=-Math.PI/2;ground.position.y=-2.3;ground.receiveShadow=true;scene.add(ground);
    root=new THREE.Group();scene.add(root);
    const rear=makeDocument(.8,.45,-.55,'历史政策','旧版 1.3 · 已废止','15','#c46a4e',-.12);
    const front=makeDocument(-.35,.1,.3,'退货政策','现行版本 2.1','7','#1263c6',.10);
    for(let i=0;i<3;i++){
      const group=new THREE.Group();
      const card=meshBox(2.9,1.37,.06,'#ffffff');group.add(card);
      const face=new THREE.Mesh(own(new THREE.PlaneGeometry(2.9,1.37)),own(new THREE.MeshBasicMaterial({map:evidenceTexture(['一条原文证据','片段保留来源','现行规则 · 7日'][i],['现行 2.1 / 第 1 条','FAQ / 第 2 条','现行 2.1 / 条件'][i],'#1263c6'),toneMapped:false})));
      face.position.z=.04;group.add(face);
      group.position.set(1.05,-1.1+i*.09,1.1-i*.12);group.rotation.set(-.13,-.12,.06-i*.025);scene.add(group);chunks.push(group);
    }
    observer=new ResizeObserver(resize);
    window.addEventListener('pagehide',dispose,{once:true});
  }
  function resize() {
    if(!renderer||!host)return;
    const width=host.clientWidth,height=host.clientHeight;
    if(!width||!height)return;
    renderer.setSize(width,height,false);
    const ratio=width/height;camera.left=-3.8*ratio;camera.right=3.8*ratio;camera.top=3.8;camera.bottom=-3.8;camera.updateProjectionMatrix();render();
  }
  function render(){if(renderer&&host&&!document.hidden)renderer.render(scene,camera);}
  function pose(step,animate,entrance=false){
    animation?.kill();
    const spread=Math.min(step,3);
    const targets=[{x:.85+spread*.3,y:.55+spread*.1,z:-.55},{x:-.45-spread*.26,y:.15+spread*.1,z:.3}];
    if(animate&&!reduced&&!paused&&window.gsap){
      animation=gsap.timeline({onUpdate:render,onComplete:render});
      documents.forEach((doc,i)=>{
        if(entrance)doc.position.set(targets[i].x+(i?-.7:.7),targets[i].y+.8,targets[i].z-1.5);
        animation.to(doc.position,{...targets[i],duration:1.5,ease:'power3.out'},i*.14);
        animation.fromTo(doc.rotation,{y:i?-.5:.25,z:i?.2:-.25},{y:-.16,z:i?.1:-.12,duration:1.5,ease:'power3.out'},i*.14);
      });
      chunks.forEach((chunk,i)=>animation.to(chunk.position,{x:1.05-(spread>0?i*.18:0),y:-1.10+(spread>0?i*.68:i*.09),z:1.1-i*.12,duration:1.1,ease:'power2.inOut'},i*.08));
    }else{
      documents.forEach((doc,i)=>doc.position.set(targets[i].x,targets[i].y,targets[i].z));
      chunks.forEach((chunk,i)=>chunk.position.set(1.05-(spread>0?i*.18:0),-1.1+(spread>0?i*.68:i*.09),1.1-i*.12));render();
    }
  }
  async function show(nextHost,step,options={}) {
    const ticket=++generation;paused=!!options.paused;reduced=!!options.reduced;
    if(!nextHost){animation?.pause();host?.classList.remove('has-webgl');if(observer&&host)observer.unobserve(host);host=null;canvas?.remove();return;}
    if(destroyed)return;
    try{
      await loadThree();if(ticket!==generation)return;
      if(!renderer)initialize();
      const entrance=host!==nextHost;
      if(host!==nextHost){if(host){observer.unobserve(host);host.classList.remove('has-webgl');}host=nextHost;host.appendChild(canvas);observer.observe(host);}
      host.classList.add('has-webgl');resize();pose(step,true,entrance);
    }catch{
      nextHost.classList.remove('has-webgl');
      // 二维文件舞台提供相同内容，浏览器缺少 WebGL 时继续授课。
    }
  }
  function setPaused(value){paused=value;if(animation)animation.paused(value);if(!value)render();}
  function dispose(){destroyed=true;generation++;animation?.kill();observer?.disconnect();resources.forEach(item=>item.dispose());resources.clear();renderer?.dispose();canvas?.remove();}
  window.CourseScene={show,setPaused,dispose};
})();
