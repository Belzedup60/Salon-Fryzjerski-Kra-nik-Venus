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
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ email: email.toLowerCase(), visits: 0 }]);

        if (profileError) console.error("Błąd profilu:", profileError);

        alert("Zarejestrowano pomyślnie! Teraz możesz się zalogować.");
        setIsRegistering(false);
        setPassword('');
        setConfirmPassword('');
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
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a1a] py-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png" 
          alt="Space background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/50 via-transparent to-[#050510]/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-[340px] px-4 text-center">
        
        {/* NAGŁÓWEK Z JASNYM NIEBIESKIM NAPISEM I PÓŁPRZEZROCZYSTĄ RAMKĄ */}
        <div className="mb-6">
          <div className="inline-block border-2 border-white/90 bg-white/10 px-6 py-2 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-3">
            <p className="text-[#87CEEB] text-[16px] font-black uppercase tracking-[0.4em]">
              Karta Rabatowa
            </p>
          </div>
          
          <h1 className="text-white text-7xl font-black tracking-tighter italic drop-shadow-2xl leading-none">
            VENUS
          </h1>
        </div>

        <div className="mb-5 space-y-1">
          <h2 className="text-white text-[19px] font-semibold leading-tight">
            {isRegistering ? 'Załóż swoją kartę' : 'Witam w Salonie Fryzjerskim'}
          </h2>
          <p className="text-gray-300 text-[12px] font-light opacity-90">
            ul. Adama Mickiewicza 1B, Kraśnik
          </p>

          {!isRegistering && (
            <div className="pt-2">
              <a 
                href="tel:+48818260237" 
                className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFC700] text-black px-4 py-2 rounded-full transition-all active:scale-95 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.542 2.17a3.001 3.001 0 01-1.171 3.125l-1.482 1.112a15.047 15.047 0 006.278 6.278l1.112-1.482a3.001 3.001 0 013.125-1.171l2.17.542c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <span className="font-black tracking-wide text-xs">ZADZWOŃ: 81 826 02 37</span>
              </a>
            </div>
          )}
        </div>

        <form onSubmit={handleAuth} className="space-y-3">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/95 border-none p-3.5 rounded-xl text-gray-900 placeholder:text-gray-500 outline-none text-base"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Hasło"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/95 border-none p-3.5 rounded-xl text-gray-900 placeholder:text-gray-500 outline-none text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          {isRegistering && (
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Powtórz hasło"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/95 border-none p-3.5 rounded-xl text-gray-900 placeholder:text-gray-500 outline-none text-base ring-2 ring-blue-500/50"
            />
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 text-base uppercase tracking-wider mt-1 disabled:opacity-50"
          >
            {loading ? '...' : (isRegistering ? 'ZAŁÓŻ KARTĘ' : 'ZALOGUJ SIĘ')}
          </button>
        </form>

        <button 
          onClick={() => {
            setIsRegistering(!isRegistering);
            setPassword('');
            setConfirmPassword('');
            setShowPassword(false);
          }}
          className="mt-6 text-gray-300 text-sm font-medium underline underline-offset-4"
        >
          {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz karty? Zarejestruj się'}
        </button>
      </div>
    </main>
  );
}