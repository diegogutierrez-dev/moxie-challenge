import React from 'react';
import Image from 'next/image';

const SuccessCard = () => {
  return (
    <div className='flex flex-col gap-6 px-16 py-10 items-center'>
      <Image
        className="w-[200px] h-[200px] rounded-full border border-gray-100 object-cover"
        src="/images/success-image.png"
        alt="Success Logo"
        width={200}
        height={200}
        unoptimized
      />
      <h1 className="font-bold text-lg">Your appointment has been booked!</h1>
      <p>A confirmation has been sent to your email address.</p>
    </div>
  );
};

export default SuccessCard;
