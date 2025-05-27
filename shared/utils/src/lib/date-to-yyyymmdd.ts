export const dateToYYYYMMDD = (date: any): string => {
  const d = date instanceof Date ? date : date?.toDate?.() || new Date(date); // handles Firestore Timestamp and ISO string

  if (!d || isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
