/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { TreePine, Calendar, Users, MapPin, Info, Sparkles, ChevronDown } from "lucide-react";

interface Person {
  id: string;
  name: string;
  year?: string;
  role?: string;
  children?: Person[];
}

const familyData: Person = {
  id: "1",
  name: "Tursunxon & Qahhorbek",
  role: "Avlod",
  year: "Asoschilar",
  children: [
    {
      id: "9",
      name: "Muqaddas",
      role: "Katta oila",
      year: "Oila a'zosi",
    },
    {
      id: "2",
      name: "Maliyjon & Habiba",
      year: "1868",
      role: "Katta oila",
      children: [
        {
          id: "7",
          name: "Sherzot",
          role: "Amaki",
          year: "Oila a'zosi",
        },
        {
          id: "3",
          name: "Ulug'bek & Dildora",
          year: "1991",
          role: "Ota-ona",
          children: [
            {
              id: "5",
              name: "Muhammad",
              year: "2010",
              role: "Avlod",
            },
            {
              id: "4",
              name: "Samira & Qaxarova",
              year: "2012",
              role: "Avlod",
            },
            {
              id: "6",
              name: "Umarxon",
              year: "2014",
              role: "Avlod",
            }
          ]
        },
        {
          id: "8",
          name: "Sayora",
          role: "Xola",
          year: "Oila a'zosi",
        }
      ]
    },
    {
      id: "10",
      name: "Xalalimaxon",
      role: "Katta oila",
      year: "Oila a'zosi",
    }
  ]
};

interface NodeProps {
  person: Person;
  level?: number;
  isFirst?: boolean;
  isLast?: boolean;
  siblingsCount?: number;
}

const Node: React.FC<NodeProps> = ({ person, level = 0, isFirst = false, isLast = false, siblingsCount = 0 }) => {
  const [showYear, setShowYear] = useState(false);

  return (
    <div className="flex flex-col items-center relative">
      {/* Connector to parent */}
      {level > 0 && <div className="tree-node-connector" />}
      
      {/* Siblings horizontal connector */}
      {siblingsCount > 1 && (
        <div 
          className="tree-siblings-connector" 
          style={{
            left: isFirst ? '50%' : '0',
            right: isLast ? '50%' : '0',
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        {/* Node Card */}
        <button
          onClick={() => setShowYear(!showYear)}
          className={`
            group relative flex flex-col items-center p-6 min-w-[220px] 
            bg-heritage-card border border-heritage-gold/50 rounded-lg
            node-glow transition-all duration-500
            ${showYear ? 'scale-105 shadow-xl border-heritage-gold' : 'hover:scale-[1.02]'}
          `}
        >
          {/* Label Tag */}
          <span className="absolute -top-3 px-3 py-0.5 bg-heritage-gold text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-sm">
            {person.role}
          </span>

          <h3 className="serif text-xl font-medium text-heritage-ink mb-1 tracking-wide">
            {person.name}
          </h3>

          <AnimatePresence mode="wait">
            {showYear ? (
              <motion.div
                key="year"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1.5 text-heritage-gold font-serif italic text-base"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{person.year}-yil</span>
              </motion.div>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] uppercase tracking-widest text-heritage-muted group-hover:text-heritage-gold transition-colors"
              >
                Yilni ko'rish
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Connection and Children */}
      {person.children && (
        <div className="flex flex-col items-center mt-12 w-full">
          <div className="w-[1px] h-6 bg-heritage-gold" />
          <div className="flex justify-center gap-8 md:gap-16">
            {person.children.map((child, idx) => (
              <Node 
                key={child.id} 
                person={child} 
                level={level + 1} 
                isFirst={idx === 0}
                isLast={idx === (person.children?.length ?? 0) - 1}
                siblingsCount={person.children?.length ?? 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-heritage-dark text-heritage-white selection:bg-heritage-gold/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-heritage-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-heritage-gold/5 blur-[120px]" />
      </div>

      <header className="relative pt-24 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 border border-heritage-gold/20 rounded-full bg-heritage-gold/5 mb-6"
        >
          <Sparkles className="w-3 h-3 text-heritage-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-gold">Premium Arxiv</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="serif text-5xl md:text-8xl font-light mb-6 tracking-tight"
        >
          Qahhorbek <br/> <span className="italic text-heritage-gold/80">Nasl-nasabi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-heritage-muted font-light leading-relaxed tracking-wide"
        >
          Mansurxon Qahhorbek avlodlarining interaktiv daraxt ko'rinishidagi tarixi. 
          Har bir shaxs haqida ma'lumot olish uchun uning ismiga bosing.
        </motion.p>
      </header>

      <main className="relative py-20 px-6 overflow-x-auto min-h-[600px]">
        <div className="flex justify-center pb-40">
           <Node person={familyData} />
        </div>
      </main>

      <footer className="relative py-20 px-6 border-t border-heritage-gold/10 bg-heritage-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="serif text-2xl text-heritage-gold mb-2">Heritage & Honor</div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-muted">Shajara © 2026 Arxivlash</p>
          </div>

          <div className="flex justify-center gap-8">
             <div className="flex flex-col items-center gap-1 group">
               <Users className="w-5 h-5 text-heritage-gold/40 group-hover:text-heritage-gold transition-colors" />
               <span className="text-[10px] uppercase font-bold text-heritage-muted tracking-widest">4 Avlod</span>
             </div>
             <div className="flex flex-col items-center gap-1 group">
               <MapPin className="w-5 h-5 text-heritage-gold/40 group-hover:text-heritage-gold transition-colors" />
               <span className="text-[10px] uppercase font-bold text-heritage-muted tracking-widest">O'zbekiston</span>
             </div>
          </div>

          <div className="text-center md:text-right">
             <div className="inline-flex items-center gap-2 text-heritage-gold/60 text-xs italic">
               <Info className="w-4 h-4" />
               Loyihalashtirildi: Qaxarbek Lineage
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

