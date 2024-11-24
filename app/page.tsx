'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiLogInCircle } from 'react-icons/bi';
import { gsap } from 'gsap';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/services/firebase';

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
    );

    gsap.fromTo(
      illustrationRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
    );
  }, []);
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('user', JSON.stringify(user));

      router.push('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleLoginPage = () => {
    router.push('/auth/login');
  };

  return (
    <div className='min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden'>
      <nav className='flex justify-between items-center py-4 px-6 bg-white shadow-md fixed w-full z-10'>
        <div className='flex items-center gap-3 text-lg font-semibold text-black'>
          <span className='uppercase tracking-wide'>Simple Notes</span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className='px-6 py-2  text-blue-700 border rounded-lg hover:shadow-lg flex flex-row gap-2 items-center transform hover:scale-105 transition-all'
        >
          Login
          <BiLogInCircle className='w-6 h-6 mt-[1px] text-blue-700' />
        </button>
      </nav>

      <section className='flex flex-col items-center  flex-1 px-6 gap-4 md:gap-10 text-center pt-28'>
        <div ref={heroRef} className='max-w-2xl md:max-w-4xl'>
          <h1 className=' text-4xl md:text-5xl font-extrabold mb-3 md:mb-6 leading-tight'>
            Track Your Notes With <span className='text-blue-600'>Ease</span>
          </h1>
          <p className='md:text-lg text-gray-700 font-medium '>
            Your all-in-one platform for managing notes, creating, editing and
            deleting notes
          </p>
        </div>

        <div ref={buttonsRef} className='flex gap-6'>
          <button
            onClick={handleLoginPage}
            className='px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all'
          >
            Get Started
          </button>
          <button
            onClick={handleLoginPage}
            className='px-8 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg shadow-lg transform hover:scale-105 transition-all'
          >
            Learn More!
          </button>
        </div>
      </section>

      <div className='absolute  bottom-0 left-1/2  -translate-x-1/2 transform  w-4/5 md:max-w-xl pointer-events-none'>
        <img
          ref={illustrationRef}
          src='/device.svg'
          alt='Illustration'
          className='w-full h-auto '
        />
      </div>
    </div>
  );
};

export default Page;
