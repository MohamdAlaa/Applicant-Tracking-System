export const resumes: Resume[] = [
    {
      id: "1",
      companyName: "Google",
      jobTitle: "Frontend Developer",
      imagePath: "/images/resume_01.png",
      resumePath: "/resumes/resume-1.pdf",
      feedback: {
        overallScore: 85,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "2",
      companyName: "Microsoft",
      jobTitle: "Cloud Engineer",
      imagePath: "/images/resume_02.png",
      resumePath: "/resumes/resume-2.pdf",
      feedback: {
        overallScore: 55,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "3",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      resumePath: "/resumes/resume-3.pdf",
      feedback: {
        overallScore: 75,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },


    {
      id: "4",
      companyName: "Google",
      jobTitle: "Frontend Developer",
      imagePath: "/images/resume_01.png",
      resumePath: "/resumes/resume-1.pdf",
      feedback: {
        overallScore: 85,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "5",
      companyName: "Microsoft",
      jobTitle: "Cloud Engineer",
      imagePath: "/images/resume_02.png",
      resumePath: "/resumes/resume-2.pdf",
      feedback: {
        overallScore: 55,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "6",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      resumePath: "/resumes/resume-3.pdf",
      feedback: {
        overallScore: 75,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
  ];
  
  export const AIResponseFormat = `
        interface Feedback {
        overallScore: number; //max 100
        ATS: {
          score: number; //rate based on ATS suitability
          tips: {
            type: "good" | "improve";
            tip: string; //give 3-4 tips
          }[];
        };
        toneAndStyle: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        content: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        structure: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        skills: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
      }`;
  
  export const prepareInstructions = ({
    jobTitle,
    jobDescription,
    AIResponseFormat,
  }: {
    jobTitle: string;
    jobDescription: string;
    AIResponseFormat: string;
  }) =>
    `You are an expert in ATS (Applicant Tracking System) and resume analysis.
    Please analyze and rate this resume and suggest how to improve it.
    The rating can be low if the resume is bad.
    Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
    If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
    If available, use the job description for the job user is applying to to give more detailed feedback.
    If provided, take the job description into consideration.
    The job title is: ${jobTitle}
    The job description is: ${jobDescription}
    
    TIP TYPE GUIDELINES:
    - Use type: "good" for positive feedback - things the resume does well (e.g., "Excellent use of keywords", "Well-structured format")
    - Use type: "improve" for suggestions - things that need improvement (e.g., "Add more keywords", "Fix formatting issues")
    - Provide a mix of both "good" and "improve" tips to give balanced feedback
    
    CRITICAL REQUIREMENTS:
    1. You MUST provide a DIFFERENT score for EACH of the following categories (toneAndStyle, content, structure, skills).
    2. Each category should be evaluated independently based on its specific criteria.
    3. Scores should range from 0-100 and reflect the actual quality of that specific aspect.
    4. DO NOT give the same score to multiple categories - each must be unique based on its evaluation.
    5. For example: toneAndStyle might be 75, content might be 60, structure might be 85, skills might be 70.
    
    Evaluation criteria for each category:
    - toneAndStyle: Professional tone, appropriate language, clarity of communication
    - content: Relevance, completeness, accuracy of information, alignment with job requirements
    - structure: Organization, formatting, readability, logical flow, section arrangement
    - skills: Relevance of skills listed, proper presentation, alignment with job requirements
    
    Provide the feedback using EXACTLY the following format: ${AIResponseFormat}
    
    IMPORTANT: Return ONLY a valid JSON object with these EXACT property names (camelCase):
    - overallScore (number, 0-100)
    - ATS (object with: score number, tips array)
    - toneAndStyle (object with: score number 0-100, tips array with tip and explanation)
    - content (object with: score number 0-100, tips array with tip and explanation)
    - structure (object with: score number 0-100, tips array with tip and explanation)
    - skills (object with: score number 0-100, tips array with tip and explanation)
    
    Each category MUST have a different score. Return ONLY the JSON object, no markdown, no code blocks, no additional text.`;