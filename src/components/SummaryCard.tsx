import { motion } from "framer-motion";

interface SummaryCardProps {
  appointmentLength: number;
  specialtyArea: string;
  presentation: string;
}

export const SummaryCard = ({
  appointmentLength,
  specialtyArea,
  presentation,
}: SummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl bg-white p-4 shadow-lg sm:p-6"
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Triage Summary</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Estimated Duration</p>
          <p className="text-base text-gray-900">{appointmentLength} minutes</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Specialty Area</p>
          <p className="text-base text-gray-900">{specialtyArea}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Presentation</p>
          <p className="text-base text-gray-900">{presentation}</p>
        </div>
      </div>
    </motion.div>
  );
};