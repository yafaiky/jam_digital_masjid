import React, { useState } from "react";
import Step1CreateClient from "./Step1CreateClient";
import Step2CreateDkm from "./Step2CreateDkm";
import Step3UploadBanners from "./Step3CreateBanners";

type SetupStep = 1 | 2 | 3;

const SetupWizard: React.FC = () => {
  const [step, setStep] = useState<SetupStep>(1);
  const [clientId, setClientId] = useState<string | null>(null);
    
  const goToStep = (nextStep: SetupStep) => {
    // proteksi lompat step
    if (nextStep === 2 && !clientId) return;
    setStep(nextStep);
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      {/* Progress Indicator */}
      <div style={{ marginBottom: 24 }}>
        <strong>Setup Masjid</strong>
        <div style={{ marginTop: 8 }}>
          Step {step} dari 3
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <Step1CreateClient
          onSuccess={(id) => {
            setClientId(id);
            goToStep(2);
          }}
        />
      )}

      {/* STEP 2 */}
      {step === 2 && clientId && (
        <Step2CreateDkm
          clientId={clientId}
          onSuccess={() => goToStep(3)}
        />
      )}

      {/* STEP 3 */}
      {step === 3 && clientId && (
        <Step3UploadBanners
          clientId={clientId}
          onFinish={() => {
            alert("Semua setup berhasil 🎉");
            setStep(1);
            setClientId(null);
          }}
        />
      )}
    </div>
  );
};

export default SetupWizard;
