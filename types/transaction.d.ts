export default interface Transaction {
    status: boolean;
    txHash: string;
    from: string;
    to: string;
    unit: string;
    amount: number;
    transactionFee: number;
}