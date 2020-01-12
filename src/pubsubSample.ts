import { createMessageBus } from './pubsub/pubSub'
import eventHandler from './pubsub/eventHandlers/Account'

const messageBus = createMessageBus()

messageBus.subscribe('Account', eventHandler)

messageBus.publish('Account', {
  type: 'AccountCreated',
  payload: {
    firstName: 'tom',
    lastName: 'name',
    email: 'email@email.com',
    userId: '1234',
  },
})
