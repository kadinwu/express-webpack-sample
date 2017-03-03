import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import http from 'http';
import https from 'https';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import { match, RouterContext } from 'react-router';
import Main from '../shared/components/main';
import reducers from '../shared/reducers/index';
import routes from '../shared/routes';
import path from 'path';

const app = express();
const router = express.Router();
const httpPort = 3000;
const httpsPort = 3443;


app.use(express.static(path.join('./', 'public')));

app.get('/', function (req, res) {
	match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			// You can also check renderProps.components or renderProps.routes for
			// your "not found" component or route respectively, and send a 404 as
			// below, if you're using a catch-all route.

			const store = createStore(reducers, typeof window === 'object' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined);

			const html = renderToString(
				<Provider store={store}>
					<RouterContext {...renderProps} />
				</Provider>
			)

			const finalState = store.getState();
			res.status(200).send(renderFullPage(html, finalState));
		} else {
			res.status(404).send('Not found')
		}
	})
});

if (process.env.NODE_ENV === 'development') {
  //router.use('/graphiql', createGraphiqlHtml);
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack/webpack.config.js');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}
//app.use('/', router);
//app.use('/view/*', router);

function renderFullPage(html, preloadedState){
	 return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

const options = {
	key: fs.readFileSync('ssl/server-key.pem'),
	cert: fs.readFileSync('ssl/server-cert.pem')
}

http.createServer(app).listen(httpPort);
https.createServer(options, app).listen(httpsPort);
