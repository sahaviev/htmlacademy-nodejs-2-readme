
export const LikeRequestMessage = {
  UserIdIsNotValid: 'User id is not valid',
} as const;

export const LikeResponseMessage = {
  LikesFound: 'Likes retrieved successfully',
  LikeCreated: 'Like created successfully',
  LikeDeleted: 'Like deleted successfully',
  PostNotFound: 'Post not found',
  UserAlreadyLikedThisPost: 'User already liked this post',
  UserDidntLikedThisPost: 'User didn\'t liked this post',
} as const;
