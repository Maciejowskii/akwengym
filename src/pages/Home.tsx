export default function Home({ setPage }: { setPage: (page: string) => void, key?: string }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center px-8 lg:px-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-screen-2xl mx-auto">
          <div className="lg:col-span-7 z-10">
            <span className="font-headline font-bold text-secondary uppercase tracking-[0.3em] mb-4 block">Personalizacja to nasza metoda</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tighter mb-8">
              Postaw Na Siłę! <br />
              <span className="text-secondary">Postaw na SIEBIE!</span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed italic">
              "Eksperci to nasza siła. Odkryj miejsce, gdzie nauka o ruchu spotyka się z głęboką regeneracją w sercu Michałowic."
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setPage('pricing')}
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold uppercase tracking-wide hover:shadow-2xl transition-all duration-300"
              >
                Zacznij Dzisiaj
              </button>
              <button 
                onClick={() => setPage('spa')}
                className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-5 rounded-full font-headline font-bold uppercase tracking-wide hover:bg-tertiary-fixed transition-all duration-300"
              >
                Poznaj Spa
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 scale-105">
              <img className="w-full h-full object-cover" alt="Sztangista wykonujący martwy ciąg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcdTJALQ2xSR-746tPM0mstCQrzkZrJ0xzrmnnrSWJcf-q0SeOPU7eBj69nLS6t4hSRSh1Q0WDPT4x1WhlZEeJolUuL2hgL9O0tckz-l2FnHOVj1ge7OKkZcO4f0a-n07Kr4FoMPu17zUnnIwwXTPchQKhk9CX4TPT4S0zVJcFmEBLmptol8bw1K-iaEszMmQ8Vr_BN6KcLJKdNeMzIemyXgo1zdu0AHXoyXx_0k3fQ9OmuuUBB5BNEUu22E0Hb6Gj8GMDc7dU3KE" />
            </div>
            <div className="absolute -bottom-12 -left-12 w-72 bg-surface-container-lowest p-6 rounded-[2rem] shadow-2xl -rotate-6 hidden md:block border border-outline-variant/20">
              <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-inner">
                <img className="w-full h-full object-cover" alt="Profesjonalny terapeuta masażu przy pracy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb9OPGBHrOXrfCSrIXHJyyNlz-biQkS5iZVgUpn6GnboF0eBPSAj2bgJy6VaNi-2rXk-yxEJzlgQfjwR6ETOfyV7p-o1TxOnwmmyxAMM1berhAXXqcGDBHqngyzgaiu2Ci4edhPN0edbjqZRhSickyT6LvhlAMh8mdUPZAssAlpxHbN_JxOa5Z1KkqVE3TXRbZAvlZzOVEhSJUeYRSxIZaZiNsB57GmTMT9FCD7_CvD3raSQZ3meDoFmmZx5wDzR7YfIsTWaoJMqw" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-sm">spa</span>
                </div>
                <p className="font-headline font-black text-[10px] uppercase tracking-widest text-primary">Regeneracja Move & Massage</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-surface-container-low rounded-l-[10rem]"></div>
      </section>

      {/* Why Akwen */}
      <section className="py-24 px-8 lg:px-20 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                    <img className="w-full h-full object-cover" alt="Obciążenia i hantle na siłowni" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwG6onLiGCDxZG8FwqEkanw7wPIqKU5RxW-3jBEqilwmrIhUqpwQ7ufYa4GrFD8p7663BpoqELlMzYfrZF8OLyBfH0wlllYNnMwGtvpvtLx8aNJ2zi1BRM-7rIGIu_EZhLK0h-LVAVrGZlQO2AMSn56b4CISORoAmC_pfg02luhnrV3RQooLAX63qCzFo0HS6pvOogn3H8TH9zn-X1LNqm8wKAuaaaiMM1LChSIeqhxl3CTEwYjDhqfW6tqpgkwP0b3rtBWiKniQI" />
                  </div>
                  <div className="bg-primary text-on-primary p-8 rounded-2xl">
                    <span className="font-headline text-4xl font-bold">8+</span>
                    <p className="font-label text-sm uppercase mt-2">Lat doświadczenia</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container-high p-8 rounded-2xl">
                    <span className="material-symbols-outlined text-secondary text-4xl">home_health</span>
                    <h4 className="font-headline font-bold mt-4">Michałowice</h4>
                    <p className="text-sm opacity-70">Lokalna społeczność, światowe standardy.</p>
                  </div>
                  <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
                    <img className="w-full h-full object-cover" alt="Nowoczesne, przestronne wnętrze siłowni Akwen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo6Rl_CeXoEEaAtWzgEisfyB8FtZ5U3Hd1eHVw7YJ0p50wqI73Jm8vCpwRTSnXwiYkJGy8WZKf370go3pXCRABUm8LJnyBkniAHWVZ-1iHBdCiOmBBsSrZcXxlNNatHxvuMdc--iSbZtplBFNEd8q4AasWrkrhSUD5LflkrCw-pidkY7zULPScHKU7iG6APnvjdZZcqXl3QGsAsJxtB9D2HRo7WlDrLXvkdQcXw4b_y4yRo4NGJT-sswws1YgiRpFn-dMGG63OgfY" />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">Pasja, która buduje formę.</h2>
              <div className="w-20 h-1 bg-tertiary-fixed-dim"></div>
              <p className="font-body text-lg leading-relaxed text-on-surface-variant">
                Akwen Wellness & Fitness to kompleks gimnastyczno-terapeutyczny w Michałowicach, stworzony z pasji do zdrowego ruchu. Nie jesteśmy kolejną sieciówką – jesteśmy zespołem ekspertów, dla których Twoje postępy są naszą największą satysfakcją.
              </p>
              <p className="font-body text-lg leading-relaxed text-on-surface-variant italic border-l-4 border-secondary pl-6">
                Nasz cel to harmonijne połączenie siły fizycznej z psychicznym odprężeniem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="py-24 px-8 lg:px-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-black text-primary mb-4">Nasi Eksperci</h2>
            <p className="font-body text-on-surface-variant italic">Twoi przewodnicy na drodze do lepszej wersji siebie.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Daniel', role: 'Założyciel | 8+ lat doświadczenia', desc: 'Fundament Akwen, pasjonat wszechstronnego rozwoju.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD82gRn_TEwhh_3GzEeE4CDB7lJ7_14BH7wp7sXQDFHXmfZuYBj2R9FVMaLi9A6atDkHDviXpJbUh1U6u5oRqOOBHpVis-Ch5vXN1lBi2nGdEqKCW-KFGyHAr9H-GOJZsKnGXJAPYxA-Dt02-hWT_QkyI7yXXRFuHHYCF7LIXXLD3Bc1yL9Poiytr4_8f6XEQl2hq0JLy_IkCReXo4CYwnbD2ywOcVZ3w-6G47fX2-uuLMMWV_AkJIzwLYYVZ8U5yJN3MvCfM-ej-g' },
              { name: 'Dawid', role: 'Przygotowanie motoryczne', desc: 'Absolwent AWF, specjalista od dynamiki i szybkości.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdqWWrOqwDHVzOwLVlFAoZE3Hd4iLvJyvgY4Hs8wJRGOhJCsPXET07ta4eQTIiWiSqgspgXNvPKyk-XXS_wlgb1GKpYqsSyXAaHZVOo7a0Oo11PUR4ewsJwNTeXxD7IMFhU8KpNLX8LUTrktZx5P0aJvuGwFUinIoHt5NTDyej1huLfJo1r2GFmFJ4Ju6RHocjvjrHIcPlOvHIYg3LW2q7JcH7M0x1IW7v93az6Wuc6uKAoZGA_UHIkw9X1WVB8blQAsoqoY_jeug' },
              { name: 'Edyta', role: 'Siła kobiet | Zawodniczka', desc: 'Udowadnia, że siła jest kobieca i piękna.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP429nlxs1k9mFdNCROLkC1gwVeYGT952-4dBvQgkkHoTq-2UpiFnU__LrK_O-hYKIgG2TaKP5LrAM9wwiaWuB0WE19_lN8_REsua3s9vCyyBvVLW0PSQXug9u44L-1e7Ga0s-pIGdT151MCE4SpvyWFp6kHtREv6DLwim0xSyVZXq5IQnqU8MlMm26xChJr-WiFZwx4IuiqkQza7GLb35v8NG_JwZ9hVM0bCXaK550BJ4oZ5E0R_e9ohbPilOMjM28P1LidVIdr8' },
              { name: 'Wojciech', role: 'Student fizjoterapii | Trójboista', desc: 'Łączy medyczne podejście z ciężkim treningiem.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwjKhSNUJK_h1pkB1Taw-tc6vxnSzZRSJqr0Lw5ypyZ18D5G-BQB0f_alEd_XQ_wlRRg2cNFdpsGYOpU9F6vWgI8zRbpk2DteavFdQbxVsPUQ0vDlU0mSydtDgGl-yl5FACnVFItzDISvQhYFzxZZ_gCSzS4NGna7vkZGDn2Pu6PkZcYJRTHXuJt-cbAB6xkanehi23VSd-uyluYmgISOQ2VPUl1Z_tYwmqTikNEpY1tSx269q8LYOf2a9OJYTPLJCB6rrkOvqxIg' }
            ].map((coach, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={coach.name} src={coach.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-8 text-on-primary">
                  <h3 className="font-headline text-2xl font-bold">{coach.name}</h3>
                  <p className="text-sm font-label opacity-80 mb-2">{coach.role}</p>
                  <p className="text-xs italic opacity-0 group-hover:opacity-100 transition-opacity">{coach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8 lg:px-20 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-6xl font-black text-primary mb-4 uppercase tracking-tighter">Co oferujemy?</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-outline-variant flex-grow max-w-[100px]"></div>
              <span className="font-headline font-bold text-secondary text-2xl tracking-[0.2em] uppercase">Skuteczność!</span>
              <div className="h-px bg-outline-variant flex-grow max-w-[100px]"></div>
            </div>
            <p className="font-body text-xl text-on-surface-variant max-w-3xl mx-auto mt-8 leading-relaxed italic">
              Na podopiecznych AKWEN czekają wykwalifikowani trenerzy i aktywni sportowcy – osoby, które osiągnęły sukces w swoich dyscyplinach. Ta unikalna perspektywa pozwala nam zaoferować coś więcej niż standardowy trening.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">fitness_center</span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-primary">Trening Personalny</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Jeśli twoim głównym celem jest poprawa sylwetki i chęć odzyskania codziennej energii życiowej wybierz trening personalny. Wspólnie z trenerem dobierzecie i obierzecie plan działania.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-4xl">bolt</span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-primary">Trening Motoryczny</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Uprawiasz już inny sport i chcesz stać się jeszcze szybszy i silniejszy? A może jesteś przezorny i chcesz zmniejszyć ryzyko kontuzji? Trening motoryczny jest dla Ciebie!
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-tertiary-fixed-dim/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">medical_services</span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-primary">Trening Medyczny</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Jesteś po kontuzji i chcesz wrócić do regularnego sportu ale nie wiesz jak zrobić to bezpiecznie? A może aktualnie dokuczają ci problemy bólowe lub sztywność w ciele? Zacznij działać! Postaw na trening medyczny z jednym z naszych trenerów.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <h2 className="font-headline text-3xl font-black text-primary uppercase tracking-tighter">Zajęcia Grupowe</h2>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Kalistenika Dorośli', time: 'PN 19:00 / CZW 19:00', img: 'kalistenika_dorosli.png' },
                { title: 'Kettlebell', time: 'WT 19:00 / PT 19:00', img: 'kettlebell.png' },
                { title: 'Zabiegany Rodzic', time: 'WT 8:30 / CZW 8:30', img: 'zabiegany_rodzic.png' },
                { title: 'Kalistenika Dzieci', time: 'PN 15:30 / CZW 15:30', img: 'kalistenika_dzieci.png' }
              ].map((item, i) => (
                <div key={i} className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-surface-container-highest shadow-xl">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} src={`/assets/${item.img}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <h4 className="font-headline font-bold text-xl text-white mb-2">{item.title}</h4>
                    <div className="badge bg-secondary text-on-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-4">Grafik</div>
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <p className="font-headline font-bold text-sm">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
