import api from "../api/axios";

export interface FinanceCard {
  id: number;
  client_id: string;
  card_name: string;
  status: string;
  created_at: string;
}

export interface CardWithBalance {
  id: number;
  client_id: string;
  card_name: string;
  status: string;
  initial_balance: number;
  current_balance: number;
  created_at: string;
}

export interface FinancialTransaction {
  id: number;
  client_id: string;
  card_id: number;
  type: string;
  amount: number;
  description: string;
  date: string;
}

export interface RealtimeBalance {
  month: string;
  total_income: number;
  total_expense: number;
  balance: number;
  details: any[];
}

export interface MonthlyBalance {
  month: string;
  total_income: number;
  total_expense: number;
  balance: number;
  closed_at: string;
}

export interface MonthlyRecapReport {
  client_id: string;
  month: string;
  opening_balance: number;
  total_income: number;
  total_expense: number;
  closing_balance: number;
  transactions: FinancialTransaction[];
}

export interface TenantFeature {
  id: number;
  client_id: string;
  feature_key: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Cards API
export const financeCardsApi = {
  getAll: () => api.get<CardWithBalance[]>("/tenant/finance/cards"),  
  getAllWithBalance: () => api.get<CardWithBalance[]>("/tenant/finance/cards"),
  create: (data: { card_name: string }) =>
    api.post<FinanceCard>("/tenant/finance/cards", data),
  update: (id: number, data: { card_name?: string; status?: string }) =>
    api.put<FinanceCard>(`/tenant/finance/cards/${id}`, data),
  delete: (id: number) => api.delete(`/tenant/finance/cards/${id}`),
};

// Transactions API
export const financeTransactionsApi = {
  getByMonth: (month: string) =>
    api.get<FinancialTransaction[]>(
      `/tenant/finance/transactions?month=${month}`,
    ),
  create: (data: {
    card_name: string;
    type: string;
    amount: number;
    description?: string;
  }) => api.post<FinancialTransaction>("/tenant/finance/transactions", data),
  update: (
    id: number,
    data: { type?: string; amount?: number; description?: string },
  ) =>
    api.put<FinancialTransaction>(`/tenant/finance/transactions/${id}`, data),
  delete: (id: number, month?: string) =>
    api.delete(
      `/tenant/finance/transactions/${id}${month ? `?month=${month}` : ""}`,
    ),
};

// Balance API
export const financeBalanceApi = {
  getRealtime: (month?: string) =>
    api.get<RealtimeBalance>(
      `/tenant/finance/balance/realtime${month ? `?month=${month}` : ""}`,
    ),
  getMonthlyList: () =>
    api.get<MonthlyBalance[]>("/tenant/finance/balance/monthly"),
  closeMonth: (data: { month: string }) =>
    api.post<MonthlyBalance>("/tenant/finance/balance/close-month", data),
};

// Report API
export const financeReportApi = {
  getMonthlyDetail: (month: string) =>
    api.get<MonthlyRecapReport>(`/tenant/finance/report/${month}/detail`),
  exportMonthlyPDF: (month: string) =>
    api.get(`/tenant/finance/report/${month}/pdf`, {
      responseType: "blob",
    }),
};

// Features API
export const featuresApi = {
  getAll: (clientId: string) =>
    api.get<TenantFeature[]>(`/admin/features/${clientId}`),
  toggle: (clientId: string, featureKey: string, enabled: boolean) =>
    api.post("/admin/features/toggle", {
      client_id: clientId,
      feature_key: featureKey,
      enabled,
    }),
  delete: (clientId: string, featureKey: string) =>
    api.delete(`/admin/features/${clientId}/${featureKey}`),
};
