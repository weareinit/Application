import { ShellEvent } from '../messages'
import { AccountPayload } from './Account'
import { ApplicationPayload } from './Application'

export type Payload = AccountPayload | ApplicationPayload

export interface Envelope<S extends ShellEvent, P extends Payload> {
  type: S
  payload: P
}
