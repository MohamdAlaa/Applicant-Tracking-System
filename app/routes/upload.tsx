import React, { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'
import { usePuterStore } from '~/lib/puter';

const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setisProcessing] = useState(false);
    const [statusText, setstatusText] = useState('');
    const [file, setfile] = useState<File | null>(null);

    const handelFileSelect = (file:File | null) => {
        setfile(file)
    };

    const handelAnalyze = async ({file, companyName, jobTitle, jobDescription}: {file: File , companyName: string , jobTitle: string , jobDescription: string }) => {

    }

    const handelSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form){
            return;
        }
        const formData = new FormData(form) ;
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

     if(!file) return;
     handelAnalyze({file, companyName, jobTitle, jobDescription: jobDescription});
    }


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
   <section className="main-section">
    <div className='page-heading'>
        <h1>Smart feedback for your dream job</h1>
        {isProcessing ? (
            <>
                <h2>{statusText}</h2>
                <img src="/images/resume-scan.gif" alt="scan" className='w-full'/>

            </>
        ) : (
            <h2>Drop your resume for an ATS score and improvement tips.</h2>
        )}
        {!isProcessing && (
            <form id='upload-form' onSubmit={handelSubmit} className='flex flex-col gap-4'>
                <div className='form-div'>
                    <label htmlFor="company-name">Company Name</label>
                    <input type="text" name='company-name' id='company-name' placeholder='Company Name'/>
                </div>
                <div className='form-div'>
                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name='job-title' id='job-title' placeholder='Job Title'/>
                </div>
                <div className='form-div'>
                    <label htmlFor="job-description">Job Description</label>
                    <textarea rows={5} name='job-description' id='job-description' placeholder='Job Description'/>
                </div>
                 <div className='form-div'>
                    <label htmlFor="uploader">Upload Resume</label>
                    <FileUploader onFileSelect={handelFileSelect} file={file}/>
                </div>
                <button className='primary-button' type='submit'>
                    Save & Analyze Resume
                </button>
            </form>
        )}
    </div>
   </section>
  </main>
  )
}

export default upload