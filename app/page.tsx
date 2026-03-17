import React from 'react';
import { PawPrint, ArrowRight, Sparkles, Mail } from 'lucide-react';

export default function RangerLanding() {
  return (
    <div className="min-h-screen bg-[#fdfaf7] text-slate-900 selection:bg-pink-100 font-sans relative">
      
      {/* FIXED BACKGROUND: The Extended Journey Trail */}
      <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[5%] left-[8%] rotate-[-15deg] text-slate-200"><PawPrint size={70} /></div>
        <div className="absolute top-[10%] left-[14%] rotate-[10deg] text-slate-200 opacity-60"><PawPrint size={65} /></div>
        <div className="absolute top-[18%] left-[22%] rotate-[-20deg] text-slate-200"><PawPrint size={75} /></div>
        <div className="absolute top-[24%] left-[28%] rotate-[5deg] text-slate-200 opacity-60"><PawPrint size={70} /></div>
        <div className="absolute top-[35%] left-[15%] rotate-[-10deg] text-slate-200"><PawPrint size={60} /></div>
        <div className="absolute top-[42%] left-[10%] rotate-[15deg] text-slate-200 opacity-60"><PawPrint size={55} /></div>
        <div className="absolute top-[48%] left-[35%] rotate-[-25deg] text-slate-200"><PawPrint size={80} /></div>
        <div className="absolute top-[54%] left-[42%] rotate-[10deg] text-slate-200 opacity-60"><PawPrint size={75} /></div>
        <div className="absolute top-[62%] right-[40%] rotate-[-15deg] text-slate-200"><PawPrint size={70} /></div>
        <div className="absolute top-[68%] right-[34%] rotate-[20deg] text-slate-200 opacity-60"><PawPrint size={65} /></div>
        <div className="absolute top-[78%] right-[15%] rotate-[-5deg] text-slate-200"><PawPrint size={85} /></div>
        <div className="absolute top-[85%] right-[22%] rotate-[30deg] text-slate-200 opacity-60"><PawPrint size={80} /></div>
        <div className="absolute bottom-[12%] right-[30%] rotate-[-20deg] text-slate-200"><PawPrint size={60} /></div>
        <div className="absolute bottom-[6%] right-[36%] rotate-[15deg] text-slate-200 opacity-60"><PawPrint size={55} /></div>
        <div className="absolute bottom-[2%] left-[48%] rotate-[-10deg] text-slate-200 opacity-40"><PawPrint size={50} /></div>
      </div>

      <div className="relative z-10">
        <nav className="max-w-7xl mx-auto p-6 md:p-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-pink-600 p-2 rounded-xl text-white shadow-lg">
              <PawPrint size={22} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">FetchMyHeart</span>
          </div>
          <div className="hidden sm:block text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase">
            A FourteenLabs LLC Project
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
          
          <header className="w-full mb-10 md:mb-16">
            <p className="text-pink-600 font-bold text-sm uppercase tracking-[0.3em] mb-4">Coming soon.</p>
            <h1 className="text-[7.5vw] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none whitespace-nowrap text-slate-900">
              Every tail <span className="text-pink-600 italic">tells a story.</span>
            </h1>
            <p className="text-2xl md:text-4xl text-slate-400 font-medium italic mt-4">
              We’re making sure it’s a happy one.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            <div className="w-full lg:w-3/5 space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
              <p>
                Every year, approximately <strong className="text-slate-900">6.3 million companion animals</strong> enter shelters across the United States. For many dogs, the journey doesn’t end with adoption.
              </p>
              <p>
                Studies estimate that up to <strong className="text-slate-900 underline decoration-pink-200">15% of adopted dogs are returned</strong> within the first six months. Some experience “serial rehoming,” moving between multiple homes before they are even two years old. Each transition creates stress, instability, and confusion for the animal.
              </p>
              <p className="font-bold text-slate-900 italic py-2 border-l-4 border-pink-500 pl-6 bg-white/40 rounded-r-2xl">
                At FetchMyHeart, we believe most returns aren't a failure of the dog, they're a failure of the match.
              </p>
              <p>
                We’re building an intelligent adoption platform that uses machine learning to match dogs with individuals, couples, and families based on lifestyle, activity level, home environment, and experience.
              </p>
              <p>
                By looking beyond breed labels and focusing on compatibility, we aim to help every dog find the right home the first time.
              </p>
              <p>
                Inspired by the unique personalities of our own pack, Daisy, Ziba, and Ranger, we're creating a smarter path to forever homes.
              </p>

              <div className="max-w-xl pt-6">
                <div className="p-1.5 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl">
                  {/* LIVE FORMSPREE ENDPOINT */}
                  <form action="https://formspree.io/f/mzdjjlkq" method="POST" className="flex flex-col sm:flex-row gap-2">
                    <input 
                      name="email"
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-8 py-4 rounded-[2rem] bg-white border-none focus:ring-2 focus:ring-pink-500 text-lg outline-none"
                      required
                    />
                    <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-[2rem] font-bold hover:bg-pink-600 transition-all flex items-center justify-center gap-3 group whitespace-nowrap">
                      Join the Pack 
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 mt-10 lg:mt-0">
              <div className="columns-2 gap-4 space-y-4">
                <div className="relative break-inside-avoid rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                  <img src="/ZibaHeadShot-18.jpg" className="w-full object-cover" alt="Ziba" />
                  <div className="absolute bottom-3 left-3 bg-yellow-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Ziba</div>
                </div>
                <div className="relative break-inside-avoid rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                  <img src="/RangerGlasses.jpg" className="w-full object-cover" alt="Ranger" />
                  <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Ranger</div>
                </div>
                <div className="break-inside-avoid rounded-3xl bg-slate-900 p-8 text-white shadow-xl flex flex-col justify-center min-h-[160px]">
                  <Sparkles size={24} className="text-pink-400 mb-4" />
                  <p className="text-lg font-medium italic leading-tight">
                    "The first home should be the <span className="text-pink-400 font-bold">only</span> home."
                  </p>
                </div>
                <div className="relative break-inside-avoid rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                  <img src="/DaisyCampingGunison.jpg" className="w-full object-cover" alt="Daisy" />
                  <div className="absolute bottom-3 left-3 bg-pink-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Daisy</div>
                </div>
                <div className="relative break-inside-avoid rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                  <img src="/ZibaAliSunset.jpg" className="w-full object-cover" alt="Ziba Sunset" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="py-12 text-center border-t border-slate-200 mt-20 relative z-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 hover:text-pink-600 transition-colors cursor-pointer group">
          <Mail size={14} className="group-hover:animate-bounce" />
          <a href="mailto:fourteenlabsllc@gmail.com" className="text-xs font-semibold tracking-wider">fourteenlabsllc@gmail.com</a>
        </div>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
          FourteenLabs LLC • © 2026
        </p>
      </footer>
    </div>
  );
}