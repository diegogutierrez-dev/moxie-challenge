import React from 'react';
import Image from 'next/image';

const BusinessCard = () => {
  return (
    <article className="flex flex-col gap-4 border border-zinc-200 rounded-xl p-4 justify-center">
      <header className="flex items-center flex-col mb-6">
        <Image
          className="w-20 h-20 rounded-full border border-gray-100 object-cover"
          src="/images/logo.png"
          alt="Gold Spa Logo"
          width={130}
          height={80}
          unoptimized
        />
        <h1 className="font-bold text-lg">Gold Spa</h1>
      </header>

      <section className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-4">
          <h2 className="col-span-1 font-semibold">Address</h2>
          <div className="col-span-2">
            <address>
              <p>2525 Camino del Rio S</p>
              <p>Suite 315 Room 8</p>
              <p>San Diego, CA 92108</p>
            </address>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <h2 className="col-span-1 font-semibold">Email</h2>
          <p className="col-span-2">
            <a href="mailto:goldspa@gmail.com" className="text-blue-600 hover:underline">
              goldspa@gmail.com
            </a>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <h2 className="col-span-1 font-semibold">Phone</h2>
          <p className="col-span-2">
            <a href="tel:+111234567222" className="text-blue-600 hover:underline">
              +11 123 4567 222
            </a>
          </p>
        </div>
      </section>
    </article>
  );
};

export default BusinessCard;
