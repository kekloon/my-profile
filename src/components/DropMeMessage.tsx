"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, X, Heart, Star } from "lucide-react";
import { RecentMessages } from "./RecentMessages";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Message {
  id: string;
  name: string;
  message: string;
  emotion_type:
    | "happy"
    | "love"
    | "angry"
    | "sad"
    | "afraid"
    | "bored"
    | "calm";
}

const getEmotionEmoji = (emotion: Message["emotion_type"]) => {
  switch (emotion) {
    case "happy":
      return "😊";
    case "love":
      return "😍";
    case "angry":
      return "😠";
    case "sad":
      return "😢";
    case "afraid":
      return "😨";
    case "bored":
      return "😑";
    case "calm":
      return "😌";
    default:
      return "😐";
  }
};

export function DropMeMessage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://vot4kx95b9.execute-api.ap-northeast-1.amazonaws.com/prod/message",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(
        "https://vot4kx95b9.execute-api.ap-northeast-1.amazonaws.com/prod/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, message }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      await fetchMessages();
      setShowModal(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="drop-message" className="py-20 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
          Drop a Message and Let Me Guess Your Emotion!
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-yellow-300 flex items-center">
              <MessageSquare className="mr-2" size={20} />
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Edmond Wong"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />

              <input
                type="email"
                placeholder="edmond@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />

              <textarea
                placeholder="I want to say..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded font-medium flex items-center justify-center transition-colors ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <RecentMessages messages={messages} />
        </div>
      </div>
      <ToastContainer />

      {/* Modal */}
      <AnimatePresence>
        {showModal && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl max-w-md w-full relative overflow-hidden border border-yellow-500"
            >
              <motion.div
                className="absolute top-2 right-2 text-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="hover:text-yellow-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                  Your Emotion Result!
                </h3>

                <div className="bg-gray-700 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 mb-4">
                  <p className="text-gray-200 text-lg mb-2">
                    <strong className="text-yellow-400">Name:</strong>{" "}
                    {messages[0].name}
                  </p>
                  <p className="text-gray-200 text-lg mb-2">
                    <strong className="text-yellow-400">Message:</strong>{" "}
                    {messages[0].message}
                  </p>
                  <div className="text-gray-200 text-lg flex items-center">
                    <strong className="text-yellow-400 mr-2">Emotion:</strong>
                    <div className="flex items-center">
                      <span className="mr-2 capitalize">
                        {messages[0].emotion_type ?? "Normal"}
                      </span>
                      <span className="text-3xl">
                        {getEmotionEmoji(messages[0].emotion_type)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg transition-colors flex items-center mx-auto"
                  >
                    <Heart className="mr-2" size={18} />
                    Awesome!
                  </motion.button>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-2 left-2 text-yellow-500 opacity-50"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Star size={24} />
              </motion.div>
              <motion.div
                className="absolute bottom-2 right-2 text-yellow-500 opacity-50"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Star size={18} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
