const templates = {
	errors: {
		notAuthorized: `<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0;"/>
                  <h1>Unauthorized.</h1>
                  <p>Please provide a key when accessing GIF endpoint.</p>
                </html>`,

		serverError: `<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0;"/>
                  <h1>Something has gone terribly wrong.</h1>
                  <p>Something went wrong when rendering the GIF. Ensure that <code>/static/</code> folder has GIFs.</p>
                </html>`,
		notFound: `<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0;"/>
                  <h1>Not Found.</h1>
                  <p>The page you're requesting could not be found. Sorry!</p>
                </html>`,
	},
};

export { templates };
