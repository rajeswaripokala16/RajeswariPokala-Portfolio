import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  Stars,
  Html,
  useGLTF,
  useScroll,
  OrbitControls
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";

// Custom GLTF model section (needs /avatar.glb in public folder)
function MyAvatar(props) {
  const { scene } = useGLTF("/avatar.glb");
  return <primitive object={scene} {...props} scale={1.5} />;
}

// Animated Blob mesh
function Blob({ scroll }) {
  const mesh = useRef();
  useFrame(() => {
    const s = scroll.scroll.current;
    mesh.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI, s);
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.4, s + 0.15));
  });
  return (
    <mesh ref={mesh} position={[0, 0.7, 0]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshPhysicalMaterial color="#2194fa" roughness={0.18} metalness={0.8} clearcoat={0.62} opacity={0.87} transparent />
    </mesh>
  );
}

function Section({ children, center }) {
  return (
    <section style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: center ? "center" : "flex-start"
    }}>
      {children}
    </section>
  );
}

function OverlayHtml() {
  return (
    <Scroll html style={{ width: "100vw" }}>
      <Section center>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900 }}>Rajeswari Pokala</h1>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#2194fa" }}>Aspiring Web & AI Developer</h2>
          <p>
            <strong>College:</strong> Annamacharya Institute of Technology<br />
            <strong>Email:</strong> <a href="mailto:rajeswaripokala16@gmail.com">rajeswaripokala16@gmail.com</a>
          </p>
        </motion.div>
      </Section>
      <Section center>
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <h2 style={{ fontSize: "2rem", color: "#2194fa", marginBottom: "1rem" }}>Education</h2>
          <div>B.Tech, Computer Science Engineering<br />
          Annamacharya Institute of Technology & Sciences, India <br />
          2023–2027</div>
        </motion.div>
      </Section>
      <Section center>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 style={{ fontSize: "2rem", color: "#33bfae" }}>Skills & Technologies</h2>
          <ul style={{ lineHeight: 2, fontSize: "1.15rem", listStyle: "none", padding: 0 }}>
            <li>🌐 Full Stack Development (React, Node.js, Express)</li>
            <li>🤖 Machine Learning/Deep Learning (Python, TensorFlow, OpenCV)</li>
            <li>📱 Mobile & Responsive UI (React Native, HTML5, CSS3, MUI)</li>
            <li>🎨 3D Web Design (Three.js, React Three Fiber, Blender, Spline)</li>
            <li>🎬 Framer Motion, GSAP Animations</li>
            <li>💡 Hackathons & Team Projects (Git, GitHub, Vercel)</li>
          </ul>
        </motion.div>
      </Section>
      <Section center>
        <motion.div initial={{ scale: 0.93, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
          <h2 style={{ color: "#e76332", marginBottom: "1rem" }}>Projects & Showcase</h2>
          <div>
            <span style={{ color: "#2194fa", fontWeight: 700 }}>Food Donation Platform</span> – Connecting donors & NGOs<br />
            <span style={{ color: "#33bfae", fontWeight: 700 }}>Hand Gesture Volume Control</span> – Real-time vision UI<br />
            <span style={{ color: "#e76332", fontWeight: 700 }}>Portfolio Website</span> – Interactive, animated resume with 3D
          </div>
        </motion.div>
      </Section>
      <Section center>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
          <h2 style={{ marginBottom: "0.9rem", fontWeight: 700 }}>Connect</h2>
          <a href="https://www.linkedin.com/in/rajeswari-pokala-34aa8a29b" style={{ color: "#2194fa" }}>LinkedIn</a> |
          <a href="https://github.com/rajeswaripokala16" style={{ color: "#e76332", marginLeft: "1.2rem" }}>GitHub</a>
        </motion.div>
      </Section>
    </Scroll>
  );
}

function ThreeScene() {
  const scroll = useScroll();
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={1} />
      <Stars radius={120} depth={60} count={6500} factor={4} fade speed={1} />
      <MyAvatar position={[-2, -1.2, 0]} />
      <Blob scroll={scroll} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.12} />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "radial-gradient(circle at 60% 70%, #e9f7fa 0%, #d9e7fc 100%)",
      fontFamily: "Montserrat, Arial, sans-serif"
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 38 }}>
        <ScrollControls pages={5} damping={0.15}>
          <ThreeScene />
          <OverlayHtml />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
