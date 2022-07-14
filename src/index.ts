import { FinchConnectOptions } from './types';
import { constructAuthUrl } from './utils';

export default class FinchConnect {
  static FINCH_CONNECT_IFRAME_ID = 'finch-connect-iframe';
  static BASE_FINCH_CONNECT_URI = 'https://connect.tryfinch.com';
  static DEFAULT_FINCH_REDIRECT_URI = 'https://tryfinch.com';
  static FINCH_AUTH_MESSAGE_NAME = 'finch-auth-message';

  options: FinchConnectOptions;
  iframe: HTMLIFrameElement | null;

  private constructor(options: FinchConnectOptions) {
    this.options = options;
    this.iframe = this.createAndAttachIFrame();

    this.attachEventListener();
  }

  private createAndAttachIFrame() {
    const iframe = document.createElement('iframe');
    iframe.id = FinchConnect.FINCH_CONNECT_IFRAME_ID;
    iframe.src = constructAuthUrl(
      FinchConnect.BASE_FINCH_CONNECT_URI,
      FinchConnect.DEFAULT_FINCH_REDIRECT_URI,
      this.options);

    iframe.style.visibility = 'hidden';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = '999';
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.top = '0';
    iframe.style.backgroundColor = 'none transparent';
    iframe.style.border = 'none';

    document.body.prepend(iframe);
    return iframe;
  }

  private attachEventListener() {
    window.addEventListener('message', this.handleFinchAuth.bind(this));
  }

  private removeEventListener() {
    window.removeEventListener('message', this.handleFinchAuth);
  }

  private handleFinchAuth(event: MessageEvent) {
    const handleFinchAuthSuccess = (code: string) => this.options.onSuccess({ code });
    const handleFinchAuthError = (error: string) => this.options.onError({ errorMessage: error });
    const handleFinchAuthClose = () => this.options.onClose();

    if (!event.data) return;
    if (event.data.name !== FinchConnect.FINCH_AUTH_MESSAGE_NAME) return;
    if (!event.origin.startsWith(FinchConnect.BASE_FINCH_CONNECT_URI)) return;

    const { code, error, closed } = event.data;

    this.close();
    if (code) handleFinchAuthSuccess(code);
    else if (error) handleFinchAuthError(error);
    else if (closed) handleFinchAuthClose();
  }

  static initialize(options: Partial<FinchConnectOptions> = {}) {
    const mergedOptions = {
      clientId: '',
      products: [],
      sandbox: false,
      manual: false,
      onSuccess: () => ({}),
      onError: () => ({}),
      onClose: () => ({}),
      ...options
    }

    return new FinchConnect(mergedOptions);
  }

  open() {
    if (this.iframe) {
      this.iframe.style.visibility = 'visible';
    }
  }

  close() {
    if (this.iframe) {
      this.iframe.style.visibility = 'hidden';
      // force reloading iframe to be on the front page when open next time
      // eslint-disable-next-line no-self-assign
      this.iframe.src = this.iframe.src;
    }
  }

  destroy() {
    if (this.iframe) {
      this.iframe.parentNode?.removeChild(this.iframe);
      this.iframe = null;
    }

    this.removeEventListener();
  }
}
