export default function Spa({ setPage }: { setPage: (page: string) => void, key?: string }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[819px] flex items-center px-8 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-90 scale-105" alt="luksusowy gabinet masażu" src="/assets/client_photos/IMG_2627.jpg" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-label text-xs font-bold uppercase tracking-widest">Akwen Move & Massage</span>
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-primary mb-8 tracking-tighter">
            Silne i zdrowe ciało zaczyna się od <span className="text-secondary italic font-body font-normal">dobrej regeneracji</span>.
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Odkryj przestrzeń, w której dynamika treningu spotyka się z błogim spokojem regeneracji. Twoje ciało zasługuje na najlepszy serwis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://booksy.com/pl-pl/300566_akwen-move-massage_masaz_54221_michalowice?do=invite&_branch_match_id=1200879454275830411&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz0g0Ng4zSa6KiEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAWQ4OhTwAAAA%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-container text-on-primary px-10 py-5 rounded-full font-headline font-bold text-lg flex items-center justify-center gap-3 transition-all"
            >
              Zarezerwuj na Booksy
              <span className="material-symbols-outlined">calendar_month</span>
            </a>
            <button 
              onClick={() => setPage('pricing')}
              className="bg-surface-container-highest/50 backdrop-blur-md text-primary px-10 py-5 rounded-full font-headline font-bold text-lg hover:bg-surface-container-highest transition-all"
            >
              Sprawdź ofertę
            </button>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-primary">Redukcja stresu</h3>
            <p className="font-body text-on-surface-variant">Głębokie odprężenie układu nerwowego, które pozwala na pełny reset umysłowy po intensywnym dniu.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">bolt</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-primary">Witalność</h3>
            <p className="font-body text-on-surface-variant">Przywrócenie naturalnych sił witalnych i poprawa krążenia, która napędza Twoją codzienną energię.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-primary">Personalizacja</h3>
            <p className="font-body text-on-surface-variant">Każdy zabieg jest dopasowany do indywidualnych potrzeb Twojego ciała i celów treningowych.</p>
          </div>
        </div>
      </section>

      {/* Main Offers */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-primary mb-4 tracking-tight uppercase tracking-tighter">Nasza oferta</h2>
          <div className="w-24 h-1.5 bg-tertiary-fixed-dim mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Masaż Relaksacyjny */}
          <div className="group p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-all">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">spa</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-primary mb-4">Masaż Relaksacyjny</h3>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Pomaga zredukować napięcie mięśniowe i stres. Działa kojąco na ciało i umysł, poprawiając samopoczucie.
            </p>
          </div>
          {/* Masaż Terapeutyczny */}
          <div className="group p-8 rounded-[2.5rem] bg-primary text-on-primary shadow-2xl hover:scale-[1.02] transition-all">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-4xl">physical_therapy</span>
            </div>
            <h3 className="font-headline font-bold text-2xl mb-4">Masaż Terapeutyczny</h3>
            <p className="font-body text-on-primary/90 leading-relaxed">
              Wspomaga leczenie urazów i dolegliwości mięśniowo-szkieletowych. Poprawia krążenie, przywraca sprawność ruchową i łagodzi ból.
            </p>
          </div>
          {/* Masaż Sportowy */}
          <div className="group p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-all">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">bolt</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-primary mb-4">Masaż Sportowy</h3>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Przygotowuje mięśnie do wysiłku i przyspiesza regenerację po treningu. Pomaga zmniejszyć napięcie mięśniowe, poprawia elastyczność.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Kobido */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-surface-container-high aspect-[16/9] md:aspect-auto">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Masaż Kobido" src="/assets/client_photos/IMG_2555.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 p-10 w-full text-white">
              <h3 className="font-headline font-bold text-3xl mb-4">Masaż Kobido</h3>
              <p className="font-body text-lg opacity-90">Technika liftingująca twarz, która działa odmładzająco i relaksująco. Poprawia krążenie, ujędrnia skórę i redukuje napięcie mięśni twarzy.</p>
            </div>
          </div>
          {/* Presoterapia */}
          <div className="group p-10 rounded-[2.5rem] bg-secondary text-on-secondary flex flex-col justify-center shadow-xl">
            <span className="material-symbols-outlined text-6xl mb-6 opacity-30 group-hover:rotate-12 transition-transform">air</span>
            <h3 className="font-headline font-bold text-3xl mb-4">Presoterapia</h3>
            <p className="font-body text-lg leading-relaxed">Zabieg, który wspomaga krążenie limfy i redukuje obrzęki. Pomaga w detoksykacji organizmu, modelowaniu sylwetki i łagodzeniu uczucia ciężkich nóg.</p>
          </div>
        </div>

        {/* Pediatric Rehab Section */}
        <div className="rounded-[3rem] bg-surface-container-lowest border border-outline-variant/50 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-10 md:p-16 space-y-10">
              <div className="space-y-4">
                <span className="text-secondary font-headline font-bold tracking-widest uppercase text-xs">Współpraca Specjalistyczna</span>
                <h2 className="font-headline font-black text-4xl md:text-5xl text-primary leading-tight">mgr Paulina Filipowicz</h2>
                <p className="font-body text-xl text-on-surface-variant italic">Rehabilitacja neurorozwojowa dzieci i niemowląt – Metoda NDT Bobath</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">medical_services</span> Oferuje terapię metodą:
                  </h4>
                  <ul className="space-y-2 font-body text-sm text-on-surface-variant list-disc pl-5">
                    <li>NDT Bobath</li>
                    <li>CME Medek</li>
                    <li>ZOGA MOVEMENT</li>
                    <li>Integracja strukturalna czaszki</li>
                    <li>Fizjoterapia oddechowa</li>
                    <li>Elektrostymulacja (EMS)</li>
                    <li>Kinesiotaping</li>
                    <li>Ocena rozwoju wg metody Prechtl'a</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">psychology</span> Specjalizuje się w terapii:
                  </h4>
                  <ul className="space-y-2 font-body text-sm text-on-surface-variant list-disc pl-5">
                    <li>Zaburzeń wieku rozwojowego (asymetria, napięcie)</li>
                    <li>Dzieci urodzonych przedwcześnie</li>
                    <li>Problemów neurologicznych</li>
                    <li>Wad genetycznych i wrodzonych</li>
                    <li>Wad nabytych</li>
                  </ul>
                </div>
              </div>
              
              <button onClick={() => setPage('pricing')} className="bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold uppercase tracking-wide hover:shadow-xl transition-all">
                Konsultacja dziecięca
              </button>
            </div>
            <div className="lg:col-span-5 relative min-h-[400px]">
              <img className="absolute inset-0 w-full h-full object-cover" alt="Rehabilitacja neurorozwojowa dzieci" src="/assets/pediatric_rehab.png" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-primary-container p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed-dim/10 blur-[100px] -ml-32 -mb-32"></div>
          <h2 className="relative z-10 font-headline font-bold text-4xl text-on-primary mb-6">Twój czas na regenerację jest teraz.</h2>
          <p className="relative z-10 font-body text-on-primary-container text-lg mb-10 max-w-2xl mx-auto">Rezerwacja terminu zajmuje tylko chwilę. Wybierz dogodną godzinę i poczuj różnicę w Akwen Move & Massage.</p>
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://booksy.com/pl-pl/300566_akwen-move-massage_masaz_54221_michalowice?do=invite&_branch_match_id=1200879454275830411&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz0g0Ng4zSa6KiEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAWQ4OhTwAAAA%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-12 py-5 rounded-full font-headline font-extrabold text-xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
            >
              Zarezerwuj na Booksy
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
