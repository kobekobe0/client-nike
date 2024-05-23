function timeAgo(dateString) {
  // Parse the date string
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date format. Please use YYYY-MM-DD.";
  }

  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(diffInMilliseconds / 1000);

  // Calculate units
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  // Determine time unit based on difference
  if (seconds < minute) {
    return `${seconds} seconds ago`;
  } else if (seconds < hour) {
    return `${Math.floor(seconds / minute)} minutes ago`;
  } else if (seconds < day) {
    return `${Math.floor(seconds / hour)} hours ago`;
  } else if (seconds < week) {
    return `${Math.floor(seconds / day)} days ago`;
  } else if (seconds < month) {
    return `${Math.floor(seconds / week)} weeks ago`;
  } else if (seconds < year) {
    return `${Math.floor(seconds / month)} months ago`;
  } else {
    return `${Math.floor(seconds / year)} years ago`;
  }
}

export default timeAgo;