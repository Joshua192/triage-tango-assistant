import { motion } from "framer-motion";

export const TypingIndicator = () => {
  return (
    <div className="mb-4 flex max-w-[80%] items-center space-x-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-mint-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};