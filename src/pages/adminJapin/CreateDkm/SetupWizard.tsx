import React, { useEffect, useState } from "react";
import Step1CreateClient from "./Step1CreateClient";
import Step2CreateDkm from "./Step2CreateDkm";
import Step3UploadBanners from "./Step3CreateBanners";

type SetupStep = 1 | 2 | 3;

const SetupWizard: React.FC = () => {
  const [step, setStep] = useState<SetupStep>(1);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const savedClientId = sessionStorage.getItem("setup_client_id");
    if (savedClientId) {
      setClientId(savedClientId);
      setStep(2);
    }
  }, []);

  const goToStep = (nextStep: SetupStep) => {
    if (nextStep > 1 && !clientId) return;
    setStep(nextStep);
  };

  return (
    <div>
        <div className="max-w-7xl px-6">
          <h1 className="text-2xl font-bold text-gray-800">Setup Masjid</h1>
          <p className="text-sm text-gray-600">
            Langkah {step} dari 3
          </p>
        </div>

      {step === 1 && (
        <Step1CreateClient
          onSuccess={(id) => {
            setClientId(id);
            sessionStorage.setItem("setup_client_id", id);
            goToStep(2);
          }}
        />
      )}

      {step === 2 && clientId && (
        <Step2CreateDkm
          clientId={clientId}
          onSuccess={() => goToStep(3)}
        />
      )}

      {step === 3 && clientId && (
        <Step3UploadBanners
          clientId={clientId}
          onFinish={() => {
            alert("Semua setup berhasil 🎉");
            sessionStorage.removeItem("setup_client_id");
            setClientId(null);
            setStep(1);
          }}
        />
      )}
    </div>
  );
};

export default SetupWizard;
