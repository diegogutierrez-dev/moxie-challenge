import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from './Input';
import StepperNavigation from './StepperNavigation';
import BusinessCard from './BusinessCard';
import SuccessCard from './SuccessCard';

const AGREEMENT_TEXT = 'We ask that you please reschedule or cancel at least 24 hours before the beginning of your appointment or you may be charged a cancellation fee of $50. In the event of emergency, contact us directly. Your card will held in case of late cancellation and for future purchases. It will not be charged now.';

const personaDataSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  visitReason: z.string().min(1, 'Visit reason is required'),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().min(5, 'Expiry date must be in MM/YY format'),
  cvv: z.string().min(3, 'CVV must be 3 digits'),
  billingZip: z.string().min(1, 'Billing address is required'),
  acceptTerms: z.boolean().refine((val) => val, { message: 'You must accept the terms' }),
});

const fullFormSchema = personaDataSchema.merge(paymentSchema);
type FullDataForm = z.infer<typeof fullFormSchema>;

const steps = [
  { label: 'Enter your details below', description: '', schema: personaDataSchema },
  { label: 'Secure your appointment by card', description: 'A credit or debit card is required to book your appointment.', schema: paymentSchema },
];

export default function StepperForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FullDataForm>({} as FullDataForm);
  const isLastStep = step === steps.length;

  const currentStep = steps[step - 1];
  const isPersonalDataStep = step === 1;
  const isPaymentStep = step === 2;

  const methods = useForm<FullDataForm>({
    resolver: zodResolver(currentStep.schema),
    mode: 'onChange',
  });

  const { handleSubmit, trigger, getValues } = methods;

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setFormData((prevData) => ({
        ...prevData,
        ...getValues(),
      }));
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const onSubmit = (data: FullDataForm) => {
    const fullValidationResult = fullFormSchema.safeParse({ ...formData, ...data });
    if (!fullValidationResult.success) {
      console.error(fullValidationResult.error);
      return;
    }

    console.log('Form submitted successfully:', { ...formData, ...data });
    setIsSubmitted(true);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='h-screen flex flex-col justify-between'>
          <div className='container w-full mx-auto px-6 py-16'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 lg:col-span-4'>
                <BusinessCard />
              </div>
              <div className='col-span-12 lg:col-span-8 flex gap-6 flex-col'>
                <div className='flex flex-col gap-4 border border-zinc-200 rounded-xl p-4 lg:px-16 lg:py-12 justify-center'>
                  {!isSubmitted ? <>
                    <div className='flex gap-6 flex-col'>
                      <h1 className='text-gray-950 font-semibold'>{currentStep.label}</h1>
                      <p className='text-gray-600'>{currentStep.description}</p>
                    </div>

                    {isPersonalDataStep && (
                      <div className='flex flex-col gap-4'>
                        <Input
                          name="fullName"
                          label="Full Name"
                          placeholder="Full Name"
                          type="text"
                        />
                        <Input
                          name="email"
                          label="Email"
                          placeholder="Email"
                          type="email"
                        />
                        <Input
                          name="phone"
                          label="Phone Number"
                          placeholder="Phone Number"
                          type="tel"
                        />
                        <Input
                          name="visitReason"
                          label="Reason for Visit"
                          placeholder="Reason for Visit"
                          type="text"
                        />
                      </div>
                    )}

                    {isPaymentStep && (
                      <div className='flex flex-col gap-4'>
                        <div className='flex gap-2 flex-col'>
                          <Input
                            name="cardNumber"
                            label="Card Information"
                            placeholder="Card Number"
                            type="text"
                          />
                          <div className='flex gap-2 w-full flex-col md:flex-row'>
                            <Input
                              label='Expiry Date'
                              name="expiryDate"
                              placeholder="MM/YY"
                              type="text"
                            />
                            <Input
                              label='CVV'
                              name="cvv"
                              placeholder="CVV"
                              type="text"
                            />
                          </div>
                        </div>

                        <Input
                          label='Billing Zip'
                          name="billingZip"
                          placeholder="Billing zip code"
                          type="text"
                        />
                        <Input
                          name="acceptTerms"
                          label="Accept Terms"
                          placeholder=""
                          type="checkbox"
                          additionalText={AGREEMENT_TEXT}
                        />
                      </div>
                    )}
                  </> : <>
                    <SuccessCard />
                  </>}
                </div>
              </div>
            </div>
          </div>
          {!isSubmitted && <StepperNavigation
            step={step}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isLastStep={isLastStep}
          />}
        </div>
      </form>
    </FormProvider>
  );
}
