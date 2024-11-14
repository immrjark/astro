
import { getGreeting } from './greetings/get-greeting.action';
import { getPostLikes } from './posts/get-post.action';
import { updatePostLikes } from './posts/update-likes.action';


export const server = {
  getGreeting,
  
  // posts
  getPostLikes,
  updatePostLikes,
}