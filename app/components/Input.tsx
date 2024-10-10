import { useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  additionalText?: string;
}

const Input = ({ name, label, placeholder, type, additionalText }: InputProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='text-sm text-gray-600'>{label}</label>
      <div className='flex gap-2'>
        <input
          className='p-3 border border-zinc-400 rounded-2xl self-start grow-[1]'
          type={type}
          {...register(name)}
          placeholder={placeholder}
        />
        {additionalText && <p className='text-sm text-gray-600 w-full'>{additionalText}</p>}
      </div>
      {<p className='text-xs text-red-600'>{errors[name] && String(errors[name]?.message)}</p>}
    </div>
  );
};

export default Input;
