export type WebhookVerificationRequestDto = {
  'hub.mode': string;
  'hub.verify_token': string;
  'hub.challenge': string;
};
