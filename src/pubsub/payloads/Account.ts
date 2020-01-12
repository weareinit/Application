export interface AccountCreatedPayload {
  firstName: string
  lastName: string
  email: string
  userId: string
}

export interface AccountPasswordChangeRequestPayload {
  firstName: string
  lastName: string
  email: string
  userId: string
}

export type AccountPayload = AccountCreatedPayload | AccountPasswordChangeRequestPayload
