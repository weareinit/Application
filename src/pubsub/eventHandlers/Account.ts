import { Payload } from 'pubsub/payloads'

export default {
  AccountCreated: (payload: Payload): void => {
    console.log('accountCreated handler', payload)
  },
  AccountPasswordChangeRequest: (payload: Payload): void => {
    console.log(' account password change handler', payload)
  },
}
