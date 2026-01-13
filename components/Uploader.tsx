
import React, { useState } from 'react';
import { analyzeLoanDocument } from '../services/geminiService';
import { LoanData, AnalysisState } from '../types';

interface UploaderProps {
  onAnalysisComplete: (data: LoanData) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onAnalysisComplete }) => {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    error: null,
    data: null
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setState({ loading: true, error: null, data: null });

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        try {
          const analysis = await analyzeLoanDocument(base64, file.type);
          setState({ loading: false, error: null, data: analysis });
          onAnalysisComplete(analysis);
        } catch (err: any) {
          setState({ loading: false, error: err.message, data: null });
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setState({ loading: false, error: "Failed to read file.", data: null });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Upload Loan Document</h2>
        <p className="text-slate-500">Drop your mortgage, auto, or personal loan agreement here. Our AI will dissect the terms in seconds.</p>
      </div>

      <div className={`relative border-2 border-dashed rounded-3xl p-12 transition-all ${
        state.loading ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-emerald-400 bg-white'
      }`}>
        {state.loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-emerald-800">Analyzing Your Document...</p>
            <p className="text-sm text-emerald-600 animate-pulse">Scanning for hidden rates, clauses, and repayment dates.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <p className="text-slate-700 font-bold mb-2">Drag & drop files here</p>
            <p className="text-slate-400 text-sm mb-6">Support for PDF, JPG, and PNG (Max 10MB)</p>
            <label className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold cursor-pointer hover:bg-slate-800 transition-colors">
              Choose File
              <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleFileUpload} />
            </label>
          </div>
        )}
      </div>

      {state.error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span className="text-sm font-medium">{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeaturePoint icon="🔒" title="Secure Encryption" text="Bank-grade 256-bit encryption" />
        <FeaturePoint icon="⚡" title="Instant Analysis" text="Gemini-powered processing" />
        <FeaturePoint icon="⚖️" title="Impartial Advice" text="Objective risk assessment" />
      </div>
    </div>
  );
};

const FeaturePoint: React.FC<{ icon: string; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="p-4 bg-white rounded-2xl border border-slate-100 text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <p className="text-sm font-bold text-slate-800">{title}</p>
    <p className="text-xs text-slate-500">{text}</p>
  </div>
);

export default Uploader;
