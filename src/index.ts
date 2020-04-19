// Express imports
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as ngrok from 'ngrok'
import * as config from 'config';
import { AddressInfo } from 'net';
import { intentApp } from './intents';

const expressApp = express();
expressApp.use(cors());
expressApp.use(morgan('dev'))
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.set('trust proxy', 1);

// set intents
expressApp.post('/', intentApp);

const appPort: number = config.get<number>('server.port') || 3200;
const useNgrok: boolean = config.get<boolean>('server.useNgrok') || false;

const expressServer = expressApp.listen(appPort, async () => {
    const server = expressServer.address() as AddressInfo
    const { address, port } = server

    console.log(`Smart home server listening at ${address}:${port}`)

    if (useNgrok) {
        try {
            const url = await ngrok.connect(appPort)
            console.log('')
            console.log('COPY & PASTE NGROK URL BELOW')
            console.log(url)
            console.log('')
            console.log('=====')

            // console.log('Visit the Actions on Google console at http://console.actions.google.com')
            // console.log('Replace the webhook URL in the Actions section with:')
            // console.log('    ' + url + '/smarthome')

            // console.log('')
            // console.log('In the console, set the Authorization URL to:')
            // console.log('    ' + url + '/fakeauth')

            // console.log('')
            // console.log('Then set the Token URL to:')
            // console.log('    ' + url + '/faketoken')
            // console.log('')

            console.log('Finally press the \'TEST DRAFT\' button');
        } catch (err) {
            console.error('Ngrok was unable to start');
            console.error(err);
            process.exit();
        }
    }
})