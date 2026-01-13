
import React, { useState } from 'react';
import Layout from './components/Layout';
import ProfileView from './components/Dashboard'; // Note: Reusing file name but it's now the Profile component
import PortfolioView from './components/PortfolioView';
import Uploader from './components/Uploader';
import AnalysisView from './components/AnalysisView';
import Login from './components/Login';
import { LoanData } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loans, setLoans] = useState<LoanData[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);

  const handleLogin = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleAnalysisComplete = (newLoan: LoanData) => {
    setLoans(prev => [newLoan, ...prev]);
    setSelectedLoan(newLoan);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (selectedLoan) {
      return (
        <AnalysisView 
          loan={selectedLoan} 
          onBack={() => setSelectedLoan(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'profile':
        return <ProfileView loans={loans} userName={userName} userEmail={userEmail} />;
      case 'portfolio':
        return <PortfolioView loans={loans} onSelectLoan={setSelectedLoan} />;
      case 'upload':
        return <Uploader onAnalysisComplete={handleAnalysisComplete} />;
      case 'risk':
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Security Watchdog</h3>
            <p className="text-slate-500 max-w-xs px-4">Our AI is continuously scanning for clause changes or market risks. All systems normal.</p>
          </div>
        );
      default:
        return <ProfileView loans={loans} userName={userName} userEmail={userEmail} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      userName={userName}
      userEmail={userEmail}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
