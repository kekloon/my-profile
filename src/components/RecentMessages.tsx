import { useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";

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

interface RecentMessagesProps {
  messages: Message[];
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const contentContainer = contentRef.current;

    if (!scrollContainer || !contentContainer || messages.length === 0) return;

    scrollContainer.scrollTop = 0;

    while (scrollContainer.children.length > 1) {
      scrollContainer.removeChild(scrollContainer.lastChild as Node);
    }

    // Clone only once
    const spacer = document.createElement("div");
    spacer.className = "h-4";
    const clone = contentContainer.cloneNode(true) as HTMLDivElement;
    scrollContainer.appendChild(spacer);
    scrollContainer.appendChild(clone);

    let intervalId: NodeJS.Timeout | null = null;

    const startScrolling = () => {
      if (intervalId) return;

      const scroll = () => {
        const firstSectionHeight = contentContainer.offsetHeight;
        if (scrollContainer.scrollTop >= firstSectionHeight) {
          scrollContainer.scrollTop = 1;
        } else {
          scrollContainer.scrollTop += 1;
        }
      };

      intervalId = setInterval(scroll, 10);
    };

    startScrolling();

    return () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      while (scrollContainer.children.length > 1) {
        scrollContainer.removeChild(scrollContainer.lastChild as Node);
      }
    };
  }, [messages]);

  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm h-full">
      <h3 className="text-xl font-semibold mb-4 text-yellow-300 flex items-center">
        <MessageCircle className="mr-2" size={24} />
        Recent Messages
      </h3>
      <div ref={scrollRef} className="h-[310px] overflow-hidden">
        <div ref={contentRef} className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={`${msg.id}-${index}`}
              className="bg-gray-700 bg-opacity-70 p-4 rounded-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-yellow-300">{msg.name}</h4>
                <span className="text-2xl">
                  {getEmotionEmoji(msg.emotion_type)}
                </span>
              </div>
              <p className="text-gray-300">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
