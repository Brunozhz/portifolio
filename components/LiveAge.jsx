"use client";

import { useEffect, useState } from "react";

const BIRTH_DATE = { year: 2004, month: 7, day: 13 };

function calculateAge(now = new Date()) {
  let age = now.getFullYear() - BIRTH_DATE.year;
  const birthdayHasPassed =
    now.getMonth() + 1 > BIRTH_DATE.month ||
    (now.getMonth() + 1 === BIRTH_DATE.month && now.getDate() >= BIRTH_DATE.day);

  if (!birthdayHasPassed) age -= 1;
  return age;
}

export default function LiveAge({ suffix = " years old" }) {
  const [age, setAge] = useState(() => calculateAge());

  useEffect(() => {
    const updateAge = () => setAge(calculateAge());
    updateAge();

    // Recheck periodically so a portfolio left open across the birthday updates itself.
    const interval = window.setInterval(updateAge, 60 * 60 * 1000);
    document.addEventListener("visibilitychange", updateAge);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", updateAge);
    };
  }, []);

  return <span suppressHydrationWarning>{age}{suffix}</span>;
}
