import { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface SpeechControlsProps {
  onSpeechInput: (text: string) => void;
  lastBotMessage: string;
}

export const SpeechControls = ({ onSpeechInput, lastBotMessage }: SpeechControlsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const { toast } = useToast();
  const conversation = useConversation();

  useEffect(() => {
    if (isSpeechEnabled && lastBotMessage) {
      conversation.startSession({
        agentId: process.env.ELEVEN_LABS_AGENT_ID || '',
      }).catch(error => {
        console.error('Error starting speech session:', error);
        toast({
          variant: "destructive",
          title: "Speech Error",
          description: "Unable to start text-to-speech. Please check your connection.",
        });
      });
    }
  }, [isSpeechEnabled, lastBotMessage]);

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (!isSpeechEnabled) {
      toast({
        title: "Text-to-Speech Enabled",
        description: "The assistant will now speak its responses.",
      });
    }
  };

  const toggleListening = async () => {
    if (!isListening) {
      try {
        const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          if (event.results[0].isFinal) {
            onSpeechInput(transcript);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
        toast({
          title: "Listening",
          description: "Speak now to enter your message.",
        });
      } catch (error) {
        console.error('Speech recognition error:', error);
        toast({
          variant: "destructive",
          title: "Microphone Error",
          description: "Unable to access microphone. Please check your permissions.",
        });
      }
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleListening}
        className={isListening ? 'bg-red-100' : ''}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSpeech}
        className={isSpeechEnabled ? 'bg-green-100' : ''}
      >
        {isSpeechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};