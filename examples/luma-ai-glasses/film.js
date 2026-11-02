(()=>{
 'use strict';
 const $=s=>document.querySelector(s),stage=$('#stage'),cfg=window.FILM_CONFIG;
 const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
 const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
 const out=t=>1-(1-clamp(t))**3;
 const put=(el,txt)=>{if(el.textContent!==txt)el.textContent=txt;};
 const show=(el,x,y=22)=>{const q=out(x);el.style.opacity=q;el.style.transform=`translateY(${(1-q)*y}px)`;};
 const format=t=>`${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`;
 const options=document.createElement('div');options.className='options';['speed','sound','volume','clean','fullscreen'].forEach(id=>options.append($('#'+id)));$('footer').insertBefore(options,$('#chapters'));
 $('#sound').textContent='无配乐 Demo';$('#sound').disabled=true;$('#volume').disabled=true;
 const product='<img class="glass-product" src="assets/luma-glasses.png" alt="LUMA 光遇 AI 眼镜概念设计">';
 const photo='<img class="city-photo" src="assets/city.png" alt="蓝调时刻的欧洲街道与咖啡馆"><div class="pov-shade"></div><div class="hud-corners"></div>';
 const stars='<span class="ai-star" aria-hidden="true">✦</span>';
 const voice='<span class="voice-dot" aria-hidden="true">'+Array.from({length:5},()=>'<i></i>').join('')+'</span>';
 const shotHTML={
 intro:`<div class="hero-watermark">LUMA</div><div class="hero-orbit"></div><div class="floor"></div><h2>抬头。<em>世界就懂了。</em></h2><p class="subline">LUMA 光遇 · 你的第一视角 AI</p>${product}<div class="intro-bottom">让智能融入视线，让双手回到生活。</div>`,
 craft:`<h2>是眼镜。<em>也是新直觉。</em></h2><p class="subline">把感知、聆听与回应，<br>融进日常的轮廓。</p>${product}<div class="feature-select"><button data-sensor="0"><i></i>看见 · 视觉感知</button><button data-sensor="1"><i></i>听见 · 自然对话</button><button data-sensor="2"><i></i>回应 · 轻量提示</button></div><div class="sensor-wave"></div><div class="pin"></div><div class="component-note"><b>视觉感知</b><small>理解你此刻看到的事物。</small></div>`,
 vision:`<h2>看见它。<em>就了解它。</em></h2><p class="subline">不必举起手机，顺着目光，问一句。</p><div class="device-frame"><div class="pov">${photo}<div class="focus-box"><i></i></div><div class="answer"><div class="answer-top">${stars} LUMA VISION</div><h3>一家值得停留的咖啡馆。</h3><p>暖色立面，街角座位。<br>要不要把这一站记下来？</p></div><div class="hud-caption"><i class="status-dot"></i>第一视角 · 概念体验</div><div class="voice-question">${voice}<span>“眼前这是什么地方？”</span></div></div></div>`,
 translate:`<h2>你说你的。<em>世界听懂了。</em></h2><p class="subline">让语言退到背后，让交流发生在眼前。</p><div class="device-frame"><div class="pov">${photo}<div class="speech primary">A coffee, for here?<small>一杯咖啡，在这里喝吗？</small></div><div class="speech reply">是的，再加一份可颂。<small>Yes, and a croissant, please.</small></div><div class="hud-caption"><i class="status-dot"></i>实时翻译 · 体验示意</div></div></div><div class="translation-screen"><div class="language-pill">EN <span>⇄</span> 中文</div><h3>话音落下。<br>理解，已经抵达。</h3><p>听见对方，看到翻译。<br>用自己的语言，自然回答。</p><div class="waveform">${Array.from({length:29},()=>'<i></i>').join('')}</div><button class="language-switch">切换另一段对话 ↗</button></div>`,
 navigate:`<h2>方向。<em>就在眼前。</em></h2><p class="subline">把注意力留给街景。<br>下一步，轻轻告诉你。</p><button class="destination"><span class="destination-icon">⌁</span><span><strong>去河畔走走</strong><small>步行路线 · 沿途发现</small></span><span class="arrow">↗</span></button><div class="device-frame"><div class="pov">${photo}<svg class="ar-route" viewBox="0 0 840 620" aria-hidden="true"><path class="route-base" d="M370 660 Q410 510 436 419 Q465 350 555 335 L668 335"/><path class="route-glow" d="M370 660 Q410 510 436 419 Q465 350 555 335 L668 335"/><path class="route-line" d="M370 660 Q410 510 436 419 Q465 350 555 335 L668 335"/><circle cx="668" cy="335" r="10" fill="#d5f4ff"/></svg><div class="nav-direction"><span class="turn-icon">↱</span><span><strong>80 m 后右转</strong><small>前往河畔步道</small></span></div><div class="nav-arrival">沿着光的方向，继续向前。</div></div></div>`,
 recall:`<div class="record-orbit"></div><h2>精彩，留住。<em>生活，继续。</em></h2><p class="subline">轻触镜腿，记下眼前。<br>想起时，问一句就好。</p><div class="memory-tag">由你决定，何时记录。</div><div class="memory-stack"><div class="memory-card"><img src="assets/city.png" alt="街道记忆"><strong><span>16:32 · 城市漫步</span>拐角，遇见新的风景。</strong></div><div class="memory-card"><img src="assets/city.png" alt="沿途记忆"><strong><span>17:06 · 路上片刻</span>把这一刻，留给以后。</strong></div><div class="memory-card"><img src="assets/city.png" alt="咖啡馆记忆"><strong><span>17:24 · 街角咖啡馆</span>这一站，我替你记得。</strong></div></div><div class="saved">✓ 已记下这一刻</div><div class="memory-search">${stars}<span></span></div>`,
 finale:`<div class="final-brand">LUMA <span style="font-size:28px;letter-spacing:2px">光遇</span></div><h2>把屏幕放下。<em>让世界展开。</em></h2>${product}<div class="final-line"></div><div class="final-note">看见 · 听懂 · 陪你向前</div>`
 };
 const starts=[];let total=0;cfg.scenes.forEach(s=>{starts.push(total);total+=s.duration;});
 const frames=cfg.scenes.map((s,i)=>{
  const el=document.createElement('section');el.className=`scene s-${s.id}`+(s.id==='vision'||s.id==='translate'?' scene-title-inline':'');el.innerHTML=shotHTML[s.id];
  el.insertAdjacentHTML('beforeend','<div class="film-mark">LUMA<span>光遇</span></div><div class="concept-mark">CONCEPT FILM / AI 眼镜</div>');stage.append(el);
  const b=document.createElement('button');b.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span>${s.name}`;b.onclick=()=>jump(i);$('#chapters').append(b);
  const refs={el,chapter:b,title:el.querySelector('h2'),sub:el.querySelector('.subline'),product:el.querySelector('.glass-product')};
  el.querySelectorAll('[class]').forEach(n=>n.classList.forEach(c=>{const k=c.replace(/-([a-z])/g,(_,v)=>v.toUpperCase());if(!refs[k])refs[k]=n;}));
  refs.waveBars=[...el.querySelectorAll('.waveform i,.voice-dot i')];refs.sensors=[...el.querySelectorAll('[data-sensor]')];refs.cards=[...el.querySelectorAll('.memory-card')];return refs;
 });
 const progress=document.createElement('div');progress.className='progress';stage.append(progress);$('#seek').max=total;
 let elapsed=0,playing=false,speed=1,last=0,current=-1,manualSensor=null,alternate=false,alternateRoute=false;
 function setPlaying(on){playing=on;last=performance.now();document.body.classList.toggle('film-playing',on);put($('#play'),on?'暂停':'播放');if(on){document.getSelection()?.removeAllRanges();document.activeElement?.blur?.();manualSensor=null;alternate=false;alternateRoute=false;}render();}
 const craft=frames[1],tr=frames[3],nav=frames[4];
 craft.sensors.forEach((b,i)=>b.onclick=()=>{setPlaying(false);manualSensor=i;render();});
 tr.languageSwitch.onclick=()=>{setPlaying(false);alternate=!alternate;render();};
 nav.destination.onclick=()=>{setPlaying(false);alternateRoute=!alternateRoute;render();};
 function render(){
  const index=Math.max(0,starts.findLastIndex(t=>elapsed>=t)),s=cfg.scenes[index],r=frames[index],local=elapsed-starts[index],t=index===0&&local===0&&!playing?2.4:local,p=clamp(t/s.duration),en=out(t/1.3);
  if(index!==current){frames.forEach((f,i)=>{f.el.classList.toggle('active',i===index);f.el.setAttribute('aria-hidden',String(i!==index));f.chapter.classList.toggle('active',i===index);});current=index;}
  r.el.style.opacity=(index===0?1:smooth(t/.42))*(index===frames.length-1?1:1-smooth((t-s.duration+.35)/.35));
  show(r.title,t/1.4,30);if(r.sub)show(r.sub,(t-.35)/1.4,18);
  if(s.id==='intro'){
   const reveal=out((t-.3)/2.4);r.product.style.opacity=reveal;r.product.style.transform=`perspective(1800px) translate(${(1-reveal)*100}px,${(1-reveal)*50-12*Math.sin(p*Math.PI)}px) scale(${.91+.09*reveal+.025*p}) rotateY(${-12+9*reveal}deg) rotateZ(${-3+2*p}deg)`;show(r.introBottom,(t-1.4)/1.3);r.heroOrbit.style.opacity=.3+.6*reveal;
  }else if(s.id==='craft'){
   r.product.style.transform=`perspective(1600px) translateY(${18*Math.sin(p*Math.PI)}px) rotateY(${-10+8*p}deg) scale(${1+.08*p})`;r.product.style.opacity=en;
   const n=manualSensor??Math.min(2,Math.floor(Math.max(0,t-1)/2.2));r.sensors.forEach((b,i)=>b.classList.toggle('selected',i===n));
   const titles=['视觉感知','自然对话','轻量提示'],descriptions=['理解你此刻看到的事物。','不打断生活，也能随时交流。','需要的信息，恰好出现在眼前。'];put(r.componentNote.querySelector('b'),titles[n]);put(r.componentNote.querySelector('small'),descriptions[n]);
   show(r.componentNote,(t-.7)/1);r.pin.style.opacity=out((t-.6)/1);const w=1+(t%1.8)/1.8;r.sensorWave.style.transform=`scale(${w})`;r.sensorWave.style.opacity=(2-w)*.65;
  }else if(s.id==='vision'){
   r.cityPhoto.style.transform=`scale(${1.02+.035*p}) translateX(${-8*p}px)`;const scan=clamp((t-1.1)/2.4);r.focusBox.style.opacity=out(t-.5);r.focusBox.style.transform=`scale(${1.15-.15*out(t-1)})`;r.focusBox.classList.toggle('locked',t>3.4);r.focusBox.querySelector('i').style.transform=`translateY(${scan*236}px)`;r.focusBox.querySelector('i').style.opacity=t>3.5?'0':'1';show(r.answer,(t-3.6)/1);r.voiceQuestion.style.opacity=out((t-.6)/1);r.waveBars.forEach((b,i)=>b.style.transform=`scaleY(${.6+.7*Math.abs(Math.sin(t*5+i))})`);
  }else if(s.id==='translate'){
   r.cityPhoto.style.transform=`scale(${1.04+.03*p}) translateX(${-12*p}px)`;show(r.speech,(t-.8)/1,25);show(r.reply,(t-3.2)/1,25);r.waveBars.forEach((b,i)=>b.style.transform=`scaleY(${.15+.85*Math.abs(Math.sin(t*3+i*.6)*Math.cos(t+i*.2))})`);
   const a=r.speech,b=r.reply;
   const primary=alternate?'Would you like a window seat?':'A coffee, for here?',primaryCN=alternate?'想坐在窗边吗？':'一杯咖啡，在这里喝吗？';
   const reply=alternate?'太好了，谢谢。':'是的，再加一份可颂。',replyEN=alternate?'That would be lovely. Thank you.':'Yes, and a croissant, please.';
   if(a.firstChild.textContent!==primary)a.firstChild.textContent=primary;put(a.querySelector('small'),primaryCN);if(b.firstChild.textContent!==reply)b.firstChild.textContent=reply;put(b.querySelector('small'),replyEN);
  }else if(s.id==='navigate'){
   r.cityPhoto.style.transform=`scale(${1.05+.07*p}) translateY(${12*p}px)`;r.routeLine.style.strokeDashoffset=-t*35;r.arRoute.style.opacity=out((t-.8)/1.6);r.navDirection.style.opacity=out((t-1.1)/1.1);r.navDirection.style.transform=`translateX(-50%) translateY(${18*(1-out((t-1)/1.3))}px)`;r.navArrival.style.opacity=out((t-4)/1);
   put(r.navDirection.querySelector('strong'),alternateRoute?'120 m 后左转':'80 m 后右转');put(r.navDirection.querySelector('small'),alternateRoute?'前往街角书店':'前往河畔步道');put(r.turnIcon,alternateRoute?'↰':'↱');put(r.destination.querySelector('strong'),alternateRoute?'去书店逛逛':'去河畔走走');r.arRoute.style.transform=alternateRoute?'scaleX(-1)':'none';
  }else if(s.id==='recall'){
   const end=out((t-3.5)/1.5);r.cards.forEach((card,i)=>{const arrive=out((t-.5-i*.75)/1.2),rot=[-11,5,0][i],dx=[-65,45,0][i],dy=[-35,8,0][i];card.style.opacity=arrive;card.style.transform=`translate(${dx+(1-arrive)*260}px,${dy+(1-arrive)*50}px) rotate(${rot*(1-.3*end)}deg) scale(${.92+.08*arrive})`;});
   const question='“刚才那家咖啡馆，帮我找一下。”';put(r.memorySearch.querySelector('span:last-child'),question.slice(0,Math.floor(clamp((t-4)/2)*question.length)));r.memorySearch.style.opacity=out((t-3.8)/1);r.saved.style.opacity=out((t-2.6)/.7)*(1-out((t-5.7)/.8));
  }else if(s.id==='finale'){
   r.product.style.opacity=out((t-.2)/1.5);r.product.style.transform=`translateY(${20*(1-out(t/2))-12*Math.sin(p*Math.PI)}px) scale(${.94+.06*out(t/2)})`;show(r.finalBrand,t/1.4,15);show(r.finalNote,(t-1.2)/1.5,15);
  }
  put($('#time'),`${format(elapsed)} / ${format(total)}`);$('#seek').value=elapsed;progress.style.transform=`scaleX(${elapsed/total})`;
 }
 function seek(t){elapsed=clamp(t,0,total);manualSensor=null;alternate=false;alternateRoute=false;render();}
 function jump(i){setPlaying(false);const n=clamp(i,0,frames.length-1);seek(starts[n]+(n===0?0:cfg.scenes[n].duration*.55));}
 function tick(now){if(playing){elapsed=Math.min(total,elapsed+(now-last)/1000*speed);render();if(elapsed>=total)setPlaying(false);}last=now;requestAnimationFrame(tick);}
 function fit(){const v=$('#viewport'),s=Math.min(v.clientWidth/1600,v.clientHeight/900);stage.style.transform=`scale(${s})`;stage.style.left=`${(v.clientWidth-1600*s)/2}px`;stage.style.top=`${(v.clientHeight-900*s)/2}px`;}
 function clean(){document.body.classList.toggle('clean');put($('#clean'),document.body.classList.contains('clean')?'显示控件 H':'纯净 H');fit();}
 function full(){(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).catch(()=>put($('#fullscreen'),'浏览器 F11'));}
 $('#play').onclick=()=>{if(elapsed>=total)seek(0);setPlaying(!playing);};$('#replay').onclick=()=>{seek(0);setPlaying(true);};$('#previous').onclick=()=>jump(current-1);$('#next').onclick=()=>jump(current+1);$('#seek').oninput=e=>{const targetTime=Number(e.target.value);setPlaying(false);seek(targetTime);};$('#speed').onchange=e=>speed=Number(e.target.value);$('#clean').onclick=clean;$('#fullscreen').onclick=full;
 document.addEventListener('keydown',e=>{if(e.ctrlKey||e.altKey||e.metaKey||e.target.closest?.('input,select,textarea'))return;const k=e.key.toLowerCase();if([' ','r','h','f','arrowleft','arrowright'].includes(k))e.preventDefault();if(k===' ')$('#play').click();if(k==='r')$('#replay').click();if(k==='h')clean();if(k==='f')full();if(k==='arrowleft')jump(current-1);if(k==='arrowright')jump(current+1);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlaying(false);});new ResizeObserver(fit).observe($('#viewport'));
 window.film={seek,pause:()=>setPlaying(false),play:()=>setPlaying(true),get duration(){return total;},get time(){return elapsed;},get playing(){return playing;}};
 fit();render();requestAnimationFrame(tick);const params=new URLSearchParams(location.search);if(params.has('clean'))clean();if(params.has('autoplay'))setPlaying(true);
})();
