export interface createTransactionRequest {
    name: string;
    category: string;
    date: string;
    amount: Float64Array;
    recurring: boolean;
}
