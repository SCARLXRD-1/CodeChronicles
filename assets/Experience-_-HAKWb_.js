import{M as d,O as Tt,B as k,F as it,S as I,U as G,V as C,W as X,H as Z,N as bt,C as wt,a as p,R as Dt,b as Pt,c as At,L as Et,d as Rt,e as It,A as Mt,f as _t,g as Ut,h as Ft,i as kt,P as zt,j as v,T as K,k as Q,l as ot,m as D,n as lt,o as M,G as T,p as B,I as Lt,q as N,r as Bt,D as Gt,s as Y,t as F,u as O,v as nt,w,x as ct,y as Nt,z as rt,E as at,J as S,K as P,Q as Ot,X as j,Y as tt,Z as Ht,_ as ut,$ as Wt,a0 as dt,a1 as jt,a2 as Vt}from"./three-b0qLCAa7.js";import{c as pt}from"./index-C8vY63hw.js";const Ct={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class z{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Qt=new Tt(-1,1,1,-1,0,1);class Yt extends k{constructor(){super(),this.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new it([0,2,0,0,2,0],2))}}const Xt=new Yt;class J{constructor(t){this._mesh=new d(Xt,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Qt)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class ht extends z{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof I?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=G.clone(t.uniforms),this.material=new I({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new J(this.material)}render(t,e,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class mt extends z{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,s){const i=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,n;this.inverse?(r=0,n=1):(r=1,n=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),o.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),o.buffers.stencil.setClear(n),o.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(i.EQUAL,1,4294967295),o.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),o.buffers.stencil.setLocked(!0)}}class Zt extends z{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Kt{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const s=t.getSize(new C);this._width=s.width,this._height=s.height,e=new X(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Z}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ht(Ct),this.copyPass.material.blending=bt,this.clock=new wt}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let s=!1;for(let i=0,o=this.passes.length;i<o;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),r.needsSwap){if(s){const n=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(n.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(n.EQUAL,1,4294967295)}this.swapBuffers()}mt!==void 0&&(r instanceof mt?s=!0:r instanceof Zt&&(s=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new C);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(s,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class qt extends z{constructor(t,e,s=null,i=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new p}render(t,e,s){const i=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=i}}const $t={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Jt extends z{constructor(){super();const t=$t;this.uniforms=G.clone(t.uniforms),this.material=new Dt({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new J(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Pt.getTransfer(this._outputColorSpace)===At&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Et?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Rt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===It?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Mt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===_t?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ut&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class te{renderer;scene;camera;canvas;composer;renderPass;outputPass;useComposer=!0;reduceMotion;raf=0;clock=new wt;running=!1;elapsed=0;maxDt=.05;hidden=!1;constructor(t="#webgl"){this.canvas=document.querySelector(t),this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.renderer=new Ft({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",alpha:!0}),this.renderer.toneMapping=Mt,this.renderer.toneMappingExposure=1.1,this.scene=new kt,this.scene.background=new p(329482),this.camera=new zt(45,this.aspect,.1,400),this.camera.position.set(0,0,8),this.composer=new Kt(this.renderer),this.renderPass=new qt(this.scene,this.camera),this.composer.addPass(this.renderPass),this.outputPass=new Jt,this.composer.addPass(this.outputPass),this.boundResize=()=>this.onResize(),window.addEventListener("resize",this.boundResize),this.onResize(),this.renderer.setPixelRatio(this.devicePixelRatio()),document.addEventListener("visibilitychange",()=>{this.hidden=document.hidden})}boundResize;devicePixelRatio(){const e=window.innerWidth<768||/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)?1.25:2;return Math.min(window.devicePixelRatio||1,e)}get aspect(){return window.innerWidth/Math.max(1,window.innerHeight)}onResize(){const t=window.innerWidth,e=window.innerHeight,s=this.devicePixelRatio();this.renderer.setPixelRatio(s),this.renderer.setSize(t,e,!1),this.composer.setPixelRatio(s),this.composer.setSize(t,e),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}addPass(t){const s=this.composer.passes.indexOf(this.outputPass);s>=0?this.composer.insertPass(t,s):this.composer.addPass(t)}getComposer(){return this.composer}start(t){if(this.running)return;this.running=!0;const e=()=>{if(this.raf=requestAnimationFrame(e),this.hidden)return;const s=Math.min(this.maxDt,this.clock.getDelta());this.elapsed+=s,t(this.elapsed,s),this.useComposer&&!this.reduceMotion?this.composer.render(s):this.renderer.render(this.scene,this.camera)};this.clock.start(),e()}stop(){this.running=!1,cancelAnimationFrame(this.raf)}getScene(){return this.scene}getCamera(){return this.camera}getRenderer(){return this.renderer}dispose(){this.stop(),window.removeEventListener("resize",this.boundResize),this.composer.dispose(),this.renderer.dispose()}}class ee{constructor(t=12){this.sections=t,this.onScroll=this.onScroll.bind(this),this.onResize=this.onResize.bind(this),window.addEventListener("scroll",this.onScroll,{passive:!0}),window.addEventListener("resize",this.onResize),document.addEventListener("DOMContentLoaded",()=>this.measure()),this.measure()}scrollY=0;viewportHeight=window.innerHeight;documentHeight=0;reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;measure(){this.documentHeight=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.getElementById("overlay")?.scrollHeight||0,document.getElementById("app")?.scrollHeight||0)}onScroll(){this.scrollY=window.scrollY||window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,this.reduceMotion&&window.scrollTo({top:0})}onResize(){this.viewportHeight=window.innerHeight,this.measure()}manualProgress=null;manualPixels=0;setProgress(t,e=0){this.manualProgress=Math.max(0,Math.min(1,t)),this.manualPixels=e}snapshot(){this.documentHeight<=this.viewportHeight&&this.measure();const t=Math.max(1,this.documentHeight-this.viewportHeight),e=this.manualProgress!==null?this.manualPixels:window.scrollY||window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||this.scrollY,s=this.reduceMotion?0:this.manualProgress!==null?this.manualProgress:Math.min(1,Math.max(0,e/t)),i=s*this.sections,o=Math.min(this.sections-1,Math.floor(i)),r=i-Math.floor(i);return{progress:s,section:o,sectionProgress:r,scrollY:e,scrollHeight:this.documentHeight,viewportHeight:this.viewportHeight}}getSections(){return this.sections}setScrollY(t){this.scrollY=t}dispose(){window.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onResize)}}class se{constructor(t,e=[],s=45){this.camera=t,this.baseFov=s,this.camera.fov=s,this.camera.updateProjectionMatrix(),this.keys=e}keys=[];baseFov;setKeys(t){this.keys.length=0,this.keys.push(...t),this.applyTo(0)}smoothstep(t,e,s){const i=v.clamp(s,0,1),o=i*i*(3-2*i);return t+(e-t)*o}applyTo(t){const e=this.keys.length;if(e===0)return;const s=Math.min(Math.floor(t),e-1),i=Math.min(s+1,e-1),o=t-s,r=this.keys[s],n=this.keys[i];this.camera.position.lerpVectors(r.position,n.position,this.smoothstep(0,1,o)),this.camera.lookAt(r.target.x+(n.target.x-r.target.x)*this.smoothstep(0,1,o),r.target.y+(n.target.y-r.target.y)*this.smoothstep(0,1,o),r.target.z+(n.target.z-r.target.z)*this.smoothstep(0,1,o));const h=this.camera.aspect<1?Math.min(1.35,.72/Math.max(.42,this.camera.aspect)):1,u=(r.fov??this.baseFov)*h,l=(n.fov??this.baseFov)*h,g=this.smoothstep(u,l,o);Math.abs(this.camera.fov-g)>.01&&(this.camera.fov=g,this.camera.updateProjectionMatrix())}update(t){this.applyTo(t.section+t.sectionProgress)}dispose(){}}function f(a,t={}){return new Y({color:a,roughness:.85,metalness:.35,...t})}function x(a,t){return a+Math.random()*(t-a)}function y(){return new T}function b(a){const{root:t}=a,e=new Bt(a.ambientColor??13214315,a.ambientIntensity??.6),s=new Gt(a.keyColor??16773853,a.keyIntensity??1.1);return s.position.set(2,4,3),t.add(e,s),[{mesh:t}]}const ft={"pre-code":()=>{const a={root:y(),ambientIntensity:.6,keyIntensity:1.1},t=b(a),e=a.root;for(let s=0;s<9;s++){const i=new d(new B(.5,.5,.35,32),f(9073488)),o=new d(new K(.55,.09,8,24),f(8020544));o.rotation.x=Math.PI/2,i.add(o);const r=s/9*Math.PI*2,n=3+s%3*1.4;i.position.set(Math.cos(r)*n,Math.sin(r)*n*.8,-s*1.6),i.rotation.z=r,i.userData.speed=x(.2,.9),i.userData.axis=r,e.add(i),t.push({mesh:i,update:c=>{i.rotation.z=i.userData.axis+c*i.userData.speed}})}for(let s=0;s<6;s++){const i=new d(new N(1.4,.9),f(14207395,{side:F}));i.position.set(x(-4,4),x(-3,3),x(-2,-12)),i.rotation.set(x(-.4,.4),x(-.4,.4),0),i.userData.drift=x(-.3,.3),e.add(i),t.push({mesh:i,update:o=>{i.rotation.z=i.userData.drift+Math.sin(o*.4+s)*.05,i.position.y+=Math.sin(o*.5+s*2)*8e-4}})}return t[0].mesh=e,t.push({mesh:e,update:s=>{e.rotation.y=Math.sin(s*.1)*.12}}),t},algorithms:()=>{const a={root:y(),ambientColor:1910321,ambientIntensity:.5,keyColor:14673888,keyIntensity:.9},t=b(a),e=a.root;for(let s=0;s<40;s++){const i=new d(new Lt(.12,0),f(11453385,{emissive:3812376,emissiveIntensity:.65}));i.position.set(x(-8,8),x(-4,4),x(-10,2)),e.add(i)}return t.push({mesh:e,update:s=>{e.rotation.y=s*.03}}),t},machines:()=>{const a={root:y(),ambientColor:3813412,ambientIntensity:.5,keyColor:14673888,keyIntensity:1.1},t=b(a),e=a.root;for(let s=0;s<8;s++){const i=new T,o=new d(new M(1.6,2.2,1),f(4146499));o.position.y=1.1,i.add(o);for(let n=0;n<4;n++)for(let c=0;c<3;c++){const h=new d(new Q(.07,8,8),f(2304043,{emissive:13214282,emissiveIntensity:.5}));h.position.set(-.55+c*.55,1.85-n*.5,.52),h.userData.relayPulse=s*3+n*3+c,i.add(h)}const r=s/8*Math.PI*2;i.position.set(Math.cos(r)*4.5,0,Math.sin(r)*4.5),i.rotation.y=-r,e.add(i),t.push({mesh:i,update:n=>{i.children.forEach(c=>{const h=c.material;h.emissiveIntensity!==void 0&&(h.emissiveIntensity=.4+Math.abs(Math.sin(n*2+c.userData.relayPulse))*.5)})}})}return t.push({mesh:e}),t},computers:()=>{const a={root:y(),ambientColor:1450027,ambientIntensity:.6,keyColor:14673888,keyIntensity:1},t=b(a),e=a.root;for(let s=0;s<6;s++){const i=new T,o=new d(new M(2.4,3,1.4),f(3357505));o.position.y=1.5,i.add(o);for(let r=0;r<3;r++)for(let n=0;n<5;n++){const c=new d(new B(.09,.09,.5,12),f(1317408,{emissive:9087172,emissiveIntensity:.75,transparent:!0,opacity:.85}));c.position.set(-.9+n*.45,2.5-r*.8,.73),c.userData.pulseId=s*15+r*5+n,i.add(c)}i.position.set(-6+s*2.4,0,(s%2===0?-1:1)*x(.5,2)),e.add(i),t.push({mesh:i,update:r=>{i.children.forEach(n=>{const c=n.material;c.emissiveIntensity!==void 0&&(c.emissiveIntensity=.6+Math.abs(Math.sin(r*1.5+n.userData.pulseId*.7))*.5)})}})}return t.push({mesh:e}),t},"machine-language":()=>{const a={root:y(),ambientColor:2761760,ambientIntensity:.5,keyIntensity:.7},t=b(a),e=a.root,s=new d(new M(6,.12,3),f(2304558));e.add(s);const i=[0,1,0,1,1,0,1,1,0,1];for(let o=0;o<i.length;o++){const r=new d(new M(.28,.28,.28),f(3818572,{emissive:i[o]?13214282:4404255,emissiveIntensity:i[o]?.8:.3}));r.position.set(-2.5+o*.55,.14,0),e.add(r)}return t[0].mesh=e,t},assembly:()=>{const a=y(),t=b({root:a,ambientColor:1844268,ambientIntensity:.6,keyIntensity:.7});for(let e=0;e<10;e++){const s=new d(new M(.3,2.4,.3),f(3095105,{emissive:9071156,emissiveIntensity:.2+e%3*.2}));s.position.set(-4.5+e*1,0,0),a.add(s)}return t[0].mesh=a,t},"first-languages":()=>{const a={root:y(),ambientColor:3812898,ambientIntensity:.5,keyColor:14673888,keyIntensity:.8},t=b(a),e=a.root;for(let s=0;s<4;s++){const i=new d(new M(2.6,1.1,.12),f(1316378,{emissive:3812376,emissiveIntensity:.6}));i.position.set(-4.5+s*3,0,-2),i.rotation.y=.15*(s%2===0?1:-1),e.add(i)}return t.push({mesh:e,update:s=>{e.rotation.y=Math.sin(s*.06)*.05}}),t},enterprise:()=>{const a={root:y(),ambientColor:10066568,ambientIntensity:.5,keyIntensity:.7},t=b(a),e=a.root;for(let s=0;s<8;s++){const i=new d(new M(2.4,.7,s%2?.9:1.6),f(8952234));i.position.set(-4.5+s*1.3,s%3*.2,-1+s%2*2),e.add(i)}return t[0].mesh=e,t},structured:()=>{const a={root:y(),ambientColor:2306104,ambientIntensity:.4,keyColor:14673888,keyIntensity:.7},t=b(a),e=a.root;for(let s=0;s<12;s++){const i=new d(new M(5.2,.03,.03),f(4865840,{emissive:13214282,emissiveIntensity:.7}));i.position.set(0,-2.5+s*.45,-s*.2),e.add(i)}return t[0].mesh=e,t},c:()=>{const a={root:y(),ambientColor:1910321,ambientIntensity:.5,keyColor:14673888,keyIntensity:.9},t=b(a),e=a.root;for(let s=0;s<6;s++){const i=new d(new M(.8,4,.8),f(2304819));i.position.set(-5+s*2,0,-s*.6),e.add(i);const o=new d(new M(.9,.2,.9),f(7308963,{emissive:4152448,emissiveIntensity:.9}));o.position.set(-5+s*2,2+(s%2?.6:-.6),-s*.6),e.add(o)}return t[0].mesh=e,t},oop:()=>{const a={root:y(),ambientColor:3351070,ambientIntensity:.4,keyColor:14673888,keyIntensity:.8},t=b(a),e=a.root;for(let s=0;s<8;s++){const i=new d(new Q(.5,20,20),f(9061430,{roughness:.4,metalness:.3})),o=s/8*Math.PI*2;i.position.set(Math.cos(o)*3.2,Math.sin(o*2)*1.2,Math.sin(o)*3.2),e.add(i)}return t.push({mesh:e,update:s=>{e.rotation.y=s*.08,e.rotation.x=Math.sin(s*.12)*.15}}),t},internet:()=>{const a={root:y(),ambientColor:1450027,ambientIntensity:.5,keyColor:14673888,keyIntensity:.9},t=b(a),e=a.root,s=[];for(let o=0;o<14;o++){const r=new d(new Q(.16,10,10),f(7308963,{emissive:2901084,emissiveIntensity:.8})),n=o/14*Math.PI*2;r.position.set(Math.cos(n)*4,Math.sin(n*3)*2,Math.sin(n)*4),e.add(r),s.push(r)}const i=new ot({color:4152448});for(let o=0;o<s.length;o++){const r=(o+1)%s.length,n=new k().setFromPoints([s[o].position,s[r].position]),c=new lt(n,i);e.add(c)}return t.push({mesh:e,update:o=>{s.forEach((r,n)=>{const c=r.material;c.emissiveIntensity=.5+Math.abs(Math.sin(o*2+n*1.3))*.7})}}),t},web:()=>{const a={root:y(),ambientColor:3350810,ambientIntensity:.5,keyColor:14673888,keyIntensity:1},t=b(a),e=a.root;for(let s=0;s<7;s++){const i=new d(new M(2.2,1.6,.1),f(1711910));i.position.set(-6+s*2,s%2?.8:-.6,-s*.5);const o=new d(new M(1.8,1.2,.06),f(3810335,{emissive:9058862,emissiveIntensity:.35}));o.position.set(0,0,.09),i.add(o),e.add(i)}return t.push({mesh:e,update:s=>{e.rotation.y=Math.sin(s*.04)*.05}}),t},modern:()=>{const a={root:y(),ambientColor:2762272,ambientIntensity:.5,keyColor:14673888,keyIntensity:.9},t=b(a),e=a.root;for(let s=0;s<10;s++){const i=new d(new M(.6,.6,.6),f(12096863,{roughness:.3,metalness:.4}));i.position.set(x(-5,5),x(-2,2),x(-5,1)),i.rotation.set(x(-1,1),x(-1,1),0),e.add(i)}return t.push({mesh:e,update:s=>{e.rotation.y=s*.02}}),t},mobile:()=>{const a={root:y(),ambientColor:1844268,ambientIntensity:.5,keyIntensity:.7},t=b(a),e=a.root;for(let s=0;s<6;s++){const i=new d(new M(.7,1.5,.09),f(1120288)),o=new d(new M(.58,1.2,.1),f(1580840,{emissive:6060697,emissiveIntensity:.5}));i.add(o),i.position.set(-4+s*1.7,0,x(-2,0)),i.rotation.y=x(-.4,.4),e.add(i)}return t[0].mesh=e,t},systems:()=>{const a={root:y(),ambientColor:1910321,ambientIntensity:.5,keyColor:14673888,keyIntensity:.9},t=b(a),e=a.root;for(let s=0;s<6;s++){const i=new d(new M(1.8,.7,.8),f(1187883));i.position.set(-4+s*1.6,s%2?.4:-.4,-1),e.add(i);const o=new d(new M(1.4,.4,.05),f(4152448,{emissive:9087172,emissiveIntensity:1}));o.position.set(0,0,.42),i.add(o)}return t.push({mesh:e,update:s=>{e.rotation.y=s*.02}}),t},ai:()=>{const a={root:y(),ambientColor:3349013,ambientIntensity:.5,keyColor:14673888,keyIntensity:1},t=b(a),e=a.root,s=5,i=7,o=[];for(let c=0;c<s;c++)for(let h=0;h<i;h++){const u=new d(new Q(.12,10,10),f(9058862,{emissive:13121834,emissiveIntensity:.9}));u.position.set((c-(s-1)/2)*1.6,(h-(i-1)/2)*.7,0),u.userData.nodeId=c*i+h,e.add(u),o.push(u)}const r=new ot({color:9058862,transparent:!0,opacity:.4}),n=1.6;for(let c=0;c<s-1;c++)for(let h=0;h<i;h++)for(let u=0;u<i;u++){const l=new D((c-(s-1)/2)*n,(h-(i-1)/2)*.7,0),g=new D((c+1-(s-1)/2)*n,(u-(i-1)/2)*.7,0),m=new k().setFromPoints([l,g]),A=new lt(m,r);e.add(A)}return t.push({mesh:e,update:c=>{o.forEach(h=>{const u=c*.3+h.userData.nodeId*.5;h.position.y+=Math.sin(u)*.002;const l=h.material;l.emissiveIntensity=.6+Math.abs(Math.sin(c*1.5+h.userData.nodeId))*.6})}}),t},future:()=>{const a={root:y(),ambientColor:3349013,ambientIntensity:.5,keyColor:14673888,keyIntensity:1.1},t=b(a),e=a.root;for(let s=0;s<6;s++){const i=new d(new K(1+s*.7,.035,10,48),f(11556924,{emissive:4460812,emissiveIntensity:.4}));i.rotation.x=Math.PI/2+(s%2?.3:-.3),i.rotation.y=s*.7,e.add(i)}return t.push({mesh:e,update:s=>{e.rotation.y=s*.15,e.rotation.x=Math.sin(s*.2)*.25}}),t}};class ie{group=new T;objects=[];currentEra=null;scene;constructor(t){this.scene=t,this.scene.add(this.group)}setEra(t){if(this.currentEra===t)return;this.currentEra=t,this.clear();const s=(ft[t]??ft["pre-code"])();this.objects=s.filter(i=>i!==null),this.objects.forEach(i=>{this.group.add(i.mesh),i.mesh.position.x=i.mesh.position.x})}getEra(){return this.currentEra}clear(){this.objects.forEach(t=>{this.group.remove(t.mesh),oe(t.mesh)}),this.objects=[]}update(t,e){this.objects.forEach(s=>s.update?.(t,e))}dispose(){this.clear(),this.scene.remove(this.group)}}function oe(a){a.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const s=e.material;Array.isArray(s)?s.forEach(i=>i.dispose()):s&&s.dispose()})}class re{points;material;geometry;reduceMotion;constructor(t=600,e={}){const{color:s=9080728,size:i=.04,spread:o=30}=e;this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.geometry=new k;const r=new Float32Array(t*3),n=new Float32Array(t);for(let c=0;c<t;c++)r[c*3+0]=(Math.random()-.5)*o,r[c*3+1]=(Math.random()-.5)*o,r[c*3+2]=(Math.random()-.5)*o,n[c]=.3+Math.random()*.7;this.geometry.setAttribute("position",new O(r,3)),this.geometry.setAttribute("aOpacity",new O(n,1)),this.material=new nt({color:s,size:i,transparent:!0,opacity:.6,sizeAttenuation:!0,depthWrite:!1,blending:w}),this.points=new ct(this.geometry,this.material)}update(t,e){this.points.position.copy(e),!this.reduceMotion&&(this.points.rotation.y=t*.012,this.points.rotation.x=Math.sin(t*.3)*.02)}dispose(){this.geometry.dispose(),this.material.dispose()}}class ae{scene;baseColor;fog;constructor(t,e=658189){this.scene=t,this.baseColor=new p(e),this.fog=new Nt(this.baseColor,.012),this.scene.fog=this.fog}setDensity(t,e){e!==void 0&&this.baseColor.setHex(e),this.fog.density=v.clamp(t,0,.09),this.fog.color.copy(this.baseColor)}getFog(){return this.fog}update(t,e){const s=.012+Math.sin(e*Math.PI)*.02;this.setDensity(s)}dispose(){this.scene.fog=null}}class ne{group=new T;halo;core;haloMat;coreMat;targetColor=new p(13214282);currentColor=new p(13214282);constructor(t,e=13214282){const s=gt(256,[{stop:0,color:"rgba(255,236,200,0.90)"},{stop:.25,color:"rgba(233,199,138,0.35)"},{stop:.6,color:"rgba(201,162,74,0.12)"},{stop:1,color:"rgba(201,162,74,0)"}]),i=gt(128,[{stop:0,color:"rgba(255,244,214,1)"},{stop:.4,color:"rgba(255,225,170,0.55)"},{stop:1,color:"rgba(255,225,170,0)"}]);this.haloMat=new rt({map:s,transparent:!0,depthWrite:!1,depthTest:!0,blending:w,opacity:.6,color:this.currentColor}),this.halo=new at(this.haloMat),this.halo.scale.set(14,14,1),this.halo.position.set(8,7,-26),this.coreMat=new rt({map:i,transparent:!0,depthWrite:!1,depthTest:!0,blending:w,opacity:.85}),this.core=new at(this.coreMat),this.core.scale.set(3.4,3.4,1),this.core.position.set(8,7,-26),this.group.add(this.halo,this.core),this.group.renderOrder=-10,t.add(this.group),this.setAccent(e)}setAccent(t){this.targetColor.set(t)}pulse(t=1){this.coreMat.opacity=.6+.25*t,this.haloMat.opacity=.45+.18*t,this.core.scale.setScalar(3.4+.5*t)}update(t){const e=Math.sin(t*.06)*.25;this.halo.position.x=8+e,this.core.position.x=8+e,this.core.position.y=7+Math.cos(t*.04)*.1,this.currentColor.lerp(this.targetColor,.02),this.haloMat.color.copy(this.currentColor)}dispose(){this.haloMat.map?.dispose(),this.haloMat.dispose(),this.coreMat.map?.dispose(),this.coreMat.dispose(),this.group.parent?.remove(this.group)}}function gt(a,t){const e=document.createElement("canvas");e.width=e.height=a;const s=e.getContext("2d"),i=a/2,o=s.createRadialGradient(i,i,0,i,i,i);t.forEach(n=>o.addColorStop(n.stop,n.color)),s.fillStyle=o,s.fillRect(0,0,a,a);const r=new S(e);return r.needsUpdate=!0,r}const vt=12,et=24,V=3,_=8.2;class ce{group=new T;ringMeshes=[];ringMats=[];ribLines;centerGlowMat;active=!1;reduce;accent=new p(13214282);currentTint=new p(13214282);cursor=0;scene;ringCount=et;constructor(t,e=!1){if(this.scene=t,this.ringCount=e?12:et,this.reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.reduce)return;const s=new N(_*.48,_*.35),i=new K(_,.06,8,36);for(let u=0;u<this.ringCount;u++){const l=new T,g=7229993,m=new P({color:g,transparent:!0,opacity:.22,blending:w,depthWrite:!1}),A=new d(i,m);l.add(A),this.ringMats.push(m);for(let E=0;E<vt;E++){const L=E/vt*Math.PI*2,R=new P({color:g,transparent:!0,opacity:.14,side:F,depthWrite:!1,blending:w}),W=new d(s,R),q=Math.cos(L)*_,St=Math.sin(L)*_;W.position.set(q,St,0),W.lookAt(0,0,0),l.add(W),this.ringMats.push(R)}l.position.z=-u*V-4,l.userData.baseZ=l.position.z,this.group.add(l),this.ringMeshes.push(l)}const o=[];for(let u=0;u<8;u++){const l=u/8*Math.PI*2,g=Math.cos(l)*_,m=Math.sin(l)*_;o.push(g,m,2,g,m,-et*V)}const r=new k;r.setAttribute("position",new it(o,3));const n=new ot({color:13214282,transparent:!0,opacity:.2,blending:w});this.ribLines=new Ot(r,n),this.group.add(this.ribLines);const c=he(128,[[0,"rgba(255,244,214,0.95)"],[.3,"rgba(233,199,138,0.4)"],[1,"rgba(233,199,138,0)"]]);this.centerGlowMat=new P({map:c,transparent:!0,opacity:.2,depthWrite:!1,blending:w,color:this.currentTint});const h=new d(new N(8,8),this.centerGlowMat);h.position.set(0,0,-2),this.group.add(h),this.tint(13214282),t.add(this.group),this.active=!0}setAccent(t){this.accent.set(t)}tint(t){if(this.active){this.currentTint.set(t);for(const e of this.ringMats)e.color.copy(this.currentTint);this.centerGlowMat.color.copy(this.currentTint),this.ribLines&&this.ribLines.material.color.copy(this.currentTint)}}update(t,e,s){if(!this.active)return;const i=t*this.ringCount*V;this.cursor=this.cursor+(i-this.cursor)*Math.min(1,.15+e*.4);for(let o=0;o<this.ringCount;o++){const r=this.ringMeshes[o];let n=r.userData.baseZ+this.cursor;n>6&&(n-=this.ringCount*V,r.userData.baseZ-=this.ringCount*V),r.position.z=n,r.rotation.z+=.003*(1+s*2.5+e*2);const h=(.12*(1-Math.min(1,Math.max(0,(6-n)/16)))+.1)*(1+s*.8+e*.6);r.children.forEach(u=>{const g=u.material;g&&!Array.isArray(g)&&(g.opacity=Math.min(.65,h))}),o===0&&(this.centerGlowMat.opacity=Math.min(.7,.18+s*.45+e*.2))}this.currentTint.lerp(this.accent,.06);for(const o of this.ringMats)o.color.copy(this.currentTint);this.centerGlowMat.color.copy(this.currentTint),this.ribLines&&(this.ribLines.material.color.copy(this.currentTint),this.ribLines.material.opacity=.18+s*.35)}dispose(){this.active&&(this.scene.remove(this.group),this.ringMats.forEach(t=>{t.map?.dispose(),t.dispose()}),this.centerGlowMat.map?.dispose(),this.centerGlowMat.dispose(),this.ribLines&&(this.ribLines.geometry.dispose(),this.ribLines.material.dispose()),this.group.traverse(t=>{t.isMesh&&t.geometry?.dispose()}))}}function he(a,t){const e=document.createElement("canvas");e.width=e.height=a;const s=e.getContext("2d"),i=a/2,o=s.createRadialGradient(i,i,0,i,i,i);t.forEach(([n,c])=>o.addColorStop(n,c)),s.fillStyle=o,s.fillRect(0,0,a,a);const r=new S(e);return r.needsUpdate=!0,r}function U(a,t,e,s){return a+(t-a)*(1-Math.exp(-e*s))}class le{group=new T;scene;reduce;ring1;ring2;ring3;ring1Mat;ring2Mat;ring3Mat;vortexMesh;vortexMat;vortexTex;coreMesh;coreHalo;coreLight;coreMat;haloMat;targetColor=new p(13214282);currentColor=new p(13214282);speedSmoothed=0;rotationSpeed1=.18;rotationSpeed2=-.26;rotationSpeed3=.38;constructor(t){this.scene=t,this.reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.initCore(),this.initGimbalRings(),this.initVortex(),this.initSingularity(),this.scene.add(this.group)}initCore(){this.group.position.set(0,0,-8)}createChronometerDialTexture(){const t=document.createElement("canvas");t.width=1024,t.height=128;const e=t.getContext("2d");e.fillStyle="rgba(10, 14, 18, 0.9)",e.fillRect(0,0,t.width,t.height),e.strokeStyle="rgba(217, 227, 220, 0.4)",e.lineWidth=2,e.strokeRect(4,4,t.width-8,t.height-8);const s=120;for(let o=0;o<s;o++){const r=o/s*t.width,n=o%10===0,c=o%5===0;e.strokeStyle=n?"rgba(255, 235, 190, 0.95)":c?"rgba(217, 227, 220, 0.65)":"rgba(160, 175, 168, 0.35)",e.lineWidth=n?3:c?2:1;const h=n?36:c?22:12;if(e.beginPath(),e.moveTo(r,0),e.lineTo(r,h),e.stroke(),e.beginPath(),e.moveTo(r,t.height),e.lineTo(r,t.height-h),e.stroke(),n){e.fillStyle="rgba(255, 240, 205, 0.9)",e.font="bold 18px monospace",e.textAlign="center";const u=o/10*30;e.fillText(`${u}°`,r,68)}}const i=new S(t);return i.wrapS=j,i.wrapT=tt,i.repeat.set(4,1),i}createBinaryDialTexture(){const t=document.createElement("canvas");t.width=1024,t.height=128;const e=t.getContext("2d");e.fillStyle="rgba(8, 11, 15, 0.92)",e.fillRect(0,0,t.width,t.height),e.strokeStyle="rgba(201, 162, 74, 0.6)",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,30),e.lineTo(t.width,30),e.moveTo(0,98),e.lineTo(t.width,98),e.stroke();const s=["1843·ADA·01000001","ALGORITHM·01001100","1936·TURING·01010100","ENIGMA·01000101","1945·EDVAC·01010110","1957·FORTRAN·01000110","1972·C·LANG·01000011","CHRONO·ENGINE·1995","QUANTUM·2026·WARP"];e.fillStyle="rgba(223, 231, 224, 0.85)",e.font="bold 16px monospace",e.textAlign="left";const i=t.width/s.length;s.forEach((r,n)=>{e.fillText(r,n*i+12,68)});const o=new S(t);return o.wrapS=j,o.wrapT=tt,o.repeat.set(3,1),o}createGlyphDialTexture(){const t=document.createElement("canvas");t.width=512,t.height=128;const e=t.getContext("2d");e.fillStyle="rgba(5, 7, 10, 0.95)",e.fillRect(0,0,t.width,t.height);const s=["λ","∫","0x7F","NOP","MOV","JMP","PUSH","POP","HALT","Δt"];e.fillStyle="rgba(255, 90, 60, 0.85)",e.font="bold 22px monospace",e.textAlign="center";const i=t.width/s.length;s.forEach((r,n)=>{e.fillText(r,n*i+i/2,70)});const o=new S(t);return o.wrapS=j,o.wrapT=tt,o.repeat.set(2,1),o}initGimbalRings(){const t=this.createChronometerDialTexture(),e=this.createBinaryDialTexture(),s=this.createGlyphDialTexture(),i=new B(9.2,9.2,.75,64,1,!0);this.ring1Mat=new Y({map:t,color:16777215,roughness:.35,metalness:.75,side:F,emissive:this.currentColor,emissiveIntensity:.2,transparent:!0,opacity:.85}),this.ring1=new d(i,this.ring1Mat),this.ring1.rotation.x=Math.PI/2;const o=new K(9.2,.08,12,64),r=new Y({color:13214282,metalness:.9,roughness:.2}),n=new d(o,r);n.position.y=.38;const c=new d(o,r);c.position.y=-.38,this.ring1.add(n,c);const h=new B(7.4,7.4,.65,48,1,!0);this.ring2Mat=new Y({map:e,color:16777215,roughness:.4,metalness:.8,side:F,emissive:this.currentColor,emissiveIntensity:.25,transparent:!0,opacity:.82}),this.ring2=new d(h,this.ring2Mat),this.ring2.rotation.x=Math.PI/2;const u=new B(5.6,5.6,.55,40,1,!0);this.ring3Mat=new Y({map:s,color:16777215,roughness:.3,metalness:.85,side:F,emissive:this.currentColor,emissiveIntensity:.35,transparent:!0,opacity:.8}),this.ring3=new d(u,this.ring3Mat),this.ring3.rotation.x=Math.PI/2,this.ring1.rotation.set(.2,.1,0),this.ring2.rotation.set(-.3,.25,.15),this.ring3.rotation.set(.15,-.2,-.3),this.group.add(this.ring1,this.ring2,this.ring3)}initVortex(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle="#05070a",e.fillRect(0,0,512,512);for(let i=0;i<32;i++){const o=i/32*512,r=e.createLinearGradient(o,0,o,512);r.addColorStop(0,"rgba(255, 235, 190, 0.02)"),r.addColorStop(.5,"rgba(201, 162, 74, 0.35)"),r.addColorStop(1,"rgba(224, 35, 28, 0.6)"),e.fillStyle=r,e.fillRect(o-2,0,4,512)}for(let i=0;i<16;i++){const o=i/16*512;e.strokeStyle="rgba(255, 255, 255, 0.15)",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,o),e.lineTo(512,o),e.stroke()}this.vortexTex=new S(t),this.vortexTex.wrapS=j,this.vortexTex.wrapT=j,this.vortexTex.repeat.set(4,8);const s=new B(1.2,11,55,32,16,!0);this.vortexMat=new P({map:this.vortexTex,transparent:!0,opacity:.18,side:Ht,blending:w,depthWrite:!1,color:this.currentColor}),this.vortexMesh=new d(s,this.vortexMat),this.vortexMesh.rotation.x=Math.PI/2,this.vortexMesh.position.z=-28,this.group.add(this.vortexMesh)}initSingularity(){const t=new Q(1.2,24,24);this.coreMat=new P({color:16777215,transparent:!0,opacity:.75,blending:w}),this.coreMesh=new d(t,this.coreMat),this.coreMesh.position.z=-46;const e=new N(16,16),s=ue();this.haloMat=new P({map:s,color:this.currentColor,transparent:!0,opacity:.5,blending:w,depthWrite:!1}),this.coreHalo=new d(e,this.haloMat),this.coreHalo.position.z=-45.5,this.coreLight=new ut(13214282,1.6,50,1.2),this.coreLight.position.z=-40,this.dialFrontLight=new ut(16772829,1.4,30,.8),this.dialFrontLight.position.set(0,2,8),this.group.add(this.coreMesh,this.coreHalo,this.coreLight,this.dialFrontLight)}dialFrontLight;setAccent(t){this.targetColor.set(t)}update(t,e,s,i,o){if(this.reduce){this.currentColor.lerp(this.targetColor,.05),this.ring1Mat.emissive.copy(this.currentColor),this.ring2Mat.emissive.copy(this.currentColor),this.ring3Mat.emissive.copy(this.currentColor),this.vortexMat.color.copy(this.currentColor),this.haloMat.color.copy(this.currentColor),this.coreLight.color.copy(this.currentColor);return}this.speedSmoothed=U(this.speedSmoothed,i,3.8,e);const r=1+this.speedSmoothed*11.5+o*7.5,n=s*Math.PI*18;this.ring1.rotation.z=n+t*this.rotationSpeed1*r,this.ring1.rotation.x=.2+Math.sin(t*.5)*.08+this.speedSmoothed*.45,this.ring1.rotation.y=Math.cos(t*.35)*.06+(s-.5)*-.5,this.ring2.rotation.z=-n*.72+t*this.rotationSpeed2*r,this.ring2.rotation.y=Math.cos(t*.4)*.12-this.speedSmoothed*.4+(s-.5)*.4,this.ring2.rotation.x=Math.sin(t*.6)*.08+this.speedSmoothed*.3,this.ring3.rotation.z=n*1.35+t*this.rotationSpeed3*r,this.ring3.rotation.x=-.15+Math.sin(t*.7)*.1+this.speedSmoothed*.55,this.ring3.rotation.y=Math.sin(t*.5)*.09-this.speedSmoothed*.35,this.vortexTex&&(this.vortexTex.offset.y=(s*8+t*.05)%1,this.vortexTex.offset.x=(s*3.5+t*.02)%1);const c=Math.sin(t*2.2)*.05+1+this.speedSmoothed*.28;this.vortexMesh.scale.set(c,c,1),this.vortexMat.opacity=v.lerp(.18,.42,Math.min(1,this.speedSmoothed*1.5+o*.8));const h=1+Math.sin(t*4)*.15+o*.5+this.speedSmoothed*.4;this.coreMesh.scale.setScalar(h),this.coreHalo.scale.setScalar(1+Math.sin(t*1.8)*.14+o*.8+this.speedSmoothed*.6),this.haloMat.opacity=v.lerp(.35,.75,o+this.speedSmoothed),this.coreLight.intensity=v.lerp(1.6,4.2,o+this.speedSmoothed*1.2),this.dialFrontLight&&(this.dialFrontLight.intensity=v.lerp(1.4,3.2,this.speedSmoothed+o*.5)),this.currentColor.lerp(this.targetColor,.08),this.ring1Mat.emissive.copy(this.currentColor),this.ring1Mat.emissiveIntensity=.55+o*.4+this.speedSmoothed*.5,this.ring2Mat.emissive.copy(this.currentColor),this.ring2Mat.emissiveIntensity=.65+o*.45+this.speedSmoothed*.55,this.ring3Mat.emissive.copy(this.currentColor),this.ring3Mat.emissiveIntensity=.75+o*.5+this.speedSmoothed*.6,this.vortexMat.color.copy(this.currentColor),this.haloMat.color.copy(this.currentColor),this.coreLight.color.copy(this.currentColor),this.group.position.x=-1.2+(s-.5)*-6,this.group.position.z=-8-s*3.5+this.speedSmoothed*1.6}dispose(){this.scene.remove(this.group),[this.ring1Mat,this.ring2Mat,this.ring3Mat,this.vortexMat,this.coreMat,this.haloMat].forEach(t=>{t?.map?.dispose(),t?.dispose()}),this.vortexTex?.dispose(),this.group.traverse(t=>{t.isMesh&&t.geometry?.dispose()})}}function ue(){const a=document.createElement("canvas");a.width=a.height=256;const t=a.getContext("2d"),e=128,s=t.createRadialGradient(e,e,0,e,e,e);s.addColorStop(0,"rgba(255, 255, 255, 1.0)"),s.addColorStop(.2,"rgba(255, 240, 210, 0.8)"),s.addColorStop(.5,"rgba(201, 162, 74, 0.35)"),s.addColorStop(1,"rgba(201, 162, 74, 0)"),t.fillStyle=s,t.fillRect(0,0,256,256);const i=new S(a);return i.needsUpdate=!0,i}const xt=45,$=60;class de{group=new T;scene;meshes=[];materials=[];initialZ=[];reduce;targetColor=new p(13214282);currentColor=new p(13214282);glyphCount=xt;constructor(t,e=!1){this.scene=t,this.glyphCount=e?22:xt,this.reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.createGlyphs(),this.scene.add(this.group)}createGlyphs(){const t=this.buildGlyphTextures(),e=new N(1.6,1);for(let s=0;s<this.glyphCount;s++){const i=t[s%t.length],o=new P({map:i,transparent:!0,opacity:.7,side:F,depthWrite:!1,blending:w,color:this.currentColor}),r=new d(e,o),n=s/this.glyphCount*Math.PI*2*3.5+Math.random()*.4,c=2.8+Math.random()*3.8,h=Math.cos(n)*c,u=Math.sin(n)*c*.75,l=-4-s/this.glyphCount*$;r.position.set(h,u,l),r.rotation.z=(Math.random()-.5)*.4,r.rotation.y=(Math.random()-.5)*.5,r.userData={baseX:h,baseY:u,baseZ:l,rotSpeed:(Math.random()-.5)*.4,driftSpeed:.1+Math.random()*.2},this.group.add(r),this.meshes.push(r),this.materials.push(o),this.initialZ.push(l)}}buildGlyphTextures(){return[{type:"punchcard"},{type:"text",text:"1843 · Babbage",sub:"Bernoulli No."},{type:"text",text:"01000001 01000100",sub:"ASCII: A D"},{type:"text",text:"TURING · 1936",sub:"Universal Machine"},{type:"text",text:"MOV AX, 0x01",sub:"Assembly"},{type:"text",text:"λx.(x x)",sub:"Church Lambda"},{type:"text",text:"FORTRAN IV · 1962",sub:"DO 10 I=1,N"},{type:"text",text:'printf("hello\\n");',sub:"C · Ritchie"},{type:"text",text:"01100011 01101111",sub:"Bits: C O"},{type:"text",text:"GOTO 100",sub:"Line Index"},{type:"text",text:"1969 · UNIX",sub:"Epoch 0"},{type:"text",text:"diff(t, dt)",sub:"Chrono Stream"}].map(e=>{const s=document.createElement("canvas");s.width=256,s.height=160;const i=s.getContext("2d");if(i.fillStyle="rgba(6, 9, 13, 0.85)",i.fillRect(0,0,256,160),i.strokeStyle="rgba(217, 227, 220, 0.4)",i.lineWidth=2,i.strokeRect(4,4,248,152),e.type==="punchcard"){i.fillStyle="rgba(255, 235, 190, 0.8)";for(let r=0;r<5;r++)for(let n=0;n<12;n++)(r*7+n*3)%4===0&&i.fillRect(20+n*18,25+r*22,10,15);i.fillStyle="rgba(160, 175, 168, 0.7)",i.font="bold 11px monospace",i.fillText("JACQUARD / IBM CARD",20,142)}else i.fillStyle="rgba(255, 245, 220, 0.95)",i.font="bold 15px monospace",i.textAlign="center",i.fillText(e.text??"",128,70),i.fillStyle="rgba(201, 162, 74, 0.85)",i.font="12px monospace",i.fillText(e.sub??"",128,102),i.fillStyle="rgba(224, 35, 28, 0.6)",i.fillRect(24,126,208,2);const o=new S(s);return o.needsUpdate=!0,o})}setAccent(t){this.targetColor.set(t)}update(t,e,s,i,o){this.currentColor.lerp(this.targetColor,.08);const r=1+i*6+o*5,n=s*$;for(let c=0;c<this.meshes.length;c++){const h=this.meshes[c],u=this.materials[c];if(u.color.copy(this.currentColor),!this.reduce){h.rotation.z+=h.userData.rotSpeed*e*r;let l=h.userData.baseZ+n+i*4.2;for(;l>4;)l-=$;h.position.z=l,h.position.x=h.userData.baseX+Math.sin(t*.8+c)*.15,h.position.y=h.userData.baseY+Math.cos(t*.7+c)*.12;const g=Math.abs(l),m=Math.min(1,Math.max(0,1-(g-12)/($-12)));u.opacity=Math.min(.98,(.28+m*.6)*(1+o*.6+i*.9))}}}dispose(){this.scene.remove(this.group),this.materials.forEach(t=>{t.map?.dispose(),t.dispose()}),this.meshes.forEach(t=>t.geometry?.dispose())}}class pe{scene;fog;bgBase=new p(329482);accent=new p(658962);current=new p(658962);reduce;constructor(t,e){this.scene=t,this.fog=e,this.reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.current.copy(this.bgBase)}setAccent(t){this.accent.set(t)}setDensity(t){this.fog.density=v.clamp(t,.008,.09)}update(t,e){if(this.reduce)return;const s=this.bgBase.clone().lerp(this.accent,.12*t);this.current.lerp(s,.04),this.scene.background.copy(this.current),this.fog.color.copy(this.current);const i=.014+e*.05;this.setDensity(v.clamp(i,.012,.09))}dispose(){}}class me{points;geometry;material;count;reduce;scene;opacities;constructor(t,e=480){this.scene=t,this.reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.count=e,this.geometry=new k;const s=new Float32Array(e*3);this.opacities=new Float32Array(e);for(let o=0;o<e;o++)s[o*3+0]=(Math.random()-.5)*32,s[o*3+1]=(Math.random()-.5)*18,s[o*3+2]=-Math.random()*30,this.opacities[o]=.2;this.geometry.setAttribute("position",new O(s,3)),this.geometry.setAttribute("aOpacity",new O(this.opacities,1));const i=fe(128,8);this.material=new nt({color:13214282,size:.65,map:i,transparent:!0,opacity:.25,depthWrite:!1,blending:w,sizeAttenuation:!0}),this.points=new ct(this.geometry,this.material),this.points.visible=!this.reduce,t.add(this.points)}setAccent(t){this.material.color.set(t)}update(t){if(this.reduce){this.points.visible=!1;return}this.points.visible=!0,this.material.opacity=Math.min(.95,.2+t*1.5),this.material.size=.55+t*1.1;const e=this.geometry.getAttribute("position"),s=e.array,i=.04+t*1.85;for(let o=0;o<this.count;o++)s[o*3+2]+=i,s[o*3+2]>6&&(s[o*3+2]=-26-Math.random()*8,s[o*3+0]=(Math.random()-.5)*32,s[o*3+1]=(Math.random()-.5)*18),this.opacities[o]=Math.min(1,.25+t*.75);this.geometry.getAttribute("aOpacity").needsUpdate=!0,e.needsUpdate=!0}dispose(){this.material.map?.dispose(),this.material.dispose(),this.geometry.dispose(),this.scene.remove(this.points)}}function fe(a,t){const e=document.createElement("canvas");e.width=a,e.height=t;const s=e.getContext("2d"),i=s.createLinearGradient(0,0,a,0);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.3,"rgba(255,255,255,0.6)"),i.addColorStop(1,"rgba(255,255,255,1)"),s.fillStyle=i,s.fillRect(0,0,a,t);const o=new S(e);return o.needsUpdate=!0,o}class ge{ring;ringMat;discMat;disc;active=!1;triggerSection=-1;progress=1;scene;accent=new p(13214282);reduce;constructor(t){this.scene=t,this.reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.ringMat=new P({color:this.accent,transparent:!0,opacity:0,side:F,depthWrite:!1,blending:w}),this.discMat=new P({color:this.accent,transparent:!0,opacity:0,depthWrite:!1,blending:w})}setAccent(t){this.accent.set(t)}update(t){if(this.reduce||(this.triggerSection!==t.section&&(this.triggerSection=t.section,this.active||this.begin()),!this.active))return;this.progress+=.045,this.progress=Math.min(1,this.progress);const e=this.progress;if(this.ring&&this.disc){this.ring.position.z=6-e*16,this.ring.rotation.z+=.06,this.ring.rotation.x=Math.PI/2+.15*Math.sin(e*Math.PI*2);const s=.2+e*1.4;this.ring.scale.setScalar(s);const i=(1-Math.sin(Math.PI*e))*.9;this.ringMat.opacity=Math.max(0,Math.min(.7,i*.6)),this.discMat.opacity=Math.max(0,i*.35),this.ringMat.color.copy(this.accent),this.discMat.color.copy(this.accent),this.disc.position.z=this.ring.position.z,this.disc.scale.setScalar(s*.6)}this.progress>=1&&this.end()}begin(){if(this.active=!0,this.progress=0,!this.ring){const t=new K(2.4,.12,8,90);this.ring=new d(t,this.ringMat);const e=new Wt(.2,2.2,64);this.disc=new d(e,this.discMat),this.scene.add(this.ring,this.disc)}this.ring.position.set(0,0,6),this.ring.scale.setScalar(.2)}end(){this.active=!1,this.ring&&(this.ring.visible=!1),this.disc&&(this.disc.visible=!1)}isActive(){return this.active}dispose(){this.scene.remove(this.ring,this.disc),this.ringMat.dispose(),this.discMat.dispose(),this.ring?.geometry?.dispose(),this.disc?.geometry?.dispose()}}class ve{grain=null;ctx=null;frame=0;reduceMotion;hidden=!1;onResize=()=>this.resize();onVisibility=()=>{this.hidden=document.hidden};constructor(){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const t=document.createElement("div");t.id="vignette",document.body.appendChild(t),!this.reduceMotion&&(this.grain=document.createElement("canvas"),this.grain.id="grain",document.body.appendChild(this.grain),this.ctx=this.grain.getContext("2d"),this.resize(),window.addEventListener("resize",this.onResize),document.addEventListener("visibilitychange",this.onVisibility))}resize(){if(!this.grain||!this.ctx)return;const t=Math.min(window.devicePixelRatio,1.5);this.grain.width=window.innerWidth*t,this.grain.height=window.innerHeight*t,this.grain.style.width=`${window.innerWidth}px`,this.grain.style.height=`${window.innerHeight}px`}update(t,e){if(!this.grain||!this.ctx||this.hidden)return;const s=this.ctx,{width:i,height:o}=this.grain;if(this.frame++,this.frame%3===0){s.clearRect(0,0,i,o),s.globalAlpha=.14;for(let r=0;r<140;r++){const n=Math.random()*i,c=Math.random()*o,h=Math.random()*1.7;s.fillStyle=Math.random()>.5?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.6)",s.fillRect(n,c,h,h)}s.globalAlpha=1}}dispose(){window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibility),this.grain?.remove(),document.querySelector("#vignette")?.remove()}}const xe={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new p(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class H extends z{constructor(t,e,s,i){super(),this.strength=e!==void 0?e:1,this.radius=s,this.threshold=i,this.resolution=t!==void 0?new C(t.x,t.y):new C(256,256),this.clearColor=new p(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new X(o,r,{type:Z}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const g=new X(o,r,{type:Z});g.texture.name="UnrealBloomPass.h"+l,g.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(g);const m=new X(o,r,{type:Z});m.texture.name="UnrealBloomPass.v"+l,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),o=Math.round(o/2),r=Math.round(r/2)}const n=xe;this.highPassUniforms=G.clone(n.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new I({uniforms:this.highPassUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new C(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Ct;this.copyUniforms=G.clone(u.uniforms),this.blendMaterial=new I({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:w,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new p,this.oldClearAlpha=1,this.basic=new P,this.fsQuad=new J(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let s=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(s,i);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(s,i),this.renderTargetsVertical[o].setSize(s,i),this.separableBlurMaterials[o].uniforms.invSize.value=new C(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2)}render(t,e,s,i,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let n=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[c].uniforms.direction.value=H.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=H.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),n=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(s),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const e=[];for(let s=0;s<t;s++)e.push(.39894*Math.exp(-.5*s*s/(t*t))/t);return new I({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new C(.5,.5)},direction:{value:new C(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new I({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}H.BlurDirectionX=new C(1,0);H.BlurDirectionY=new C(0,1);class ye{pass;baseStrength;maxStrength;currentStrength;reduceMotion;constructor(t={}){const{baseStrength:e=.28,maxStrength:s=.65,radius:i=.42,threshold:o=.48}=t;this.baseStrength=e,this.maxStrength=s,this.currentStrength=e,this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const r=new C(window.innerWidth,window.innerHeight);this.pass=new H(r,e,i,o),this.reduceMotion&&(this.pass.strength=.2,this.pass.enabled=!1)}update(t){if(this.reduceMotion||!this.pass.enabled)return;const e=this.baseStrength+Math.min(this.maxStrength-this.baseStrength,t*.7);this.currentStrength=v.lerp(this.currentStrength,e,.15),this.pass.strength=this.currentStrength}dispose(){this.pass.dispose()}}const be={name:"ChromaticAberrationShader",uniforms:{tDiffuse:{value:null},uOffset:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uOffset;
    varying vec2 vUv;

    void main() {
      if (uOffset <= 0.0001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }

      vec2 dir = vUv - vec2(0.5);
      float dist = length(dir);
      vec2 shift = normalize(dir) * (dist * dist * uOffset);

      float r = texture2D(tDiffuse, vUv + shift).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - shift).b;
      float a = texture2D(tDiffuse, vUv).a;

      gl_FragColor = vec4(r, g, b, a);
    }
  `};class we{pass;currentOffset=0;reduceMotion;constructor(){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.pass=new ht(be),this.pass.enabled=!this.reduceMotion}update(t,e){if(this.reduceMotion)return;const s=Math.min(.022,t*.018+e*.012);this.currentOffset=v.lerp(this.currentOffset,s,.18),this.pass.uniforms.uOffset.value=this.currentOffset}dispose(){this.pass.dispose()}}const Me={name:"ShockwaveShader",uniforms:{tDiffuse:{value:null},uTime:{value:1},uCenter:{value:new C(.5,.5)},uWaveWidth:{value:.12},uMaxRadius:{value:1.15},uAmplitude:{value:.045},uAccent:{value:new p(13214282)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uCenter;
    uniform float uWaveWidth;
    uniform float uMaxRadius;
    uniform float uAmplitude;
    uniform vec3 uAccent;
    varying vec2 vUv;

    void main() {
      if (uTime >= 1.0) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }

      vec2 dir = vUv - uCenter;
      float dist = length(dir);
      float currentRadius = uTime * uMaxRadius;
      float diff = abs(dist - currentRadius);

      if (diff < uWaveWidth && dist > 0.001) {
        float strength = sin((1.0 - diff / uWaveWidth) * 3.14159265);
        float decay = (1.0 - uTime) * (1.0 - uTime);
        vec2 normDir = normalize(dir);
        vec2 uvOffset = normDir * (strength * uAmplitude * decay);

        vec4 color = texture2D(tDiffuse, vUv - uvOffset);
        // Sutil destello armónico del acento en la cresta de la onda
        color.rgb += uAccent * (strength * decay * 0.22);
        gl_FragColor = color;
      } else {
        gl_FragColor = texture2D(tDiffuse, vUv);
      }
    }
  `};class Ce{pass;reduceMotion;active=!1;constructor(){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.pass=new ht(Me),this.pass.enabled=!1}trigger(t){this.reduceMotion||(t!==void 0&&this.pass.uniforms.uAccent.value.set(t),this.pass.uniforms.uTime.value=0,this.pass.enabled=!0,this.active=!0)}update(t){if(this.reduceMotion||!this.active)return;const e=this.pass.uniforms.uTime.value+t*1.35;e>=1?(this.pass.uniforms.uTime.value=1,this.pass.enabled=!1,this.active=!1):this.pass.uniforms.uTime.value=e}dispose(){this.pass.dispose()}}const Se={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Te extends z{constructor(t,e,s){super(),this.scene=t,this.camera=e;const i=s.focus!==void 0?s.focus:1,o=s.aperture!==void 0?s.aperture:.025,r=s.maxblur!==void 0?s.maxblur:1;this.renderTargetDepth=new X(1,1,{minFilter:dt,magFilter:dt,type:Z}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new jt,this.materialDepth.depthPacking=Vt,this.materialDepth.blending=bt;const n=Se,c=G.clone(n.uniforms);c.tDepth.value=this.renderTargetDepth.texture,c.focus.value=i,c.aspect.value=e.aspect,c.aperture.value=o,c.maxblur.value=r,c.nearClip.value=e.near,c.farClip.value=e.far,this.materialBokeh=new I({defines:Object.assign({},n.defines),uniforms:c,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.uniforms=c,this.fsQuad=new J(this.materialBokeh),this._oldClearColor=new p}render(t,e,s){this.scene.overrideMaterial=this.materialDepth,t.getClearColor(this._oldClearColor);const i=t.getClearAlpha(),o=t.autoClear;t.autoClear=!1,t.setClearColor(16777215),t.setClearAlpha(1),t.setRenderTarget(this.renderTargetDepth),t.clear(),t.render(this.scene,this.camera),this.uniforms.tColor.value=s.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),t.clear(),this.fsQuad.render(t)),this.scene.overrideMaterial=null,t.setClearColor(this._oldClearColor),t.setClearAlpha(i),t.autoClear=o}setSize(t,e){this.materialBokeh.uniforms.aspect.value=t/e,this.renderTargetDepth.setSize(t,e)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}class De{pass;reduceMotion;isMobile;constructor(t,e){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.isMobile=window.innerWidth<768||/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),this.pass=new Te(t,e,{focus:8,aperture:2e-4,maxblur:.001}),this.pass.enabled=!1}update(t){if(this.reduceMotion||this.isMobile){this.pass.enabled&&(this.pass.enabled=!1);return}if(t>.06){this.pass.enabled=!0;const e=this.pass.uniforms;if(e){const s=Math.min(1,(t-.06)*1.8);e.aperture.value=v.lerp(2e-4,.012,s),e.maxblur.value=v.lerp(5e-4,.0075,s)}}else this.pass.enabled&&(this.pass.enabled=!1)}dispose(){this.pass.dispose()}}const st={uniforms:{uTime:{value:0},uColorPrimary:{value:new p(2110792)},uColorSecondary:{value:new p(791840)},uDensity:{value:.35},uProgress:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uTime;
    uniform vec3 uColorPrimary;
    uniform vec3 uColorSecondary;
    uniform float uDensity;
    uniform float uProgress;
    varying vec2 vUv;

    // Simplex Noise 2D
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float total = 0.0;
      float amp = 0.55;
      for (int i = 0; i < 3; i++) {
        total += amp * snoise(p);
        p *= 2.05;
        amp *= 0.48;
      }
      return total;
    }

    void main() {
      vec2 uv = (vUv - 0.5) * 2.2;
      float t = uTime * 0.035;

      // Desplazamiento orgánico con el flujo temporal
      vec2 p = uv * 1.35 + vec2(sin(t * 0.5), cos(t * 0.4)) * 0.35;
      p.y += uProgress * 0.8;

      float n1 = fbm(p + vec2(t * 0.3, t * 0.2));
      float n2 = fbm(p * 1.5 - vec2(t * 0.2, -t * 0.3));
      float clouds = smoothstep(-0.2, 0.85, n1 * 0.65 + n2 * 0.35);

      // Desvanecimiento perimetral suave
      float vignette = 1.0 - smoothstep(0.35, 1.35, length(uv));
      float alpha = clouds * vignette * uDensity;

      vec3 col = mix(uColorSecondary, uColorPrimary, clamp(n1 * 0.8 + 0.3, 0.0, 1.0));
      gl_FragColor = vec4(col, alpha);
    }
  `};class Pe{mesh;material;targetPrimary=new p(1385006);targetSecondary=new p(396049);currentPrimary=new p(1385006);currentSecondary=new p(396049);reduceMotion;constructor(t,e=!1){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const s=new N(160,110);this.material=new I({uniforms:G.clone(st.uniforms),vertexShader:st.vertexShader,fragmentShader:st.fragmentShader,transparent:!0,depthWrite:!1,depthTest:!0,blending:w}),this.mesh=new d(s,this.material),this.mesh.position.set(0,0,-48),this.mesh.renderOrder=-20,t.add(this.mesh),e&&(this.material.uniforms.uDensity.value=.1)}setAccent(t){const e=new p(t);this.targetPrimary.copy(e).multiplyScalar(.09),this.targetSecondary.copy(e).multiplyScalar(.015)}update(t,e,s){if(this.reduceMotion)return;this.currentPrimary.lerp(this.targetPrimary,.035),this.currentSecondary.lerp(this.targetSecondary,.035);const i=this.material.uniforms;i.uTime.value=t,i.uProgress.value=e,i.uColorPrimary.value.copy(this.currentPrimary),i.uColorSecondary.value.copy(this.currentSecondary);const o=.14;i.uDensity.value=v.lerp(i.uDensity.value,o+Math.min(.08,s*.12),.12)}dispose(){this.mesh.geometry.dispose(),this.material.dispose(),this.mesh.parent?.remove(this.mesh)}}class Ae{group=new T;layers=[];targetAccent=new p(13214282);currentAccent=new p(13214282);reduceMotion;constructor(t,e=!1){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,(e?[{count:240,size:.05,speed:3,mouse:.15,depth:-85}]:[{count:180,size:.075,speed:6.5,mouse:.35,depth:-65},{count:360,size:.045,speed:3.5,mouse:.2,depth:-110},{count:650,size:.028,speed:1.5,mouse:.08,depth:-160}]).forEach(i=>{const o=new k,r=new Float32Array(i.count*3),n=new Float32Array(i.count*3),c=new Float32Array(i.count),h=75,u=90;for(let m=0;m<i.count;m++){const A=(Math.random()-.5)*h,E=(Math.random()-.5)*u,L=i.depth+(Math.random()-.5)*15;if(r[m*3+0]=A,r[m*3+1]=E,r[m*3+2]=L,c[m]=E,Math.random()>.15){const R=.5+Math.random()*.5;n[m*3+0]=R*.92,n[m*3+1]=R*.95,n[m*3+2]=R*1}else n[m*3+0]=this.currentAccent.r,n[m*3+1]=this.currentAccent.g,n[m*3+2]=this.currentAccent.b}o.setAttribute("position",new O(r,3)),o.setAttribute("color",new O(n,3));const l=new nt({size:i.size,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,blending:w}),g=new ct(o,l);this.group.add(g),this.layers.push({points:g,geometry:o,material:l,baseY:c,speedFactor:i.speed,mouseFactor:i.mouse,depth:i.depth})}),this.group.renderOrder=-15,t.add(this.group)}setAccent(t){this.targetAccent.set(t)}update(t,e,s,i){this.reduceMotion||(this.currentAccent.lerp(this.targetAccent,.03),this.layers.forEach(o=>{const r=o.geometry.getAttribute("color"),n=r.array,c=e*o.speedFactor*24,h=s.x*o.mouseFactor*2.5,u=s.y*o.mouseFactor*2;o.points.position.x=-c+h,o.points.position.y=u,o.points.scale.x=1+Math.min(2.2,i*1.6),o.material.opacity=.65+Math.sin(t*1.8+o.depth)*.15+Math.min(.2,i*.25);for(let l=0;l<o.baseY.length;l++)(n[l*3+0]!==n[l*3+1]||n[l*3+1]!==n[l*3+2])&&(n[l*3+0]=v.lerp(n[l*3+0],this.currentAccent.r,.03),n[l*3+1]=v.lerp(n[l*3+1],this.currentAccent.g,.03),n[l*3+2]=v.lerp(n[l*3+2],this.currentAccent.b,.03));r.needsUpdate=!0}))}dispose(){this.layers.forEach(t=>{t.geometry.dispose(),t.material.dispose()}),this.group.parent?.remove(this.group)}}function yt(a,t){const e=document.createElement("canvas");e.width=a,e.height=a;const s=e.getContext("2d"),i=s.createRadialGradient(a/2,a/2,0,a/2,a/2,a/2);t.forEach(r=>i.addColorStop(r.stop,r.color)),s.fillStyle=i,s.fillRect(0,0,a,a);const o=new S(e);return o.needsUpdate=!0,o}function Ee(a,t){const e=document.createElement("canvas");e.width=a,e.height=a;const s=e.getContext("2d");s.strokeStyle=t,s.lineWidth=a*.08,s.beginPath(),s.arc(a/2,a/2,a*.38,0,Math.PI*2),s.stroke();const i=new S(e);return i.needsUpdate=!0,i}class Re{group=new T;elements=[];targetColor=new p(13214282);currentColor=new p(13214282);reduceMotion;isMobile;constructor(t){if(this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.isMobile=window.innerWidth<768||/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),this.reduceMotion||this.isMobile)return;const e=yt(128,[{stop:0,color:"rgba(255,255,255,0.95)"},{stop:.3,color:"rgba(255,230,180,0.5)"},{stop:.7,color:"rgba(200,160,80,0.15)"},{stop:1,color:"rgba(200,160,80,0)"}]),s=Ee(128,"rgba(230,200,140,0.4)"),i=yt(64,[{stop:0,color:"rgba(255,250,220,0.8)"},{stop:.6,color:"rgba(210,180,100,0.3)"},{stop:1,color:"rgba(210,180,100,0)"}]);[{tex:e,dist:0,scale:3.6,opacity:.45},{tex:s,dist:.35,scale:2.4,opacity:.22},{tex:i,dist:.65,scale:1.2,opacity:.2},{tex:e,dist:-.3,scale:2.2,opacity:.18},{tex:i,dist:-.75,scale:1.5,opacity:.15},{tex:s,dist:-1.15,scale:2.8,opacity:.14}].forEach(r=>{const n=new rt({map:r.tex,transparent:!0,opacity:0,blending:w,depthWrite:!1,depthTest:!1,color:this.currentColor}),c=new at(n);this.group.add(c),this.elements.push({sprite:c,material:n,distFactor:r.dist,baseScale:r.scale,baseOpacity:r.opacity})}),this.group.renderOrder=20,t.add(this.group)}setAccent(t){this.targetColor.set(t)}update(t,e){if(this.reduceMotion||this.isMobile||this.elements.length===0)return;this.currentColor.lerp(this.targetColor,.03);const s=e.clone().project(t);if(s.z>1){this.elements.forEach(c=>{c.material.opacity=0});return}const i=Math.hypot(s.x,s.y),o=Math.max(0,1-i*.45),r=-s.x,n=-s.y;this.elements.forEach(c=>{c.material.color.copy(this.currentColor),c.material.opacity=v.lerp(c.material.opacity,c.baseOpacity*o,.15);const h=s.x+r*c.distFactor,u=s.y+n*c.distFactor,l=new D(h,u,-.9);l.unproject(t),c.sprite.position.copy(l),c.sprite.scale.setScalar(c.baseScale*(.8+o*.4))})}dispose(){this.elements.forEach(t=>{t.material.map?.dispose(),t.material.dispose()}),this.group.parent?.remove(this.group)}}class Ie{el=null;reduceMotion;constructor(){this.reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,!this.reduceMotion&&(this.el=document.createElement("div"),this.el.id="crt-overlay",this.el.setAttribute("aria-hidden","true"),document.body.appendChild(this.el))}setChapter(t){if(!this.el||this.reduceMotion)return;let e=0;const s=t.number;s<=2?e=.085:s<=4?e=.055:s<=6?e=.03:e=0,this.el.style.opacity=String(e)}dispose(){this.el?.remove(),this.el=null}}const _e=[{era:"pre-code",position:[0,.5,8],target:[0,0,0],fov:46},{era:"algorithms",position:[0,1.2,10],target:[0,0,-2],fov:44},{era:"machines",position:[0,.8,9],target:[0,0,-1],fov:45},{era:"computers",position:[-1.5,1,9],target:[0,.5,-1],fov:43},{era:"machine-language",position:[-.8,.5,8.5],target:[0,0,0],fov:46},{era:"assembly",position:[.6,.6,9],target:[0,0,0],fov:45},{era:"first-languages",position:[0,12,-2],target:[0,0,-2],fov:42},{era:"enterprise",position:[0,.4,9],target:[0,0,0],fov:45},{era:"structured",position:[0,1,9],target:[0,0,-.5],fov:44},{era:"c",position:[-2,.6,8],target:[0,0,0],fov:45},{era:"oop",position:[0,1.4,10],target:[0,0,0],fov:46},{era:"internet",position:[0,1.8,11],target:[0,0,-2],fov:50},{era:"web",position:[0,1,9],target:[0,0,-1],fov:45},{era:"modern",position:[1.5,.8,9],target:[0,0,-1],fov:45},{era:"mobile",position:[0,.6,8.5],target:[0,0,0],fov:45},{era:"systems",position:[0,.9,9],target:[0,0,0],fov:44},{era:"ai",position:[0,1,10],target:[0,0,0],fov:47},{era:"future",position:[0,1.5,11],target:[0,0,0],fov:48}],Ue=()=>_e;class ze{renderer;scroll;rig;scene3d;particles;fog;glow;chronoCore;tunnel;glyphs;tint;streaks;portal;vignette;bloomFx;chromaticFx;shockwaveFx;dofFx;nebula;starfield;lensFlare;crtOverlay;scene;camera;eraCameraDefs=[];keys=[];callbacks;constructor(t={}){this.callbacks=t,this.eraCameraDefs=Ue(),this.initUnity()}initUnity(){this.renderer=new te("#webgl"),this.scene=this.renderer.getScene(),this.camera=this.renderer.getCamera(),this.scroll=new ee(pt.length),this.scene3d=new ie(this.scene);const t=window.innerWidth<768||/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);this.nebula=new Pe(this.scene,t),this.starfield=new Ae(this.scene,t),this.particles=new re(t?180:550,{color:10133670,size:t?.055:.045,spread:36}),this.scene.add(this.particles.points),this.fog=new ae(this.scene,658189),this.glow=new ne(this.scene),this.chronoCore=new le(this.scene),this.tunnel=new ce(this.scene,t),this.glyphs=new de(this.scene,t),this.tint=new pe(this.scene,this.fog.getFog()),this.streaks=new me(this.scene,t?160:480),this.portal=new ge(this.scene),this.vignette=new ve,this.lensFlare=new Re(this.scene),this.crtOverlay=new Ie,this.dofFx=new De(this.scene,this.camera),this.renderer.addPass(this.dofFx.pass),this.bloomFx=new ye({baseStrength:t?.18:.28,maxStrength:t?.42:.65,radius:.42,threshold:.48}),this.renderer.addPass(this.bloomFx.pass),this.chromaticFx=new we,this.renderer.addPass(this.chromaticFx.pass),this.shockwaveFx=new Ce,this.renderer.addPass(this.shockwaveFx.pass),this.rig=new se(this.camera),this.keys=this.buildDefaultKeys(),this.rig.setKeys(this.keys),this.scene3d.setEra("pre-code"),this.wireParallax()}buildDefaultKeys(){return pt.map(t=>{const e=this.eraCameraDefs.find(s=>s.era===t.era)??this.eraCameraDefs[0];return{position:new D(...e.position),target:new D(...e.target),fov:e.fov}})}pendingChapter=null;activeChapterId=null;horizontalVelocity=0;smooth=0;warpSmooth=0;mouse={x:0,y:0};mouseSm={x:0,y:0};finePointer=window.matchMedia("(hover: hover) and (pointer: fine)").matches;reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;setActiveChapter(t){this.pendingChapter=t??null}handleChapter(){if(!this.pendingChapter)return;const t=this.pendingChapter;this.pendingChapter=null,this.activeChapterId!==t.id&&(this.activeChapterId=t.id,this.scene3d.setEra(this.chapterEra(t)),this.glow.setAccent(t.color),this.chronoCore.setAccent(t.color),this.tunnel.setAccent(t.color),this.glyphs.setAccent(t.color),this.streaks.setAccent(t.color),this.portal.setAccent(t.color),this.nebula.setAccent(t.color),this.starfield.setAccent(t.color),this.lensFlare.setAccent(t.color),this.shockwaveFx.trigger(t.color),this.crtOverlay.setChapter(t),this.applyChapterTheme(t),this.callbacks.onChapterChange?.(t))}chapterEra(t){return t.era}applyChapterTheme(t){document.documentElement.style.setProperty("--ch-accent",t.color),document.documentElement.style.setProperty("--ch-era",t.era),document.documentElement.style.setProperty("--ch-color",t.color)}wireParallax(){!this.finePointer||this.reduceMotion||window.addEventListener("pointermove",t=>{this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=t.clientY/window.innerHeight*2-1},{passive:!0})}handleParallax(t){!this.finePointer||this.reduceMotion||(this.mouseSm.x=U(this.mouseSm.x,this.mouse.x,2.6,t),this.mouseSm.y=U(this.mouseSm.y,this.mouse.y,2.6,t))}start(){let t=window.scrollY,e=0,s=0,i=0;this.renderer.start((o,r)=>{const n=this.scroll.snapshot();this.handleChapter();const c=n.section+n.sectionProgress;this.smooth=this.reduceMotion?c:U(this.smooth,c,5.2,r),this.rig.applyTo(this.smooth),this.handleParallax(r);const h=this.mouseSm;this.camera.position.x+=h.x*.14+(n.progress-.5)*2.2,this.camera.position.y+=h.y*.1;const u=Math.abs(n.scrollY-t);t=n.scrollY,e=u/Math.max(1,window.innerHeight)/Math.max(.001,r);const g=Math.min(2,this.horizontalVelocity*.045),m=Math.max(Math.min(1.2,e*.32),g);m>s?s=v.lerp(s,m,.45):s=U(s,0,2.2,r);const A=n.sectionProgress,E=Math.min(A,1-A),L=Math.max(0,1-E*5),R=s>.005?L*Math.min(1.4,s*2.2):0;this.warpSmooth=this.reduceMotion?0:U(this.warpSmooth,R,3.8,r),i=U(i,(this.warpSmooth+s*.75)*.08,4,r);const W=Math.sin(o*1.6)*i;if(this.camera.rotation.z=W*.25,this.camera.rotation.x=v.lerp(this.camera.rotation.x,-i*.55,.12),!this.reduceMotion){const q=Math.min(20,s*22+this.warpSmooth*16);q>.05&&(this.camera.fov+=q,this.camera.updateProjectionMatrix())}this.nebula.update(o,n.progress,s),this.starfield.update(o,n.progress,this.mouseSm,s),this.scene3d.update(o,this.smooth/this.scroll.getSections()),this.portal.update(n),this.particles.update(o,this.camera.position),this.fog.update(o,n.progress),this.tint.update(this.warpSmooth*.6+n.progress*.5,s),this.glow.update(o),this.lensFlare.update(this.camera,this.glow.group.position),this.chronoCore.update(o,r,n.progress,s,this.warpSmooth),this.tunnel.update(n.progress,s,this.warpSmooth),this.glyphs.update(o,r,n.progress,s,this.warpSmooth),this.streaks.update(s),this.vignette.update(o,n.progress),this.dofFx.update(s),this.bloomFx.update(s),this.chromaticFx.update(s,this.warpSmooth),this.shockwaveFx.update(r)})}setRibbonProgress(t,e=0,s=0){this.scroll.setProgress(t,e),this.horizontalVelocity=s}dispose(){this.nebula.dispose(),this.starfield.dispose(),this.lensFlare.dispose(),this.crtOverlay.dispose(),this.dofFx.dispose(),this.bloomFx.dispose(),this.chromaticFx.dispose(),this.shockwaveFx.dispose(),this.scene3d.dispose(),this.particles.dispose(),this.fog.dispose(),this.glow.dispose(),this.chronoCore.dispose(),this.tunnel.dispose(),this.glyphs.dispose(),this.tint.dispose(),this.streaks.dispose(),this.portal.dispose(),this.vignette.dispose(),this.scroll.dispose(),this.renderer.dispose()}}export{ze as Experience};
