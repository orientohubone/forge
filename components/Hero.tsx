import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

// Workaround for R3F intrinsic elements type errors in this environment
const Mesh = 'mesh' as any;
const PlaneGeometry = 'planeGeometry' as any;
const ShaderMaterial = 'shaderMaterial' as any;

// SplitText is paid, so we remove it and implement standard animations
// import { SplitText } from "gsap/SplitText"; 

gsap.registerPlugin(useGSAP);

// --- Shader Definitions ---

interface ShaderPlaneProps {
	vertexShader: string;
	fragmentShader: string;
	uniforms: { [key: string]: { value: unknown } };
}

const ShaderPlane = ({
	vertexShader,
	fragmentShader,
	uniforms,
}: ShaderPlaneProps) => {
	const meshRef = useRef<THREE.Mesh>(null);
	const { size } = useThree();

	useFrame((state) => {
		if (meshRef.current) {
			const material = meshRef.current.material as THREE.ShaderMaterial;
			material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
			material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
		}
	});

	return (
		<Mesh ref={meshRef}>
			<PlaneGeometry args={[2, 2]} />
			<ShaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
				side={THREE.FrontSide}
				depthTest={false}
				depthWrite={false}
			/>
		</Mesh>
	);
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;
  uniform sampler2D u_channel0;

  vec2 toPolar(vec2 p) {
      float r = length(p);
      float a = atan(p.y, p.x);
      return vec2(r, a);
  }

  vec2 fromPolar(vec2 polar) {
      return vec2(cos(polar.y), sin(polar.y)) * polar.x;
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      // Adjust scale to fit screen better
      vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

      vec2 polar = toPolar(p);
      float r = polar.x;
      float a = polar.y;

      vec2 i = p;
      float c = 0.0;
      float rot = r + u_time + p.x * 0.100;
      for (float n = 0.0; n < 4.0; n++) {
          float rr = r + 0.15 * sin(u_time*0.7 + float(n) + r*2.0);
          p *= mat2(
              cos(rot - sin(u_time / 10.0)), sin(rot),
              -sin(cos(rot) - u_time / 10.0), cos(rot)
          ) * -0.25;

          float t = r - u_time / (n + 30.0);
          i -= p + sin(t - i.y) + rr;

          c += 2.2 / length(vec2(
              (sin(i.x + t) / 0.15),
              (cos(i.y + t) / 0.15)
          ));
      }

      c /= 8.0;

      // Emerald / Teal / Dark Palette
      vec3 baseColor = vec3(0.1, 0.8, 0.6); 
      vec3 finalColor = baseColor * smoothstep(0.0, 1.0, c * 0.6);
      
      // Mix with dark background for depth
      vec3 bg = vec3(0.02, 0.05, 0.1);
      finalColor = mix(bg, finalColor, c);

      fragColor = vec4(finalColor, 1.0);
  }

  void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
  }
`;

// --- Main Component ---

interface HeroProps {
	title?: string;
	description?: string;
	badgeText?: string;
	badgeLabel?: string;
	ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
	microDetails?: Array<string>;
}

export const Hero = ({
	title = "Aprenda com inovação, ritmo e diversão",
	description = "Forgether é a plataforma gamificada que transforma estudo em experiência. Ganhe XP, conquiste badges e domine o mercado tech.",
	badgeText = "Inscrições Abertas",
	badgeLabel = "Nova Turma",
	ctaButtons = [
		{ text: "Começar Jornada Grátis", href: "#pricing", primary: true },
		{ text: "Ver Cursos", href: "/courses" },
	],
	microDetails = [
		"Certificados em Blockchain",
		"IA Adaptativa",
		"Comunidade Ativa",
	],
}: HeroProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const paragraphRef = useRef<HTMLParagraphElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const microRef = useRef<HTMLUListElement | null>(null);
	const shaderUniforms = useMemo(
		() => ({
			u_time: { value: 0 },
			u_resolution: { value: new THREE.Vector3(1, 1, 1) },
		}),
		[],
	);

	useGSAP(
		() => {
			if (!headingRef.current) return;

            // Initial States
            gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -20 });
            gsap.set(headingRef.current, { autoAlpha: 0, y: 40, filter: "blur(10px)" });
            gsap.set(paragraphRef.current, { autoAlpha: 0, y: 20 });
            gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
            
            const microItems = microRef.current
					? Array.from(microRef.current.querySelectorAll("li"))
					: [];
            gsap.set(microItems, { autoAlpha: 0, y: 10 });

			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animation Sequence
			if (badgeWrapperRef.current) {
				tl.to(badgeWrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2);
			}

            // Heading Animation (Simple Fade Up instead of SplitText)
            tl.to(headingRef.current, { 
                autoAlpha: 1, 
                y: 0, 
                filter: "blur(0px)",
                duration: 1.2 
            }, 0.4);

			if (paragraphRef.current) {
				tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.8");
			}

			if (ctaRef.current) {
				tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");
			}

			if (microItems.length > 0) {
				tl.to(microItems, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");
			}
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			className="relative flex items-center justify-center min-h-screen overflow-hidden bg-dark-900"
		>
			<div className="absolute inset-0 z-0">
				<Canvas>
					<ShaderPlane
						vertexShader={vertexShader}
						fragmentShader={fragmentShader}
						uniforms={shaderUniforms}
					/>
				</Canvas>
			</div>

            {/* Overlay Gradient for text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900 pointer-events-none"></div>

			<div className="relative z-10 flex flex-col items-center text-center px-6 pt-20">
				<div ref={badgeWrapperRef}>
					<div className="mb-8 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
						<span className="text-[10px] font-bold tracking-[0.15em] text-emerald-200 uppercase opacity-80 mr-3">
							{badgeLabel}
						</span>
						<span className="h-1 w-1 rounded-full bg-emerald-400 mr-3" />
						<span className="text-xs font-medium tracking-wide text-emerald-100">
							{badgeText}
						</span>
					</div>
				</div>

				<h1
					ref={headingRef}
					className="text-5xl md:text-7xl lg:text-8xl max-w-5xl font-bold tracking-tighter text-white mb-8 leading-[1.1]"
				>
					{title}
				</h1>

				<p
					ref={paragraphRef}
					className="text-emerald-100/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
				>
					{description}
				</p>

				<div
					ref={ctaRef}
					className="flex flex-wrap items-center justify-center gap-5"
				>
					{ctaButtons.map((button, index) => {
						const isPrimary = button.primary;
						const classes = isPrimary
							? "px-8 py-4 rounded-full text-base font-semibold backdrop-blur-lg bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer border border-emerald-400/20"
							: "px-8 py-4 rounded-full text-base font-semibold border-white/20 text-white hover:bg-white/10 backdrop-blur-lg transition-all cursor-pointer bg-white/5";

						if (button.href) {
							return (
								<Button
									key={index}
									variant={isPrimary ? undefined : "outline"}
									className={classes}
									asChild
								>
									<a href={button.href}>{button.text}</a>
								</Button>
							);
						}

						return (
							<Button
								key={index}
								variant={isPrimary ? undefined : "outline"}
								className={classes}
							>
								{button.text}
							</Button>
						);
					})}
				</div>

				{microDetails.length > 0 && (
					<ul
						ref={microRef}
						className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-medium tracking-widest uppercase text-emerald-200/40"
					>
						{microDetails.map((detail, index) => (
							<li key={index} className="flex items-center gap-2">
								<span className="h-1 w-1 rounded-full bg-emerald-500/50" />
								{detail}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};