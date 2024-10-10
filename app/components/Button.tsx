import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  return (
    <button className='px-9 py-4 bg-primary text-white hover:bg-primaryDark rounded-2xl transition-all w-full md:w-auto' onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
