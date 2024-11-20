/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "../global/components/Header";

export default function ProfileLayout({
  children,
}: {children: React.ReactNode}) {

  return (
  <>
  <Header/>
    <section>
      {children}
    </section>
  </>
  );
}

