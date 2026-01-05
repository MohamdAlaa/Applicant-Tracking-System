import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants/index";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Applicant Tracking System" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
   <section className="main-section">
    <div className="page-heading py-6">
      <h1>Track Your Application & Resume Rating</h1>
      <h2>Review your submissions and check AI-powered feedback.</h2>
    </div>
   
 {resumes.length > 0 && (
  <div className="resumes-section">
    {resumes.map((resume:any) => (
    <ResumeCard key={resume.id} resume={resume} />
  ))}
  </div>
 )}
 
 </section>
  </main>
}
