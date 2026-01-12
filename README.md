# Kirlia

<div style="display: flex; align-items: center; flex-direction: column;">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./src/assets/kirlia-logo-light.png">
    <source media="(prefers-color-scheme: light)" srcset="./src/assets/kirlia-logo-dark.png">
    <img alt="Kirlia logo, a pixelated question mark with the letters 'KR' above it." src="/src/assets/kirlia-logo-dark.png">
  </picture>
  <p>(Kirlia logo, a pixelated question mark with the letters "KR" above it.)</p>
</div>

Kirlia is a microservice which serves a random image from a folder of images when requested. This thing is of course, completely useless with very few use cases, but I had one so here we are.

Yes, Kirlia is named after [the Pokemon](<https://bulbapedia.bulbagarden.net/wiki/Kirlia_(Pok%C3%A9mon)>).

# Set Up

Kirlia is extremely bare bones and does not use a web interface for setup. Everything is setup manually prior to starting the server. In the future this may change.

## Dependencies

- Node ^20.9

## Steps

- Create .env file by using the following command: `cp .env.schema .env`
  ```bash
    # The port which the application will run on, defaults to 3000 if none is specified.
    PORT=

    # REQUIRED: The key(s) used when requesting resources. A basically useless security feature, but helps me feel better.
    # ex: test,test2,test3
    KEY=

    # Enable logging of all requests, defaults to false.
    ACCESS_LOG=false

    # REQUIRED: The CORS policy governing the assets. Can be one of the following (strictest to lax): same-origin, same-site, cross-origin
    CORS_POLICY=same-site

    # Is behind a proxy, defaults to false.
    IS_PROXIED=true
  ```

- Install dependencies: `npm i`

- Add your desired image files in `./static`

- Run the server: `npm start`

# Requests, URLs, and other bits

- `/?key={your key}`: This URL serves a random (gif) image file from `/static`, as long as your `key` matches whats in the .env file.
  - Will return a `500` if something went wrong with getting an image.
  - Will return a `403` if you provide no key or the wrong key.
- `/health`: Will return a JSON response with the following
  - `status`: always `alive` when the server is online.
  - `GIFs`: The number of GIFs in the static folder.
  - `appVersion`: The version of the application.
