declare global {
    // need var to declare global value
    // eslint-disable-next-line no-var
    var SDK_VERSION: string | null;
}

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
