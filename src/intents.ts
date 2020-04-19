import { dialogflow } from 'actions-on-google';

export const intentApp = dialogflow({
    debug: false,
});

intentApp.intent('Default Welcome Intent', (conv) => {
    conv.ask('Ciao, benvenuto su Test Nicola');
});

intentApp.intent('Default Fallback Intent', (conv) => {
    conv.ask(`Non ho capito, puoi ripetere?`)
});

intentApp.intent('exit_intent', conv => {
    conv.close(`A presto!!`);
});

intentApp.intent('nome', conv => {
    conv.ask(`Ciao ${conv.parameters['given-name']}`);
});