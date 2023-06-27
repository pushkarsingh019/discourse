export const compareTime = (providedDate) => {
    const currentDate = Date.now();
    const timeDifference = Math.abs(currentDate - Date.parse(providedDate)) / 1000; // Convert milliseconds to seconds
  
    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)}s ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

export const getDate = (time) => {
  const dateObj = new Date(time);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return dateObj.toLocaleDateString('en-US', options);
};

export const formatTime = (time) => {
  const dateObj = new Date(time);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return dateObj.toLocaleTimeString('en-US', options);
};

export const sortPostByTime = (posts) => {
  const sortedPosts = [...posts];
  sortedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
  return sortedPosts;
};
