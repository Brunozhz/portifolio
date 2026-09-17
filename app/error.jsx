"use client";

import { useEffect } from "react";
import { reportClientError } from "@/lib/observability";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    reportClientError(error, { boundary: "root" });
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-night px-6 text-pearl">
      <div className="max-w-lg border-l-2 border-champagne pl-6">
        <p className="text-sm font-semibold text-champagne">O portfólio encontrou um erro.</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Esta página não carregou como deveria.</h1>
        <p className="mt-4 leading-7 text-inkSoft">Tente novamente. Se o problema continuar, a falha já pode ser enviada ao canal de observabilidade configurado.</p>
        <button type="button" onClick={reset} className="mt-7 border border-champagne/40 px-5 py-3 font-semibold text-champagne transition-colors hover:bg-champagne/10">
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
