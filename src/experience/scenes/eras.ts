import * as THREE from 'three';
import type { Era } from '../../data/types';
import type { SceneObject } from './CinematicScene';

type Builder = () => SceneObject[];

function material(color: number, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.35, ...opts });
}

function randomIn(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeGroup() {
  return new THREE.Group();
}

interface BuildContext {
  root: THREE.Group;
  ambientIntensity?: number;
  keyIntensity?: number;
  keyColor?: number;
  ambientColor?: number;
}

function buildBase(ctx: BuildContext): SceneObject[] {
  const { root } = ctx;
  const ambient = new THREE.AmbientLight(ctx.ambientColor ?? 0xc9a26b, ctx.ambientIntensity ?? 0.6);
  const key = new THREE.DirectionalLight(ctx.keyColor ?? 0xfff2dd, ctx.keyIntensity ?? 1.1);
  key.position.set(2, 4, 3);
  root.add(ambient, key);
  return [{ mesh: root }];
}

/**
 * Cada era devuelve un conjunto de objetos añadidos a un mismo `root`.
 * Las luces se añaden como hijos de `root`, por lo que se limpian
 * automáticamente al cambiar de era (no se acumulan).
 */
export const eras: Record<Era, Builder> = {
  'pre-code': () => {
    const ctx = { root: makeGroup(), ambientIntensity: 0.6, keyIntensity: 1.1 };
    const objects = buildBase(ctx);
    const root = ctx.root;

    for (let i = 0; i < 9; i++) {
      const g = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 32), material(0x8a7350));
      const teeth = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.09, 8, 24),
        material(0x7a6240),
      );
      teeth.rotation.x = Math.PI / 2;
      g.add(teeth);

      const angle = (i / 9) * Math.PI * 2;
      const radius = 3.0 + (i % 3) * 1.4;
      g.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8, -i * 1.6);
      g.rotation.z = angle;
      g.userData.speed = randomIn(0.2, 0.9);
      g.userData.axis = angle;
      root.add(g);
      objects.push({
        mesh: g,
        update: (t) => {
          g.rotation.z = (g.userData.axis as number) + t * (g.userData.speed as number);
        },
      });
    }

    for (let i = 0; i < 6; i++) {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 0.9),
        material(0xd8c9a3, { side: THREE.DoubleSide }),
      );
      card.position.set(randomIn(-4, 4), randomIn(-3, 3), randomIn(-2, -12));
      card.rotation.set(randomIn(-0.4, 0.4), randomIn(-0.4, 0.4), 0);
      card.userData.drift = randomIn(-0.3, 0.3);
      root.add(card);
      objects.push({
        mesh: card,
        update: (t) => {
          card.rotation.z = (card.userData.drift as number) + Math.sin(t * 0.4 + i) * 0.05;
          card.position.y += Math.sin(t * 0.5 + i * 2) * 0.0008;
        },
      });
    }

    objects[0].mesh = root;
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = Math.sin(t * 0.1) * 0.12;
      },
    });
    return objects;
  },

  algorithms: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x1d2631, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 0.9 };
    const objects = buildBase(ctx);
    const root = ctx.root;

    for (let i = 0; i < 40; i++) {
      const glyph = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.12, 0),
        material(0xaec3c9, { emissive: 0x3a2c18, emissiveIntensity: 0.65 }),
      );
      glyph.position.set(randomIn(-8, 8), randomIn(-4, 4), randomIn(-10, 2));
      root.add(glyph);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = t * 0.03;
      },
    });
    return objects;
  },

  machines: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x3a3024, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 1.1 };
    const objects = buildBase(ctx);
    const root = ctx.root;

    for (let i = 0; i < 8; i++) {
      const tower = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.0), material(0x3f4543));
      body.position.y = 1.1;
      tower.add(body);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
          const relay = new THREE.Mesh(
            new THREE.SphereGeometry(0.07, 8, 8),
            material(0x23282b, { emissive: 0xc9a24a, emissiveIntensity: 0.5 }),
          );
          relay.position.set(-0.55 + c * 0.55, 1.85 - r * 0.5, 0.52);
          relay.userData.relayPulse = i * 3 + r * 3 + c;
          tower.add(relay);
        }
      }
      const angle = (i / 8) * Math.PI * 2;
      tower.position.set(Math.cos(angle) * 4.5, 0, Math.sin(angle) * 4.5);
      tower.rotation.y = -angle;
      root.add(tower);
      objects.push({
        mesh: tower,
        update: (t) => {
          tower.children.forEach((child) => {
            const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (m.emissiveIntensity !== undefined) {
              m.emissiveIntensity = 0.4 + Math.abs(Math.sin(t * 2 + (child.userData.relayPulse as number))) * 0.5;
            }
          });
        },
      });
    }
    objects.push({ mesh: root });
    return objects;
  },

  computers: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x16202b, ambientIntensity: 0.6, keyColor: 0xdfe7e0, keyIntensity: 1.0 };
    const objects = buildBase(ctx);
    const root = ctx.root;

    for (let i = 0; i < 6; i++) {
      const cabinet = new THREE.Group();
      const box = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.0, 1.4), material(0x333b41));
      box.position.y = 1.5;
      cabinet.add(box);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 5; c++) {
          const tube = new THREE.Mesh(
            new THREE.CylinderGeometry(0.09, 0.09, 0.5, 12),
            material(0x141a20, { emissive: 0x8aa8c4, emissiveIntensity: 0.75, transparent: true, opacity: 0.85 }),
          );
          tube.position.set(-0.9 + c * 0.45, 2.5 - r * 0.8, 0.73);
          tube.userData.pulseId = i * 15 + r * 5 + c;
          cabinet.add(tube);
        }
      }
      cabinet.position.set(-6 + i * 2.4, 0, (i % 2 === 0 ? -1 : 1) * randomIn(0.5, 2));
      root.add(cabinet);
      objects.push({
        mesh: cabinet,
        update: (t) => {
          cabinet.children.forEach((child) => {
            const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (m.emissiveIntensity !== undefined) {
              m.emissiveIntensity = 0.6 + Math.abs(Math.sin(t * 1.5 + (child.userData.pulseId as number) * 0.7)) * 0.5;
            }
          });
        },
      });
    }
    objects.push({ mesh: root });
    return objects;
  },

  'machine-language': () => {
    const ctx = { root: makeGroup(), ambientColor: 0x2a2420, ambientIntensity: 0.5, keyIntensity: 0.7 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    const code = new THREE.Mesh(new THREE.BoxGeometry(6, 0.12, 3), material(0x232a2e));
    root.add(code);
    const bits = [0, 1, 0, 1, 1, 0, 1, 1, 0, 1];
    for (let i = 0; i < bits.length; i++) {
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.28, 0.28),
        material(0x3a444c, {
          emissive: bits[i] ? 0xc9a24a : 0x43341f,
          emissiveIntensity: bits[i] ? 0.8 : 0.3,
        }),
      );
      b.position.set(-2.5 + i * 0.55, 0.14, 0);
      root.add(b);
    }
    objects[0].mesh = root;
    return objects;
  },

  assembly: () => {
    const root = makeGroup();
    const objects = buildBase({ root, ambientColor: 0x1c242c, ambientIntensity: 0.6, keyIntensity: 0.7 });
    for (let i = 0; i < 10; i++) {
      const col = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 2.4, 0.3),
        material(0x2f3a41, { emissive: 0x8a6a34, emissiveIntensity: 0.2 + (i % 3) * 0.2 }),
      );
      col.position.set(-4.5 + i * 1, 0, 0);
      root.add(col);
    }
    objects[0].mesh = root;
    return objects;
  },

  'first-languages': () => {
    const ctx = { root: makeGroup(), ambientColor: 0x3a2e22, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 0.8 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 4; i++) {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 1.1, 0.12),
        material(0x14161a, { emissive: 0x3a2c18, emissiveIntensity: 0.6 }),
      );
      panel.position.set(-4.5 + i * 3, 0, -2);
      panel.rotation.y = 0.15 * (i % 2 === 0 ? 1 : -1);
      root.add(panel);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = Math.sin(t * 0.06) * 0.05;
      },
    });
    return objects;
  },

  enterprise: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x999a88, ambientIntensity: 0.5, keyIntensity: 0.7 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, i % 2 ? 0.9 : 1.6), material(0x8899aa));
      s.position.set(-4.5 + i * 1.3, (i % 3) * 0.2, -1 + (i % 2) * 2);
      root.add(s);
    }
    objects[0].mesh = root;
    return objects;
  },

  structured: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x233038, ambientIntensity: 0.4, keyColor: 0xdfe7e0, keyIntensity: 0.7 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 12; i++) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(5.2, 0.03, 0.03),
        material(0x4a3f30, { emissive: 0xc9a24a, emissiveIntensity: 0.7 }),
      );
      line.position.set(0, -2.5 + i * 0.45, -i * 0.2);
      root.add(line);
    }
    objects[0].mesh = root;
    return objects;
  },

  c: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x1d2631, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 0.9 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 6; i++) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4, 0.8), material(0x232b33));
      pillar.position.set(-5 + i * 2, 0, -i * 0.6);
      root.add(pillar);
      const glow = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.2, 0.9),
        material(0x6f86a3, { emissive: 0x3f5c80, emissiveIntensity: 0.9 }),
      );
      glow.position.set(-5 + i * 2, 2 + (i % 2 ? 0.6 : -0.6), -i * 0.6);
      root.add(glow);
    }
    objects[0].mesh = root;
    return objects;
  },

  oop: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x33221e, ambientIntensity: 0.4, keyColor: 0xdfe7e0, keyIntensity: 0.8 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 8; i++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 20, 20),
        material(0x8a4436, { roughness: 0.4, metalness: 0.3 }),
      );
      const angle = (i / 8) * Math.PI * 2;
      sphere.position.set(Math.cos(angle) * 3.2, Math.sin(angle * 2) * 1.2, Math.sin(angle) * 3.2);
      root.add(sphere);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = t * 0.08;
        root.rotation.x = Math.sin(t * 0.12) * 0.15;
      },
    });
    return objects;
  },

  internet: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x16202b, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 0.9 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const n = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 10, 10),
        material(0x6f86a3, { emissive: 0x2c445c, emissiveIntensity: 0.8 }),
      );
      const a = (i / 14) * Math.PI * 2;
      n.position.set(Math.cos(a) * 4, Math.sin(a * 3) * 2, Math.sin(a) * 4);
      root.add(n);
      nodes.push(n);
    }
    const lineMat = new THREE.LineBasicMaterial({ color: 0x3f5c80 });
    for (let i = 0; i < nodes.length; i++) {
      const next = (i + 1) % nodes.length;
      const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[next].position]);
      const line = new THREE.Line(geo, lineMat);
      root.add(line);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        nodes.forEach((n, i) => {
          const m = n.material as THREE.MeshStandardMaterial;
          m.emissiveIntensity = 0.5 + Math.abs(Math.sin(t * 2 + i * 1.3)) * 0.7;
        });
      },
    });
    return objects;
  },

  web: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x33211a, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 1.0 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 7; i++) {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 0.1), material(0x1a1f26));
      frame.position.set(-6 + i * 2, i % 2 ? 0.8 : -0.6, -i * 0.5);
      const nl = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.2, 0.06),
        material(0x3a241f, { emissive: 0x8a3a2e, emissiveIntensity: 0.35 }),
      );
      nl.position.set(0, 0, 0.09);
      frame.add(nl);
      root.add(frame);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = Math.sin(t * 0.04) * 0.05;
      },
    });
    return objects;
  },

  modern: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x2a2620, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 0.9 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.6, 0.6),
        material(0xb8955f, { roughness: 0.3, metalness: 0.4 }),
      );
      cube.position.set(randomIn(-5, 5), randomIn(-2, 2), randomIn(-5, 1));
      cube.rotation.set(randomIn(-1, 1), randomIn(-1, 1), 0);
      root.add(cube);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = t * 0.02;
      },
    });
    return objects;
  },

  mobile: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x1c242c, ambientIntensity: 0.5, keyIntensity: 0.7 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 6; i++) {
      const phone = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.5, 0.09), material(0x111820));
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 1.2, 0.1),
        material(0x181f28, { emissive: 0x5c7a99, emissiveIntensity: 0.5 }),
      );
      phone.add(screen);
      phone.position.set(-4 + i * 1.7, 0, randomIn(-2, 0));
      phone.rotation.y = randomIn(-0.4, 0.4);
      root.add(phone);
    }
    objects[0].mesh = root;
    return objects;
  },

  systems: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x1d2631, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 0.9 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 6; i++) {
      const rack = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 0.8), material(0x12202b));
      rack.position.set(-4 + i * 1.6, i % 2 ? 0.4 : -0.4, -1);
      root.add(rack);
      const led = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.4, 0.05),
        material(0x3f5c80, { emissive: 0x8aa8c4, emissiveIntensity: 1 }),
      );
      led.position.set(0, 0, 0.42);
      rack.add(led);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = t * 0.02;
      },
    });
    return objects;
  },

  ai: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x331a15, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 1.0 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    const layers = 5;
    const perLayer = 7;
    const nodes: THREE.Mesh[] = [];
    for (let l = 0; l < layers; l++) {
      for (let n = 0; n < perLayer; n++) {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 10, 10),
          material(0x8a3a2e, { emissive: 0xc8392a, emissiveIntensity: 0.9 }),
        );
        node.position.set((l - (layers - 1) / 2) * 1.6, (n - (perLayer - 1) / 2) * 0.7, 0);
        node.userData.nodeId = l * perLayer + n;
        root.add(node);
        nodes.push(node);
      }
    }
    const lineMat = new THREE.LineBasicMaterial({ color: 0x8a3a2e, transparent: true, opacity: 0.4 });
    const gap = 1.6;
    for (let l = 0; l < layers - 1; l++) {
      for (let n = 0; n < perLayer; n++) {
        for (let m = 0; m < perLayer; m++) {
          const a = new THREE.Vector3((l - (layers - 1) / 2) * gap, (n - (perLayer - 1) / 2) * 0.7, 0);
          const b = new THREE.Vector3((l + 1 - (layers - 1) / 2) * gap, (m - (perLayer - 1) / 2) * 0.7, 0);
          const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
          const line = new THREE.Line(geo, lineMat);
          root.add(line);
        }
      }
    }
    objects.push({
      mesh: root,
      update: (t) => {
        nodes.forEach((n) => {
          const rot = t * 0.3 + (n.userData.nodeId as number) * 0.5;
          n.position.y += Math.sin(rot) * 0.002;
          const m = n.material as THREE.MeshStandardMaterial;
          m.emissiveIntensity = 0.6 + Math.abs(Math.sin(t * 1.5 + (n.userData.nodeId as number))) * 0.6;
        });
      },
    });
    return objects;
  },

  future: () => {
    const ctx = { root: makeGroup(), ambientColor: 0x331a15, ambientIntensity: 0.5, keyColor: 0xdfe7e0, keyIntensity: 1.1 };
    const objects = buildBase(ctx);
    const root = ctx.root;
    for (let i = 0; i < 6; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1 + i * 0.7, 0.035, 10, 48),
        material(0xb0583c, { emissive: 0x44110c, emissiveIntensity: 0.4 }),
      );
      ring.rotation.x = Math.PI / 2 + (i % 2 ? 0.3 : -0.3);
      ring.rotation.y = i * 0.7;
      root.add(ring);
    }
    objects.push({
      mesh: root,
      update: (t) => {
        root.rotation.y = t * 0.15;
        root.rotation.x = Math.sin(t * 0.2) * 0.25;
      },
    });
    return objects;
  },
};