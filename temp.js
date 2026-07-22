
gsap.registerPlugin(ScrollTrigger);

/* ══════ DATA ══════ */
const SKILLS = [
  {cat:'Gen AI & Foundation Models',icon:'⬡',skills:['Claude','Ollama','HF Transformers','OpenAI','Amazon Nova']},
  {cat:'Cloud AI Platforms',icon:'◈',skills:['AWS SageMaker','Azure AI','Cloud Solutions']},
  {cat:'Edge AI & Embedded',icon:'◎',skills:['Edge Impulse','Qualcomm AI Hub','TinyML','NVIDIA NeMo','CUDA','IoT']},
  {cat:'Programming',icon:'⬢',skills:['Python','MySQL','Selenium','REST APIs','C++','C']},
  {cat:'Embedded Electronics',icon:'⬡',skills:['Microcontrollers','Arduino','DSP','Analog Circuits','LTSpice']},
];

const PROJECTS = [
  {title:'AI Browser Automation',cat:'Automation',desc:'Intelligent agent using Claude Sonnet 4.6 to navigate, extract data, and interact via natural language.',tech:['Claude 4.6','Selenium','Python'],live:'https://browser-agentv2.vercel.app/',github:true, hueA: 268, hueB: 192},
  {title:'NL Database Query Agent',cat:'AI Infra',desc:'Converts natural language to optimized MongoDB operations using HF Transformers and MS Database Agent.',tech:['MongoDB','HF Transformers','Python'],live:'https://nl-db-agent-nk19.streamlit.app/',github:true, hueA: 349, hueB: 12},
  {title:'Disk Cleaning Software',cat:'Systems',desc:'Multi-pass secure data erasure, intelligent file categorization. SIH 2026 College Finalist.',tech:['Python','Cryptography','File Systems'],live:null,github:false, hueA: 136, hueB: 186},
  {title:'Rain-Sensing Auto Wiper',cat:'Embedded',desc:'Arduino based automated wiper with rain sensor feedback. Real-time embedded systems demonstration.',tech:['Arduino UNO','C++','Servo','IoT'],live:null,github:false, hueA: 41, hueB: 86},
];

/* ══════ BUILD SKILLS ══════ */
const sg = document.getElementById('skills-grid');
SKILLS.forEach(s=>{
  sg.innerHTML += `
  <div class="skill-card border-glow-card">
    <span class="edge-light"></span>
    <div class="border-glow-inner">
      <div class="skill-head">
        <div class="skill-icon-wrap">${s.icon}</div>
        <div class="skill-cat">${s.cat}</div>
      </div>
      <div class="skill-tags">${s.skills.map(sk=>`<span class="stag">${sk}</span>`).join('')}</div>
    </div>
  </div>`;
});

/* ══════ BUILD PROJECTS SCROLL LIST ══════ */
const pg = document.getElementById('proj-grid');
PROJECTS.forEach((p,i)=>{
  const live = p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="proj-link">Live Demo ↗</a>` : '';
  const code = p.github ? `<a href="https://github.com/NakshatraK19" target="_blank" rel="noopener" class="proj-link">View Code ↗</a>` : '';
  const bg = `linear-gradient(306deg, hsl(${p.hueA}, 100%, 50%), hsl(${p.hueB}, 100%, 50%))`;
  
  pg.innerHTML += `
  <div class="proj-card-wrapper" id="card-wrap-${i}">
    <div class="proj-splash" style="background: ${bg}"></div>
    <div class="proj-card border-glow-card" id="card-${i}" style="transform: translateY(300px);">
      <span class="edge-light"></span>
      <div class="border-glow-inner">
        <div class="proj-meta"><span class="proj-cat">${p.cat}</span></div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.desc}</p>
        <div class="proj-tech">${p.tech.map(t=>`<span class="stag">${t}</span>`).join('')}</div>
        <div class="proj-foot">
          ${code}
          ${live}
        </div>
      </div>
    </div>
  </div>`;
});

/* ══════ BACKGROUND TRANSITION LOGIC ══════ */
(function(){
  const vid = document.getElementById('hero-vid');
  const dotContainer = document.getElementById('dot-field-container');
  
  if (vid && dotContainer) {
    // Scroll-driven crossfade
    gsap.to(vid, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      onUpdate: function() {
        try { vid.playbackRate = Math.max(0.1, 1 - (this.progress() * 0.8)); } catch(e) {}
      }
    });

    gsap.to(dotContainer, {
      scrollTrigger: {
        trigger: '#about',
        start: 'center top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 1
    });

    // Pause video when out of viewport for performance
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => vid.play(),
      onEnterBack: () => vid.play(),
      onLeave: () => vid.pause(),
      onLeaveBack: () => vid.pause()
    });
  }
})();

/* ══════ SCROLL PROJECT LOGIC ══════ */
(function(){
  if (typeof Motion === 'undefined') return;
  const { inView, animate } = Motion;
  
  const wrappers = document.querySelectorAll('.proj-card-wrapper');
  wrappers.forEach((wrapper, i) => {
    const card = wrapper.querySelector('.proj-card');
    
    // Initial state set in CSS style attribute (y: 300px).
    // Alternating rotation based on index
    const rotation = (i % 2 === 0) ? -10 : 10;
    
    inView(wrapper, () => {
      animate(
        card, 
        { y: [300, 50], rotate: [0, rotation] }, 
        { 
          type: "spring", 
          bounce: 0.4, 
          duration: 0.8 
        }
      );
    }, { amount: 0.8 }); // Trigger when 80% in view
  });
})();

/* ══════ BORDER GLOW LOGIC ══════ */
(function(){
  function parseHSL(hslStr) {
    const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 254, s: 89, l: 59 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }
  function buildGlowVars(glowColor, intensity) {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }
  const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInCubic(x) { return x * x * x; }
  function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
    const t0 = performance.now() + delay;
    function tick() {
      const elapsed = performance.now() - t0;
      const t = Math.max(0, Math.min(elapsed / duration, 1));
      if (elapsed >= 0) onUpdate(start + (end - start) * ease(t));
      if (t < 1) requestAnimationFrame(tick);
      else if (onEnd) onEnd();
    }
    requestAnimationFrame(tick);
  }

  const getCenterOfElement = (el) => {
    const rect = el.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  };

  const getEdgeProximity = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  };

  const getCursorAngle = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  };

  const glowConfig = {
    edgeSensitivity: 30,
    glowColor: '254 89 59', 
    borderRadius: 16,
    glowRadius: 40,
    glowIntensity: 1.0,
    coneSpread: 25,
    colors: ['#663af3', '#d1e4fa', '#b6d9fc'],
    fillOpacity: 0.5
  };

  const gVars = buildGlowVars(glowConfig.glowColor, glowConfig.glowIntensity);
  const gradVars = buildGradientVars(glowConfig.colors);
  const combinedVars = {
    '--edge-sensitivity': glowConfig.edgeSensitivity,
    '--border-radius': `${glowConfig.borderRadius}px`,
    '--glow-padding': `${glowConfig.glowRadius}px`,
    '--cone-spread': glowConfig.coneSpread,
    '--fill-opacity': glowConfig.fillOpacity,
    ...gVars,
    ...gradVars
  };

  document.querySelectorAll('.border-glow-card').forEach(card => {
    for (const [k, v] of Object.entries(combinedVars)) {
      card.style.setProperty(k, v);
    }
    const angleStart = 110, angleEnd = 465;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', v) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--edge-proximity', v),
      onEnd: () => card.classList.remove('sweep-active'),
    });

    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);
      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    });
  });
})();

/* ══════ DOT FIELD BACKGROUND ══════ */
(function(){
  const TWO_PI = Math.PI * 2;
  const p = {
    dotRadius: 1.5, dotSpacing: 14, cursorRadius: 500, cursorForce: 0.1,
    bulgeOnly: true, bulgeStrength: 67, glowRadius: 160, sparkle: false, waveAmplitude: 0,
    gradientFrom: 'rgba(102, 58, 243, 0.35)', // void-violet
    gradientTo: 'rgba(216, 236, 248, 0.25)', // ice-highlight
  };

  const canvas = document.getElementById('dot-canvas');
  const glowEl = document.getElementById('dot-glow');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let resizeTimer, dots = [], frameCount = 0;
  const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
  const size = { w: 0, h: 0 };
  let glowOpacity = 0, engagement = 0, rafRef;

  function buildDots(w, h) {
    const step = p.dotRadius + p.dotSpacing;
    const cols = Math.floor(w / step);
    const rows = Math.floor(h / step);
    const padX = (w % step) / 2;
    const padY = (h % step) / 2;
    dots = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        dots.push({ ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay });
      }
    }
  }

  function doResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    size.w = w; size.h = h;
    buildDots(w, h);
  }

  function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(doResize, 100);
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  setInterval(() => {
    const dx = mouse.prevX - mouse.x;
    const dy = mouse.prevY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    mouse.speed += (dist - mouse.speed) * 0.5;
    if (mouse.speed < 0.001) mouse.speed = 0;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
  }, 20);

  function tick() {
    frameCount++;
    const len = dots.length;
    const t = frameCount * 0.02;

    const targetEngagement = Math.min(mouse.speed / 5, 1);
    engagement += (targetEngagement - engagement) * 0.06;
    if (engagement < 0.001) engagement = 0;
    
    glowOpacity += (engagement - glowOpacity) * 0.08;
    if (glowEl) {
      glowEl.setAttribute('cx', mouse.x);
      glowEl.setAttribute('cy', mouse.y);
      glowEl.style.opacity = glowOpacity;
    }

    ctx.clearRect(0, 0, size.w, size.h);
    const grad = ctx.createLinearGradient(0, 0, size.w, size.h);
    grad.addColorStop(0, p.gradientFrom);
    grad.addColorStop(1, p.gradientTo);
    ctx.fillStyle = grad;

    const crSq = p.cursorRadius * p.cursorRadius;
    const rad = p.dotRadius / 2;

    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const d = dots[i];
      const dx = mouse.x - d.ax;
      const dy = mouse.y - d.ay;
      const distSq = dx * dx + dy * dy;

      if (distSq < crSq && engagement > 0.01) {
        const dist = Math.sqrt(distSq);
        const t2 = 1 - dist / p.cursorRadius;
        const push = t2 * t2 * p.bulgeStrength * engagement;
        const angle = Math.atan2(dy, dx);
        d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
        d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
      } else {
        d.sx += (d.ax - d.sx) * 0.1;
        d.sy += (d.ay - d.sy) * 0.1;
      }

      ctx.moveTo(d.sx + rad, d.sy);
      ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
    }
    ctx.fill();
    rafRef = requestAnimationFrame(tick);
  }

  doResize();
  window.addEventListener('resize', resize);
  rafRef = requestAnimationFrame(tick);
})();

/* ══════ CURSOR ══════ */
(function(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const dot=document.getElementById('cur-dot'), ring=document.getElementById('cur-ring');
  let rx=-200, ry=-200, rmx=-200, rmy=-200;
  window.addEventListener('mousemove',e=>{
    dot.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
    rmx=e.clientX; rmy=e.clientY;
    if(Math.random()<.15){
      const t=document.createElement('div');
      t.style.cssText=`position:fixed;width:2px;height:2px;border-radius:50%;background:var(--color-ice-highlight);pointer-events:none;z-index:9990;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);opacity:.5;transition:opacity .4s,transform .4s;`;
      document.body.appendChild(t);
      requestAnimationFrame(()=>{t.style.opacity='0';t.style.transform='translate(-50%,-50%) scale(0.1)'});
      setTimeout(()=>t.remove(),450);
    }
  });
  (function anim(){rx+=(rmx-rx)*.15;ry+=(rmy-ry)*.15;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(anim);})();
  document.addEventListener('mouseover',e=>{if(e.target.closest('a,button, .proj-card, .skill-card, .contact-card'))document.body.classList.add('cur-link');});
  document.addEventListener('mouseout',e=>{if(e.target.closest('a,button, .proj-card, .skill-card, .contact-card'))document.body.classList.remove('cur-link');});
  document.addEventListener('mouseleave',()=>{dot.style.opacity='0';ring.style.opacity='0'});
  document.addEventListener('mouseenter',()=>{dot.style.opacity='1';ring.style.opacity='1'});
})();

/* ══════ COPY EMAIL ══════ */
function copyText(text,btn){
  navigator.clipboard.writeText(text).then(()=>{
    const old=btn.innerText;
    btn.innerText='Copied!';
    setTimeout(()=>btn.innerText=old,2000);
  });
}

/* ══════ RESUME BUTTON & NAV SCROLL ══════ */
setTimeout(()=>document.getElementById('resume-btn').classList.add('show'),1000);

const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navEl.classList.add('scrolled');
  } else {
    navEl.classList.remove('scrolled');
  }
}, { passive: true });
