
import React from 'react';
import { LoanData } from '../types';

interface PortfolioViewProps {
  loans: LoanData[];
  onSelectLoan: (loan: LoanData) => void;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ loans, onSelectLoan }) => {
  if (loans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Portfolio Registry Empty</h2>
        <p className="text-slate-500 max-w-sm mb-8">Digitize your loan agreements to see a unified view of your financial commitments.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Asset Registry</h3>
            <p className="text-sm text-slate-500">All analyzed financial agreements</p>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Filter loans..." 
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Lender & Type</th>
                <th className="px-8 py-5">Principal Amount</th>
                <th className="px-8 py-5">Annual Rate</th>
                <th className="px-8 py-5">Risk Matrix</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group" onClick={() => onSelectLoan(loan)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-slate-900/10">
                        {loan.lenderName.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900">{loan.lenderName}</span>
                        <span className="text-xs text-slate-400 font-medium">{loan.loanType}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">${loan.principalAmount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-extrabold">{loan.interestRate}%</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${loan.riskScore > 70 ? 'bg-red-500' : loan.riskScore > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{width: `${loan.riskScore}%`}}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{loan.riskScore < 30 ? 'Low' : loan.riskScore < 70 ? 'Med' : 'High'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="px-4 py-2 rounded-xl text-emerald-600 font-bold text-xs hover:bg-emerald-50 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
