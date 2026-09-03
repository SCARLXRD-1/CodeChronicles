import * as THREE from 'three';
import { damp } from '../../lib/math';

/**
 * TimeMachineCore
 * Núcleo cinemático 3D de la Máquina del Tiempo (Chrono-Engine).
 *
 * Componentes:
 *  1. Gimbal Rings: 3 aros concéntricos tridimensionales de precisión cronométrica
 *     (dial de grados/números romanos, dial de secuencias binarias, dial de épocas históricas).
 *  2. Chrono-Vortex: Embudo temporal cónico hacia el horizonte de sucesos, con flujo
 *     de filamentos de energía que aceleran con el scroll.
 *  3. Singularity: Núcleo emisor de energía temporal en el punto de fuga con halo y luz puntual reactiva.
 */

export class TimeMachineCore {
  readonly group = new THREE.Group();
  private scene: THREE.Scene;
  private reduce: boolean;

  // Aros giroscópicos
  private ring1!: THREE.Mesh; // Aro exterior: cronómetro y graduaciones angulares
  private ring2!: THREE.Mesh; // Aro medio: meridianos y secuencias binarias
  private ring3!: THREE.Mesh; // Aro interior: dial de épocas históricas y glifos

  private ring1Mat!: THREE.MeshStandardMaterial;
  private ring2Mat!: THREE.MeshStandardMaterial;
  private ring3Mat!: THREE.MeshStandardMaterial;

  // Vórtice temporal
  private vortexMesh!: THREE.Mesh;
  private vortexMat!: THREE.MeshBasicMaterial;
  private vortexTex!: THREE.CanvasTexture;

  // Singularidad central
  private coreMesh!: THREE.Mesh;
  private coreHalo!: THREE.Mesh;
  private coreLight!: THREE.PointLight;
  private coreMat!: THREE.MeshBasicMaterial;
  private haloMat!: THREE.MeshBasicMaterial;

  // Colores y transiciones
  private targetColor = new THREE.Color(0xc9a24a); // oro histórico
  private currentColor = new THREE.Color(0xc9a24a);
  private speedSmoothed = 0;
  private rotationSpeed1 = 0.18;
  private rotationSpeed2 = -0.26;
  private rotationSpeed3 = 0.38;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initCore();
    this.initGimbalRings();
    this.initVortex();
    this.initSingularity();

    this.scene.add(this.group);
  }

  private initCore() {
    this.group.position.set(0, 0, -8);
  }

  /**
   * Genera textura procedural de dial de cronómetro (aro exterior)
   */
  private createChronometerDialTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Fondo translúcido metálico oscuro
    ctx.fillStyle = 'rgba(10, 14, 18, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde guía
    ctx.strokeStyle = 'rgba(217, 227, 220, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    // Marcas de graduación cronométrica
    const ticks = 120;
    for (let i = 0; i < ticks; i++) {
      const x = (i / ticks) * canvas.width;
      const isMajor = i % 10 === 0;
      const isMedium = i % 5 === 0;

      ctx.strokeStyle = isMajor
        ? 'rgba(255, 235, 190, 0.95)'
        : isMedium
        ? 'rgba(217, 227, 220, 0.65)'
        : 'rgba(160, 175, 168, 0.35)';
      ctx.lineWidth = isMajor ? 3 : isMedium ? 2 : 1;

      const tickHeight = isMajor ? 36 : isMedium ? 22 : 12;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, tickHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, canvas.height);
      ctx.lineTo(x, canvas.height - tickHeight);
      ctx.stroke();

      if (isMajor) {
        ctx.fillStyle = 'rgba(255, 240, 205, 0.9)';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        const num = (i / 10) * 30;
        ctx.fillText(`${num}°`, x, 68);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(4, 1);
    return tex;
  }

  /**
   * Genera textura procedural de secuencias binarias y meridianos (aro medio)
   */
  private createBinaryDialTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(8, 11, 15, 0.92)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Líneas dobles meridianas
    ctx.strokeStyle = 'rgba(201, 162, 74, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(canvas.width, 30);
    ctx.moveTo(0, 98);
    ctx.lineTo(canvas.width, 98);
    ctx.stroke();

    // Texto binario histórico (Ada Lovelace, Turing, Von Neumann)
    const binaryWords = [
      '1843·ADA·01000001',
      'ALGORITHM·01001100',
      '1936·TURING·01010100',
      'ENIGMA·01000101',
      '1945·EDVAC·01010110',
      '1957·FORTRAN·01000110',
      '1972·C·LANG·01000011',
      'CHRONO·ENGINE·1995',
      'QUANTUM·2026·WARP',
    ];

    ctx.fillStyle = 'rgba(223, 231, 224, 0.85)';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';

    const step = canvas.width / binaryWords.length;
    binaryWords.forEach((word, idx) => {
      ctx.fillText(word, idx * step + 12, 68);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(3, 1);
    return tex;
  }

  /**
   * Genera textura para el aro interior con glifos de código
   */
  private createGlyphDialTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(5, 7, 10, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glyphs = ['λ', '∫', '0x7F', 'NOP', 'MOV', 'JMP', 'PUSH', 'POP', 'HALT', 'Δt'];
    ctx.fillStyle = 'rgba(255, 90, 60, 0.85)';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';

    const step = canvas.width / glyphs.length;
    glyphs.forEach((g, idx) => {
      ctx.fillText(g, idx * step + step / 2, 70);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(2, 1);
    return tex;
  }

  /**
   * 1. Aros concéntricos giroscópicos
   */
  private initGimbalRings() {
    const tex1 = this.createChronometerDialTexture();
    const tex2 = this.createBinaryDialTexture();
    const tex3 = this.createGlyphDialTexture();

    // Aro 1 (Exterior: R=9.2, ancho=0.6, profundidad=0.15)
    const geo1 = new THREE.CylinderGeometry(9.2, 9.2, 0.75, 64, 1, true);
    this.ring1Mat = new THREE.MeshStandardMaterial({
      map: tex1,
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.75,
      side: THREE.DoubleSide,
      emissive: this.currentColor,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    this.ring1 = new THREE.Mesh(geo1, this.ring1Mat);
    this.ring1.rotation.x = Math.PI / 2;

    // Aros de soporte torus para darle volumen biselado de latón al aro 1
    const rimGeo1 = new THREE.TorusGeometry(9.2, 0.08, 12, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xc9a24a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const rim1A = new THREE.Mesh(rimGeo1, rimMat);
    rim1A.position.y = 0.38;
    const rim1B = new THREE.Mesh(rimGeo1, rimMat);
    rim1B.position.y = -0.38;
    this.ring1.add(rim1A, rim1B);

    // Aro 2 (Medio: R=7.4, ancho=0.65)
    const geo2 = new THREE.CylinderGeometry(7.4, 7.4, 0.65, 48, 1, true);
    this.ring2Mat = new THREE.MeshStandardMaterial({
      map: tex2,
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.8,
      side: THREE.DoubleSide,
      emissive: this.currentColor,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.82,
    });
    this.ring2 = new THREE.Mesh(geo2, this.ring2Mat);
    this.ring2.rotation.x = Math.PI / 2;

    // Aro 3 (Interior: R=5.6, ancho=0.55)
    const geo3 = new THREE.CylinderGeometry(5.6, 5.6, 0.55, 40, 1, true);
    this.ring3Mat = new THREE.MeshStandardMaterial({
      map: tex3,
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.85,
      side: THREE.DoubleSide,
      emissive: this.currentColor,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.8,
    });
    this.ring3 = new THREE.Mesh(geo3, this.ring3Mat);
    this.ring3.rotation.x = Math.PI / 2;

    // Agrupar los aros con inclinaciones de gimbal iniciales
    this.ring1.rotation.set(0.2, 0.1, 0);
    this.ring2.rotation.set(-0.3, 0.25, 0.15);
    this.ring3.rotation.set(0.15, -0.2, -0.3);

    this.group.add(this.ring1, this.ring2, this.ring3);
  }

  /**
   * 2. Chrono-Vortex (Túnel cilíndrico cónico de filamentos de energía)
   */
  private initVortex() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Gradiente de filamentos y rejilla de distorsión
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, 512, 512);

    // Rayas longitudinales de estela temporal
    for (let i = 0; i < 32; i++) {
      const x = (i / 32) * 512;
      const grad = ctx.createLinearGradient(x, 0, x, 512);
      grad.addColorStop(0, 'rgba(255, 235, 190, 0.02)');
      grad.addColorStop(0.5, 'rgba(201, 162, 74, 0.35)');
      grad.addColorStop(1, 'rgba(224, 35, 28, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 2, 0, 4, 512);
    }

    // Aros horizontales luminosos
    for (let j = 0; j < 16; j++) {
      const y = (j / 16) * 512;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    this.vortexTex = new THREE.CanvasTexture(canvas);
    this.vortexTex.wrapS = THREE.RepeatWrapping;
    this.vortexTex.wrapT = THREE.RepeatWrapping;
    this.vortexTex.repeat.set(4, 8);

    // Geometría cónica alargada hacia el fondo (-Z)
    // Radio frontal: 11, Radio trasero: 1.2, Longitud: 55
    const vortexGeo = new THREE.CylinderGeometry(1.2, 11, 55, 32, 16, true);
    this.vortexMat = new THREE.MeshBasicMaterial({
      map: this.vortexTex,
      transparent: true,
      opacity: 0.38,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: this.currentColor,
    });

    this.vortexMesh = new THREE.Mesh(vortexGeo, this.vortexMat);
    // Apuntar el cilindro a lo largo del eje Z
    this.vortexMesh.rotation.x = Math.PI / 2;
    this.vortexMesh.position.z = -28;
    this.group.add(this.vortexMesh);
  }

  /**
   * 3. Singularidad temporal central (Horizonte de sucesos)
   */
  private initSingularity() {
    // Esfera central de energía
    const coreGeo = new THREE.SphereGeometry(1.2, 24, 24);
    this.coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    this.coreMesh = new THREE.Mesh(coreGeo, this.coreMat);
    this.coreMesh.position.z = -46; // al fondo del vórtice

    // Halo exterior pulsante
    const haloGeo = new THREE.PlaneGeometry(16, 16);
    const haloTex = createRadialGlowTexture();
    this.haloMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      color: this.currentColor,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.coreHalo = new THREE.Mesh(haloGeo, this.haloMat);
    this.coreHalo.position.z = -45.5;

    // Luz puntual que emana desde la singularidad hacia adelante
    this.coreLight = new THREE.PointLight(0xc9a24a, 2.5, 60, 1.2);
    this.coreLight.position.z = -40;

    // Luz frontal que baña directamente los aros giroscópicos y sus graduaciones
    this.dialFrontLight = new THREE.PointLight(0xffeedd, 2.2, 35, 0.8);
    this.dialFrontLight.position.set(0, 2, 8);

    this.group.add(this.coreMesh, this.coreHalo, this.coreLight, this.dialFrontLight);
  }

  private dialFrontLight!: THREE.PointLight;

  /**
   * Cambia el acento cromático del núcleo de la máquina del tiempo
   */
  setAccent(colorHex: string) {
    this.targetColor.set(colorHex);
  }

  /**
   * Loop de actualización en cada frame
   */
  update(t: number, dt: number, snapProgress: number, speedVal: number, warp: number) {
    if (this.reduce) {
      // Movimiento neutro y seguro en modo reduced-motion
      this.currentColor.lerp(this.targetColor, 0.05);
      this.ring1Mat.emissive.copy(this.currentColor);
      this.ring2Mat.emissive.copy(this.currentColor);
      this.ring3Mat.emissive.copy(this.currentColor);
      this.vortexMat.color.copy(this.currentColor);
      this.haloMat.color.copy(this.currentColor);
      this.coreLight.color.copy(this.currentColor);
      return;
    }

    // Suavizar velocidad y warp con mayor pegada
    this.speedSmoothed = damp(this.speedSmoothed, speedVal, 3.8, dt);
    const speedBoost = 1 + this.speedSmoothed * 11.5 + warp * 7.5;

    // 1. Contra-rotación giroscópica de los aros con precesión 3D reactiva al scroll
    this.ring1.rotation.z += this.rotationSpeed1 * speedBoost * dt;
    this.ring1.rotation.x = 0.2 + Math.sin(t * 0.5) * 0.08 + this.speedSmoothed * 0.45;
    this.ring1.rotation.y = Math.cos(t * 0.35) * 0.06 + this.speedSmoothed * 0.25;

    this.ring2.rotation.z += this.rotationSpeed2 * speedBoost * dt;
    this.ring2.rotation.y = Math.cos(t * 0.4) * 0.12 - this.speedSmoothed * 0.4;
    this.ring2.rotation.x = Math.sin(t * 0.6) * 0.08 + this.speedSmoothed * 0.3;

    this.ring3.rotation.z += this.rotationSpeed3 * speedBoost * dt;
    this.ring3.rotation.x = -0.15 + Math.sin(t * 0.7) * 0.1 + this.speedSmoothed * 0.55;
    this.ring3.rotation.y = Math.sin(t * 0.5) * 0.09 - this.speedSmoothed * 0.35;

    // 2. Desplazamiento del flujo del vórtice (sensación de vuelo temporal infinito)
    if (this.vortexTex) {
      const scrollFlow = dt * (0.8 + this.speedSmoothed * 7.5 + warp * 5.5);
      this.vortexTex.offset.y = (this.vortexTex.offset.y + scrollFlow) % 1;
      this.vortexTex.offset.x = (this.vortexTex.offset.x + dt * 0.08 + this.speedSmoothed * 0.25) % 1;
    }

    // Respiración del vórtice
    const pulse = Math.sin(t * 2.2) * 0.05 + 1.0 + this.speedSmoothed * 0.28;
    this.vortexMesh.scale.set(pulse, pulse, 1);
    this.vortexMat.opacity = THREE.MathUtils.lerp(
      0.40,
      0.96,
      Math.min(1, this.speedSmoothed * 2.2 + warp * 1.2),
    );

    // 3. Pulsación de la singularidad
    const corePulse = 1.0 + Math.sin(t * 4.0) * 0.15 + warp * 0.5 + this.speedSmoothed * 0.4;
    this.coreMesh.scale.setScalar(corePulse);
    this.coreHalo.scale.setScalar(1.0 + Math.sin(t * 1.8) * 0.14 + warp * 0.8 + this.speedSmoothed * 0.6);
    this.haloMat.opacity = THREE.MathUtils.lerp(0.55, 0.98, warp + this.speedSmoothed);
    this.coreLight.intensity = THREE.MathUtils.lerp(3.2, 11.5, warp + this.speedSmoothed * 1.8);
    if (this.dialFrontLight) {
      this.dialFrontLight.intensity = THREE.MathUtils.lerp(2.2, 6.0, this.speedSmoothed + warp * 0.5);
    }

    // 4. Interpolación suave de color según la era actual
    this.currentColor.lerp(this.targetColor, 0.08);

    this.ring1Mat.emissive.copy(this.currentColor);
    this.ring1Mat.emissiveIntensity = 0.55 + warp * 0.4 + this.speedSmoothed * 0.5;

    this.ring2Mat.emissive.copy(this.currentColor);
    this.ring2Mat.emissiveIntensity = 0.65 + warp * 0.45 + this.speedSmoothed * 0.55;

    this.ring3Mat.emissive.copy(this.currentColor);
    this.ring3Mat.emissiveIntensity = 0.75 + warp * 0.5 + this.speedSmoothed * 0.6;

    this.vortexMat.color.copy(this.currentColor);
    this.haloMat.color.copy(this.currentColor);
    this.coreLight.color.copy(this.currentColor);

    // 5. Acercamiento dinámico según el scroll global + impulso
    this.group.position.z = -8 - snapProgress * 3.5 + this.speedSmoothed * 1.6;
  }

  dispose() {
    this.scene.remove(this.group);
    [this.ring1Mat, this.ring2Mat, this.ring3Mat, this.vortexMat, this.coreMat, this.haloMat].forEach(
      (m) => {
        m?.map?.dispose();
        m?.dispose();
      },
    );
    this.vortexTex?.dispose();
    this.group.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).geometry?.dispose();
      }
    });
  }
}

/**
 * Textura procedural de resplandor radial suave
 */
function createRadialGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const r = 128;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.2, 'rgba(255, 240, 210, 0.8)');
  grad.addColorStop(0.5, 'rgba(201, 162, 74, 0.35)');
  grad.addColorStop(1, 'rgba(201, 162, 74, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
