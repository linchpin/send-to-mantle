const core   = require('@actions/core');
const axios  = require('axios');
const crypto = require('crypto');

/**
 * JSON Object for our Mantle Deployment Message
 * @type {object}
 */
let json = {};

/**
 * Post data to mantle
 *
 * @param message
 */
const sendData = ( data ) => {

    const mantleURI = core.getInput('mantle-install');

    if ( ! mantleURI ) {
        core.setFailed( 'No Mantle URI Passed' );
        return;
    }

    // Create our headers send both SHA1 (legacy) and SHA256

    // SHA 1
    const sha1_hmac     = crypto.createHmac( 'sha1', core.getInput( 'mantle-secret' ) );
          sha1_hmac.update(data);
    const sha1_data     = sha1_hmac.data();
    const sha1_string   = 'sha1=' + sha1_data.toString('hex');

    // SHA 256 (typically you'd want to use this one for validation)
    const sha256_hmac   = crypto.createHmac( 'sha256', core.getInput( 'mantle-secret' ) );
          sha256_hmac.update(data);
    const sha256_data   = sha256_hmac.data();
    const sha256_string = 'sha256=' + sha256_data.toString('hex');

    axios.post(
        mantleURI,
        data,
        {
            headers: {
                "content-type": 'application/json',
                "X-Hub-Signature": sha1_string,
                "X-Hub-Signature-256": sha256_string
            }
        })
        .then( function( response ) ) {
            // If everything posted properly send back our deployment's Post ID
            return response.data.post_id;
        }
        .catch(function (error) {
            core.setFailed(error);
        });
}

/**
 * most @actions toolkit packages have async methods
 * @return {Promise<void>}
 */
function run() {
    try {
        return sendData( core.getInput('mantle-payload') );
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
