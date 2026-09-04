import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js';

export class ExperienceRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly canvas: HTMLCanvasElement;
  private readonly composer: EffectComposer;
  private readonly renderPass: RenderPass;
  private readonly outputPass: OutputPass;
  private useComposer = true;
  private reduceMotion: boolean;
  private raf = 0;
  private clock = new THREE.Clock();
  private running = false;
  private elapsed = 0;
  private maxDt = 0.05;
  private hidden = false;

  constructor(canvasSelector = '#webgl') {
    this.canvas = document.querySelector<HTMLCanvasElement>(canvasSelector)!;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05070a);

    this.camera = new THREE.PerspectiveCamera(45, this.aspect, 0.1, 400);
    this.camera.position.set(0, 0, 8);

    // Setup EffectComposer pipeline
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);

    this.boundResize = () => this.onResize();
    window.addEventListener('resize', this.boundResize);

    this.onResize();

    // Cap de pixelRatio: 2 en desktop, 1.5 en pantallas pequeñas (FASE 10)
    this.renderer.setPixelRatio(this.devicePixelRatio());

    document.addEventListener('visibilitychange', () => {
      this.hidden = document.hidden;
    });
  }

  private boundResize: () => void;

  private devicePixelRatio(): number {
    const isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const cap = isMobile ? 1.25 : 2.0;
    return Math.min(window.devicePixelRatio || 1, cap);
  }

  get aspect(): number {
    return window.innerWidth / Math.max(1, window.innerHeight);
  }

  private onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pr = this.devicePixelRatio();
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Inserta un pase de post-procesamiento antes del OutputPass final
   */
  addPass(pass: Pass) {
    const passes = this.composer.passes;
    const outIdx = passes.indexOf(this.outputPass);
    if (outIdx >= 0) {
      this.composer.insertPass(pass, outIdx);
    } else {
      this.composer.addPass(pass);
    }
  }

  getComposer(): EffectComposer {
    return this.composer;
  }

  /**
   * El loop principal delega en un callback por frame.
   * Los módulos de escena se suscriben a través de update.
   */
  start(onFrame: (t: number, dt: number) => void) {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      if (this.hidden) return;
      const dt = Math.min(this.maxDt, this.clock.getDelta());
      this.elapsed += dt;
      onFrame(this.elapsed, dt);

      if (this.useComposer && !this.reduceMotion) {
        this.composer.render(dt);
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    };
    this.clock.start();
    loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  getRenderer() {
    return this.renderer;
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.boundResize);
    this.composer.dispose();
    this.renderer.dispose();
  }
}