export interface ApplicationSubmittedPayload {
  userId: string
  // rest of application payload data
}

export interface ApplicationAcceptedPayload {
  userId: string
  // rest of application payload data
}

export type ApplicationPayload = ApplicationSubmittedPayload | ApplicationAcceptedPayload
