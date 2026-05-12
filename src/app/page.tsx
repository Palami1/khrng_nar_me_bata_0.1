"use client";

import React, { useState, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";
import { formsConfig } from "@/lib/formsConfig";
import DocSystem from "@/components/DocSystem";
import { 
  Search, ArrowLeft, Send, ChevronRight, LayoutDashboard, FileText
} from "lucide-react";

export default function App() {
  const [selectedFormId, setSelectedFormId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ທັງໝົດ");
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const categories = useMemo(() => {
    const depts = Object.values(formsConfig).map(f => f.department);
    return ["ທັງໝົດ", ...Array.from(new Set(depts))];
  }, []);

  const filteredForms = useMemo(() => {
    return Object.keys(formsConfig).filter(id => {
      const config = formsConfig[id];
      const matchesSearch = config.name.toLowerCase().includes(searchTerm.toLowerCase()) || config.department.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeTab === "ທັງໝົດ") return matchesSearch;
      return matchesSearch && config.department === activeTab;
    });
  }, [searchTerm, activeTab]);


  if (!hasMounted) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-[#F8FAFC] text-sm animate-pulse font-lao">ກຳລັງໂຫລດ...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-[Phetsarath_OT]">
      <Toaster 
        toastOptions={{
          style: { background: '#0F172A', color: '#F8FAFC', border: '1px solid #1E293B' },
          success: { iconTheme: { primary: '#38BDF8', secondary: '#0F172A' } },
        }}
      />
      
      {/* Header: Simple Dark style */}
      <nav className="bg-[#0F172A] text-white p-4 shadow-lg sticky top-0 z-50 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-md">
              <img 
                src="https://ltc.laotel.com/BBLogo/LTC%20logo%20sign.png" 
                alt="LTC" 
                className="object-contain"
              />
            </div>
            LTC WorkFlow System
          </h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedFormId("")}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${!selectedFormId ? "bg-white text-[#0F172A]" : "text-white hover:bg-[#1E293B]"}`}
            >
              Forms
            </button>
            <a 
              href="/admin" 
              className="px-4 py-2 rounded-xl font-bold text-sm text-white hover:bg-[#1E293B] transition-all"
            >
              Admin
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-10">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {!selectedFormId ? (
              <>
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <h2 className="text-4xl font-black text-[#F8FAFC] mb-4 tracking-tight uppercase">ລະບົບເອກະສານພາຍໃນ</h2>
                  <p className="text-slate-400 text-lg mb-10 font-medium">LTC Digital Form Management System</p>
                  
                  <div className="relative max-w-2xl mx-auto group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#38BDF8] transition-colors" size={22} />
                    <input 
                      type="text" 
                      placeholder="ຄົ້ນຫາແບບຟອມ ຫຼື ພະແນກ..." 
                      className="w-full pl-16 pr-8 py-6 bg-[#0F172A] rounded-[2rem] border-2 border-[#1E293B] shadow-xl shadow-black/20 outline-none focus:border-[#38BDF8] transition-all text-lg text-white"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mt-10">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveTab(cat)}
                        className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-wide transition-all ${activeTab === cat ? "bg-[#38BDF8] text-black shadow-lg shadow-blue-500/20" : "bg-[#0F172A] text-slate-400 border border-[#1E293B] hover:bg-[#1E293B] hover:text-white"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredForms.map(id => (
                    <button 
                      key={id} 
                      onClick={() => setSelectedFormId(id)}
                      className="p-6 bg-[#0F172A] border border-[#1E293B] rounded-3xl hover:border-[#38BDF8] hover:shadow-xl transition-all text-left flex flex-col items-start group"
                    >
                      <span className="bg-[#1E293B] text-[#38BDF8] text-[10px] font-black px-2 py-1 rounded-md uppercase mb-3">
                        {id}
                      </span>
                      <p className="font-bold text-[#F1F5F9] group-hover:text-[#38BDF8] leading-relaxed">
                        {formsConfig[id].name.replace(/^\d+\.\s*/, "")}
                      </p>
                      <div className="mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {formsConfig[id].department}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-4xl mx-auto">
                <button onClick={() => setSelectedFormId("")} className="flex items-center gap-2 text-slate-400 hover:text-[#0050A0] mb-10 font-black text-sm transition-colors uppercase">
                  <ArrowLeft size={20} /> ກັບຄືນໜ້າຫຼັກ
                </button>
                
                <div className="bg-[#0F172A] rounded-[3rem] shadow-2xl shadow-black/40 border border-[#1E293B] overflow-hidden">
                  <DocSystem formId={selectedFormId} />
                </div>
              </div>
            )}
          </div>
      </main>

      {/* Footer: ເພີ່ມຂໍ້ມູນລິຂະສິດຂອງ LTC */}
      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-slate-200 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all">
            <img src="https://ltc.laotel.com/BBLogo/LTC%20logo%20sign.png" alt="LTC" className="h-6" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Lao Telecommunication</span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Lao Telecommunication Public Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}