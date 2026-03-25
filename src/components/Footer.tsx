export default function Footer({ setPage }: { setPage: (page: string) => void }) {
  return (
    <footer className="w-full rounded-t-[2rem] mt-20 bg-surface-container-lowest border-none bg-surface-container-low">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-screen-2xl mx-auto w-full">
        <div className="col-span-1 md:col-span-1">
          <span className="text-xl font-bold text-primary mb-4 block font-headline">Akwen Wellness & Fitness</span>
          <p className="font-body text-sm leading-relaxed text-on-surface-variant opacity-80 mb-6">
            Twoje miejsce siły i spokoju w sercu regionu. Ekspercka wiedza połączona z pasją do ruchu.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
              <span className="material-symbols-outlined text-sm">social_leaderboard</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-headline font-bold text-primary mb-6 uppercase text-xs tracking-widest">Oferta</h4>
          <ul className="space-y-3 font-body text-sm">
            <li><button onClick={() => setPage('home')} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 block">Siłownia</button></li>
            <li><button onClick={() => setPage('spa')} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 block">Spa</button></li>
            <li><button onClick={() => setPage('pricing')} className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 block">Cennik</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold text-primary mb-6 uppercase text-xs tracking-widest">Rezerwacje</h4>
          <ul className="space-y-3 font-body text-sm">
            <li><a 
              href="https://booksy.com/pl-pl/300566_akwen-move-massage_masaz_54221_michalowice?do=invite&_branch_match_id=1200879454275830411&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz0g0Ng4zSa6KiEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAWQ4OhTwAAAA%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 block"
            >
              Booksy
            </a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 block">Instagram</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 block">Facebook</a></li>
          </ul>
        </div>
        <div id="contact">
          <h4 className="font-headline font-bold text-primary mb-6 uppercase text-xs tracking-widest">Kontakt</h4>
          <ul className="space-y-3 font-body text-sm">
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">mail</span>
              <a href="mailto:akwen.michalowice@gmail.com" className="hover:text-secondary transition-colors">akwen.michalowice@gmail.com</a>
            </li>
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">call</span>
              <a href="tel:+48791210216" className="hover:text-secondary transition-colors">791 210 216</a>
            </li>
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">location_on</span>
              <span>Michałowice, Polska</span>
            </li>
            <li><p className="text-on-surface-variant opacity-70 mt-4 italic">© 2024 Akwen Wellness & Fitness. Wszelkie prawa zastrzeżone.</p></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
