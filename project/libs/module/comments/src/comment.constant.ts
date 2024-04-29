
export const CommentRequestMessage = {
  UserIdIsNotValid: 'User id is not valid',
} as const;


export const CommentResponseMessage = {
  CommentsFound: 'Comments retrieved successfully',
  CommentCreated: 'Comment created successfully',
  PostNotFound: 'Post not found',
} as const;
