import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Applicant Tracking System" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  return <main>
   <section>
    <div className="page-heading">
      <h1>Track Your Application & Resume Rating</h1>
    </div>
   </section>
  </main>
}
