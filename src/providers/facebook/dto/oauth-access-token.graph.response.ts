interface OauthAccessTokenResponseDto {
  access_token: string;
  token_type: string;
  expires_in?: number;
}

export type { OauthAccessTokenResponseDto };
