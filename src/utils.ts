import { FinchConnectOptions } from './types';

export const constructAuthUrl = (
    baseUrl: string,
    redirectUrl: string,
    finchConnectOptions: FinchConnectOptions): string => {
    const { clientId, payrollProvider, products, manual, sandbox } = finchConnectOptions;

    const authUrl = new URL(`${baseUrl}/authorize`);
    if (clientId) authUrl.searchParams.append('client_id', clientId);
    if (payrollProvider) authUrl.searchParams.append('payroll_provider', payrollProvider);
    authUrl.searchParams.append('products', products.join(' '));
    authUrl.searchParams.append('app_type', 'spa');
    authUrl.searchParams.append('redirect_uri', redirectUrl);
    authUrl.searchParams.append('mode', 'employer');
    if (manual) authUrl.searchParams.append('manual', String(manual));
    if (sandbox) authUrl.searchParams.append('sandbox', String(sandbox));

    return authUrl.href;
};
