import React, { useState } from 'react';
import { formsConfig } from '@/lib/formsConfig';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast, Toaster } from 'react-hot-toast';
import { Send, CheckCircle, Download, FileText, Loader2 } from 'lucide-react';
import { generateLaosPDF } from '@/lib/pdf-service';

export default function DocSystem({ formId }: { formId: string }) {
  const config = formsConfig[formId];
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!config) return <div className="p-4 text-red-500 font-bold">❌ ບໍ່ພົບໂຄງສ້າງແບບຟອມ: {formId}</div>;

  const handleSubmit = async () => {
    // Check for essential fields
    const missingFields: string[] = [];
    config.fields.forEach(field => {
      if (field.required === true && !field.hidden) {
        const value = values[field.id];
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
          missingFields.push(field.label);
        }
      }
    });

    if (missingFields.length > 0) {
      toast.error(`ກະລຸນາກອກຂໍ້ມູນ: ${missingFields.join(', ')}`, { duration: 4000 });
      return;
    }

    setLoading(true);
    try {
      if (!db) throw new Error("Firebase ບໍ່ພ້ອມໃຊ້ງານ");

      // 1. Save to Firestore
      await addDoc(collection(db, 'submissions'), {
        formId: formId,
        formName: config.name,
        department: config.department,
        formData: values,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // 2. Automated PDF Download (Only for FORM_01)
      if (formId === 'FORM_01') {
        try {
          const pdfUrl = await generateLaosPDF(config.templatePath, values, config);
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = `ເອກະສານ_${config.name}_${new Date().getTime()}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("ສົ່ງຂໍ້ມູນ ແລະ ດາວໂຫລດ PDF ສຳເລັດ!");
        } catch (pdfErr) {
          console.error("PDF Download Error:", pdfErr);
          toast.error("ສົ່ງຂໍ້ມູນສຳເລັດ ແຕ່ບໍ່ສາມາດດາວໂຫລດ PDF ໄດ້");
        }
      } else {
        toast.success("ສົ່ງຄຳຮ້ອງສຳເລັດແລ້ວ!");
      }

      setSubmitted(true);
      setValues({}); 
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("ເກີດຂໍ້ຜິດພາດ: " + (error.message || "Error unknown"));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-16 bg-[#0F172A] rounded-[32px] font-lao border border-[#1E293B] text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 border-2 border-emerald-500/30">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">ສົ່ງຂໍ້ມູນສຳເລັດແລ້ວ!</h2>
        <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
          ຂອບໃຈສຳລັບການສົ່ງຂໍ້ມູນ. ລະບົບໄດ້ບັນທຶກຄຳຮ້ອງຂອງທ່ານເຂົ້າໃນລະບົບຮຽບຮ້ອຍແລ້ວ.
          {formId === 'FORM_01' && " ໄຟລ໌ PDF ໄດ້ຖືກດາວໂຫລດລົງເຄື່ອງຂອງທ່ານໂດຍອັດຕະໂນມັດ."}
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-4 bg-[#1E293B] border border-[#334155] rounded-2xl text-white font-black hover:bg-[#334155] transition-all flex items-center gap-3"
        >
          <ArrowLeft size={18} /> ກັບຄືນໜ້າຟອມ
        </button>
      </div>
    );
  }

  return (
    <div className="relative p-10 bg-[#0F172A] rounded-[32px] font-lao border border-[#1E293B] overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-[#020617]/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 bg-[#0F172A] p-10 rounded-[32px] border border-[#1E293B] shadow-2xl">
            <Loader2 size={48} className="text-[#38BDF8] animate-spin" />
            <div className="text-center">
              <h3 className="text-xl font-black text-white mb-1">ກຳລັງປະມວນຜົນ...</h3>
              <p className="text-slate-400 text-sm">ກະລຸນາລໍຖ້າຈັກຄາວ, ລະບົບກຳລັງບັນທຶກຂໍ້ມູນ</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-black mb-8 text-[#F8FAFC] border-b border-[#1E293B] pb-6 uppercase">
        {config.name}
      </h2>
      
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} 
        className="space-y-6"
      >
        <div className="space-y-12">
          {Object.entries(
            config.fields.filter(f => !f.hidden).reduce((groups, field) => {
              const section = field.section || "ຂໍ້ມູນທົ່ວໄປ";
              if (!groups[section]) groups[section] = [];
              groups[section].push(field);
              return groups;
            }, {} as Record<string, typeof config.fields>)
          ).map(([section, fields]) => (
            <div key={section} className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-black text-[#38BDF8] whitespace-nowrap">{section}</h3>
                <div className="h-[2px] w-full bg-[#1E293B] rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.id} className={`flex flex-col space-y-2 ${field.colSpan === 2 ? 'md:col-span-2' : ''}`}>
                    <label className="text-sm font-bold text-slate-400">
                      {field.label}
                      {field.required === true && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        className="bg-[#020617] border-2 border-[#1E293B] p-4 rounded-2xl focus:border-[#38BDF8] outline-none transition-all min-h-[120px] text-sm text-white placeholder:text-slate-700"
                        placeholder={field.placeholder || "ກະລຸນາກອກຂໍ້ມູນ..."}
                        value={values[field.id] || ""}
                        onChange={e => setValues({...values, [field.id]: e.target.value})}
                      />
                    ) : field.type === 'checkbox' ? (
                      <div 
                          className={`flex items-center gap-3 p-4 border-2 rounded-2xl transition-all cursor-pointer ${values[field.id] ? 'bg-blue-500/10 border-blue-500/50' : 'bg-[#020617] border-[#1E293B] hover:border-[#334155]'}`} 
                          onClick={() => setValues({...values, [field.id]: !values[field.id]})}
                      >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${values[field.id] ? 'bg-[#38BDF8]' : 'bg-[#1E293B]'}`}>
                            {values[field.id] && <CheckCircle size={16} className="text-white" />}
                          </div>
                          <span className={`text-sm font-bold ${values[field.id] ? 'text-[#38BDF8]' : 'text-slate-400'}`}>{field.label} (ແມ່ນ)</span>
                      </div>
                    ) : (
                      <input 
                        type={field.type}
                        className="bg-[#020617] border-2 border-[#1E293B] p-4 rounded-2xl focus:border-[#38BDF8] outline-none transition-all text-sm text-white placeholder:text-slate-700"
                        placeholder={field.placeholder || "ກະລຸນາປ້ອນ..."}
                        value={values[field.id] || ""}
                        onChange={e => setValues({...values, [field.id]: e.target.value})}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-[#1E293B] hover:bg-[#334155] text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-black/20 transition-all hover:scale-[1.01] active:scale-[0.98] mt-8 flex items-center justify-center gap-3 disabled:opacity-50 border border-[#1E293B]"
        >
          {loading ? (
            <>
              <Loader2 size={24} className="animate-spin text-[#38BDF8]" />
              ກຳລັງສົ່ງ...
            </>
          ) : (
            <>
              <Send size={20} className="text-[#38BDF8]" />
              ຢືນຢັນສົ່ງຄຳຮ້ອງ
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-wider mt-4">
            LTC WorkFlow System • Secure Data Submission
        </p>
      </form>
    </div>
  );
}

const ArrowLeft = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);
