import React from "react";
import "./style.css";

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
  link: string;
}

const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Sales Executive Intern",
    department: "Sales",
    location: "Bangalore (Hybrid)",
    description:
      "We are looking for a dynamic and results-driven Sales Executive Intern to join our team. You will assist with driving sales, building client relationships, and supporting the team in achieving sales targets in a fast-paced environment. This is an excellent opportunity to gain hands-on experience in sales and business development.",
    link: "https://forms.gle/aGWPmhEPUNuH3YL27",
  },
  {
    id: 2,
    title: "UX Designer Intern",
    department: "Design",
    location: "Bangalore (Hybrid)",
    description:
      "We are seeking a talented UX Designer Intern to join our team. In this role, you will assist in creating intuitive, user-centric designs for our products. You will collaborate closely with product managers and developers to deliver exceptional user experiences. This is a great opportunity to develop your design skills in a professional setting.",
    link: "https://forms.gle/ZpDY4NnGzfgP4B6LA",
  },
  {
    id: 3,
    title: "Architect",
    department: "Architecture",
    location: "Bangalore (Hybrid)",
    description:
      "We are looking for an experienced Architect to lead and manage the design and implementation of complex architectural projects. In this role, you will be responsible for creating innovative solutions, overseeing the development process, and ensuring the quality and feasibility of architectural designs.",
    link: "https://forms.gle/LFtfPK6FMhQHqRyg7",
  },
];

const CareerPage: React.FC = () => {
  const generalJobLink = "https://forms.gle/fGYCTk3MYAUswV2p9";

  const handleLinkClick = (link: string) => {
    if (link) {
      window.open(link, "_blank"); // Opens the link in a new tab
    } else {
      alert("No link available for this position.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Join Our Team</h1>
        <p>
          We're always looking for talented individuals to help us build the
          future.
        </p>
      </header>

      <section className="section">
        <h2>Open Positions</h2>
        <div className="job-listings">
          {jobListings.map((job) => (
            <div key={job.id} className="card">
              <h3>{job.title}</h3>
              <p>
                {job.department} - {job.location}
              </p>
              <p>{job.description}</p>
              <button
                onClick={() => handleLinkClick(job.link)}
                className="button"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section-reason">
        <h2 className="section-title">Why Work With Us?</h2>
        <div className="reasons-container">
          <div className="reason">
            <h3>Be Part of Something Bigger</h3>
            <p>
              As a startup, we’re on a mission to disrupt the industry and make
              a real impact. When you work with us, you're not just another
              employee — you're a key player in shaping our vision, culture, and
              future. Every contribution matters, and every success is shared by
              all.
            </p>
          </div>
          <div className="reason">
            <h3>Endless Opportunities for Growth</h3>
            <p>
              In a dynamic startup environment, every day presents new
              challenges and learning opportunities. Whether you’re looking to
              build new skills, take on leadership roles, or innovate in your
              field, we offer the space and resources to accelerate your career
              and personal development.
            </p>
          </div>
          <div className="reason">
            <h3>Collaborative & Creative Culture</h3>
            <p>
              Our team is made up of passionate, driven, and talented
              individuals who thrive on collaboration. We believe in open
              communication, brainstorming, and collective problem-solving. We
              value fresh perspectives and encourage everyone to bring their
              ideas to the table.
            </p>
          </div>
          <div className="reason">
            <h3>Flexibility & Work-Life Balance</h3>
            <p>
              We understand that life isn’t all about work. That’s why we offer
              flexible hours, remote work options, and a focus on results rather
              than rigid schedules. We believe that when you're well-rested and
              able to balance your personal and professional life, you perform
              at your best.
            </p>
          </div>
          <div className="reason">
            <h3>Impact from Day One</h3>
            <p>
              At a startup, you won’t be stuck in a silo doing repetitive tasks.
              You’ll have the chance to directly contribute to product
              development, customer satisfaction, and company growth. Your work
              will make a visible, immediate difference.
            </p>
          </div>
          <div className="reason">
            <h3>Be Part of a Visionary Team</h3>
            <p>
              We are a passionate group of innovators, risk-takers, and
              problem-solvers. We attract forward-thinkers who want to challenge
              the status quo, push boundaries, and explore new possibilities.
              Working with us means being surrounded by people who inspire you
              to be your best self.
            </p>
          </div>
          <div className="reason">
            <h3>Competitive Compensation & Benefits</h3>
            <p>
              While we may be a startup, we know the value of attracting top
              talent. We offer competitive salaries, equity options, and
              benefits packages that reflect the hard work and dedication you
              bring to the team.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{marginTop: '2rem'}}>
        <div className="card">
          <h3>General Application</h3>
          <p>
            Don't see a position that fits? Send us your general application!
          </p>
          <button
            onClick={() => handleLinkClick(generalJobLink)}
            className="button"
          >
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
