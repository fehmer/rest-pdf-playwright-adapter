# rest pdf playwright adapter

**Note:** Experimental, don't use this in production.

Provides a REST endpoint taking a HTML from the POST-body, call [Playwright](https://playwright.dev/) to create a PDF and returns it back.


## Running

Start the docker image `fehmer/rest-pdf-playwright-adapter:latest`. Pass the `PLAYWRIGHT_URL`   as environment variable.


You can use e.g. [browserless/chrome](https://github.com/browserless/chrome) and set the `PLAYWRIGHT_URL` to `ws://localhost:3000`.
