import * as THREE from 'three';
import { ExperienceRenderer } from './core/Renderer';
import { ScrollDriver } from './camera/ScrollDriver';
import { CameraRig, type CameraKey } from './camera/CameraRig';
import { CinematicScene } from './scenes/CinematicScene';
import { ParticleField } from './atmosphere/ParticleField';
import { FogHaze } from './atmosphere/FogHaze';
import { MoonGlow } from './atmosphere/MoonGlow';
import { TimeTunnel } from './atmosphere/TimeTunnel';
import { TimeMachineCore } from './atmosphere/TimeMachineCore';
import { TemporalGlyphs } from './atmosphere/TemporalGlyphs';
import { EraTint } from './atmosphere/EraTint';
import { ScrollStreaks } from './atmosphere/ScrollStreaks';
import { PortalDirector } from './transitions/PortalDirector';

import { VignetteFX } from './effects/VignetteFX';
import { BloomFX } from './effects/BloomFX';
import { ChromaticAberrationFX } from './effects/ChromaticAberrationFX';
import { ShockwaveFX } from './effects/ShockwaveFX';
import { DepthOfFieldFX } from './effects/DepthOfFieldFX';
import { EraNebula } from './atmosphere/EraNebula';
import { StarfieldParallax } from './atmosphere/StarfieldParallax';
import { LensFlareFX } from './effects/LensFlareFX';
import { CRTOverlay } from '../cinema/CRTOverlay';

import type { Era } from '../data/types';
import { chapters, type ChapterMeta } from '../data/chapters';
import { getEraCamera, type EraCameraDef } from '../chapters/ChapterCameras';
import { damp } from '../lib/math';


export interface ExperienceCallbacks {
  /** Se llama cuando cambia el capítulo activo. */
  onChapterChange?: (chapter: ChapterMeta) => void;
}

/**
 * Experiencia principal.
 * Coordina el scroll cinematográfico, la cámara, las escenas por era y los efectos.
 *
 * FASE 2: prototipo cinematográfico con una escena por capítulo y cámara scroll-driven.
 */
export class Experience {
  private renderer!: ExperienceRenderer;
  private scroll!: ScrollDriver;
  private rig!: CameraRig;
  private scene3d!: CinematicScene;
  private particles!: ParticleField;
  private fog!: FogHaze;
  private glow!: MoonGlow;
  private chronoCore!: TimeMachineCore;
  private tunnel!: TimeTunnel;
  private glyphs!: TemporalGlyphs;
  private tint!: EraTint;
  private streaks!: ScrollStreaks;
  private portal!: PortalDirector;
  private vignette!: VignetteFX;

  // Nuevas mejoras cinemáticas
  private bloomFx!: BloomFX;
  private chromaticFx!: ChromaticAberrationFX;
  private shockwaveFx!: ShockwaveFX;
  private dofFx!: DepthOfFieldFX;
  private nebula!: EraNebula;
  private starfield!: StarfieldParallax;
  private lensFlare!: LensFlareFX;
  private crtOverlay!: CRTOverlay;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private eraCameraDefs: EraCameraDef[] = [];
  private keys: CameraKey[] = [];
  private callbacks: ExperienceCallbacks;

  constructor(callbacks: ExperienceCallbacks = {}) {
    this.callbacks = callbacks;
    this.eraCameraDefs = getEraCamera();
    this.initUnity();
  }

  private initUnity() {
    this.renderer = new ExperienceRenderer('#webgl');
    this.scene = this.renderer.getScene();
    this.camera = this.renderer.getCamera() as THREE.PerspectiveCamera;

    this.scroll = new ScrollDriver(chapters.length);
    this.scene3d = new CinematicScene(this.scene);
    const mobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    // Fondo cósmico multi-capa: Nebulosa y campo de estrellas con parallax profundo
    this.nebula = new EraNebula(this.scene, mobile);
    this.starfield = new StarfieldParallax(this.scene, mobile);

    this.particles = new ParticleField(mobile ? 180 : 550, {
      color: 0x9aa0a6,
      size: mobile ? 0.055 : 0.045,
      spread: 36,
    });
    this.scene.add(this.particles.points);
    this.fog = new FogHaze(this.scene, 0x0a0b0d);
    this.glow = new MoonGlow(this.scene);
    this.chronoCore = new TimeMachineCore(this.scene);
    this.tunnel = new TimeTunnel(this.scene, mobile);
    this.glyphs = new TemporalGlyphs(this.scene, mobile);
    this.tint = new EraTint(this.scene, this.fog.getFog());
    this.streaks = new ScrollStreaks(this.scene, mobile ? 160 : 480);
    this.portal = new PortalDirector(this.scene);
    this.vignette = new VignetteFX();
    this.lensFlare = new LensFlareFX(this.scene);
    this.crtOverlay = new CRTOverlay();

    // Pipeline de post-procesamiento cinemático
    this.dofFx = new DepthOfFieldFX(this.scene, this.camera);
    this.renderer.addPass(this.dofFx.pass);

    this.bloomFx = new BloomFX({
      baseStrength: mobile ? 0.18 : 0.28,
      maxStrength: mobile ? 0.42 : 0.65,
      radius: 0.42,
      threshold: 0.48,
    });
    this.renderer.addPass(this.bloomFx.pass);

    this.chromaticFx = new ChromaticAberrationFX();
    this.renderer.addPass(this.chromaticFx.pass);

    this.shockwaveFx = new ShockwaveFX();
    this.renderer.addPass(this.shockwaveFx.pass);

    this.rig = new CameraRig(this.camera);


    // Cámara inicial por defecto
    this.keys = this.buildDefaultKeys();
    this.rig.setKeys(this.keys);

    // Empezar en la era del capítulo 0 (hero): pre-code
    this.scene3d.setEra('pre-code');

    this.wireParallax();
  }

  /**
   * Construye un keyframe por capítulo a partir de su definición de cámara de era.
   * Todo el libro queda recorrido por un solo "travel" de cámara.
   */
  private buildDefaultKeys(): CameraKey[] {
    return chapters.map((ch) => {
      const def = this.eraCameraDefs.find((d) => d.era === ch.era) ?? this.eraCameraDefs[0];
      return {
        position: new THREE.Vector3(...def.position),
        target: new THREE.Vector3(...def.target),
        fov: def.fov,
      };
    });
  }

  private pendingChapter: ChapterMeta | null = null;
  private activeChapterId: string | null = null;
  private horizontalVelocity = 0;

  // C3 · cámara amortiguada + parallax sutil de ratón
  private smooth = 0;
  private warpSmooth = 0;
  private mouse = { x: 0, y: 0 };
  private mouseSm = { x: 0, y: 0 };
  private finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  private reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * La UI informa del capítulo activo (vía IntersectionObserver).
   * La experiencia cambia de era, acento y tema de capítulo.
   */
  setActiveChapter(chapter: ChapterMeta | null | undefined) {
    this.pendingChapter = chapter ?? null;
  }

  private handleChapter() {
    if (!this.pendingChapter) return;
    const chapter = this.pendingChapter;
    this.pendingChapter = null;
    if (this.activeChapterId === chapter.id) return;
    this.activeChapterId = chapter.id;
    this.scene3d.setEra(this.chapterEra(chapter));
    this.glow.setAccent(chapter.color);
    this.chronoCore.setAccent(chapter.color);
    this.tunnel.setAccent(chapter.color);
    this.glyphs.setAccent(chapter.color);
    this.streaks.setAccent(chapter.color);
    this.portal.setAccent(chapter.color);
    this.nebula.setAccent(chapter.color);
    this.starfield.setAccent(chapter.color);
    this.lensFlare.setAccent(chapter.color);
    this.shockwaveFx.trigger(chapter.color);
    this.crtOverlay.setChapter(chapter);
    this.applyChapterTheme(chapter);
    this.callbacks.onChapterChange?.(chapter);
  }

  private chapterEra(ch: ChapterMeta): Era {
    return ch.era;
  }

  private applyChapterTheme(ch: ChapterMeta) {
    document.documentElement.style.setProperty('--ch-accent', ch.color);
    document.documentElement.style.setProperty('--ch-era', ch.era);
    document.documentElement.style.setProperty('--ch-color', ch.color);
  }

  private wireParallax() {
    if (!this.finePointer || this.reduceMotion) return;
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  private handleParallax(dt: number) {
    if (!this.finePointer || this.reduceMotion) return;
    this.mouseSm.x = damp(this.mouseSm.x, this.mouse.x, 2.6, dt);
    this.mouseSm.y = damp(this.mouseSm.y, this.mouse.y, 2.6, dt);
  }

  start() {
    let lastScrollY = window.scrollY;
    let rawSpeed = 0;
    let speedVal = 0;
    let roll = 0;

    this.renderer.start((t, dt) => {
      const snap = this.scroll.snapshot();

      // Capítulo activo (viene de la UI)
      this.handleChapter();

      // Cámara — el segmento se amortigua para evitar cortes
      const rawSegment = snap.section + snap.sectionProgress;
      this.smooth = this.reduceMotion ? rawSegment : damp(this.smooth, rawSegment, 5.2, dt);
      this.rig.applyTo(this.smooth);
      this.handleParallax(dt);
      const drift = this.mouseSm;
      this.camera.position.x += drift.x * 0.14 + (snap.progress - 0.5) * 2.2;
      this.camera.position.y += drift.y * 0.1;

      // Velocidad de scroll para los efectos de viaje temporal cinemático
      const scrollDelta = Math.abs(snap.scrollY - lastScrollY);
      lastScrollY = snap.scrollY;
      const scrollVelocity = scrollDelta / Math.max(1, window.innerHeight);
      rawSpeed = scrollVelocity / Math.max(0.001, dt);
      const ribbonSpeed = Math.min(2.0, this.horizontalVelocity * 0.045);
      const instantSpeed = Math.max(Math.min(1.2, rawSpeed * 0.32), ribbonSpeed);
      if (instantSpeed > speedVal) {
        speedVal = THREE.MathUtils.lerp(speedVal, instantSpeed, 0.45);
      } else {
        speedVal = damp(speedVal, 0, 2.2, dt);
      }

      // "Impulso" al avanzar entre eras y momentos
      const sectionFrac = snap.sectionProgress;
      const nearBoundary = Math.min(sectionFrac, 1 - sectionFrac);
      const boundaryProximity = Math.max(0, 1 - nearBoundary * 5.0);
      const targetWarp = speedVal > 0.005 ? boundaryProximity * Math.min(1.4, speedVal * 2.2) : 0;
      this.warpSmooth = this.reduceMotion ? 0 : damp(this.warpSmooth, targetWarp, 3.8, dt);

      // Roll temporal cinemático + bamboleo relativista al acelerar
      roll = damp(roll, (this.warpSmooth + speedVal * 0.75) * 0.08, 4, dt);
      const overRoll = Math.sin(t * 1.6) * roll;
      this.camera.rotation.z = overRoll * 0.25;
      this.camera.rotation.x = THREE.MathUtils.lerp(this.camera.rotation.x, -roll * 0.55, 0.12);

      // Deformación relativista del campo de visión (Warp FOV / Dolly-zoom temporal)
      if (!this.reduceMotion) {
        const warpFov = Math.min(20, speedVal * 22 + this.warpSmooth * 16);
        if (warpFov > 0.05) {
          this.camera.fov += warpFov;
          this.camera.updateProjectionMatrix();
        }
      }

      // Escena y efectos del Núcleo de la Máquina del Tiempo
      this.nebula.update(t, snap.progress, speedVal);
      this.starfield.update(t, snap.progress, this.mouseSm, speedVal);
      this.scene3d.update(t, this.smooth / this.scroll.getSections());
      this.portal.update(snap);
      this.particles.update(t, this.camera.position);
      this.fog.update(t, snap.progress);
      this.tint.update(this.warpSmooth * 0.6 + snap.progress * 0.5, speedVal);
      this.glow.update(t);
      this.lensFlare.update(this.camera, this.glow.group.position);
      this.chronoCore.update(t, dt, snap.progress, speedVal, this.warpSmooth);
      this.tunnel.update(snap.progress, speedVal, this.warpSmooth);
      this.glyphs.update(t, dt, snap.progress, speedVal, this.warpSmooth);
      this.streaks.update(speedVal);
      this.vignette.update(t, snap.progress);

      // Pases de post-procesamiento cinemático
      this.dofFx.update(speedVal);
      this.bloomFx.update(speedVal);
      this.chromaticFx.update(speedVal, this.warpSmooth);
      this.shockwaveFx.update(dt);
    });
  }

  public setRibbonProgress(progress: number, rawPixels = 0, velocity = 0) {
    this.scroll.setProgress(progress, rawPixels);
    this.horizontalVelocity = velocity;
  }

  dispose() {
    this.nebula.dispose();
    this.starfield.dispose();
    this.lensFlare.dispose();
    this.crtOverlay.dispose();
    this.dofFx.dispose();
    this.bloomFx.dispose();
    this.chromaticFx.dispose();
    this.shockwaveFx.dispose();
    this.scene3d.dispose();
    this.particles.dispose();
    this.fog.dispose();
    this.glow.dispose();
    this.chronoCore.dispose();
    this.tunnel.dispose();
    this.glyphs.dispose();
    this.tint.dispose();
    this.streaks.dispose();
    this.portal.dispose();
    this.vignette.dispose();
    this.scroll.dispose();
    this.renderer.dispose();
  }
}