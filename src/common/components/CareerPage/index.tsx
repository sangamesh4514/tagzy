import React, { useState } from 'react';
import './style.css';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
}

const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    description: "We're looking for a talented Frontend Developer to join our team and help build amazing user experiences."
  },
  {
    id: 2,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    description: "Join our design team to create intuitive and beautiful interfaces for our products."
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    description: "We're seeking an experienced Product Manager to lead our product development initiatives."
  }
];

const CareerPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted', { name, email, resume, coverLetter });
    // Reset form
    setName('');
    setEmail('');
    setResume(null);
    setCoverLetter('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Join Our Team</h1>
        <p>We're always looking for talented individuals to help us build the future.</p>
      </header>

      <section className="section">
        <h2>Open Positions</h2>
        <div className="job-listings">
          {jobListings.map((job) => (
            <div key={job.id} className="card">
              <h3>{job.title}</h3>
              <p>{job.department} - {job.location}</p>
              <p>{job.description}</p>
              <button className="button">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Why Work With Us?</h2>
        <div className="benefits">
          <div className="card">
            <h3>Competitive Salary</h3>
            <p>We offer top-tier compensation packages to attract and retain the best talent.</p>
          </div>
          <div className="card">
            <h3>Remote-First</h3>
            <p>Work from anywhere in the world. We believe in hiring the best, regardless of location.</p>
          </div>
          <div className="card">
            <h3>Professional Growth</h3>
            <p>We invest in our employees' growth with ongoing training and development opportunities.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Apply Now</h2>
        <div className="card">
          <h3>General Application</h3>
          <p>Don't see a position that fits? Send us your general application!</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                id="name" 
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="resume">Resume</label>
              <input 
                id="resume" 
                type="file" 
                onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea 
                id="coverLetter" 
                placeholder="Tell us why you'd be a great fit"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
            <button type="submit" className="button">Submit Application</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;

