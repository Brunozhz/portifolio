"use client";

import { useEffect, useState } from "react";
import { calculateAge } from "@/lib/age";

export default function LiveAge({ suffix = "years old" }) {
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

  return (
    <span suppressHydrationWarning>
      {age}
      {" "}
      {suffix.trim()}
    </span>
  );
}
