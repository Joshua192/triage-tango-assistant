import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  animate?: boolean;
}

export const ChatMessage = ({ message, isBot, animate = true }: ChatMessageProps) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={animate ? "hidden" : "visible"}
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "mb-4 max-w-[80%] rounded-2xl px-4 py-3 text-lg leading-relaxed shadow-sm font-mono",
        isBot
          ? "mr-auto bg-white text-gray-800"
          : "ml-auto bg-mint-500 text-white"
      )}
    >
      {message}
    </motion.div>
  );
};