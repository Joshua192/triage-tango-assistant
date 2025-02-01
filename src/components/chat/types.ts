export interface PatientInfo {
  symptoms: string;
  duration: string;
  pain: string;
  medication: string;
  headache: boolean;
  fever: boolean;
  lightSensitive: boolean;
  stiffNeck: boolean;
  rash: boolean;
}

export interface Message {
  text: string;
  isBot: boolean;
}

export interface Summary {
  appointmentLength: number;
  specialtyArea: string;
  presentation: string;
}