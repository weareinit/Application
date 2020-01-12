import { Envelope } from '../payloads/index'
import { ApplicationSubmittedPayload, ApplicationAcceptedPayload } from 'pubsub/payloads/Application'

export type ApplicationEvents = 'ApplicationSubmitted' | 'ApplicationAccepted'

export type ApplicationSubmittedMessage = Envelope<'ApplicationSubmitted', ApplicationSubmittedPayload>
export type ApplicationAcceptedMessage = Envelope<'ApplicationAccepted', ApplicationAcceptedPayload>

export type ApplicationMessage = ApplicationSubmittedMessage | ApplicationAcceptedMessage
