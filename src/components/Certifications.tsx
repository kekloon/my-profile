import type React from "react";

import { motion } from "framer-motion";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  badge: string | React.ReactNode;
  imageSize: { width: number; height: number };
}

const JLPTBadge: React.FC<{ level: string }> = ({ level }) => (
  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="text-red-600 font-bold text-2xl">JLPT</div>
      <div className="text-black font-semibold text-xl">{level}</div>
    </div>
  </div>
);

const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "2025",
    badge: "/SAP.png",
    imageSize: { width: 100, height: 100 },
  },
  {
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    badge: "/Developer.png",
    imageSize: { width: 100, height: 100 },
  },
  {
    name: "JLPT N1",
    issuer: "Japan Foundation",
    date: "2025",
    badge: <JLPTBadge level="N1" />,
    imageSize: { width: 96, height: 96 },
  },
  {
    name: "JLPT N2",
    issuer: "Japan Foundation",
    date: "2024",
    badge: <JLPTBadge level="N2" />,
    imageSize: { width: 96, height: 96 },
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm flex items-start gap-4"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: cert.imageSize.width,
                  height: cert.imageSize.height,
                }}
              >
                {typeof cert.badge === "string" ? (
                  <img
                    src={cert.badge || "/placeholder.svg"}
                    alt={`${cert.name} Badge`}
                    width={cert.imageSize.width}
                    height={cert.imageSize.height}
                    className="object-contain"
                  />
                ) : (
                  cert.badge
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-yellow-300">
                  {cert.name}
                </h3>
                <p className="text-gray-300">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mt-2">
                  Obtained: {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
