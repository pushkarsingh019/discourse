export const isLoggedIn = (user) => Object.keys(user).length === 0 ? false : true;