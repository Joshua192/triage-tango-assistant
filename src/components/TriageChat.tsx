import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Header } from "./chat/Header";
import { EncryptionNotice } from "./chat/EncryptionNotice";
import { ChatContainer } from "./chat/ChatContainer";
import { ChatInput } from "./chat/ChatInput";
import { usePatientAssessment } from "./chat/PatientAssessment";
import { SummaryCard } from "./SummaryCard";
import type { PatientInfo, Message, Summary } from "./chat/types";

export const TriageChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "What are you in for today? What have you been feeling recently?", isBot: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [stage, setStage] = useState(0);
  const [showAlert, setShowAlert] = useState(true);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    symptoms: "",
    duration: "",
    pain: "",
    medication: "",
    headache: false,
    fever: false,
    lightSensitive: false,
    stiffNeck: false,
    rash: false,
  });
  const [summary, setSummary] = useState<Summary | null>(null);
  const { toast } = useToast();
  const { checkEmergencyConditions, generateSummary } = usePatientAssessment();

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

    const updatedInfo = { ...patientInfo };
    switch (stage) {
      case 0:
        updatedInfo.symptoms = userInput;
        await simulateTyping("How long have you been experiencing these symptoms? Have they gotten worse recently?");
        break;
      case 1:
        updatedInfo.duration = userInput;
        await simulateTyping("Are you experiencing any pain? If so, can you rate it from 1-10 and describe its location?");
        break;
      case 2:
        updatedInfo.pain = userInput;
        updatedInfo.headache = userInput.toLowerCase().includes("head");
        await simulateTyping("Have you taken any medications recently for these symptoms?");
        break;
      case 3:
        updatedInfo.medication = userInput;
        await simulateTyping("Do you have a fever? (Please answer yes or no)");
        break;
      case 4:
        updatedInfo.fever = userInput.toLowerCase().includes("yes");
        await simulateTyping("Are you experiencing any sensitivity to light? (Please answer yes or no)");
        break;
      case 5:
        updatedInfo.lightSensitive = userInput.toLowerCase().includes("yes");
        await simulateTyping("Do you have a stiff neck? (Please answer yes or no)");
        break;
      case 6:
        updatedInfo.stiffNeck = userInput.toLowerCase().includes("yes");
        await simulateTyping("Have you noticed any recent onset of rash? (Please answer yes or no)");
        break;
      case 7:
        updatedInfo.rash = userInput.toLowerCase().includes("yes");
        
        if (checkEmergencyConditions(updatedInfo)) {
          return;
        }

        setSummary(generateSummary(updatedInfo));
        await simulateTyping("Thank you! I've sent your information to your GP, they should get back to you soon!");
        toast({
          title: "Triage Complete",
          description: "Your information has been sent to the medical team.",
        });
        break;
    }
    setPatientInfo(updatedInfo);
    setStage((prev) => prev + 1);
  };

  const lastBotMessage = messages.filter(m => m.isBot).pop()?.text || '';

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 px-2 py-4 sm:px-4">
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Emergency Warning</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p className="font-medium">If you have a severe headache along with any of the following, stop using this service and call 999 immediately:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fever</li>
                <li>Light sensitivity</li>
                <li>Neck stiffness</li>
                <li>New onset rash</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>I understand</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Header />

      <div className="relative flex-1 overflow-y-auto rounded-xl bg-gray-100 p-2 sm:p-4">
        <EncryptionNotice />
        <ChatContainer messages={messages} isTyping={isTyping} />
      </div>

      {summary && (
        <div className="my-4">
          <SummaryCard {...summary} />
        </div>
      )}

      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSubmit={handleSubmit}
        lastBotMessage={lastBotMessage}
      />
    </div>
  );
};