import { motion } from "framer-motion";
import { SpeechControls } from "../SpeechControls";

interface ChatInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  lastBotMessage: string;
}

export const ChatInput = ({ userInput, setUserInput, handleSubmit, lastBotMessage }: ChatInputProps) => {
  const handleSpeechInput = (text: string) => {
    setUserInput(text);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex space-x-4">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your response..."
          className="flex-1 rounded-xl border-2 border-transparent bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-mint-300 focus:outline-none focus:ring-4 focus:ring-mint-100 font-mono text-lg"
        />
        <div className="flex space-x-2">
          <SpeechControls onSpeechInput={handleSpeechInput} lastBotMessage={lastBotMessage} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="rounded-xl bg-mint-500 px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-mint-600 focus:outline-none focus:ring-4 focus:ring-mint-100"
          >
            Send
          </motion.button>
        </div>
      </div>
    </form>
  );
};