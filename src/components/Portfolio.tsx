import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Github, Linkedin, Mail } from "lucide-react";

function StarField({ count = 5000 }) {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      (points.current as THREE.Points).rotation.y = time * 0.05;
    }
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function Star() {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      (mesh.current as THREE.Mesh).rotation.y = time * 0.5;
      (mesh.current as THREE.Mesh).rotation.x = time * 0.3;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 0);
    const positions = geo.attributes.position;
    const vertices = [];
    for (let i = 0; i < positions.count; i++) {
      vertices.push(new THREE.Vector3().fromBufferAttribute(positions, i));
    }
    for (let i = 0; i < vertices.length; i++) {
      vertices[i].normalize().multiplyScalar(1 + Math.random() * 0.2);
    }
    for (let i = 0; i < positions.count; i++) {
      positions.setXYZ(i, vertices[i].x, vertices[i].y, vertices[i].z);
    }
    return geo;
  }, []);

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial color="#FFD700" roughness={0.4} metalness={0.7} />
    </mesh>
  );
}

export function Portfolio() {
  const sections = ["About", "Skills", "Projects", "Contact"];

  const skills = [
    { name: "JavaScript & TypeScript", level: 90 },
    { name: "React & React Native", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Adonis.js", level: 70 },
    { name: "Flutter", level: 60 },
    { name: "AWS", level: 60 },
    { name: "Python", level: 30 },
    { name: "FastAPI", level: 30 },
  ];

  const projects = [
    {
      name: "E-commerce Platform",
      description: "Built with React and Node.js",
    },
    {
      name: "AI Chatbot",
      description: "Built with Next.js and OpenAI API",
    },
    {
      name: "Mobile App",
      description: "Cross-platform app with React Native & Flutter",
    },
    {
      name: "Environment Sustainability Services",
      description: "Built with Adonis.js & Inertia.js",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <section className="h-screen relative overflow-hidden">
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 5], fov: 75 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <StarField />
          <Star />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
            >
              エドモン
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-2xl md:text-4xl mb-8 text-yellow-300"
            >
              Software Engineer
            </motion.h2>
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <a
                href="#about"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300 ease-in-out inline-block"
              >
                Explore My Universe
              </a>
            </motion.div> */}
          </div>
        </div>
      </section>

      <main>
        <section id="about" className="py-20 bg-gray-800 bg-opacity-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
              About Me
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-lg max-w-2xl mx-auto text-center text-gray-300"
            >
              I'm a passionate software engineer with expertise in full-stack
              development. I enjoy exploring new technologies and approaches to
              enhance the development process. My focus is on building software
              that not only meets user needs but also provides an intuitive and
              seamless experience. I strive to deliver high-quality results that
              make a difference, whether it’s through innovative features,
              optimized performance, or thoughtful design.
            </motion.p>
          </div>
        </section>

        <section id="skills" className="py-20 bg-gray-900 bg-opacity-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
              Skills
            </h2>
            <div className="max-w-2xl mx-auto">
              {skills.map((skill, index) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-yellow-400">{skill.level}%</span>
                  </div>
                  <motion.div
                    className="h-2 bg-gray-700 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-800 bg-opacity-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-2 text-yellow-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-300">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-900 bg-opacity-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
              Contact Me
            </h2>
            <div className="flex justify-center space-x-6">
              <motion.a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FFD700" }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-yellow-400"
              >
                <Github size={32} />
              </motion.a>
              <motion.a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FFD700" }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-yellow-400"
              >
                <Linkedin size={32} />
              </motion.a>
              <motion.a
                href=""
                whileHover={{ scale: 1.2, color: "#FFD700" }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-yellow-400"
              >
                <Mail size={32} />
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 bg-opacity-90 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          © 2024 Edmond Wong. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
