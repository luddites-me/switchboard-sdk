# Message Queue Architecture and Polling

The `protect-sdk-switchboard` provides message queueing functionality (via AWS SQS) in order to ensure a greater degree of reliability and architectural decoupling between the [NS8 Protect API](https://github.com/ns8inc/ns8-protect-api) and the merchant platform. There are currently two top-level functions that a merchant integration can use to improve the reliability of messaging back into to their platform.

## The Polling functions

### `GetPollUrl`

`GetPollUrl` returns an object containing a self-signed URL that you can use to poll for messages sent from the Protect API to your integration platorm's message queue. This call locates or creates an AWS SQS FIFO queue using a combination of the calling context's `stage` environment variable and the `merchantId`. The polling URL expires every 15 minutes, so an updated URL should be fetched before the expiration of that period or calls to that self-signed url will fail.

An integration should call out to the protect API with the aforementioned data to fetch the queue URL associated with its `merchantId`.

### `DeletePolledMessage`

This function should be called once a queue message has been processed. It receives an `event` payload that should include a receipt handle, taken from the message processed.  That receipt handle, in conjunction with the information required for the queue name, is then used to identify the message to be deleted.

If the message is not deleted, it will show up in the queue again after a configurable amount of time.
