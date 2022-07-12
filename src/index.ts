type SuccessEvent = {
  code: string;
}

type ErrorEvent = {
  errorMessage: string;
}

type FinchConnectOptions = {
  clientId: string;
  products: string[];
  sandbox: boolean;
  manual: boolean;
  payrollProvider?: string;

  onSuccess: (e: SuccessEvent) => void;
  onError: (e: ErrorEvent) => void;
  onClose: () => void;
}

export default class FinchConnect {
  static FINCH_CONNECT_IFRAME_ID = 'finch-connect-iframe';

  options: FinchConnectOptions;
  iframe: HTMLIFrameElement | null;

  private constructor(options: FinchConnectOptions) {
    this.options = options;
    this.iframe = this.createAndAttachIFrame();
  }

  private createAndAttachIFrame() {
    const iframe = document.createElement('iframe');
    iframe.id = FinchConnect.FINCH_CONNECT_IFRAME_ID;
    iframe.style.display = 'none';
    document.body.prepend(iframe);
    return iframe;
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
      this.iframe.style.display = '';
    }
  }

  close() {
    if (this.iframe) {
      this.iframe.style.display = 'none';
    }
  }

  destroy() {
    if (this.iframe) {
      this.iframe.parentNode?.removeChild(this.iframe);
      this.iframe = null;
    }
  }
}
