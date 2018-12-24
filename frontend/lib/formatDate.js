export default function(dateString) {
  const date = new Date(dateString);

  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
