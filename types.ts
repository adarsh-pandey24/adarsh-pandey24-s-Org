
export interface RepaymentStep {
  date: string;
  amount: number;
  principal: number;
  interest: number;
}

export interface LoanData {
  id: string;
  lenderName: string;
  loanType: string;
  principalAmount: number;
  interestRate: number;
  tenureMonths: number;
  startDate: string;
  nextPaymentDate: string;
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
  riskScore: number; // 1-100
  riskAnalysis: string;
  keyClauses: string[];
  repaymentSchedule: RepaymentStep[];
  status: 'Active' | 'Pending' | 'Review';
}

export interface AnalysisState {
  loading: boolean;
  error: string | null;
  data: LoanData | null;
}
