# Finch Connect JS

## Usage

`FinchConnect` can be loaded via script tag like so:
```html
<script src="https://prod-cdn.tryfinch.com/v1/connect.js"></script>
```

This exposes a global object, `FinchConnect`, with the interface described below.

### `initialize`

A static initializer which returns a `FinchConnect` instance.

**Input**

Parameter | Required | Description
---------|----------|---------
 `clientId` | true | Your `client_id`, a unique identifier for your application.
 `products` | true | An array of permissions your application is requesting access to. 
 `payrollProvider` | false | An optional parameter that allows you to bypass the provider selection screen by providing a valid provider `id`. 
 `sandbox` | false | An optional value that allows users to switch on the sandbox mode to login with fake credentials and test applications against mock data. 
 `manual` | false | An optional value which when set to true displays both Automated API and Assisted API providers on the selection screen.
 `onSuccess` | true | A handler function for when Finch Connect succeeds.
 `onError` | true | A handler function for when Finch Connect encounters an error.
 `onClose` | true | A handler function for when Finch Connect is closed.

**Returns**

`FinchConnect`

### Lifecycle methods

An instance of `FinchConnect` has the following lifecycle methods:

Method | Description
--------|--------
`open` | Opens the Finch Connect page.
`close` | Closes Finch Connect.
`destroy` | Removes the Finch Connect iframe and event listeners.

## Example

```html
<html>
  <head>
    <script src="https://prod-cdn.tryfinch.com/v1/connect.js"></script>
  </head>
  <body>
    <button id="connect-button">Open Finch Connect</button>
    <script>
      const button = document.getElementById('connect-button');
      const onSuccess = ({code}) => {
        // exchange code for access token via your server
      }
      const onError = ({ errorMessage }) => {
        console.error(errorMessage);
      }
      const onClose = () => {
        console.log('Connect closed');
      }
      const connect = FinchConnect.initialize({
        clientId: '<your-client-id>',
        products: ['company', 'directory', 'employment'],
        sandbox: false,
        manual: false,
        onSuccess,
        onError,
        onClose,
      });
      button.addEventListener('click', () => {
        connect.open();
      })
    </script>
  </body>
</html>

```

### Testing

Tests are written using Jest. To run tests, run the following command:

```
npm run test
```
