import { PubSub, Topic, Subscription, Message } from '@google-cloud/pubsub'
import { ShellMessage, ShellEvent } from './messages'
import { Payload } from './payloads'
import path from 'path'
export type ShellTopic = 'Account' | 'SampleTopic'

export type EventHandler = Partial<
  {
    [key in ShellEvent]: (payload: Payload) => void
  }
>
export type ShellSubscription = string

interface MessageBus {
  subscribe: (topic: ShellTopic, messageHandler: EventHandler, subscription?: ShellSubscription) => Promise<void>
  publish: (topic: ShellTopic, message: ShellMessage) => Promise<void>
}

export function createMessageBus(): MessageBus {
  const cachedTopics: Map<string, Topic> = new Map()
  const cachedShellSubscription: Map<string, Subscription> = new Map()

  const pubSub = new PubSub({
    projectId: process.env.PROJECT_ID,
    keyFilename: path.join(__dirname, '/../../pubsub.json'),
  })
  const nameParser = (name: string): string => name.substring(name.lastIndexOf('/') + 1)

  /**
   * Wrapper around third party library that retrives topic or creates new topic
   */
  const createTopic = async (topicName: ShellTopic): Promise<Topic> => {
    try {
      if (!cachedTopics.has(topicName)) {
        const [topics] = await pubSub.getTopics()
        topics.forEach(t => {
          cachedTopics.set(nameParser(t.name), t)
        })
      }
      if (!cachedTopics.has(topicName)) {
        const [theTopic] = await pubSub.createTopic(topicName)
        cachedTopics.set(nameParser(theTopic.name), theTopic)
      }
      return cachedTopics.get(topicName)!
    } catch (err) {
      const error = `Failed to retrieve topic ${topicName} - ${err.message}`
      console.log(error)
      throw new Error(error)
    }
  }

  /**
   * Wrapper around third party library that retrives subscription or creates a new subscription
   */
  const createSubscription = async (topic: Topic, subscriptionName: ShellSubscription): Promise<Subscription> => {
    try {
      if (!cachedShellSubscription.has(subscriptionName)) {
        const [subs] = await pubSub.getSubscriptions()
        subs.forEach(s => cachedShellSubscription.set(nameParser(s.name), s))
      }
      if (!cachedShellSubscription.has(subscriptionName)) {
        const [sub] = await topic.createSubscription(subscriptionName)
        cachedShellSubscription.set(nameParser(sub.name), sub)
      }
      return cachedShellSubscription.get(subscriptionName)!
    } catch (err) {
      const error = `Failed to retrieve/create subscription ${subscriptionName} - ${err.message}`
      console.log(error)
      throw new Error(error)
    }
  }

  return {
    publish: async (topic: ShellTopic, message: ShellMessage): Promise<any> => {
      const t = await createTopic(topic)
      const m = Buffer.from(JSON.stringify(message))
      await t.publish(m)
    },
    subscribe: async (
      topic: ShellTopic,
      messageHandler: EventHandler,
      subscription: ShellSubscription = process.env.MICROSERVICE_NAME + '',
    ): Promise<any> => {
      const t = await createTopic(topic)
      const sub = await createSubscription(t, subscription)

      sub.on('error', (err: any) => {
        console.log('error - ', err.message)
      })
      sub.on('close', () => {
        console.log('connection closed')
      })
      sub.on('message', (message: Message) => {
        const data = message.data.toString()
        const obj: ShellMessage = JSON.parse(data)
        messageHandler[obj.type]!(obj.payload)
        message.ack()
      })
    },
  }
}
