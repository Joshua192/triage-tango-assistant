import { TriageLogo } from "../TriageLogo";

export const Header = () => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-gill font-semibold text-gray-900">Medical Triage Assistant</h1>
        <p className="text-sm font-gill text-gray-500">
          Please answer the questions to help us assess your needs.
        </p>
      </div>
      <TriageLogo />
    </div>
  );
};