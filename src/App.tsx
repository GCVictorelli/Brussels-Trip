import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  Hotel, 
  ShoppingBag, 
  Palette, 
  Utensils, 
  Music, 
  Coffee, 
  Footprints, 
  Bus, 
  Castle, 
  PartyPopper, 
  PlaneTakeoff,
  Train,
  Car,
  Zap,
  BusFront,
  MapPin,
  Ticket,
  ExternalLink,
  ChevronRight,
  Wallet,
  Smartphone
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { timelineData, costsData, totalCost, mobilityApps, type TimelineItem } from './data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const iconMap: Record<string, React.ElementType> = {
  Hotel,
  ShoppingBag,
  Map,
  Palette,
  Utensils,
  Music,
  Coffee,
  Footprints,
  Bus,
  Castle,
  PartyPopper,
  PlaneTakeoff,
  Train,
  Car,
  Zap,
  BusFront
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState<"17" | "18" | "19">("17");
  const [activeTab, setActiveTab] = useState<"timeline" | "mobility" | "costs">("timeline");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const dates = [
    { id: "17", label: "Sex, 17 Abr" },
    { id: "18", label: "Sáb, 18 Abr" },
    { id: "19", label: "Dom, 19 Abr" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-gray-900 font-sans selection:bg-blue-200 overflow-x-hidden relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/40 blur-[120px] mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-rose-300/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-violet-300/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col px-4 py-8 sm:px-6 sm:py-12">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Bruxelas
          </h1>
          <p className="text-gray-500 mt-2 font-medium">17 - 19 Abril</p>
        </motion.header>

        {/* Main Navigation */}
        <motion.nav 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex p-1 bg-gray-200/50 backdrop-blur-xl rounded-[20px] border border-white/20 shadow-sm mb-6 w-full overflow-x-auto scrollbar-hide snap-x"
        >
          {[
            { id: "timeline", label: "Roteiro", icon: MapPin },
            { id: "mobility", label: "Mobilidade", icon: Smartphone },
            { id: "costs", label: "Custos", icon: Wallet },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 shrink-0 snap-center min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200/50" 
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </motion.nav>

        {/* Content Area */}
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            {activeTab === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                {/* Date Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full snap-x">
                  {dates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => setSelectedDate(date.id as any)}
                      className={cn(
                        "shrink-0 snap-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 border",
                        selectedDate === date.id
                          ? "bg-gray-900 border-gray-800 text-white shadow-md"
                          : "bg-white/60 border-white/40 text-gray-600 hover:bg-white/80 backdrop-blur-md"
                      )}
                    >
                      {date.label}
                    </button>
                  ))}
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-gray-200 space-y-5 mt-2 ml-2 py-2">
                  {timelineData[selectedDate].map((item, index) => {
                    const Icon = iconMap[item.icon] || MapPin;
                    const isExpanded = expandedItem === item.id;

                    return (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-[#f5f5f7] border-2 border-blue-500 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        </div>

                        {/* Card */}
                        <button
                          onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                          className={cn(
                            "w-full text-left p-5 rounded-3xl border transition-all duration-300",
                            "bg-white/70 backdrop-blur-xl hover:bg-white/90",
                            isExpanded ? "border-blue-200 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)]" : "border-white/60 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]"
                          )}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex gap-4 items-start">
                              <div className="p-3 rounded-2xl bg-blue-50 text-blue-500">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">{item.time}</span>
                                <h3 className="text-lg font-semibold text-gray-900 mt-1 leading-tight">{item.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{item.type}</p>
                              </div>
                            </div>
                            <ChevronRight className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isExpanded && "rotate-90")} />
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-5 mt-5 border-t border-gray-100 space-y-4">
                                  <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                                    <span>{item.address}</span>
                                  </div>
                                  
                                  <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <Wallet className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                                    <span>{item.price}</span>
                                  </div>

                                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm text-gray-700 leading-relaxed">
                                    {item.notes}
                                  </div>

                                  <div className="flex flex-wrap gap-3 pt-2">
                                    {item.mapLink && (
                                      <a
                                        href={item.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Map className="w-4 h-4" />
                                        Ver no Mapa
                                      </a>
                                    )}
                                    {item.ticketLink && (
                                      <a
                                        href={item.ticketLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Ticket className="w-4 h-4" />
                                        Ingressos / Info
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "mobility" && (
              <motion.div
                key="mobility"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Apps Essenciais</h2>
                  <p className="text-sm text-gray-500 mb-6">Baixe estes aplicativos antes da viagem para facilitar sua locomoção.</p>
                  
                  <div className="space-y-4">
                    {mobilityApps.map((app, idx) => {
                      const Icon = iconMap[app.icon] || Smartphone;
                      return (
                        <div key={idx} className="p-4 rounded-2xl bg-white/50 border border-gray-100 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 text-blue-500">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{app.name}</h3>
                              <p className="text-xs text-gray-500 mt-1">{app.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <a href={app.ios} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors text-center">App Store</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "costs" && (
              <motion.div
                key="costs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Estimativa de Custos</h2>
                  
                  <div className="space-y-4">
                    {costsData.map((cost, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-600">{cost.item}</span>
                        <span className="font-medium text-gray-900">{cost.cost}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Estimado</span>
                    <span className="text-2xl font-black text-gray-900">
                      {totalCost}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    * Valores aproximados por pessoa. Não inclui hospedagem e voos.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
