import AuthConf from '../auth/config';

/* globals gapi: false */
export default function initGapi() {

    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client.js?onload=handleClientLoad';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

    window.handleClientLoad = function() {
        gapi.client.setApiKey(AuthConf.apiKey);
    };

}
