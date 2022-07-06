import FinchConnect from "../src/index"

describe('FinchConnect', () => {
  describe('initialize', () => {
    afterEach(() => {
      document.getElementsByTagName('html')[0].innerHTML = '';
    });

    test('returns an instance of FinchConnect with no options passed', () => {
      const connect = FinchConnect.initialize();

      expect(connect).toBeInstanceOf(FinchConnect);
    })

    test('returns an instance of FinchConnect when options are passed', () => {
      const connect = FinchConnect.initialize({
        clientId: 'test-id',
        sandbox: false,
        manual: false,
        onClose: () => { console.log('closed!') }
      });

      expect(connect).toBeInstanceOf(FinchConnect);
    })

    test('sets up an iframe for rendering Connect', () => {
      const connect = FinchConnect.initialize();

      expect(document.getElementsByTagName('iframe')).toHaveLength(1);
    })

    test('sets up an iframe that is not displayed', () => {
      const connect = FinchConnect.initialize();
      const iframe = document.getElementsByTagName('iframe')[0];

      expect(iframe.style.display).toEqual('none');
    })

    test('sets up an iframe with a unique id', () => {
      const connect = FinchConnect.initialize();
      const iframe = document.getElementById(FinchConnect.FINCH_CONNECT_IFRAME_ID);

      expect(iframe?.id).toEqual(FinchConnect.FINCH_CONNECT_IFRAME_ID);
    })
  })

  describe('lifecycle methods', () => {
    let connect: FinchConnect;
    let iframe: HTMLElement;

    beforeEach(() => {
      connect = FinchConnect.initialize();
      iframe = document.getElementById(FinchConnect.FINCH_CONNECT_IFRAME_ID) as HTMLElement;
    });

    afterEach(() => {
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
