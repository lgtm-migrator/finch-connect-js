export type SuccessEvent = {
    code: string;
};
  
export type ErrorEvent = {
    errorMessage: string;
};
  
export type FinchConnectOptions = {
    clientId: string;
    products: string[];
    sandbox: boolean;
    manual: boolean;
    payrollProvider?: string;
  
    onSuccess: (e: SuccessEvent) => void;
    onError: (e: ErrorEvent) => void;
    onClose: () => void;
};