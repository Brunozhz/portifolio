const BIRTH_DATE = Object.freeze({ year: 2004, month: 7, day: 13 });

export function calculateAge(now = new Date()) {
  let age = now.getFullYear() - BIRTH_DATE.year;
  const birthdayHasPassed =
    now.getMonth() + 1 > BIRTH_DATE.month ||
    (now.getMonth() + 1 === BIRTH_DATE.month && now.getDate() >= BIRTH_DATE.day);

  if (!birthdayHasPassed) age -= 1;
  return age;
}
