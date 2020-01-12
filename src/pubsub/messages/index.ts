import { AccountEvents, AccountMessage } from './Account'
import { ApplicationEvents, ApplicationMessage } from './Application'

export type ShellEvent = AccountEvents | ApplicationEvents
export type ShellMessage = AccountMessage | ApplicationMessage
