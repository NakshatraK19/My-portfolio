
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════
   LAYER 1 — SMOOTH SCROLL ENGINE (LENIS)
══════════════════════════════════════════════ */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.25,
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    smoothTouch: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

/* ══════════════════════════════════════════════
   LAYER 2 — LOADING SCREEN + CINEMATIC HERO ENTRANCE
══════════════════════════════════════════════ */
(function() {
  var loader = document.getElementById('page-loader');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startHeroEntrance() {
    if (prefersReduced) return;

    // Set initial states — text lines start below overflow hidden
    gsap.set('.hero-line-inner', { yPercent: 110 });
    gsap.set('.hero-sub', { opacity: 0, y: 30, filter: 'blur(6px)' });
    gsap.set('.hero-actions > *', { opacity: 0, y: 18, scale: 0.92 });
    gsap.set('.sec-eyebrow-wrap', { opacity: 0, y: 10 });

    var tl = gsap.timeline({ delay: 0.1 });
    tl.to('.hero-line-inner', {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power4.out'
      })
      .to('.hero-sub', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.0,
        ease: 'power3.out'
      }, '-=0.65')
      .to('.hero-actions > *', {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.1, duration: 0.75,
        ease: 'power3.out'
      }, '-=0.65')
      .to('.sec-eyebrow-wrap', {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: 'power2.out'
      }, '-=0.9');

    // Show scroll indicator after entrance settles
    setTimeout(function() {
      var hint = document.getElementById('scroll-hint');
      if (hint) hint.classList.add('show');
    }, 1900);
  }

  function hideLoader() {
    if (loader) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: function() {
          loader.classList.add('hidden');
          startHeroEntrance();
        }
      });
    } else {
      startHeroEntrance();
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener('load', function() { setTimeout(hideLoader, 400); });
  }
})();

/* ══════════════════════════════════════════════
   SCROLL HINT — dissolve on first scroll
══════════════════════════════════════════════ */
(function() {
  var hint = document.getElementById('scroll-hint');
  if (!hint) return;
  function hideHint() {
    hint.classList.remove('show');
    window.removeEventListener('scroll', hideHint);
  }
  window.addEventListener('scroll', hideHint, { passive: true });
})();

/* ══════ DATA ══════ */
var SKILLS = [
  {cat:'Gen AI & Foundation Models',icon:'⬡',skills:['Claude','Ollama','HF Transformers','OpenAI','Amazon Nova']},
  {cat:'Cloud AI Platforms',icon:'◈',skills:['AWS SageMaker','Azure AI','Cloud Solutions']},
  {cat:'Edge AI & Embedded',icon:'◎',skills:['Edge Impulse','Qualcomm AI Hub','TinyML','NVIDIA NeMo','CUDA','IoT']},
  {cat:'Programming',icon:'⬢',skills:['Python','MySQL','Selenium','REST APIs','C++','C']},
  {cat:'Embedded Electronics',icon:'⬡',skills:['Microcontrollers','Arduino','DSP','Analog Circuits','LTSpice']},
];

var PROJECTS = [
  {title:'AI Browser Automation',cat:'Automation',desc:'Intelligent agent using Claude Sonnet 4.6 to navigate, extract data, and interact via natural language.',tech:['Claude 4.6','Selenium','Python'],live:'https://browser-agentv2.vercel.app/',github:true,hueA:268,hueB:192},
  {title:'NL Database Query Agent',cat:'AI Infra',desc:'Converts natural language to optimized MongoDB operations using HF Transformers and MS Database Agent.',tech:['MongoDB','HF Transformers','Python'],live:'https://nl-db-agent-nk19.streamlit.app/',github:true,hueA:349,hueB:12},
  {title:'Disk Cleaning Software',cat:'Systems',desc:'Multi-pass secure data erasure, intelligent file categorization. SIH 2026 College Finalist.',tech:['Python','Cryptography','File Systems'],live:null,github:false,hueA:136,hueB:186},
  {title:'Rain-Sensing Auto Wiper',cat:'Embedded',desc:'Arduino based automated wiper with rain sensor feedback. Real-time embedded systems demonstration.',tech:['Arduino UNO','C++','Servo','IoT'],live:null,github:false,hueA:41,hueB:86},
];

/* ══════ BUILD SKILLS ══════ */
var sg = document.getElementById('skills-grid');
SKILLS.forEach(function(s) {
  sg.innerHTML += '<div class="skill-card border-glow-card"><span class="edge-light"></span><div class="border-glow-inner"><div class="skill-head"><div class="skill-icon-wrap">' + s.icon + '</div><div class="skill-cat">' + s.cat + '</div></div><div class="skill-tags">' + s.skills.map(function(sk){return '<span class="stag">' + sk + '</span>';}).join('') + '</div></div></div>';
});

/* ══════ BUILD PROJECTS ══════ */
var pg = document.getElementById('proj-grid');
PROJECTS.forEach(function(p, i) {
  var live = p.live ? '<a href="' + p.live + '" target="_blank" rel="noopener" class="proj-link">Live Demo &#8599;</a>' : '';
  var code = p.github ? '<a href="https://github.com/NakshatraK19" target="_blank" rel="noopener" class="proj-link">View Code &#8599;</a>' : '';
  var bg = 'linear-gradient(306deg, hsl(' + p.hueA + ', 100%, 50%), hsl(' + p.hueB + ', 100%, 50%))';
  pg.innerHTML += '<div class="proj-card-wrapper" id="card-wrap-' + i + '"><div class="proj-splash" style="background:' + bg + '"></div><div class="proj-card border-glow-card" id="card-' + i + '" style="opacity:0;transform:translateY(250px);"><span class="edge-light"></span><div class="border-glow-inner"><div class="proj-meta"><span class="proj-cat">' + p.cat + '</span></div><h3 class="proj-title">' + p.title + '</h3><p class="proj-desc">' + p.desc + '</p><div class="proj-tech">' + p.tech.map(function(t){return '<span class="stag">' + t + '</span>';}).join('') + '</div><div class="proj-foot">' + code + live + '</div></div></div></div>';
});

/* ══════════════════════════════════════════════
   BACKGROUND CROSSFADE — hero video → dot field
══════════════════════════════════════════════ */
(function() {
  var vid = document.getElementById('hero-vid');
  var dotContainer = document.getElementById('dot-field-container');

  if (vid && dotContainer) {
    gsap.to(vid, {
      scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom top', scrub: true },
      opacity: 0,
      onUpdate: function() {
        try { vid.playbackRate = Math.max(0.1, 1 - (this.progress() * 0.8)); } catch(e) {}
      }
    });

    gsap.to(dotContainer, {
      scrollTrigger: { trigger: '#about', start: 'center top', end: 'bottom top', scrub: true },
      opacity: 1
    });

    ScrollTrigger.create({
      trigger: '#about', start: 'top bottom', end: 'bottom top',
      onEnter: function() { vid.play(); },
      onEnterBack: function() { vid.play(); },
      onLeave: function() { vid.pause(); },
      onLeaveBack: function() { vid.pause(); }
    });
  }
})();

/* ══════════════════════════════════════════════
   SCROLL PROJECT CARDS — Motion inView animate
══════════════════════════════════════════════ */
(function() {
  if (typeof Motion === 'undefined') return;
  var inView = Motion.inView;
  var animate = Motion.animate;

  var wrappers = document.querySelectorAll('.proj-card-wrapper');
  wrappers.forEach(function(wrapper, i) {
    var card = wrapper.querySelector('.proj-card');
    var rotation = (i % 2 === 0) ? -6 : 6;
    inView(wrapper, function() {
      animate(card, { y: [250, 0], rotate: [0, rotation], opacity: [0, 1] }, {
        type: 'tween', duration: 1.5, ease: 'easeOut', delay: (i % 2) * 0.2
      });
    }, { amount: 0.15 });
  });
})();

/* ══════════════════════════════════════════════
   LAYER 3 — PARALLAX HERO DEPTH
══════════════════════════════════════════════ */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var heroInner = document.querySelector('.hero-inner');
  if (!heroInner) return;
  gsap.to(heroInner, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom top', scrub: 1.2 }
  });
})();

/* ══════════════════════════════════════════════
   LAYER 4 — SECTION REVEALS (cinematic stagger)
══════════════════════════════════════════════ */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Section headers
  gsap.utils.toArray('.sec-header').forEach(function(header) {
    var eyebrow = header.querySelector('.sec-eyebrow-wrap');
    var title   = header.querySelector('.sec-title');
    var sub     = header.querySelector('.sec-sub');
    var tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top 82%', once: true } });
    if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' });
    if (title)   tl.from(title,   { opacity: 0, y: 36, duration: 0.9, ease: 'power4.out' }, '-=0.4');
    if (sub)     tl.from(sub,     { opacity: 0, y: 22, duration: 0.75, ease: 'power3.out' }, '-=0.5');
  });

  // Skill cards — staggered wave
  ScrollTrigger.batch('.skill-card', {
    onEnter: function(batch) {
      gsap.from(batch, { opacity: 0, y: 48, stagger: 0.1, duration: 0.85, ease: 'power3.out' });
    },
    start: 'top 88%',
    once: true
  });

  // Contact card
  var contactCards = gsap.utils.toArray('.contact-card');
  if (contactCards.length) {
    gsap.from(contactCards, {
      opacity: 0, y: 40, stagger: 0.12, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-grid', start: 'top 85%', once: true }
    });
  }

  // Footer
  var footer = document.querySelector('.footer');
  if (footer) {
    gsap.from(footer, {
      opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: footer, start: 'top 95%', once: true }
    });
  }
})();

/* ══════════════════════════════════════════════
   LAYER 5 — 3D CARD TILT (holographic depth)
══════════════════════════════════════════════ */
(function() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.proj-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 16, rotationX: -y * 16,
        duration: 0.35, ease: 'power2.out',
        transformPerspective: 1200, z: 12
      });
    });
    card.addEventListener('mouseleave', function() {
      gsap.to(card, {
        rotationY: 0, rotationX: 0, z: 0,
        duration: 1.1, ease: 'elastic.out(1, 0.4)'
      });
    });
  });
})();

/* ══════════════════════════════════════════════
   LAYER 6 — MAGNETIC BUTTONS (subtle pull)
══════════════════════════════════════════════ */
(function() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll('.btn-primary, .btn-ghost, #resume-btn, .nav-cta');
  targets.forEach(function(el) {
    el.addEventListener('mousemove', function(e) {
      var rect = el.getBoundingClientRect();
      var dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
      var dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', function() {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    });
  });
})();

/* ══════ BORDER GLOW LOGIC ══════ */
(function(){
  function parseHSL(hslStr) {
    var match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 254, s: 89, l: 59 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }
  function buildGlowVars(glowColor, intensity) {
    var c = parseHSL(glowColor);
    var base = c.h + 'deg ' + c.s + '% ' + c.l + '%';
    var opacities = [100, 60, 50, 40, 30, 20, 10];
    var keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    var vars = {};
    for (var i = 0; i < opacities.length; i++) {
      vars['--glow-color' + keys[i]] = 'hsl(' + base + ' / ' + Math.min(opacities[i] * intensity, 100) + '%)';
    }
    return vars;
  }
  var GRADIENT_POSITIONS = ['80% 55%','69% 34%','8% 6%','41% 38%','86% 85%','82% 18%','51% 4%'];
  var GRADIENT_KEYS = ['--gradient-one','--gradient-two','--gradient-three','--gradient-four','--gradient-five','--gradient-six','--gradient-seven'];
  var COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];
  function buildGradientVars(colors) {
    var vars = {};
    for (var i = 0; i < 7; i++) {
      var c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = 'radial-gradient(at ' + GRADIENT_POSITIONS[i] + ', ' + c + ' 0px, transparent 50%)';
    }
    vars['--gradient-base'] = 'linear-gradient(' + colors[0] + ' 0 100%)';
    return vars;
  }
  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInCubic(x) { return x * x * x; }
  function animateValue(opts) {
    var start = opts.start || 0, end = opts.end !== undefined ? opts.end : 100;
    var duration = opts.duration || 1000, delay = opts.delay || 0;
    var ease = opts.ease || easeOutCubic;
    var t0 = performance.now() + delay;
    function tick() {
      var elapsed = performance.now() - t0;
      var t = Math.max(0, Math.min(elapsed / duration, 1));
      if (elapsed >= 0) opts.onUpdate(start + (end - start) * ease(t));
      if (t < 1) requestAnimationFrame(tick);
      else if (opts.onEnd) opts.onEnd();
    }
    requestAnimationFrame(tick);
  }
  function getCenterOfElement(el) {
    var rect = el.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  }
  function getEdgeProximity(el, x, y) {
    var c = getCenterOfElement(el);
    var dx = x - c[0], dy = y - c[1];
    var kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = c[0] / Math.abs(dx);
    if (dy !== 0) ky = c[1] / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }
  function getCursorAngle(el, x, y) {
    var c = getCenterOfElement(el);
    var dx = x - c[0], dy = y - c[1];
    if (dx === 0 && dy === 0) return 0;
    var degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }
  var glowConfig = {
    edgeSensitivity:30, glowColor:'254 89 59', borderRadius:16, glowRadius:40,
    glowIntensity:1.0, coneSpread:25, colors:['#663af3','#d1e4fa','#b6d9fc'], fillOpacity:0.5
  };
  var gVars = buildGlowVars(glowConfig.glowColor, glowConfig.glowIntensity);
  var gradVars = buildGradientVars(glowConfig.colors);
  var combinedVars = Object.assign({
    '--edge-sensitivity': glowConfig.edgeSensitivity,
    '--border-radius': glowConfig.borderRadius + 'px',
    '--glow-padding': glowConfig.glowRadius + 'px',
    '--cone-spread': glowConfig.coneSpread,
    '--fill-opacity': glowConfig.fillOpacity
  }, gVars, gradVars);

  document.querySelectorAll('.border-glow-card').forEach(function(card) {
    for (var k in combinedVars) { card.style.setProperty(k, combinedVars[k]); }
    var angleStart = 110, angleEnd = 465;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', angleStart + 'deg');
    animateValue({ duration:500, onUpdate: function(v) { card.style.setProperty('--edge-proximity', v); } });
    animateValue({ ease:easeInCubic, duration:1500, end:50, onUpdate: function(v) {
      card.style.setProperty('--cursor-angle', ((angleEnd - angleStart) * (v / 100) + angleStart) + 'deg');
    }});
    animateValue({ ease:easeOutCubic, delay:1500, duration:2250, start:50, end:100, onUpdate: function(v) {
      card.style.setProperty('--cursor-angle', ((angleEnd - angleStart) * (v / 100) + angleStart) + 'deg');
    }});
    animateValue({ ease:easeInCubic, delay:2500, duration:1500, start:100, end:0,
      onUpdate: function(v) { card.style.setProperty('--edge-proximity', v); },
      onEnd: function() { card.classList.remove('sweep-active'); }
    });
    card.addEventListener('pointermove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left, y = e.clientY - rect.top;
      card.style.setProperty('--edge-proximity', (getEdgeProximity(card, x, y) * 100).toFixed(3));
      card.style.setProperty('--cursor-angle', getCursorAngle(card, x, y).toFixed(3) + 'deg');
    });
  });
})();

/* ══════════════════════════════════════════════
   LAYER 7 — DOT FIELD (scroll velocity reactive)
══════════════════════════════════════════════ */
(function(){
  var TWO_PI = Math.PI * 2;
  var p = {
    dotRadius:1.5, dotSpacing:14, cursorRadius:500,
    bulgeStrength:67, glowRadius:160,
    gradientFrom:'rgba(102, 58, 243, 0.35)',
    gradientTo:'rgba(216, 236, 248, 0.25)',
  };
  var canvas = document.getElementById('dot-canvas');
  var glowEl = document.getElementById('dot-glow');
  if (!canvas) return;
  var ctx = canvas.getContext('2d', { alpha: true });
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var resizeTimer, dots = [], frameCount = 0;
  var mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
  var size = { w: 0, h: 0 };
  var glowOpacity = 0, engagement = 0;
  var scrollVel = 0, lastScrollY = 0;

  function buildDots(w, h) {
    var step = p.dotRadius + p.dotSpacing;
    var cols = Math.floor(w / step), rows = Math.floor(h / step);
    var padX = (w % step) / 2, padY = (h % step) / 2;
    dots = [];
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        var ax = padX + col * step + step / 2;
        var ay = padY + row * step + step / 2;
        dots.push({ ax:ax, ay:ay, sx:ax, sy:ay, x:ax, y:ay });
      }
    }
  }
  function doResize() {
    var w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    size.w = w; size.h = h;
    buildDots(w, h);
  }
  function resize() { clearTimeout(resizeTimer); resizeTimer = setTimeout(doResize, 100); }

  window.addEventListener('mousemove', function(e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive:true });
  window.addEventListener('scroll', function() {
    var sy = window.scrollY;
    scrollVel = Math.abs(sy - lastScrollY);
    lastScrollY = sy;
  }, { passive:true });

  setInterval(function() {
    var dx = mouse.prevX - mouse.x, dy = mouse.prevY - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    mouse.speed += (dist - mouse.speed) * 0.5;
    if (mouse.speed < 0.001) mouse.speed = 0;
    mouse.prevX = mouse.x; mouse.prevY = mouse.y;
    scrollVel *= 0.82;
  }, 20);

  function tick() {
    frameCount++;
    var len = dots.length;
    var cursorEng = Math.min(mouse.speed / 5, 1);
    var scrollEng = Math.min(scrollVel / 18, 0.7);
    var targetEngagement = Math.max(cursorEng, scrollEng);
    engagement += (targetEngagement - engagement) * 0.06;
    if (engagement < 0.001) engagement = 0;
    glowOpacity += (engagement - glowOpacity) * 0.08;
    if (glowEl) {
      glowEl.setAttribute('cx', mouse.x);
      glowEl.setAttribute('cy', mouse.y);
      glowEl.style.opacity = glowOpacity;
    }
    ctx.clearRect(0, 0, size.w, size.h);
    var grad = ctx.createLinearGradient(0, 0, size.w, size.h);
    grad.addColorStop(0, p.gradientFrom);
    grad.addColorStop(1, p.gradientTo);
    ctx.fillStyle = grad;
    var crSq = p.cursorRadius * p.cursorRadius;
    var rad = p.dotRadius / 2;
    ctx.beginPath();
    for (var i = 0; i < len; i++) {
      var d = dots[i];
      var dx2 = mouse.x - d.ax, dy2 = mouse.y - d.ay;
      var distSq = dx2 * dx2 + dy2 * dy2;
      if (distSq < crSq && engagement > 0.01) {
        var dist2 = Math.sqrt(distSq);
        var t2 = 1 - dist2 / p.cursorRadius;
        var push = t2 * t2 * p.bulgeStrength * engagement;
        var angle2 = Math.atan2(dy2, dx2);
        d.sx += (d.ax - Math.cos(angle2) * push - d.sx) * 0.15;
        d.sy += (d.ay - Math.sin(angle2) * push - d.sy) * 0.15;
      } else {
        d.sx += (d.ax - d.sx) * 0.1;
        d.sy += (d.ay - d.sy) * 0.1;
      }
      ctx.moveTo(d.sx + rad, d.sy);
      ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
    }
    ctx.fill();
    requestAnimationFrame(tick);
  }
  doResize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();

/* ══════ CURSOR ══════ */
(function(){
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
  var rx = -200, ry = -200, rmx = -200, rmy = -200;
  window.addEventListener('mousemove', function(e) {
    dot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    rmx = e.clientX; rmy = e.clientY;
    if (Math.random() < 0.15) {
      var t = document.createElement('div');
      t.style.cssText = 'position:fixed;width:2px;height:2px;border-radius:50%;background:var(--color-ice-highlight);pointer-events:none;z-index:9990;left:' + e.clientX + 'px;top:' + e.clientY + 'px;transform:translate(-50%,-50%);opacity:.5;transition:opacity .4s,transform .4s;';
      document.body.appendChild(t);
      requestAnimationFrame(function() { t.style.opacity = '0'; t.style.transform = 'translate(-50%,-50%) scale(0.1)'; });
      setTimeout(function() { t.remove(); }, 450);
    }
  });
  (function anim() { rx += (rmx - rx) * 0.15; ry += (rmy - ry) * 0.15; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(anim); })();
  document.addEventListener('mouseover', function(e) { if (e.target.closest('a,button,.proj-card,.skill-card,.contact-card')) document.body.classList.add('cur-link'); });
  document.addEventListener('mouseout',  function(e) { if (e.target.closest('a,button,.proj-card,.skill-card,.contact-card')) document.body.classList.remove('cur-link'); });
  document.addEventListener('mouseleave', function() { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', function() { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ══════ COPY EMAIL ══════ */
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(function() {
    var old = btn.innerText;
    btn.innerText = 'Copied!';
    setTimeout(function() { btn.innerText = old; }, 2000);
  });
}

/* ══════ RESUME BUTTON & NAV SCROLL ══════ */
setTimeout(function() { document.getElementById('resume-btn').classList.add('show'); }, 1200);

var navEl = document.getElementById('nav');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) navEl.classList.add('scrolled');
  else navEl.classList.remove('scrolled');
}, { passive: true });
