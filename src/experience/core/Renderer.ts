import * as THREE from 'three';

export class ExperienceRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly canvas: HTMLCanvasElement;
  private raf = 0;
  private clock = new THREE.Clock();
  private running = false;
  private elapsed = 0;
  private maxDt = 0.05;
  private hidden = false;

  constructor(canvasSelector = '#webgl') {
    this.canvas = document.querySelector<HTMLCanvasElement>(canvasSelector)!;

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
    this.renderer.setPixelRatio(this.devicePixelRatio());
    this.renderer.setSize(w, h, false);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
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
      this.renderer.render(this.scene, this.camera);
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
    this.renderer.dispose();
  }
}