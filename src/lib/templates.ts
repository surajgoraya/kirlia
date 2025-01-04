const templates = {
  errors: {
    notAuthorized: `<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;">
                  <h1>Unauthorized.</h1>
                  <p>Please provide a key when accessing GIF endpoint.</p>
                </html>`,

    serverError: `<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;">
                  <h1>Something has gone terribly wrong.</h1>
                  <p>Something went wrong when rendering the GIF. Ensure that <code>/static/</code> folder has GIFs.</p>
                </html>`,
  },
};

export { templates };
