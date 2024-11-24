'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { BiLogInCircle } from 'react-icons/bi';
import { auth, googleProvider } from '@/services/firebase';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-96 border-2'>
        <h1 className='text-3xl text-gray-800 font-extrabold mb-6 text-center'>
          Let's get you signed in
        </h1>
        <p className='text-gray-500 text-center mb-6'>No Need to Sign Up</p>
        {error && (
          <div className='text-red-500 text-sm text-center mb-4'>{error}</div>
        )}
        <button
          onClick={handleGoogleLogin}
          className='w-full px-6 py-3 text-white font-bold rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-500 hover:to-blue-600 flex items-center justify-center gap-3 transform hover:scale-105 transition-all'
        >
          <BiLogInCircle className='w-6 h-6' />
          Sign in with Google
        </button>
      </div>
      <footer className='mt-8 text-gray-700 text-sm text-center'>
        © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
