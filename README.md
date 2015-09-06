# FullSlate API wrapper

A simple [FullSlate](http://www.fullslate.com/) API wrapper written in JavaScript (ES6).

## Install

```sh
$ npm install fullslate
```

## Usage

To use this library, you will need a valid FullSlate API token and key. [Based off of the FAQ](http://support.fullslate.com/hc/en-us/articles/204901135-Does-Full-Slate-offer-an-API-), to obtain an API token you have to contact their support and the key is usually your FullSlate subdomain (e.g. **mycompany**.fullslate.com, ***mycompany*** would be your key).

All API requests return a Promise, Promise rejections will occur from API failures, missing tokens, and/or bad API calls. Not all API calls require an API token though, see the documentation below.

```js
import FullSlate from 'fullslate';

// Initialize the FullSlate wrapper
const fsapi = new FullSlate({
  key: 'Your_FullSlate_key'
  token: 'Your_FullSlate_API_token'
});

// Get a list of your employees
fsapi.employees()
  .then(employees => {
    console.log(employees);
  })
  .catch(err => {
    console.error(err);
  })
```

## Implemented APIs

* [X] Employees
* [X] Services
* [X] Openings
* [ ] Cross-realm Openings
* [X] Bookings
* [X] Clients
* [X] Events
* [X] Products
* [X] Vouchers
* [ ] Company Configuration

## API

### `employees([id])`
* `id` (Number) *optional* - If `id` provided, will limit returned employees detail to a single employee, if no `id` provided an array of employees will be returned.

### `services([id])`
* `id` (Number) *optional* - If `id` provided, will limit returned services to a single service, if no `id` provided an array of services will be returned.

### `openings(id[, options])`
* `id` (Number|Array) *required* - The service id or an array of services are required to get the openings
* `options` (Object) *optional* - See FullSlate API documentation for full options and, example options are `employees`, `before`, `after`, `window`, `range`

### `bookings(id)`
* `id` (Number) *required* - The booking id, which will return details of the booking

### `book(options)`
* `options` (Object) *required* - See FullSlate API documentation for full options and descriptions. The booking object at minimum must include `at`, `service`, `first_name`, and `last_name` and any additional requirements specified by the provider.

### ***Private Company Resource APIs***
The FullSlate API token must be defined for the following calls.

### `clients([id][, options])`
* `id` (Number) *optional* - If a `number` is specified, the library will assume it is a client `id` which will limit the response to the specific client `id`. If no `id` is specified, a full list of clients will be returned. This first parameter can also be an `object` which will return the full list of clients with the `object` acting as the `options`.
* `options` (Object) *optional* - See FullSlate API documentation for full options
* `options.include` (Array) *optional* - Additional fields to include in the response API, valid values include `emails`, `phone_numbers`, `addresses`, and `links`.

### `events([id][, options])`
* `id` (Number) *optional* - If a `number` is specified, the library will assume it is an event `id` which will limit the response to the specific event `id`. If no `id` is specified, a list of events will be returned. The first parameter can also be an `object` which will return the full list of events with the `object` acting as the `options`.
* `options` (Object) *optional* - See FullSlate API documentation for full options, date parameters must be in the format of `YYYY-MM-DD`.

### `products([id])`
* `id` (Number) *optional* - If `id` provided, will limit returned products to a single product, if no `id` provided an array of products will be returned.

### `vouchers([id])`
* `id` (Number) *optional* - If `id` provided, will limit returned vouchers to a single voucher, if no `id` provided an array of vouchers will be returned.

## Contributing

### Running tests

To run the test suite, you'll have to define your API key and token as an `export`:

#### OSX

```sh
$ export FULLSLATE_TOKEN=MY_TOKEN_123456
$ export FULLSLATE_KEY=MY_KEY
```

```sh
$ npm test
```

## TODO
* [ ] Clean up the code, it's not very DRY
* [ ] Implement `Cross-realm Openings` and `Company Configuration`
* [ ] Make more robust tests

## License
[MIT](LICENSE)