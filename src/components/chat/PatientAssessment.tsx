import { PatientInfo } from "./types";
import { useToast } from "@/hooks/use-toast";

export const usePatientAssessment = () => {
  const { toast } = useToast();

  const calculateAppointmentLength = (info: PatientInfo): number => {
    let baseLength = 10;
    
    if (info.headache && (info.fever || info.stiffNeck || info.lightSensitive || info.rash)) {
      return 20; // Emergency case
    }
    
    if (info.fever && info.stiffNeck) baseLength = 20;
    else if (info.fever || info.stiffNeck || info.lightSensitive) baseLength = 15;
    
    return Math.min(20, Math.max(10, Math.round(baseLength / 5) * 5));
  };

  const checkEmergencyConditions = (info: PatientInfo): boolean => {
    if (info.headache && (info.fever || info.stiffNeck || info.lightSensitive || info.rash)) {
      toast({
        variant: "destructive",
        title: "Emergency Warning",
        description: "Please call 999 immediately based on your symptoms.",
      });
      return true;
    }
    return false;
  };

  const generateSummary = (info: PatientInfo) => {
    const appointmentLength = calculateAppointmentLength(info);
    let specialtyArea = "General Practice";
    
    if (info.stiffNeck && info.fever && info.lightSensitive) {
      specialtyArea = "Emergency Medicine";
    } else if (info.rash && info.fever) {
      specialtyArea = "Urgent Care";
    }

    const symptoms = [
      info.fever ? "fever" : "",
      info.stiffNeck ? "stiff neck" : "",
      info.lightSensitive ? "light sensitivity" : "",
      info.rash ? "rash" : "",
    ].filter(Boolean);

    const presentation = `Patient presents with ${info.symptoms.toLowerCase()}${
      symptoms.length > 0 ? `, notable for ${symptoms.join(", ")}` : ""
    }${info.medication ? `; has taken ${info.medication}` : "; no medications taken"}.`;

    return {
      appointmentLength,
      specialtyArea,
      presentation,
    };
  };

  return {
    calculateAppointmentLength,
    checkEmergencyConditions,
    generateSummary,
  };
};