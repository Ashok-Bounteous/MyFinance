export interface Transaction {
    id?: string;
    accountId: string;
    transactionDate: string;
    transactionType: string; // 'income', 'expense', 'transfer', 'investment', 'savings', 'debt payment'
    category: string;
    amount: number;
    description?: string;
    tags?: string[];
    recurring?: boolean;
    status: string; // 'Pending', 'Completed', 'Failed'
  }
  