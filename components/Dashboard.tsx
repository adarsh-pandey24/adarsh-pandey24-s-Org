
import React from 'react';
import { LoanData } from '../types';

interface ProfileProps {
  loans: LoanData[];
  userName: string;
  userEmail: string;
}

const Profile: React.FC<ProfileProps> = ({ loans, userName, userEmail }) => {
  const totalDebt = loans.reduce((acc, l) => acc + l.principalAmount, 0);
  const avgInterest = loans.length > 0 ? loans.reduce((acc, l) => acc + l.interestRate, 0) / loans.length : 0;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -mr-8 -mt-8"></div>
        
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-xl shadow-emerald-500/20 shrink-0">
          {getInitials(userName || 'User')}
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{userName}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-bold uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
              {userEmail}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Identity Verified
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Account Meta</h3>
            <div className="space-y-4">
              <DetailRow label="Role" value="Borrower" />
              <DetailRow label="Member Since" value={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
              <DetailRow label="Security" value="MFA Enabled" />
              <DetailRow label="Region" value="North America" />
            </div>
          </div>
        </div>

        {/* Financial Footprint / Loan Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Financial Summary</h3>
              <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold">LIVE DATA</div>
            </div>

            {loans.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-1H11.401M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">No Active Commitments</h4>
                <p className="text-sm text-slate-500 max-w-xs mb-6">Your debt profile is currently clear. Upload a loan document to begin tracking terms.</p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Debt</p>
                    <p className="text-lg font-black text-slate-300">$0.00</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Rate</p>
                    <p className="text-lg font-black text-slate-300">0.0%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Outstanding</p>
                    <p className="text-3xl font-black text-slate-900">${totalDebt.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600/70 mt-2 font-medium">Aggregated principal from {loans.length} loans</p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Weighted Interest</p>
                    <p className="text-3xl font-black text-slate-900">{avgInterest.toFixed(2)}%</p>
                    <p className="text-xs text-blue-600/70 mt-2 font-medium">Average across your active portfolio</p>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-slate-800 mb-4">Latest Portfolio Update</h4>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-lg text-xs font-bold">
                        {loans[0].lenderName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{loans[0].lenderName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{loans[0].loanType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">${loans[0].principalAmount.toLocaleString()}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase">ADDED RECENTLY</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-sm font-bold text-slate-800">{value}</span>
  </div>
);

export default Profile;
