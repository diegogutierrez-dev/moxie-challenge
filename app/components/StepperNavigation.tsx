import Button from "./Button";

interface StepperNavigationProps {
  step: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastStep: boolean;
}

const StepperNavigation = ({ step, onPrevious, onNext, isLastStep }: StepperNavigationProps) => {
  return (
    <div className="flex justify-end shadow-2xl shadow-black w-full p-4 gap-4">
      {step > 1 && <Button type="button" onClick={onPrevious}>Previous</Button>}
      {!isLastStep ? (
        <Button type="button" onClick={onNext}>Next</Button>
      ) : (
        <Button type="submit">Submit</Button>
      )
      }
    </div >
  );
};

export default StepperNavigation;
