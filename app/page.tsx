export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5f7] text-gray-800 p-4 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-6xl font-black text-[#d63384] tracking-tighter mb-2">VENUS</h1>
        <div className="h-1.5 w-24 bg-[#d63384] mx-auto rounded-full"></div>
        <p className="text-lg font-bold text-[#f06292] mt-3 uppercase tracking-[0.3em]">Salon Fryzjerski</p>
      </header>
      
      <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(214,51,132,0.15)] border-2 border-white w-full max-w-sm text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-5xl">✂️</span>
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Karta Stałego Klienta</h2>
          <p className="text-gray-500 mt-2 font-medium text-sm">Zaloguj się, aby zbierać pieczątki</p>
        </div>

        <button className="w-full bg-[#d63384] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#b82a6f] transition-all active:scale-95 shadow-lg shadow-pink-200 uppercase tracking-wide">
          Zaloguj się
        </button>
        
        <div className="mt-10 pt-6 border-t border-pink-50 text-xs font-bold text-pink-400 uppercase tracking-widest">
          10 wizyta GRATIS
        </div>
      </div>
    </div>
  );
}