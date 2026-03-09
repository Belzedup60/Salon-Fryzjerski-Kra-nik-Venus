'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function KartaKlienta() {
  const [user, setUser] = useState<any>(null);
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter();

  // TWOJE HASŁO DLA TATY
  const SECRET_ADMIN_PASSWORD = 'Eden13'; 

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
        return;
      }
      setUser(user);

      // Dodano ?. aby TypeScript nie sypał błędami
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
    if (adminPassword !== SECRET_ADMIN_PASSWORD) {
      alert('Błędne hasło!');
      setAdminPassword('');
      return;
    }

    setUpdateLoading(true);

    // Jeśli jest 10, ustaw 0. W innym wypadku dodaj 1.
    const newCount = visits >= 10 ? 0 : visits + 1;

    // Dodano ?. również tutaj
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
    <main className="min-h-screen w-full flex flex-col items-center bg-[#0f051d] py-8 px-4 text-white font-sans">
      
      {/* KARTA WIZUALNA */}
      <div className="relative w-full max-w-[450px] aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 mb-8 border border-white/10">
        <Image 
          src="/kartatlo.png" 
          alt="Venus Karta" 
          fill 
          className="object-cover"
          priority
        />
        
        <div className="relative z-10 p-5 flex flex-col h-full justify-between bg-black/10">
          <div className="text-left">
            <h1 className="text-5xl font-black italic tracking-tighter leading-none shadow-black drop-shadow-md">VENUS</h1>
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80 mt-1">Karta Lojalnościowa</p>
          </div>

          {/* PIECZĄTKI */}
          <div className="grid grid-cols-5 gap-3 px-2">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  i < visits 
                  ? 'bg-gradient-to-t from-orange-500 to-yellow-400 border-yellow-200 shadow-[0_0_15px_rgba(251,191,36,0.8)] scale-110' 
                  : 'border-white/30 bg-black/20'
                }`}
              >
                {i < visits && (
                  <span className="text-white text-xl font-black drop-shadow-md">V</span>
                )}
              </div>
            ))}
          </div>

          <div className="w-full text-center">
            <p className="text-sm font-black tracking-tight text-white drop-shadow-lg bg-black/20 py-1 rounded-full px-2 inline-block">
              UZBIERAJ 10 I ODBIERZ DARMOWE STRZYŻENIE!
            </p>
          </div>
        </div>
      </div>

      {/* PANEL DLA TATY */}
      <div className="w-full max-w-[450px] bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md shadow-inner">
        <div className="text-center mb-6">
          <p className="text-purple-300 text-[10px] font-black uppercase tracking-widest mb-1">Strefa Obsługi</p>
          <h3 className="text-xl font-bold">Podbij Kartę</h3>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Hasło administratora"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full bg-white/10 border-none p-4 rounded-2xl text-center text-white placeholder:text-gray-500 outline-none ring-1 ring-white/10 focus:ring-purple-500 transition-all"
          />
          <button 
            onClick={handleAddVisit}
            disabled={updateLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50"
          >
            {updateLoading ? 'PRZETWARZANIE...' : 'DODAJ WIZYTĘ'}
          </button>
        </div>
      </div>

      <button 
        onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
        className="mt-10 text-white/20 hover:text-white/50 text-[10px] font-bold tracking-[0.5em] uppercase transition-all"
      >
        [ Wyloguj ]
      </button>
    </main>
  );
}