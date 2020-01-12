import { AccountCreatedPayload, AccountPasswordChangeRequestPayload } from '../payloads/Account'
import { Envelope } from '../payloads/index'

export type AccountEvents = 'AccountCreated' | 'AccountPasswordChangeRequest'

export type AccountCreatedMessage = Envelope<'AccountCreated', AccountCreatedPayload>
export type AccountPasswordChangeRequestMessage = Envelope<
  'AccountPasswordChangeRequest',
  AccountPasswordChangeRequestPayload
>

export type AccountMessage = AccountCreatedMessage | AccountPasswordChangeRequestMessage
