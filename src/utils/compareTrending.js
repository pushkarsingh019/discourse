export const sortPostsByTrending = (posts) => {
    const sortedPosts = [...posts];
    sortedPosts.sort((a, b) => (b.likes.length + b.comments.length) - (a.likes.length + a.comments.length));
    return sortedPosts;
  };