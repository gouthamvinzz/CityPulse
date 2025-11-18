export const formatEventDate = (date: string) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  } catch (error) {
    return date;
  }
};

