"use client";

import React, { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { formsConfig } from "@/lib/formsConfig";
import { generateLaosPDF } from "@/lib/pdf-service";
import {
  Search, Printer, LayoutDashboard, Clock, Trash2, Eye,
  CheckCircle, LogOut, RefreshCw, FileText, TrendingUp, Users, Download, Target
} from "lucide-react";
import { Modal, Tag, Table, DatePicker, Select, Input, AutoComplete, ConfigProvider, theme, Tabs, Collapse } from 'antd';
import AlignmentTool from "@/components/AlignmentTool";

// ─── Types ────────────────────────────────────────────────────────────────────
type Submission = {
  id: string;
  formId: string;
  formName?: string;
  department?: string;
  dep_name?: string;
  nameLao?: string;
  empId?: string;
  status?: string;
  createdAt?: any;
  submittedAt?: any;
  formData?: Record<string, any>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (ts: any) => {
  if (!ts?.toDate) return "—";
  return ts.toDate().toLocaleDateString("lo-LA", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const getDisplayName = (sub: Submission) => {
  if (sub.nameLao) return sub.nameLao;
  if (!sub.formData) return "—";
  
  const fd = sub.formData;
  // Common name fields
  if (fd.nameLao) return fd.nameLao;
  if (fd.int_name) return fd.int_name;
  if (fd.first_name || fd.last_name) return `${fd.first_name || ''} ${fd.last_name || ''}`.trim();
  if (fd.reporterName) return fd.reporterName;
  if (fd.deceasedName) return fd.deceasedName;
  if (fd.childName) return fd.childName;
  if (fd.partnerName) return fd.partnerName;
  if (fd.trainer) return fd.trainer;
  
  return "—";
};

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
      const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "LTC@admin2026";
      if (username === validUser && password === validPass) {
        document.cookie = "adminAuth=true; path=/; max-age=28800; SameSite=Strict";
        toast.success("ເຂົ້າສູ່ລະບົບສຳເລັດ");
        onLogin();
      } else {
        setError("ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', 'Noto Sans Lao', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .login-input { width:100%; padding:14px 18px; border:1.5px solid #1E293B; border-radius:14px; font-size:15px; outline:none; transition:all .3s cubic-bezier(0.4, 0, 0.2, 1); background:#0F172A; color:#F8FAFC; }
        .login-input:focus { border-color:#38BDF8; background:#0F172A; box-shadow:0 0 0 4px rgba(56,189,248,.12), 0 0 20px rgba(56,189,248,0.1); transform: translateY(-2px); }
        .login-input::placeholder { color:#475569; }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(2deg)} }
        @keyframes float-slow { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-15px)} }
        @keyframes glow { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
        @keyframes slide-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #020617 0%, #0F172A 100%)" }}>

        {/* Decorative circles - subtle glow instead of white */}
        <div className="animate-float" style={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />
        <div className="animate-float-slow" style={{ position:"absolute", bottom:-120, left:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)" }} />
        <div className="animate-glow" style={{ position:"absolute", top:"35%", right:"-5%", width:180, height:180, borderRadius:"50%", background:"rgba(56,189,248,0.06)" }} />

        {/* Top logo */}
        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <img src="https://ltc.laotel.com/BBLogo/LTC%20logo%20sign.png" alt="LTC" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">LTC WorkFlow</div>
              <div className="text-blue-200 text-xs font-medium">Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Centre content */}
        <div className="relative z-10 px-12 pb-4">
          <div className="w-14 h-1.5 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mb-8" />
          <h1 className="text-white font-extrabold leading-tight mb-6" style={{ fontSize:42 }}>
            ຈັດການເອກະສານ<br />
            <span style={{ color:"#94A3B8" }}>ສະດວກ ແລະ ວ່ອງໄວ</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            ລະບົບ Admin Dashboard ສຳລັບພະນັກງານ LTC ໃຊ້ຈັດການ ແລະ ກວດສອບຄຳຮ້ອງ.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 px-12 py-10 grid grid-cols-3 gap-4">
          {[
            { icon: <FileText size={16}/>, label:"ແບບຟອມ", value:"20+" },
            { icon: <Users size={16}/>, label:"ແຜນກ", value:"4" },
            { icon: <TrendingUp size={16}/>, label:"Online", value:"24/7" },
          ].map(s => (
            <div key={s.label} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 border border-slate-800/50">
              <div className="text-slate-500 mb-1">{s.icon}</div>
              <div className="text-[#F8FAFC] font-black text-xl">{s.value}</div>
              <div className="text-slate-500 text-xs font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right login panel ── */}
      <div className="flex-1 flex items-center justify-center bg-[#020617] px-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <img src="https://ltc.laotel.com/BBLogo/LTC%20logo%20sign.png" alt="LTC" className="w-7 h-7 object-contain" />
            </div>
            <span className="font-bold text-[#F8FAFC]">LTC WorkFlow Admin</span>
          </div>

          <div className="bg-[#0F172A] rounded-[28px] shadow-2xl shadow-black/40 p-10 border border-[#1E293B]">
            <div className="mb-8">
              <h2 className="font-extrabold text-[#F8FAFC] mb-2" style={{ fontSize:28 }}>ຍິນດີຕ້ອນຮັບ 👋</h2>
              <p className="text-slate-400 font-medium">ກະລຸນາລົງຊື່ເຂົ້າໃຊ້ລະບົບ Admin</p>
            </div>

            {error && (
              <div className="mb-5 p-4 bg-red-950/30 border border-red-900/50 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-semibold">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">ຊື່ຜູ້ໃຊ້</label>
                <input className="login-input" placeholder="admin" value={username}
                  onChange={e => setUsername(e.target.value)} autoComplete="username" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">ລະຫັດຜ່ານ</label>
                <input className="login-input" type="password" placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-extrabold text-white transition-all text-base mt-2 relative overflow-hidden group"
                style={{ background: loading ? "#1E293B" : "#0F172A", border: "1px solid #1E293B", boxShadow: loading ? "none" : "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0050A0] to-[#0073E6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? "ກຳລັງກວດສອບ..." : "ເຂົ້າສູ່ລະບົບ"}
                  {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                </span>
              </button>
            </form>
          </div>

          <p className="text-center text-slate-400 text-xs mt-8 font-medium">
            © 2026 Lao Telecommunication Public Company
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: number; color: string; bg: string }) {
  return (
    <div className="bg-[#0F172A] rounded-[20px] p-6 border border-[#1E293B] shadow-sm flex items-center gap-5 hover:shadow-xl hover:border-[#38BDF8]/30 hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: bg, color }}>
        {icon}
      </div>
      <div>
        <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-[#38BDF8] transition-colors">{label}</div>
        <div className="text-3xl font-black mt-0.5" style={{ color: "#F8FAFC" }}>{value}</div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<"dashboard" | "alignment">("dashboard");

  useEffect(() => {
    setHasMounted(true);
    // ກວດສອບ Auth ຜ່ານ cookie (ໃຊ້ regex ເພື່ອຄວາມແນ່ນອນ)
    const isAuth = document.cookie.match(/(^|;)\s*adminAuth=true(;|$)/);
    if (isAuth) setIsAuthenticated(true);
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      if (!db) throw new Error("Firebase Database is not initialized");
      const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"), limit(100));
      const snap = await getDocs(q);
      setSubmissions(snap.docs.map(d => ({ id: d.id, ...d.data() } as Submission)));
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast.error("ດຶງຂໍ້ມູນບໍ່ສຳເລັດ: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAuthenticated) fetchSubmissions(); }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບລາຍການນີ້?")) return;
    setIsDeleting(true);
    const t = toast.loading("ກຳລັງລົບ...");
    try {
      await deleteDoc(doc(db, "submissions", id));
      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast.dismiss(t); toast.success("ລົບສຳເລັດ");
    } catch { toast.dismiss(t); toast.error("ລົບບໍ່ສຳເລັດ"); }
    finally { setIsDeleting(false); }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const t = toast.loading("ກຳລັງອັບເດດ...");
    try {
      await updateDoc(doc(db, "submissions", id), { status });
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
      if (selectedSub?.id === id) setSelectedSub(prev => prev ? { ...prev, status } : null);
      toast.dismiss(t); toast.success("ອັບເດດສຳເລັດ");
    } catch { toast.dismiss(t); toast.error("ອັບເດດບໍ່ສຳເລັດ"); }
  };

  const handleSaveEdit = async () => {
    if (!selectedSub) return;
    const t = toast.loading("ກຳລັງບັນທຶກ...");
    try {
      await updateDoc(doc(db, "submissions", selectedSub.id), { formData: editData });
      setSubmissions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, formData: editData } : s));
      setSelectedSub(prev => prev ? { ...prev, formData: editData } : null);
      setIsEditing(false);
      toast.dismiss(t); toast.success("ບັນທຶກສຳເລັດ");
    } catch { toast.dismiss(t); toast.error("ບັນທຶກບໍ່ສຳເລັດ"); }
  };

  const handleExportPDF = async (sub: Submission) => {
    const t = toast.loading("ກຳລັງສ້າງ PDF...");
    try {
      const formCfg = formsConfig[sub.formId];
      if (!formCfg) throw new Error("ບໍ່ພົບຟອມ");
      const pdfUrl = await generateLaosPDF(formCfg.templatePath, sub.formData, formCfg);
      toast.dismiss(t);
      
      // ສ້າງ Link ສຳລັບດາວໂຫລດ (Download)
      const link = document.createElement('a');
      link.href = pdfUrl;
      const fileName = `${sub.formId}_${getDisplayName(sub)}`.replace(/\s+/g, '_') + ".pdf";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (sub.status !== 'completed') handleUpdateStatus(sub.id, 'completed');
      toast.success("ດາວໂຫລດສຳເລັດ");
    } catch (err: any) { 
      toast.dismiss(t); 
      toast.error("ຜິດພາດ: ບໍ່ສາມາດດາວໂຫລດໄດ້ " + err.message); 
    }
  };

  const deptStats = useMemo(() => {
    const stats: Record<string, number> = {};
    submissions.forEach(sub => {
      const d = sub.dep_name || sub.department || "ອື່ນໆ";
      stats[d] = (stats[d] || 0) + 1;
    });
    return stats;
  }, [submissions]);

  const uniqueDepts = useMemo(() => {
    return Object.keys(deptStats).sort();
  }, [deptStats]);

  const searchOptions = useMemo(() => {
    const names = new Set<string>();
    submissions.forEach(sub => {
      const name = getDisplayName(sub);
      if (name && name !== "—") names.add(name);
      if (sub.empId) names.add(sub.empId);
    });
    return Array.from(names).map(name => ({ value: name }));
  }, [submissions]);

  const filtered = useMemo(() => submissions.filter(sub => {
    const name = getDisplayName(sub).toLowerCase();
    const nameMatch = name.includes(searchName.toLowerCase()) || (sub.empId || "").includes(searchName);
    const deptMatch = !searchDept || (sub.dep_name || sub.department || "").toLowerCase().includes(searchDept.toLowerCase());
    let dateMatch = true;
    const ts = sub.createdAt || sub.submittedAt;
    if (searchDate && ts) dateMatch = ts.toDate().toISOString().split('T')[0] === searchDate;
    return nameMatch && deptMatch && dateMatch;
  }), [submissions, searchName, searchDept, searchDate]);

  const logout = () => {
    document.cookie = 'adminAuth=; path=/; max-age=0; SameSite=Strict';
    setIsAuthenticated(false);
  };

  // ປ້ອງກັນ Hydration Hydration mismatch (ລໍຖ້າໃຫ້ mount ຢູ່ client ກ່ອນ)
  if (!hasMounted) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-[#F8FAFC] text-sm animate-pulse">ກຳລັງກວດສອບສິດ...</div>
    </div>
  );

  if (!isAuthenticated) return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { fontFamily: "'Inter', 'Noto Sans Lao', sans-serif", colorPrimary: '#0050A0' } }}>
      <Toaster />
      <LoginPage onLogin={() => setIsAuthenticated(true)} />
    </ConfigProvider>
  );

  const pending = submissions.filter(s => s.status !== 'completed').length;
  const completed = submissions.filter(s => s.status === 'completed').length;

  return (
    <ConfigProvider theme={{ 
      algorithm: theme.darkAlgorithm,
      token: {
        fontFamily: "'Inter','Noto Sans Lao',sans-serif",
        colorPrimary: '#0050A0',
        colorBgBase: '#020617',
        colorBgContainer: '#0F172A',
        colorBorder: '#1E293B',
      }
    }}>
      <div className="min-h-screen text-[#F8FAFC]" style={{ background: "#020617", fontFamily: "'Inter','Noto Sans Lao',sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          .admin-table .ant-table { border-radius:16px!important; overflow:hidden; background:#0F172A!important; }
          .admin-table .ant-table-thead > tr > th { background:#020617!important; font-weight:800!important; font-size:11px!important; text-transform:uppercase; letter-spacing:.08em; color:#94A3B8!important; padding:16px 20px!important; border-bottom:1px solid #1E293B!important; }
          .admin-table .ant-table-tbody > tr > td { padding:16px 20px!important; font-size:14px; border-bottom:1px solid #1E293B!important; color:#F1F5F9!important; transition: all 0.2s; }
          .admin-table .ant-table-tbody > tr:hover > td { background:#1E293B!important; color:#38BDF8!important; }
          .admin-table .ant-table-row { cursor:pointer; transition:all .3s cubic-bezier(0.4, 0, 0.2, 1); }
          .admin-table .ant-table-row:hover { transform: scale(1.005) translateX(4px); }
          .filter-input .ant-input, .filter-input .ant-picker, .filter-input .ant-select-selector { border-radius:14px!important; height:46px!important; border-color:#1E293B!important; background:#0F172A!important; color:#F8FAFC!important; transition:all 0.3s !important; }
          .filter-input .ant-input:focus, .filter-input .ant-picker-focused, .filter-input .ant-select-focused .ant-select-selector { border-color:#38BDF8!important; box-shadow:0 0 0 3px rgba(56,189,248,0.15)!important; transform: translateY(-2px); }
          .ant-pagination-item-link, .ant-pagination-item { background: transparent !important; border-color:#1E293B !important; color:#94A3B8 !important; transition: all 0.2s; }
          .ant-pagination-item:hover { border-color:#38BDF8 !important; transform: translateY(-2px); }
          .ant-pagination-item-active { border-color:#38BDF8 !important; }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #020617; }
          ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #334155; }
        `}</style>
      <Toaster toastOptions={{ style: { borderRadius: 14, fontWeight: 600 } }} />

      {/* ── Top Nav ── */}
      <nav style={{ background:"#0F172A", borderBottom:"1px solid #1E293B" }}
        className="sticky top-0 z-50 px-4 md:px-8 h-[70px] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner" style={{ background:"#fff" }}>
            <img src="https://ltc.laotel.com/BBLogo/LTC%20logo%20sign.png" alt="LTC" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#F8FAFC] text-base md:text-lg leading-tight">LTC Admin</span>
            <span className="md:inline text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">WorkFlow</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1E293B] text-slate-400 hover:text-[#38BDF8] hover:border-[#38BDF8] hover:bg-blue-500/10 transition-all text-sm font-bold"
          >
            <RefreshCw size={15} /> <span className="hidden sm:inline">ໂຫລດໃໝ່</span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-900/30 bg-red-900/10 text-red-400 hover:bg-red-900/20 transition-all text-sm font-bold"
          >
            <LogOut size={15} /> <span className="hidden sm:inline">ອອກຈາກລະບົບ</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#F8FAFC]">
              {activeView === 'dashboard' ? 'ລາຍການຄຳຮ້ອງ' : 'ຈັດຕຳແໜ່ງ PDF (Visual Align)'}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {activeView === 'dashboard' ? 'ຈັດການ ແລະ ພິມເອກະສານທຸກໃບ' : 'ປັບປຸງພິກັດ x, y ຂອງແຕ່ລະຫ້ອງໃນຟອມ'}
            </p>
          </div>
          <button
            onClick={() => setActiveView(activeView === 'dashboard' ? 'alignment' : 'dashboard')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${activeView === 'dashboard' ? 'bg-[#38BDF8] text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
          >
            {activeView === 'dashboard' ? <Target size={20} /> : <LayoutDashboard size={20} />}
            {activeView === 'dashboard' ? 'Visual Align' : 'Back to Dashboard'}
          </button>
        </div>

        {activeView === 'dashboard' ? (
          <>
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard icon={<LayoutDashboard size={24}/>} label="ທັງໝົດ" value={submissions.length}
            color="#38BDF8" bg="rgba(56,189,248,0.1)" />
          <StatCard icon={<Clock size={24}/>} label="ລໍຖ້າ" value={pending}
            color="#F59E0B" bg="rgba(245,158,11,0.1)" />
          <StatCard icon={<CheckCircle size={24}/>} label="ສຳເລັດ" value={completed}
            color="#10B981" bg="rgba(16,185,129,0.1)" />
        </div>

        {/* ── Filters ── */}
        <div className="bg-[#0F172A] rounded-[20px] border border-[#1E293B] shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 filter-input">
            <AutoComplete
              className="w-full h-[46px]"
              options={searchOptions.filter(opt => {
                if (!searchDept) return true;
                // Only show names that appear in submissions for the selected dept
                return submissions.some(sub => 
                  (sub.dep_name || sub.department || "ອື່ນໆ") === searchDept && 
                  (getDisplayName(sub) === opt.value || sub.id === opt.value)
                );
              })}
              onSelect={setSearchName}
              onSearch={setSearchName}
              value={searchName}
              filterOption={(inputValue, option) =>
                option?.value.toString().toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
              }
            >
              <Input
                prefix={<Search size={16} className="text-slate-400"/>}
                placeholder="ຄົ້ນຫາຊື່ ຫຼື ID..."
                size="large"
                style={{ borderRadius: 14, height: 46 }}
              />
            </AutoComplete>
            <DatePicker
              className="w-full"
              onChange={(_, s) => setSearchDate(s as string)}
              size="large"
              placeholder="ເລືອກວັນທີ"
              style={{ borderRadius: 14, height: 46 }}
            />
            <Select
              placeholder="ທຸກພະແນກ"
              className="w-full"
              size="large"
              onChange={setSearchDept}
              value={searchDept}
              style={{ borderRadius: 14, height: 46 }}
              options={[
                { value: '', label: '🏢 ທຸກພະແນກ' },
                ...uniqueDepts.map(d => ({ value: d, label: d }))
              ]}
            />
          </div>
        </div>

        {/* ── Original Table ── */}
        <div className="bg-[#0F172A] rounded-[20px] border border-[#1E293B] shadow-lg overflow-hidden admin-table">
          <div className="px-6 py-5 border-b border-[#1E293B] flex items-center justify-between">
            <span className="font-black text-[#F8FAFC]">ລາຍການທັງໝົດ</span>
            <span className="text-sm text-slate-500 font-bold">{filtered.length} ລາຍການ</span>
          </div>
          <Table
            dataSource={filtered}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 15, showSizeChanger: false, showTotal: (t) => `ທັງໝົດ ${t} ລາຍການ` }}
            columns={[
              {
                title: 'ຮູບແບບ',
                dataIndex: 'formId',
                width: 110,
                render: (t: string) => (
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-blue-500/10 text-[#38BDF8]">{t}</span>
                )
              },
              {
                title: 'ຊື່ພະນັກງານ',
                render: (_: any, r: Submission) => (
                  <span className="font-semibold text-[#F8FAFC]">
                    {getDisplayName(r)}
                  </span>
                )
              },
              {
                title: 'ພະແນກ',
                render: (_: any, r: Submission) => (
                  <span className="text-slate-500 text-sm">{r.dep_name || r.department || "—"}</span>
                )
              },
              {
                title: 'ວັນທີ',
                render: (_: any, r: Submission) => (
                  <span className="text-slate-400 text-sm font-medium">{formatDate(r.createdAt || r.submittedAt)}</span>
                )
              },
              {
                title: 'ສະຖານະ',
                dataIndex: 'status',
                width: 120,
                render: (s: string) => (
                  <Tag
                    style={{
                      borderRadius: 99, fontWeight: 800, fontSize: 10, textTransform: 'uppercase',
                      letterSpacing: '.05em', border: 'none', padding: '4px 12px',
                      background: s === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      color: s === 'completed' ? '#10B981' : '#F59E0B',
                    }}
                  >
                    {s === 'completed' ? '✓ ສຳເລັດ' : '● ລໍຖ້າ'}
                  </Tag>
                )
              },
              {
                title: '',
                width: 160,
                render: (_: any, r: Submission) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedSub(r); setIsModalOpen(true); setIsEditing(false); }}
                      className="p-2 rounded-xl text-slate-400 hover:text-[#38BDF8] hover:bg-blue-500/10 transition-all"
                      title="ເບິ່ງລາຍລະອຽດ"
                    >
                      <Eye size={17} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleExportPDF(r); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-all"
                    >
                      <Download size={13} /> DOWNLOAD
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}
                      className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      title="ລົບ"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                )
              }
            ]}
          />
        </div>

      {/* ── Detail Modal ── */}
      <Modal
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setIsEditing(false); }}
        width={720}
        centered
        footer={null}
        style={{ borderRadius: 24, overflow: 'hidden' }}
        styles={{ body: { padding: 0, background: '#0F172A' } }}
      >
        {selectedSub && (
          <div>
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-[#1E293B] flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #020617, #0F172A)" }}>
              <div>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">ລາຍລະອຽດຄຳຮ້ອງ</div>
                <h3 className="text-xl font-black text-[#0F172A]">
                  {getDisplayName(selectedSub)}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-blue-100 text-[#0050A0]">
                    {selectedSub.formId}
                  </span>
                  <span className="text-xs text-slate-400">{formatDate(selectedSub.createdAt)}</span>
                </div>
              </div>
              <Tag
                style={{
                  borderRadius: 99, fontWeight: 800, fontSize: 12, border: 'none', padding: '6px 16px',
                  background: selectedSub.status === 'completed' ? '#ECFDF5' : '#FFFBEB',
                  color: selectedSub.status === 'completed' ? '#059669' : '#D97706',
                }}
              >
                {selectedSub.status === 'completed' ? '✓ ສຳເລັດ' : '● ລໍຖ້າ'}
              </Tag>
            </div>

            {/* Form fields */}
            <div className="px-8 py-6 max-h-[50vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(selectedSub.formData || {}).map(([key, value]) => {
                  const field = formsConfig[selectedSub.formId]?.fields.find(f => f.id === key);
                  return (
                    <div key={key} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                        {field?.label || key}
                      </div>
                      {isEditing ? (
                        <input
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-[#0F172A] outline-none focus:border-[#0050A0] focus:ring-2 focus:ring-blue-100"
                          value={editData[key] ?? ""}
                          onChange={e => setEditData({ ...editData, [key]: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-semibold text-[#0F172A] break-words">
                          {String(value) || <span className="text-slate-300">—</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/60">
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedSub.id, 'pending')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${selectedSub.status !== 'completed' ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                  ● ລໍຖ້າ
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedSub.id, 'completed')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${selectedSub.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                  ✓ ສຳເລັດ
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setIsModalOpen(false); setIsEditing(false); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-100 transition-all"
                >
                  ປິດ
                </button>
                {!isEditing ? (
                  <button
                    onClick={() => { setIsEditing(true); setEditData(selectedSub.formData || {}); }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-bold hover:bg-slate-700 transition-all"
                  >
                    ✏️ ແກ້ໄຂ
                  </button>
                ) : (
                  <button
                    onClick={handleSaveEdit}
                    className="px-5 py-2.5 rounded-xl bg-[#0050A0] text-white text-sm font-bold hover:bg-[#003C78] transition-all"
                  >
                    💾 ບັນທຶກ
                  </button>
                )}
                <button
                  onClick={() => handleExportPDF(selectedSub)}
                  disabled={isEditing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0050A0] text-white text-sm font-bold hover:bg-[#003C78] transition-all disabled:opacity-40"
                >
                  <Download size={15} /> DOWNLOAD PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
          </>
        ) : (
          <AlignmentTool />
        )}
      </main>
      </div>
    </ConfigProvider>
  );
}