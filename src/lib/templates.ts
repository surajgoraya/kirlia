const templates = {
	errors: {
		notAuthorized: `<html style="font-family: sans-serif; margin: auto; padding: 4rem 4rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0; height: 4rem;"/>
                  <h1>Unauthorized.</h1>
                  <p>Please provide a key when accessing GIF endpoint.</p>
                </html>`,
		serverError: `<html style="font-family: sans-serif; margin: auto; padding: 4rem 4rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0; height: 4rem;"/>
                  <h1>Something has gone terribly wrong.</h1>
                  <p>Something went wrong when rendering the GIF. Ensure that <code>/static/</code> folder has GIFs.</p>
                </html>`,
		serviceUnavailable: `<html style="font-family: sans-serif; margin: auto; padding: 4rem 4rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0; height: 4rem;"/>
                  <h1>Service Unavailable.</h1>
                  <p>Woah! Looks like Kirlia is asleep. Please try again later once she's awake!</p>
                </html>`,
		notFound: `<html style="font-family: sans-serif; margin: auto; padding: 4rem 4rem;">
                  <img src="/kirlia-logo-dark.png" style="margin: 0 0 0 0; height: 4rem;"/>
                  <h1>Not Found.</h1>
                  <p>The page you're requesting could not be found. Sorry!</p>
                </html>`,
	},
};

export { templates };
