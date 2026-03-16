'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from './lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegistering) {
      if (password !== confirmPassword) {
        alert("Hasła nie są identyczne!");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        alert("Błąd rejestracji: " + error.message);
      } else if (data.user) {
        await supabase.from('profiles').insert([{ email: email.toLowerCase(), visits: 0 }]);
        alert("Zarejestrowano pomyślnie! Teraz możesz się zalogować.");
        setIsRegistering(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        alert("Błąd: " + error.message);
      } else {
        router.push('/karta');
      }
    }
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#0a0a1a] py-8">
      {/* TŁO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png" 
          alt="Space background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a1a]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[350px] px-4 flex flex-col items-center mx-auto">
        
        {/* WYŚRODKOWANY SZYLD Z RAMKĄ */}
        <div className="w-fit mx-auto mb-8 border-[3px] border-white rounded-2xl bg-black/30 backdrop-blur-sm px-6 py-4 shadow-2xl flex flex-col items-center">
          <span className="text-white text-3xl font-black uppercase tracking-[0.2em] leading-none">
            KARTA
          </span>
          <span className="text-white text-4xl font-black uppercase tracking-[0.2em] leading-tight mt-1">
            RABATOWA
          </span>
        </div>

        {/* LOGO I POWITANIE */}
        <div className="text-center mb-6 w-full flex flex-col items-center">
          <h1 className="text-white text-6xl font-black tracking-tighter italic drop-shadow-2xl mb-1">
            VENUS
          </h1>
          <div className="space-y-0.5">
            <h2 className="text-gray-200 text-lg font-bold leading-tight">
              {isRegistering ? 'Załóż swoją kartę' : 'Witam w Salonie Fryzjerskim'}
            </h2>
            <p className="text-gray-400 text-[10px] font-light uppercase tracking-[0.2em]">
              ul. Adama Mickiewicza 1B, Kraśnik
            </p>
          </div>

          {!isRegistering && (
            <div className="mt-4">
              <a 
                href="tel:+48818260237" 
                className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFC700] text-black px-5 py-2 rounded-full transition-all active:scale-95 shadow-[0_0_15px_rgba(255,215,0,0.4)]"
              >
                <span className="font-black tracking-wide text-[11px] uppercase">ZADZWOŃ: 81 826 02 37</span>
              </a>
            </div>
          )}
        </div>

        {/* FORMULARZ */}
        <form onSubmit={handleAuth} className="w-full space-y-3">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/95 border-none p-3.5 rounded-xl text-gray-900 placeholder:text-gray-500 outline-none text-base shadow-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Hasło"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/95 border-none p-3.5 rounded-xl text-gray-900 placeholder:text-gray-500 outline-none text-base pr-12 shadow-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-xl transition-all active:scale-95 text-lg uppercase tracking-wider mt-1 disabled:opacity-50"
          >
            {loading ? '...' : (isRegistering ? 'ZAŁÓŻ KARTĘ' : 'ZALOGUJ SIĘ')}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-6 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700"
        >
          {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz karty? Zarejestruj się'}
        </button>
      </div>
    </main>
  );
}