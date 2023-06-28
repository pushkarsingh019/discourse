export const checkIsFollower = (user, authorId) => {
    const peopleWhoUserFollows = user.follows.map(person => person._id);
    return peopleWhoUserFollows.includes(authorId) ? true : false;
};