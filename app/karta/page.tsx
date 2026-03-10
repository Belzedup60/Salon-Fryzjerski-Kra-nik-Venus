'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { verifyAdminPassword } from './actions'; 

export default function KartaKlienta() {
  const [user, setUser] = useState<any>(null);
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from('profiles')
        .select('visits')
        .eq('email', user?.email?.toLowerCase()) 
        .single();
      
      if (data) setVisits(data.visits);
      setLoading(false);
    };
    fetchData();
  }, [router]);

  const handleAddVisit = async () => {
    setUpdateLoading(true);
    const isCorrect = await verifyAdminPassword(adminPassword);

    if (!isCorrect) {
      alert('Błędne hasło administratora!');
      setAdminPassword('');
      setUpdateLoading(false);
      return;
    }

    const newCount = visits >= 10 ? 0 : visits + 1;

    const { error } = await supabase
      .from('profiles')
      .update({ visits: newCount })
      .eq('email', user?.email?.toLowerCase());

    if (error) {
      alert('Błąd: ' + error.message);
    } else {
      setVisits(newCount);
      if (newCount === 0) {
        alert('Nagroda odebrana! Karta została zresetowana.');
      } else {
        alert('Wizyta dodana!');
      }
    }
    setAdminPassword('');
    setUpdateLoading(false);
  };

  if (loading) return (
    <div className="bg-[#1a0b2e] min-h-screen flex items-center justify-center text-white font-bold tracking-tighter text-2xl animate-pulse">
      ŁADOWANIE...
    </div>
  );

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-[#0f051d] py-6 px-3 text-white font-sans">
      
      {/* KARTA WIZUALNA */}
      <div className="relative w-full max-w-[400px] aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 mb-6 border border-white/10">
        <Image 
          src="/kartatlo.png" 
          alt="Venus Karta" 
          fill 
          className="object-cover"
          priority
        />
        
        <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full justify-between bg-black/10">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter leading-none shadow-black drop-shadow-md">VENUS</h1>
            {/* TUTAJ ZMIENIONO NAPIS */}
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] opacity-80 mt-1">Karta Rabatowa</p>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3 px-1">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-full border-[1.5px] sm:border-2 flex items-center justify-center transition-all duration-500 ${
                  i < visits 
                  ? 'bg-gradient-to-t from-orange-500 to-yellow-400 border-yellow-200 shadow-[0_0_10px_rgba(251,191,36,0.6)] scale-105' 
                  : 'border-white/30 bg-black/20'
                }`}
              >
                {i < visits && (
                  <span className="text-white text-base sm:text-xl font-black drop-shadow-md">V</span>
                )}
              </div>
            ))}
          </div>

          <div className="w-full text-center">
            <p className="text-[10px] sm:text-sm font-black tracking-tight text-white drop-shadow-lg bg-black/20 py-1 rounded-full px-2 inline-block">
              UZBIERAJ 10 I ODBIERZ PREZENT!
            </p>
          </div>
        </div>
      </div>

      {/* PANEL DLA TATY */}
      <div className="w-full max-w-[400px] bg-white/5 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md shadow-inner">
        <div className="text-center mb-4">
          <p className="text-purple-300 text-[10px] font-black uppercase tracking-widest mb-1">Strefa Obsługi</p>
          <h3 className="text-lg font-bold">Podbij Kartę</h3>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Hasło"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full bg-white/10 border-none p-3 rounded-2xl text-center text-white placeholder:text-gray-500 outline-none ring-1 ring-white/10 focus:ring-purple-500 transition-all"
          />
          <button 
            onClick={handleAddVisit}
            disabled={updateLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-3.5 rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50 text-sm"
          >
            {updateLoading ? '...' : 'DODAJ WIZYTĘ'}
          </button>
        </div>
      </div>

      <button 
        onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
        className="mt-8 text-white/20 hover:text-white/50 text-[10px] font-bold tracking-[0.5em] uppercase transition-all"
      >
        [ Wyloguj ]
      </button>
    </main>
  );
}