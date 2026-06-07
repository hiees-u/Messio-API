type WebhooksVerificationQuery = {
  'hub.mode': string;
  'hub.verify_token': string;
  'hub.challenge': string;
};

export type WebhooksVerificationDto = WebhooksVerificationQuery;
