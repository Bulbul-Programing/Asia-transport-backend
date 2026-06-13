export type TDailyExpense = {
    id: string;
    date: Date;
    labourSalary: number;
    officeCost: number;
    carRent?: number | null;
    carNumber?: number | null;
    vanRepair?: number | null;
    mobileBill?: number | null;
    transportationCost?: number | null;
    managerSalary?: number | null;
    stationery?: number | null;
    securitySalary?: number | null;
    donation?: number | null;
    compensation?: number | null;
    bkashBill?: number | null;
    electricityBill?: number | null;
    officeRent?: number | null;
    misc?: number | null;
};

export type TPartyLes = {
    id: string;
    expenseId: string;
    TR: string;
    totalAmount: number;
    discountAmount: number;
    note: string;
};