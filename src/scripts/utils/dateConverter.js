export function dateConverter(date) {
  const yy = date.slice(0, 4);
  const mm = date.slice(5, 7);
  const dd = date.slice(8, 10);
  let convertedDate = new Date();
  convertedDate.setFullYear(yy);
  convertedDate.setMonth(mm);
  convertedDate.setDate(dd);
  convertedDate = convertedDate.toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  convertedDate = convertedDate.slice(0, convertedDate.length - 3);
  return convertedDate;
};
