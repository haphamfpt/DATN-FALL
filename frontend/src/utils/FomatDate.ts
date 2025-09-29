function ReverseDateFormat(dateStr: string): string {
  const [year, month, day] = dateStr?.split("-");
  return `${day}-${month}-${year}`;
}

export default ReverseDateFormat;
