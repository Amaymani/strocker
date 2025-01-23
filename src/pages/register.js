import React from 'react'
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Theme from "@/components/theme-changer";
import axios from 'axios';
import { useRouter } from 'next/router';
import {useCustomSignUp} from '@/utils/auth';

const register = () => {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { handleSignUp } = useCustomSignUp();

  const router=useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res =await axios.post('/api/register', formData);
      if(res.status===201){
        const result = await handleSignUp(formData.email, formData.password);
          router.push('/login');

      }
  }
  catch(error){
      console.error("Registration error:", error.response?.data?.error || error.message)
  }
  };

  return (
    <div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="h-[100vh] flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative"
      >
        <div onMouseEnter={()=>{setHovered(false)}} onMouseLeave={()=>{setHovered(true)}} className=" z-20 flex items-center justify-center bg-black dark:bg-black">
          <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white text-center mb-6">
              Sign Up
            </h1>
            <form className="space-y-4 z-50"  method='POST' onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  placeholder='Enter your email'
                  value={formData.email} 
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                />
              </div>
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className=" text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-zinc-700  dark:hover:text-black text-white font-medium rounded-lg hover:bg-zinc-900 hover:text-white dark:bg-zinc-700 dark:hover:bg-zinc-400 duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <Theme />
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={5}
                containerClassName="bg-transparent"
                colors={[
                  [59, 130, 246],
                  [139, 92, 246],
                ]}
                opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
                dotSize={2}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Radial gradient for the cute fade */}
        <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
      </div>







    </div>
  )
}

export default register

