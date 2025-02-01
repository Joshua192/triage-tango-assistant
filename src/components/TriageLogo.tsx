import { motion } from "framer-motion";

export const TriageLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative w-24 h-32 bg-white rounded-lg shadow-md p-2"
    >
      {/* Person silhouette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-200 rounded-full" /> {/* Head */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-20 bg-gray-200 rounded-lg"> {/* Body */}
        {/* Red cross */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-2 bg-red-500 rounded" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-red-500 rounded" />
        </div>
      </div>
      
      {/* Traffic light circles */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center space-x-1 pb-1">
        <div className="w-6 h-6 rounded-full bg-red-500" />
        <div className="w-6 h-6 rounded-full bg-yellow-500" />
        <div className="w-6 h-6 rounded-full bg-green-500" />
      </div>
    </motion.div>
  );
};