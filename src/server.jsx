import feathers 	from 'feathers'
import { readFile } from 'fs'
import compression 	from 'compression'
import bodyParser 	from 'body-parser'

import CounterService from './services/counter'

const app = feathers();
const publicDir = __dirname + '/../public';

app
	.configure(
			feathers.primus(
					{ transformer: 'engine.io' },
					(primus) => primus.save( publicDir + '/primus.js' )
			)
	)
	.use( 'counter', CounterService )
	.use( compression() )
	.use( '/', feathers.static( publicDir ) )
	.use(
			(req, res) => {
				readFile(
						publicDir + 'index.html',
						(err, html) => res.end(html)
				)
			}
	)

;

export default app;