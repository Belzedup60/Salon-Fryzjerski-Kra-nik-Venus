import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a1a]">
      {/* TŁO - Teraz z rozszerzeniem .png */}
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

      {/* ZAWARTOŚĆ STRONY */}
      <div className="relative z-10 w-full max-w-[380px] px-6 text-center">
        
        {/* LOGO VENUS */}
        <h1 className="text-white text-7xl font-black tracking-tighter italic mb-10 drop-shadow-2xl">
          VENUS
        </h1>

        {/* NAPISY POWITALNE */}
        <div className="mb-10">
          <h2 className="text-white text-2xl font-semibold mb-3 leading-tight">
            Witamy w Salonie Fryzjerskim Venus
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed opacity-90">
            Zaloguj się, aby zobaczyć swoją kartę lojalnościową oraz postępy.
          </p>
        </div>

        {/* FORMULARZ - Jedno pole dla E-mail/Telefonu */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="E-mail lub numer telefonu"
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
              type="password"
              placeholder="Hasło"
              className="w-full bg-[#e5e7eb] border-none p-4 pl-12 rounded-2xl text-gray-800 placeholder:text-gray-500 outline-none shadow-inner text-lg"
            />
          </div>

          {/* PRZYCISK LOGOWANIA */}
          <button className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-transform active:scale-95 text-lg uppercase tracking-wide mt-2">
            ZALOGUJ SIĘ
          </button>
        </div>

        {/* DOLNE LINKI */}
        <div className="mt-8 space-y-4">
          <button className="text-gray-200 text-base font-medium hover:text-white transition-colors">
            Zarejestruj się
          </button>
          <button className="text-gray-400 text-sm block w-full hover:text-gray-200 transition-colors font-light">
            Nie pamiętasz hasła?
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/40 to-transparent blur-3xl"></div>
      </div>
    </main>
  );
}