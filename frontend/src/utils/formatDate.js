export function formatHistoryDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const dateDay = startOfDay(date);
  const todayDay = startOfDay(now);

  const diffInDays = Math.round(
    (todayDay - dateDay) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return "today";
  }

  if (diffInDays === 1) {
    return "yesterday";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}