export default function Pricing({ setPage }: { setPage: (page: string) => void, key?: string }) {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 text-center bg-surface">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline font-black text-5xl md:text-7xl text-primary mb-6 tracking-tighter">Cennik</h1>
          <p className="font-body text-xl text-on-surface-variant italic">Transparentne zasady. Wybierz plan dopasowany do Twoich celów.</p>
        </div>
      </section>

      {/* Gym Pricing */}
      <section className="py-20 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="material-symbols-outlined text-4xl text-secondary">fitness_center</span>
            <h2 className="font-headline font-bold text-3xl text-primary font-black uppercase tracking-tighter">Oferta Siłownia</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {/* Trening Personalny Solo */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/30 flex flex-col">
              <h3 className="font-headline font-bold text-xl text-primary mb-6">Trening Personalny Solo</h3>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">Wdrożeniowy</span>
                  <span className="font-headline font-black text-xl text-primary">70 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">Pojedynczy</span>
                  <span className="font-headline font-black text-xl text-primary">180 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">Karnet 4 treningi</span>
                  <span className="font-headline font-black text-xl text-primary">560 zł</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-body text-on-surface-variant">Karnet 8 treningów</span>
                  <span className="font-headline font-black text-xl text-primary">1120 zł</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-primary text-primary font-headline font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors text-sm">Wybierz</button>
            </div>

            {/* Treningi dla Par */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/30 flex flex-col">
              <h3 className="font-headline font-bold text-xl text-primary mb-6">Treningi dla Par (Duo)</h3>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">Wdrożeniowy</span>
                  <span className="font-headline font-black text-xl text-primary">100 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">Pojedynczy</span>
                  <span className="font-headline font-black text-xl text-primary">240 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">Karnet 4 treningi</span>
                  <span className="font-headline font-black text-xl text-primary">800 zł</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-body text-on-surface-variant">Karnet 8 treningów</span>
                  <span className="font-headline font-black text-xl text-primary">1500 zł</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-primary text-primary font-headline font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors text-sm">Wybierz</button>
            </div>

            {/* Pakiety z Karnetem Open */}
            <div className="bg-primary p-8 rounded-[2.5rem] shadow-xl flex flex-col text-on-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl -mr-16 -mt-16"></div>
              <h3 className="font-headline font-bold text-xl mb-6">Pakiety + Karnet OPEN</h3>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-body text-on-primary/80">4 Solo + OPEN</span>
                  <span className="font-headline font-black text-xl">700 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-body text-on-primary/80">8 Solo + OPEN</span>
                  <span className="font-headline font-black text-xl">1250 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-body text-on-primary/80">4 Para + OPEN</span>
                  <span className="font-headline font-black text-xl">1050 zł</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-body text-on-primary/80">8 Para + OPEN</span>
                  <span className="font-headline font-black text-xl">1700 zł</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-headline font-bold uppercase tracking-wider hover:bg-tertiary-fixed transition-colors text-sm">Najlepszy Wybór</button>
            </div>

            {/* Zajęcia Grupowe */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/30 flex flex-col">
              <h3 className="font-headline font-bold text-xl text-primary mb-6">Zajęcia Grupowe</h3>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">8 wejść dorośli</span>
                  <span className="font-headline font-black text-xl text-primary">340 zł</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="font-body text-on-surface-variant">8 wejść dzieci</span>
                  <span className="font-headline font-black text-xl text-primary">240 zł</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-body text-on-surface-variant">Pojedyncze zajęcia</span>
                  <span className="font-headline font-black text-xl text-primary">50 zł</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-primary text-primary font-headline font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors text-sm">Wybierz</button>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-surface-container-high/50 p-8 rounded-3xl border border-secondary/20 max-w-4xl">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary">info</span>
              <div>
                <h4 className="font-headline font-bold text-primary mb-2">Ważne informacje</h4>
                <p className="font-body text-sm text-on-surface-variant mb-2">
                  Ważność karnetów na treningi personalne wraz z karnetem open są ważne wyłącznie <strong>30 dni</strong>.
                </p>
                <p className="font-body text-sm text-on-surface-variant">
                  Zakup karnetów OPEN na siłownię jest wyłącznie dla osób trenujących z trenerem w pakiecie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spa Pricing */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="material-symbols-outlined text-4xl text-secondary">spa</span>
            <h2 className="font-headline font-bold text-3xl text-primary font-black uppercase tracking-tighter">Cennik Spa & Regeneracja</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kobido & Packages */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-xl text-secondary uppercase tracking-widest mb-4">Pakiety & Kobido</h3>
              
              <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-headline font-bold text-primary text-lg">KOBIDO</h4>
                  <span className="font-headline font-black text-xl text-primary">220 zł</span>
                </div>
                <p className="font-body text-sm text-on-surface-variant italic">75 min - Japoński lifting twarzy</p>
              </div>

              <div className="bg-primary p-6 rounded-3xl text-on-primary shadow-lg border border-primary">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-headline font-bold text-lg">KOBIDO + Presoterapia</h4>
                  <span className="font-headline font-black text-xl">900 zł</span>
                </div>
                <p className="font-body text-sm text-on-primary/80 italic">Pakiet 4 x 90 min</p>
              </div>

              <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-headline font-bold text-primary text-lg">Masaż wybranej partii ciała</h4>
                  <span className="font-headline font-black text-xl text-primary">100 zł</span>
                </div>
                <p className="font-body text-sm text-on-surface-variant italic">40 min - Skupienie na konkretnej strefie</p>
              </div>

              <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline font-bold text-primary text-lg">Presoterapia</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-outline-variant/20 pb-2">
                    <span className="font-body text-on-surface-variant">30 min</span>
                    <span className="font-headline font-bold text-primary">89 zł</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-body text-on-surface-variant">Pakiet 6 x 30 min</span>
                    <span className="font-headline font-bold text-primary">480 zł</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Massages */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-xl text-secondary uppercase tracking-widest mb-4">Masaże Specjalistyczne</h3>
              
              {/* Masaż Terapeutyczny */}
              <div className="bg-surface-container p-6 rounded-3xl border border-outline-variant/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary">physical_therapy</span>
                  <h4 className="font-headline font-bold text-primary text-lg">Masaż Terapeutyczny</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                    <span className="font-body text-on-surface-variant">60 min</span>
                    <span className="font-headline font-black text-xl text-primary">159 zł</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-on-surface-variant">90 min</span>
                    <span className="font-headline font-black text-xl text-primary">229 zł</span>
                  </div>
                </div>
              </div>

              {/* Masaż Relaksacyjny */}
              <div className="bg-surface-container p-6 rounded-3xl border border-outline-variant/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary">spa</span>
                  <h4 className="font-headline font-bold text-primary text-lg">Masaż Relaksacyjny</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                    <span className="font-body text-on-surface-variant">60 min</span>
                    <span className="font-headline font-black text-xl text-primary">149 zł</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-on-surface-variant">90 min</span>
                    <span className="font-headline font-black text-xl text-primary">219 zł</span>
                  </div>
                </div>
              </div>

              {/* Masaż Sportowy */}
              <div className="bg-surface-container p-6 rounded-3xl border border-outline-variant/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary">bolt</span>
                  <h4 className="font-headline font-bold text-primary text-lg">Masaż Sportowy</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                    <span className="font-body text-on-surface-variant">45 min</span>
                    <span className="font-headline font-black text-xl text-primary">149 zł</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-on-surface-variant">60 min</span>
                    <span className="font-headline font-black text-xl text-primary">179 zł</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col items-center gap-6">
            <p className="font-body text-on-surface-variant italic text-center max-w-2xl px-4">
              Zalecamy wcześniejszą rezerwację terminów. Wszystkie zabiegi wykonywane są przez dyplomowanych specjalistów.
            </p>
            <a 
              href="https://booksy.com/pl-pl/300566_akwen-move-massage_masaz_54221_michalowice?do=invite&_branch_match_id=1200879454275830411&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz0g0Ng4zSa6KiEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAWQ4OhTwAAAA%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-headline font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              Zarezerwuj na Booksy
              <span className="material-symbols-outlined">calendar_month</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-secondary p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32"></div>
          <h2 className="relative z-10 font-headline font-bold text-4xl text-on-secondary mb-6">Masz pytania dotyczące oferty?</h2>
          <p className="relative z-10 font-body text-on-secondary-fixed text-lg mb-10 max-w-2xl mx-auto">Skontaktuj się z nami, a pomożemy Ci dobrać pakiet idealny dla Twoich potrzeb.</p>
          <div className="relative z-10 flex justify-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-surface-container-lowest text-primary px-12 py-5 rounded-full font-headline font-extrabold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Skontaktuj się
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
