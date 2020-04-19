import { dialogflow } from 'actions-on-google';

export const intentApp = dialogflow({
    debug: true,
});

intentApp.intent('Default Welcome Intent', (conv) => {
    // console.log(conv);
    conv.ask('Ciao, Come va?');
});

intentApp.intent('Default Fallback Intent', (conv) => {
    // console.log(conv);
    conv.ask(`Non ho capito, puoi ripetere?`)
});

// intentApp.intent('nome', conv => {
//     console.log(conv);
//     conv.ask('Ciao nome!');
// })