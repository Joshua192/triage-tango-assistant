import { Lock } from "lucide-react";

export const EncryptionNotice = () => {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-10">
      <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 text-gray-700 text-sm flex items-center justify-center space-x-2 shadow-sm">
        <Lock className="h-4 w-4" />
        <span className="font-mono">Messages in this chat are end-to-end (hypothetically) encrypted with Quantum Encryption Protocols</span>
      </div>
    </div>
  );
};