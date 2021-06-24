const Step = ({ step, currentStep, children }) => {
  if (step !== currentStep) return null;

  return (
    <div>
      {children}
    </div>
  );
};

export default Step;
