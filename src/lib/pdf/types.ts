export interface ResumeProfile {
  name: string;
  title: string;
  phone: string;
  email: string;
  birthday: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface ResumeExperience {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  techStack?: string[];
}

export interface ResumeProject {
  title: string;
  teamSize: string;
  period: string;
  summary: string;
  description: string[];
  techStack: string[];
}

export interface ResumeEducation {
  school: string;
  major: string;
  period: string;
}

export interface ResumeCertification {
  name: string;
  date: string;
}

export interface ResumeData {
  profile: ResumeProfile;
  about: string;
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: Record<string, string[]>;
  education: ResumeEducation[];
  certifications: ResumeCertification[];
}
