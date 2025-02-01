import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { SummaryCard } from "./SummaryCard";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  text: string;
  isBot: boolean;
}

export const TriageChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "What are you in for today? What have you been feeling recently?", isBot: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [stage, setStage] = useState(0);
  const [summary, setSummary] = useState<{
    appointmentLength: number;
    specialtyArea: string;
    presentation: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean) => {
    setMessages((prev) => [...prev, { text, isBot }]);
  };

  const simulateTyping = async (message: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTyping(false);
    addMessage(message, true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    addMessage(userInput, false);
    setUserInput("");

    switch (stage) {
      case 0:
        setStage(1);
        await simulateTyping(
          "I understand. How long have you been experiencing these symptoms? Have they gotten worse recently?"
        );
        break;
      case 1:
        setStage(2);
        await simulateTyping(
          "Thank you for sharing. Are you experiencing any pain? If so, can you rate it from 1-10 and describe its location?"
        );
        break;
      case 2:
        setStage(3);
        await simulateTyping(
          "I see. Have you tried any medications or treatments for these symptoms?"
        );
        break;
      case 3:
        // Process all messages and generate summary
        setSummary({
          appointmentLength: 30, // This would be calculated based on responses
          specialtyArea: "General Practice",
          presentation: "Patient presenting with multiple symptoms requiring evaluation",
        });
        await simulateTyping(
          "Thank you! I've sent your information to your GP, they should get back to you soon!"
        );
        toast({
          title: "Triage Complete",
          description: "Your information has been sent to the medical team.",
        });
        break;
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col bg-gray-50 p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Medical Triage Assistant</h1>
        <p className="text-sm text-gray-500">
          Please answer the questions to help us assess your needs.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl bg-gray-100 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
              animate={index === messages.length - 1}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {summary && (
        <div className="my-4">
          <SummaryCard {...summary} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex space-x-4">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 rounded-xl border-2 border-transparent bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-mint-300 focus:outline-none focus:ring-4 focus:ring-mint-100"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="rounded-xl bg-mint-500 px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-mint-600 focus:outline-none focus:ring-4 focus:ring-mint-100"
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
};