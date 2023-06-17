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
  