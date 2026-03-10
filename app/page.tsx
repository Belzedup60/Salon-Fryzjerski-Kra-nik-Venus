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
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a1a] py-10">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png" 
          alt="Space background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/40 via-transparent to-[#050510]/80"></div>
      </div>

      <div className="relative z-10 w-full max-w-[380px] px-6 text-center">
        <h1 className="text-white text-7xl font-black tracking-tighter italic mb-6 drop-shadow-2xl text-center w-full">
          VENUS
        </h1>

        <div className="mb-8 space-y-3">
          <h2 className="text-white text-2xl font-semibold leading-tight">
            {isRegistering ? 'Załóż swoją kartę' : 'Witam w Salonie Fryzjerskim'}
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed opacity-90">
            {isRegistering 
              ? 'Wypełnij dane, aby zacząć zbierać punkty.' 
              : 'ul. Adama Mickiewicza 1B, Kraśnik'}
          </p>

          {/* PRZYCISK ZADZWOŃ - Numer zaktualizowany */}
          {!isRegistering && (
            <div className="pt-2">
              <a 
                href="tel:+48818260237" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full transition-all active:scale-95 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.542 2.17a3.001 3.001 0 01-1.171 3.125l-1.482 1.112a15.047 15.047 0 006.278 6.278l1.112-1.482a3.001 3.001 0 013.125-1.171l2.17.542c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <span className="font-bold tracking-wide">ZADZWOŃ: 81 826 02 37</span>
              </a>
            </div>
          )}
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#e5e7eb] border-none p-4 pl-12 rounded-2xl text-gray-800 placeholder:text-gray-500 outline-none shadow-inner text-lg"
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Hasło"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#e5e7eb] border-none p-4 pl-12 pr-12 rounded-2xl text-gray-800 placeholder:text-gray-500 outline-none shadow-inner text-lg"
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
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Powtórz hasło"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#e5e7eb] border-none p-4 pl-12 rounded-2xl text-gray-800 placeholder:text-gray-500 outline-none shadow-inner text-lg ring-2 ring-blue-400/50"
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-transform active:scale-95 text-lg uppercase tracking-wide mt-2 disabled:opacity-50"
          >
            {loading ? 'Przetwarzanie...' : (isRegistering ? 'ZAŁÓŻ KARTĘ' : 'ZALOGUJ SIĘ')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setPassword('');
              setConfirmPassword('');
              setShowPassword(false);
            }}
            className="text-gray-200 text-base font-medium hover:text-white transition-colors"
          >
            {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz karty? Zarejestruj się'}
          </button>
        </div>
      </div>
    </main>
  );
}