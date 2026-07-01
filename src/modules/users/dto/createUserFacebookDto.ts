/**
 * type create UserFacebook & UserAccessToken & PictureUserFacebook
 */
type CreateUserFacebookDto = {
  facebookId: string;
  name: string;
  email?: string;

  token: string;
  expiresAt: Date;

  url: string;
  height: number;
  width: number;
  isSilhouette: boolean;
};

export default CreateUserFacebookDto;
