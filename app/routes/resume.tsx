import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export function meta() {
  return [
    { title: "Resumind | Review" },
    { name: "description", content: "Detailed review of your resume" },
  ];
}


const resume = () => {
    const { id } = useParams();
    const { auth, isLoading, fs, kv } = usePuterStore();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    
useEffect(() => {

  try {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if(!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if(!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if(!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({resumeUrl, imageUrl, feedback: data.feedback });
      }
    
        loadResume();
  } catch (error) {
    console.error("Error loading resume:", error);
    
  }
        

    }, [id]);
  
  return (
    <main className='pt-0!'>
        <nav className='resume-nav'>  
          <Link to="/" className='back-button'>
            <img src="/icons/back.svg" alt="back" className='w-2.5 h-2.5'/>
            <span className='text-gray-800 text-sm font-semibold'>Back to Home</span>
            </Link>
        </nav>
        <div className='flex flex-row w-full max-lg:flex-col-reverse'>
          <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-screen sticky top-0 items-center justify-center">
              {imageUrl && resumeUrl && (
                <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-2xl:h-fit  w-fit'></div>
              )}
          </section>
        </div>

    </main>
  )
}

export default resume