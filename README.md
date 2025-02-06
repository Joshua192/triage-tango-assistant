# Goldborne Medical AI Hackathon (developed with lovable)
Product created for the 'Goldborne Medical Centre' AI Hackathon held on Sat 01st Feb 2025.
The hackathon allowed participants to create teams of four to five people and utilise an AI tool known as Lovable.dev to create an AI-based product (application, website or other) to address a specific pain point within the NHS system.

The Application my team created is a chatbot responsible for pre-screening patients at their GP Office.
1. It asks a series of increasingly closed-ended questions to ascertain:
  - Estimated Appointment Length (5-20 minutes).
  - Reccommended Specialist 
  - Summary of their symptoms and any care measures taken by patient.
2. The assistant then takes these reccomednations and sends it to the administrative team to make the appropriate decisions.
  
The goal is to ease the strain on primary care networks with assistive AI technologies.

Becasue the assistant cannot be a responsible party, it is not designed to make decisions that affect lives. It therefore has limitations in place to ensure patients are redirected to a human once a situation can be deemed as risky. This includes:
Reported symptoms consistent with meningitis
Detecting trigger words related to suicidal thoughts (e.g. 'kill' and 'die')
Reported symptoms indicating complex illnesses.

**Active Deployment**: https://triage-tango-assistant.lovable.app/

## What technologies were used for this project?
This project was built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
