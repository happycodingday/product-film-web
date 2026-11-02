(()=>{
 'use strict';
 const config=window.FILM_CONFIG,$=s=>document.querySelector(s),stage=$('#stage');
 const options=document.createElement('div');options.className='options';['speed','sound','volume','clean','fullscreen'].forEach(id=>options.append($('#'+id)));$('footer').insertBefore(options,$('#chapters'));
 const ease=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
 const text=(el,value)=>{if(el.textContent!==value)el.textContent=value;};
 const format=s=>`${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
 let elapsed=0,playing=false,speed=1,last=0,current=-1,muted=false,lastAudioCheck=-1;
 const starts=config.scenes.map((_,i)=>config.scenes.slice(0,i).reduce((n,s)=>n+s.duration,0)),total=config.scenes.reduce((n,s)=>n+s.duration,0);
 const safeLink=url=>{try{return ['http:','https:'].includes(new URL(url).protocol);}catch{return false;}};
 text($('#brand'),config.brand);document.title=`${config.brand} · Product Film Web`;
 const frames=config.scenes.map((scene,index)=>{
  const el=document.createElement('section');el.className=`scene ${scene.id}`;el.dataset.brand=config.brand;
  const title=document.createElement('h2');title.textContent=scene.title;if(scene.accent){const em=document.createElement('em');em.textContent=scene.accent;title.append(document.createTextNode(" "),em);}el.append(title);
  const copy=document.createElement('p');copy.textContent=scene.copy;el.append(copy);
  let refs={el};
  if(scene.id==='hero'){
   el.insertAdjacentHTML('beforeend','<div class="hero-input">An idea<br>A clear path</div><div class="hero-shape"><strong></strong><div class="mini-layout"><i></i><i></i></div></div>');
   text(el.querySelector('.hero-shape strong'),config.brand);refs.shape=el.querySelector('.hero-shape');
   text(el.querySelector('.hero-input'),config.sourceLabel||'Discover the subject');
   const source=document.createElement('div');source.className='source-sheet';source.innerHTML='<div class="source-sheet-art"><i></i><i></i><i></i></div><b></b>';text(source.querySelector('b'),config.sourceLabel||'Discover the subject');el.append(source);refs.source=source;
   if(config.heroImage){const img=document.createElement('img');img.src=config.heroImage;img.alt=config.brand;img.className='hero-image';refs.shape.append(img);}
  }else if(scene.id==='workflow'){
   const flow=document.createElement('div');flow.className='flow';refs.nodes=config.steps.map((name,i)=>{const node=document.createElement('button');node.className='node';const number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');const label=document.createElement('strong');label.textContent=name;node.append(number,label);node.onclick=()=>{setPlaying(false);seek(starts[index]+scene.duration*(i+.35)/config.steps.length);};flow.append(node);return node;});
   refs.nodes.forEach((node,i)=>{const art=document.createElement('div');art.className='node-art';art.style.setProperty('--tone',i);art.innerHTML='<i></i><i></i><i></i>';node.insertBefore(art,node.querySelector('strong'));});
   refs.description=document.createElement('div');refs.description.className='flow-description';el.append(flow,refs.description);
  }else if(scene.id==='usage'&&config.usageMode==='agent'){
   el.insertAdjacentHTML('beforeend','<div class="agent"><div class="agent-label">Agent workflow · illustration</div><div class="prompt"><span></span><i class="typing-caret"></i></div><div class="send">↑</div><div class="agent-result">Result ready · illustrative placeholder</div><div class="simulated-cursor"></div></div>');
   refs.prompt=el.querySelector('.prompt span');refs.caret=el.querySelector('.typing-caret');refs.result=el.querySelector('.agent-result');refs.cursor=el.querySelector('.simulated-cursor');refs.send=el.querySelector('.send');
  }else if(scene.id==='usage'){
   refs.features=(config.features||[]).map((feature,i)=>{const card=document.createElement('div');card.className='feature-card';card.style.setProperty('--i',i);const art=document.createElement('div');art.className='feature-art';art.innerHTML='<i></i><i></i><i></i>';const heading=document.createElement('h3');heading.textContent=feature.title;const body=document.createElement('p');body.textContent=feature.copy;card.append(art,heading,body);el.append(card);return card;});
  }else if(scene.id==='product'){
   const container=document.createElement('div');container.className='product-frame';el.append(container);
   if(config.productUrl){const frame=document.createElement('iframe');frame.title='Live product';frame.src=config.productUrl;container.append(frame);refs.frame=frame;
    frame.addEventListener('load',()=>{try{const doc=frame.contentDocument;if(!doc)return;const style=doc.createElement('style');style.textContent='html,body,body *{user-select:none!important;-webkit-user-select:none!important;caret-color:transparent!important}html.film-playing,html.film-playing *{cursor:none!important}';doc.head.append(style);doc.documentElement.classList.toggle('film-playing',playing);}catch{copy.textContent='Cross-origin product: display is available; automation needs a product interface.';}});
   }else if(config.resultImage){const img=document.createElement('img');img.className='showcase-image';img.src=config.resultImage;img.alt=config.brand;container.append(img);}
   else container.innerHTML='<div class="placeholder"><aside><i></i><i></i><i></i></aside><article><b>Full-product view</b><span>Placeholder · add an image or product URL</span></article></div>';
  }else if(scene.id==='ending'){
   const mark=document.createElement('div');mark.className='end-brand';if(config.logoUrl){const img=document.createElement('img');img.src=config.logoUrl;img.alt=config.brand;mark.append(img);}else mark.textContent=config.brand;el.prepend(mark);
   const mini=document.createElement('div');mini.className='ending-preview';if(config.resultImage||config.heroImage){const img=document.createElement('img');img.src=config.resultImage||config.heroImage;img.alt=config.brand;mini.append(img);}else mini.innerHTML='<div class="end-preview-art"><i></i><i></i><i></i></div>';el.append(mini);
   if(safeLink(config.website)){const a=document.createElement('a');a.className='official';a.textContent=config.website;a.href=config.website;a.target='_blank';a.rel='noopener noreferrer';el.append(a);}
  }
  stage.append(el);const chapter=document.createElement('button'),number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');chapter.append(number,document.createTextNode(scene.name));chapter.onclick=()=>jump(index);$('#chapters').append(chapter);refs.chapter=chapter;return refs;
 });
 const progress=document.createElement('div');progress.className='progress';stage.append(progress);$('#seek').max=String(total);
 const audio=$('#music');audio.volume=.5;if(config.musicUrl){audio.src=config.musicUrl;text($('#sound'),'Music on');}else{$('#sound').disabled=true;$('#volume').disabled=true;}
 function alignAudio(force=false){if(!config.musicUrl||audio.readyState<1||audio.seeking)return;if(audio.playbackRate!==speed)audio.playbackRate=speed;if(force||Math.abs(audio.currentTime-elapsed)>.4)audio.currentTime=Math.min(elapsed,audio.duration||elapsed);}
 function setPlaying(value){playing=value;document.body.classList.toggle('film-playing',playing);if(value)document.getSelection()?.removeAllRanges();frames.forEach(({frame})=>{try{const doc=frame?.contentDocument;doc?.documentElement?.classList.toggle('film-playing',playing);if(value){doc?.getSelection()?.removeAllRanges();doc?.activeElement?.blur?.();}}catch{}});if(value&&config.musicUrl&&!muted){alignAudio(true);audio.play().catch(()=>text($('#sound'),'Enable music'));}else audio.pause();last=performance.now();text($('#play'),value?'Pause':'Play');}
 function render(){
  const index=Math.max(0,starts.findLastIndex(t=>elapsed>=t)),scene=config.scenes[index],refs=frames[index],local=elapsed-starts[index],p=Math.min(1,local/scene.duration);
  if(index!==current){frames.forEach((f,i)=>{f.el.classList.toggle('active',i===index);f.chapter.classList.toggle('active',i===index);});current=index;}
  // Brief fade from black is deterministic at any seek position.
  refs.el.style.opacity=String((index===0?1:ease(local/.4))*(index===frames.length-1?1:1-ease((local-scene.duration+.35)/.35)));
  if(scene.id==='hero'){refs.shape.style.transform=`perspective(1400px) rotateY(${-9+7*ease(p)}deg) translateY(${-25*Math.sin(p*Math.PI)}px)`;refs.source.style.transform=`perspective(1200px) rotateY(${-10+8*ease(p)}deg) rotateZ(-6deg) translateY(${-12*Math.sin(p*Math.PI)}px)`;}
  if(scene.id==='workflow'){const selected=Math.min(config.steps.length-1,Math.floor(p*config.steps.length));refs.nodes.forEach((node,i)=>{node.classList.toggle('current',i===selected);node.style.transform=`translateY(${i===selected?-18:0}px)`;});text(refs.description,`${String(selected+1).padStart(2,'0')} · ${config.steps[selected]}`);}
  if(scene.id==='usage'&&config.usageMode==='agent'){const typed=Math.floor(ease((p-.12)/.55)*config.prompt.length);text(refs.prompt,config.prompt.slice(0,typed));refs.caret.style.opacity=p>.12&&p<.7?'1':'0';refs.result.style.opacity=String(ease((p-.8)/.1));const t=ease((p-.68)/.08);refs.cursor.style.transform=`translate(${75+810*t}px,${105+180*t}px)`;refs.cursor.style.opacity=p>.1&&p<.82?'1':'0';refs.send.style.transform=`scale(${p>.75&&p<.8?.85:1})`;}
  else if(scene.id==='usage')refs.features.forEach((card,i)=>{const enter=ease((p-i*.12)/.26);card.style.opacity=String(enter);card.style.transform=`perspective(1200px) translateY(${45*(1-enter)-10*Math.sin(p*Math.PI+i)}px) rotateY(${-8+5*enter}deg)`;});
  if(scene.id==='product'&&typeof window.productAdapter==='function')window.productAdapter({frame:refs.frame,local,phase:p,playing});
  text($('#time'),`${format(elapsed)} / ${format(total)}`);$('#seek').value=String(elapsed);progress.style.transform=`scaleX(${elapsed/total})`;
  if(playing&&elapsed-lastAudioCheck>.15){alignAudio();lastAudioCheck=elapsed;}
 }
 function seek(time){elapsed=Math.max(0,Math.min(total,time));lastAudioCheck=elapsed;alignAudio(true);render();}
 function jump(index){setPlaying(false);const target=Math.max(0,Math.min(frames.length-1,index));seek(starts[target]+(target===0?0:.5));}
 function tick(now){if(playing){elapsed=Math.min(total,elapsed+(now-last)/1000*speed);render();if(elapsed>=total)setPlaying(false);}last=now;requestAnimationFrame(tick);}
 function fit(){const viewport=$('#viewport'),scale=Math.min(viewport.clientWidth/1600,viewport.clientHeight/900);stage.style.transform=`scale(${scale})`;stage.style.left=`${(viewport.clientWidth-1600*scale)/2}px`;stage.style.top=`${(viewport.clientHeight-900*scale)/2}px`;}
 function clean(){document.body.classList.toggle('clean');fit();}
 function full(){(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).catch(()=>text($('#fullscreen'),'Browser F11'));}
 $('#play').onclick=()=>{if(elapsed>=total)seek(0);setPlaying(!playing);};$('#replay').onclick=()=>{seek(0);setPlaying(true);};$('#previous').onclick=()=>jump(current-1);$('#next').onclick=()=>jump(current+1);$('#seek').oninput=e=>{setPlaying(false);seek(Number(e.target.value));};$('#speed').onchange=e=>{speed=Number(e.target.value);alignAudio(true);};$('#clean').onclick=clean;$('#fullscreen').onclick=full;$('#sound').onclick=()=>{muted=!muted;audio.muted=muted;text($('#sound'),muted?'Music off':'Music on');if(playing&&!muted)audio.play().catch(()=>text($('#sound'),'Enable music'));};$('#volume').oninput=e=>audio.volume=Number(e.target.value);
 function keys(event){if(event.ctrlKey||event.altKey||event.metaKey||event.target.closest?.('input,select,textarea'))return;const key=event.key.toLowerCase();if([' ','r','h','f','arrowleft','arrowright'].includes(key))event.preventDefault();if(key===' ')$('#play').click();if(key==='r')$('#replay').click();if(key==='h')clean();if(key==='f')full();if(key==='arrowleft')jump(current-1);if(key==='arrowright')jump(current+1);}
 document.addEventListener('keydown',keys);document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlaying(false);});new ResizeObserver(fit).observe($('#viewport'));
 window.film={seek,pause:()=>setPlaying(false),play:()=>setPlaying(true),get duration(){return total;}};
 fit();render();requestAnimationFrame(tick);const params=new URLSearchParams(location.search);if(params.has('clean'))clean();if(params.has('autoplay'))setPlaying(true);
})();
