import FinchConnect from "../src/index"

describe('FinchConnect', () => {
  let connect: FinchConnect;

  describe('initialize', () => {
    afterEach(() => {
      connect.destroy();
      document.getElementsByTagName('html')[0].innerHTML = '';
    });

    test('returns an instance of FinchConnect with no options passed', () => {
      connect = FinchConnect.initialize();

      expect(connect).toBeInstanceOf(FinchConnect);
    })

    test('returns an instance of FinchConnect when options are passed', () => {
      connect = FinchConnect.initialize({
        clientId: 'test-id',
        sandbox: false,
        manual: false,
        onClose: () => { console.log('closed!') }
      });

      expect(connect).toBeInstanceOf(FinchConnect);
    })

    test('sets up an iframe for rendering Connect', () => {
      connect = FinchConnect.initialize();

      expect(document.getElementsByTagName('iframe')).toHaveLength(1);
    })

    test('sets up an iframe that is not displayed', () => {
      connect = FinchConnect.initialize();
      const iframe = document.getElementsByTagName('iframe')[0];

      expect(iframe.style.display).toEqual('none');
    })

    test('sets up an iframe with a unique id', () => {
      connect = FinchConnect.initialize();
      const iframe = document.getElementById(FinchConnect.FINCH_CONNECT_IFRAME_ID);

      expect(iframe?.id).toEqual(FinchConnect.FINCH_CONNECT_IFRAME_ID);
    })

    test('sets up an iframe with a valid auth url', () => {
      connect = FinchConnect.initialize({
        clientId: 'client-id',
        products: ['company', 'directory', 'employment'],
        sandbox: false,
        manual: false,
      });
      const iframe = document.getElementById(FinchConnect.FINCH_CONNECT_IFRAME_ID) as HTMLIFrameElement;

      expect(iframe?.src).toEqual(
        `https://connect.tryfinch.com/authorize?client_id=client-id&products=company+directory+employment&app_type=spa&redirect_uri=https%3A%2F%2Ftryfinch.com&mode=employer`
      );
    })
  })

  describe('lifecycle methods', () => {
    let connect: FinchConnect;
    let iframe: HTMLIFrameElement;

    beforeEach(() => {
      connect = FinchConnect.initialize();
      iframe = document.getElementById(FinchConnect.FINCH_CONNECT_IFRAME_ID) as HTMLIFrameElement;
    });

    afterEach(() => {
      connect.destroy();
      document.getElementsByTagName('html')[0].innerHTML = '';
    });

    test('open toggles iframe display', () => {
      connect.open();

      expect(iframe.style.display).toEqual('');
    });
    test('close toggles iframe display', () => {
      connect.close();

      expect(iframe.style.display).toEqual('none');
    });

    test('destroy removes iframe element', () => {
      connect.destroy();

      expect(document.getElementById(FinchConnect.FINCH_CONNECT_IFRAME_ID)).toBeNull();
    })
  })
})
