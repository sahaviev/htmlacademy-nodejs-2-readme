export type Comment = {
  id?: string;
  message: string;
  postId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
