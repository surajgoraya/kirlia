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

  - Set `PORT` to your desired port (defaults to 3000).
  - Set `KEY` to a randomized key value you'll use when sending requests. More on that below.
  - Set your CORS policy, `same-site` is recommend as it allows you to host this service on one domain, and call it on another. `cross-origin` is the most lax, but will allow your resources to be used internet wide. Not just on your domain.
  - If you're running behind a proxy, be sure to set `IS_PROXIED=true`

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
