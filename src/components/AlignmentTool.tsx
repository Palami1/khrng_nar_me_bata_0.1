'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { formsConfig } from '@/lib/formsConfig';
import { generateLaosPDF } from '@/lib/pdf-service';
import { Target, Move, ChevronRight, ChevronLeft, Copy, Eye, Ruler, Loader2 } from 'lucide-react';

// A4 proportions in points (72dpi)
const A4_WIDTH_PTS = 595;
const A4_HEIGHT_PTS = 842;
const DEFAULT_SCALE = 0.8;

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function AlignmentTool() {
  const [selectedFormId, setSelectedFormId] = useState('FORM_20');
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [localCoords, setLocalCoords] = useState<Record<string, { x: number, y: number }>>({});
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const config = formsConfig[selectedFormId];
  const fields = config.fields.filter(f => f.pageIndex === selectedPageIndex);

  // Initialize local coords from config
  useEffect(() => {
    const coords: Record<string, { x: number, y: number }> = {};
    config.fields.forEach(f => {
      coords[f.id] = { x: f.x, y: f.y };
    });
    setLocalCoords(coords);
  }, [selectedFormId, config.fields]);

  // Handle PDF Rendering
  useEffect(() => {
    if (!pdfLibLoaded || !window.pdfjsLib || !canvasRef.current) return;

    const renderPage = async () => {
      setIsRendering(true);
      try {
        const loadingTask = window.pdfjsLib.getDocument(config.templatePath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(selectedPageIndex + 1);
        
        const viewport = page.getViewport({ scale: DEFAULT_SCALE * zoom });
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
      } catch (err) {
        console.error("PDF Render Error:", err);
      } finally {
        setIsRendering(false);
      }
    };

    renderPage();
  }, [pdfLibLoaded, selectedFormId, selectedPageIndex, zoom, config.templatePath]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeFieldId || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const yPx = e.clientY - rect.top;

    // Convert pixels to PDF points
    // Note: Browser origin is top-left, PDF-lib origin is bottom-left
    const pdfX = Math.round(xPx / (DEFAULT_SCALE * zoom));
    const pdfY = Math.round((rect.height - yPx) / (DEFAULT_SCALE * zoom));

    setLocalCoords(prev => ({
      ...prev,
      [activeFieldId]: { x: pdfX, y: pdfY }
    }));
  };

  const handleNudge = (direction: 'up' | 'down' | 'left' | 'right', amount: number = 1) => {
    if (!activeFieldId) return;
    setLocalCoords(prev => {
      const current = prev[activeFieldId];
      if (!current) return prev;
      let { x, y } = current;
      if (direction === 'up') y += amount;
      if (direction === 'down') y -= amount;
      if (direction === 'left') x -= amount;
      if (direction === 'right') x += amount;
      return { ...prev, [activeFieldId]: { x, y } };
    });
  };

  const copyResult = () => {
    const output = Object.entries(localCoords)
      .map(([id, coords]) => `${id}: { x: ${coords.x}, y: ${coords.y} }`)
      .join(',\n');
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const handlePreview = async () => {
    const tempConfig = {
      ...config,
      fields: config.fields.map(f => ({
        ...f,
        x: localCoords[f.id]?.x ?? f.x,
        y: localCoords[f.id]?.y ?? f.y
      }))
    };

    const dummyData: any = {};
    config.fields.forEach(f => { dummyData[f.id] = (f.type === 'checkbox' ? true : "SAMPLE"); });

    const url = await generateLaosPDF(config.templatePath, dummyData, tempConfig);
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#020617] text-slate-200">
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        onLoad={() => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          setPdfLibLoaded(true);
        }}
      />

      {/* Header / Toolbar */}
      <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4 bg-[#0F172A]">
        <div className="flex items-center gap-4">
          <select 
            className="bg-[#020617] border border-[#1E293B] p-2 rounded-lg text-sm"
            value={selectedFormId}
            onChange={(e) => setSelectedFormId(e.target.value)}
          >
            {Object.keys(formsConfig).map(id => (
              <option key={id} value={id}>{id} - {formsConfig[id].name}</option>
            ))}
          </select>
          <div className="flex items-center bg-[#020617] rounded-lg border border-[#1E293B]">
             <button 
              onClick={() => setSelectedPageIndex(Math.max(0, selectedPageIndex - 1))}
              className="p-2 hover:bg-[#1E293B] rounded-l-lg"
             ><ChevronLeft size={16} /></button>
             <span className="px-3 text-xs font-bold border-x border-[#1E293B]">Page {selectedPageIndex + 1}</span>
             <button 
              onClick={() => setSelectedPageIndex(selectedPageIndex + 1)}
              className="p-2 hover:bg-[#1E293B] rounded-r-lg"
             ><ChevronRight size={16} /></button>
          </div>
          <div className="h-6 w-[1px] bg-[#1E293B]" />
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
              className="p-2 hover:bg-[#1E293B] rounded-lg"
            >-</button>
            <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button 
              onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
              className="p-2 hover:bg-[#1E293B] rounded-lg"
            >+</button>
          </div>
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg border transition-colors ${showGrid ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'border-[#1E293B] text-slate-400'}`}
          ><Ruler size={18} /></button>
          {isRendering && <Loader2 size={16} className="animate-spin text-blue-400" />}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePreview}
            className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] px-4 py-2 rounded-lg text-sm font-bold transition-all border border-[#1E293B]"
          ><Eye size={16} className="text-blue-400" /> Preview Test</button>
          <button 
            onClick={copyResult}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all"
          ><Copy size={16} /> Copy Coords</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Field List */}
        <div className="w-80 border-r border-[#1E293B] bg-[#0F172A] flex flex-col">
          <div className="p-4 border-b border-[#1E293B] bg-[#020617]/50">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest">Form Fields</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {fields.map(f => (
              <div 
                key={f.id}
                onClick={() => setActiveFieldId(f.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${activeFieldId === f.id ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' : 'border-transparent hover:bg-[#1E293B] text-slate-400'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold truncate max-w-[150px]">{f.label}</span>
                  <span className="text-[10px] font-mono opacity-50">{f.id}</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[10px] font-mono text-slate-500">
                  <span>X: {localCoords[f.id]?.x ?? f.x}</span>
                  <span>Y: {localCoords[f.id]?.y ?? f.y}</span>
                </div>
              </div>
            ))}
          </div>
          
          {activeFieldId && (
            <div className="p-4 border-t border-[#1E293B] bg-[#020617]/50 space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-400 uppercase">Coord Fine-Tune</span>
                 <Move size={14} className="text-slate-600" />
               </div>
               <div className="grid grid-cols-3 gap-2 place-items-center">
                  <div/>
                  <button onClick={() => handleNudge('up')} className="w-10 h-10 flex items-center justify-center bg-[#1E293B] rounded-lg hover:bg-[#334155] border border-[#334155]">↑</button>
                  <div/>
                  <button onClick={() => handleNudge('left')} className="w-10 h-10 flex items-center justify-center bg-[#1E293B] rounded-lg hover:bg-[#334155] border border-[#334155]">←</button>
                  <button onClick={() => setActiveFieldId(null)} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-lg border border-red-500/30">×</button>
                  <button onClick={() => handleNudge('right')} className="w-10 h-10 flex items-center justify-center bg-[#1E293B] rounded-lg hover:bg-[#334155] border border-[#334155]">→</button>
                  <div/>
                  <button onClick={() => handleNudge('down')} className="w-10 h-10 flex items-center justify-center bg-[#1E293B] rounded-lg hover:bg-[#334155] border border-[#334155]">↓</button>
                  <div/>
               </div>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div 
          className="flex-1 overflow-auto p-12 bg-[#020617] flex justify-center items-start scrollbar-hide select-none"
          onMouseMove={handleMouseMove}
        >
          <div 
            ref={containerRef}
            className="relative shadow-2xl origin-top transition-transform duration-200 bg-white"
            style={{ 
              width: A4_WIDTH_PTS * DEFAULT_SCALE * zoom, 
              height: A4_HEIGHT_PTS * DEFAULT_SCALE * zoom,
              backgroundImage: showGrid ? 'radial-gradient(#38BDF8 1px, transparent 1px)' : 'none',
              backgroundSize: `${20 * DEFAULT_SCALE * zoom}px ${20 * DEFAULT_SCALE * zoom}px`,
              backgroundPosition: 'center'
            }}
          >
            {/* PDF Canvas Background */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full"
            />

            {/* Field Markers */}
            {fields.map(f => {
              const coords = localCoords[f.id] || { x: f.x, y: f.y };
              const left = coords.x * DEFAULT_SCALE * zoom;
              const bottom = coords.y * DEFAULT_SCALE * zoom;
              
              return (
                <div 
                  key={f.id}
                  onClick={(e) => { e.stopPropagation(); setActiveFieldId(f.id); }}
                  className={`absolute group cursor-move ${activeFieldId === f.id ? 'z-50' : 'z-10'}`}
                  style={{ 
                    left, 
                    bottom,
                    transform: 'translate(-50%, 50%)'
                  }}
                >
                  <div className={`w-3 h-3 rounded-full border-2 transition-all ${activeFieldId === f.id ? 'bg-blue-500 border-white scale-125 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white border-blue-400 group-hover:scale-125'}`} />
                  
                  {/* Tooltip */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded bg-slate-900 border border-slate-800 shadow-xl pointer-events-none transition-all ${activeFieldId === f.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <div className="text-[10px] font-black text-white">{f.label}</div>
                    <div className="text-[9px] font-mono text-blue-400">({coords.x}, {coords.y})</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
