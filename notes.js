(function(){
  'use strict';
  const notes=window.COURSE_DATA.notes;
  const select=document.querySelector('#notes-select');
  let follow=true,last='';
  select.innerHTML=notes.map((note,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')} · ${note.title.replace(/</g,'&lt;')}</option>`).join('');
  function draw(index,step=''){
    document.querySelector('#notes-page').textContent=`第 ${index+1} / 15 页`;
    document.querySelector('#notes-title').textContent=notes[index].title;
    document.querySelector('#notes-text').textContent=notes[index].text;
    document.querySelector('#notes-step').textContent=step;
    select.value=String(index);
  }
  function sync(){
    if(!follow)return;
    try{
      const app=window.opener&&!window.opener.closed&&window.opener.CourseApp;
      if(!app){document.querySelector('#notes-step').textContent='主舞台未连接，可用上方菜单查看全部备注。';return;}
      const state=app.getState(),key=`${state.index}:${state.steps[state.index]}`;
      if(key!==last){last=key;draw(state.index,`当前教学步骤 ${state.steps[state.index]}`);}
    }catch{document.querySelector('#notes-step').textContent='请通过本机启动脚本打开课件以启用跟随。';}
  }
  select.onchange=()=>{follow=false;document.querySelector('#follow-button').textContent='跟随主舞台';draw(Number(select.value));};
  document.querySelector('#follow-button').onclick=()=>{follow=!follow;last='';document.querySelector('#follow-button').textContent=follow?'停止跟随':'跟随主舞台';sync();};
  draw(0);sync();setInterval(sync,500);
})();
