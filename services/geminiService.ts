
import { GoogleGenAI, Type } from "@google/genai";
import { LoanData } from "../types";

const LOAN_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    lenderName: { type: Type.STRING, description: "Name of the financial institution" },
    loanType: { type: Type.STRING, description: "Type of loan (Mortgage, Personal, Auto, etc.)" },
    principalAmount: { type: Type.NUMBER, description: "Total loan amount" },
    interestRate: { type: Type.NUMBER, description: "Annual interest rate percentage" },
    tenureMonths: { type: Type.NUMBER, description: "Loan duration in months" },
    startDate: { type: Type.STRING, description: "Loan start date (YYYY-MM-DD)" },
    nextPaymentDate: { type: Type.STRING, description: "Next upcoming payment date" },
    monthlyPayment: { type: Type.NUMBER, description: "Monthly repayment amount" },
    totalPayable: { type: Type.NUMBER, description: "Total amount to be paid back over life of loan" },
    totalInterest: { type: Type.NUMBER, description: "Total interest cost" },
    riskScore: { type: Type.NUMBER, description: "Calculated risk score from 1-100 based on terms" },
    riskAnalysis: { type: Type.STRING, description: "Brief analysis of the loan risks or predatory terms" },
    keyClauses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of critical legal clauses (e.g., prepayment penalties)"
    },
    repaymentSchedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING },
          amount: { type: Type.NUMBER },
          principal: { type: Type.NUMBER },
          interest: { type: Type.NUMBER }
        }
      },
      description: "Estimated first 6 months of repayment schedule"
    }
  },
  required: [
    "lenderName", "loanType", "principalAmount", "interestRate", 
    "tenureMonths", "startDate", "monthlyPayment", "riskScore"
  ],
};

export async function analyzeLoanDocument(fileBase64: string, mimeType: string): Promise<LoanData> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze this loan document carefully. Extract all critical financial terms. 
    Look for interest rates, hidden fees, repayment schedules, and risk factors. 
    If specific dates are not found, estimate based on today's date (${new Date().toISOString().split('T')[0]}).
    Calculate the total payable and interest if not explicitly stated.
    Identify any risky clauses like high late fees or prepayment penalties.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { data: fileBase64, mimeType } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: LOAN_ANALYSIS_SCHEMA,
      },
    });

    const data = JSON.parse(response.text);
    return {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Active'
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze document. Please ensure it is a clear loan agreement.");
  }
}
