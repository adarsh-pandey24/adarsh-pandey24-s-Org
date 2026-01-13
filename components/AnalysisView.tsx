
import React from 'react';
import { LoanData } from '../types';

interface AnalysisViewProps {
  loan: LoanData;
  onBack: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ loan, onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-5xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to Overview
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Key Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{loan.lenderName}</h2>
                <p className="text-slate-500">{loan.loanType} Agreement</p>
              </div>
              <div className="text-right">
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold border inline-block ${
                  loan.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                }`}>
                  {loan.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-50">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Principal</p>
                <p className="text-xl font-bold text-slate-900">${loan.principalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Interest Rate</p>
                <p className="text-xl font-bold text-emerald-600">{loan.interestRate}%</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tenure</p>
                <p className="text-xl font-bold text-slate-900">{loan.tenureMonths} Mo</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Cost</p>
                <p className="text-xl font-bold text-slate-900">${loan.monthlyPayment.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Risk & Clarity Analysis</h3>
              <div className={`p-4 rounded-2xl mb-4 flex gap-4 items-start ${
                loan.riskScore > 70 ? 'bg-red-50 border border-red-100' : 
                loan.riskScore > 30 ? 'bg-amber-50 border border-amber-100' : 'bg-emerald-50 border border-emerald-100'
              }`}>
                <div className={`p-2 rounded-xl shrink-0 ${
                  loan.riskScore > 70 ? 'bg-red-100 text-red-600' : 
                  loan.riskScore > 30 ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Risk Score: {loan.riskScore}/100</p>
                  <p className="text-slate-600 text-sm mt-1">{loan.riskAnalysis}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Key Terms & Clauses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loan.keyClauses.map((clause, idx) => (
                <div key={idx} className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="text-sm text-slate-700 leading-relaxed">{clause}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Repayment Schedule */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold mb-6">Repayment Breakdown</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Total Payable</span>
                <span className="text-white font-bold text-lg">${loan.totalPayable.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Interest Component</span>
                <span className="text-amber-400 font-bold">${loan.totalInterest.toLocaleString()}</span>
              </div>
              <div className="h-px bg-slate-800"></div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase">First 6 Months</p>
                {loan.repaymentSchedule.map((step, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div>
                      <p className="text-sm font-medium">{step.date}</p>
                      <p className="text-[10px] text-slate-500">P: ${step.principal} / I: ${step.interest}</p>
                    </div>
                    <span className="text-sm font-bold group-hover:text-emerald-400 transition-colors">${step.amount}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
