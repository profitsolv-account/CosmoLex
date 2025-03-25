import { useEffect } from 'react';

export const CareersApplicantManager = () => {
  useEffect(() => {
    const jobBoardContainer = document.getElementById('job-board-container'); // Get the container

    if (!jobBoardContainer) {
      // Create the container if it doesn't exist
      const newContainer = document.createElement('div');
      newContainer.id = 'job-board-container';
      document.body.appendChild(newContainer);
    }

    const script1 = document.createElement('script');
    script1.src = 'https://theapplicantmanager.com/jobfeeds/te_cosmolex.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://theapplicantmanager.com/jobfeeds/te_footer.js';
    document.body.appendChild(script2);

    return () => {
      // Cleanup: remove the scripts and the container (if you created it)
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      if(jobBoardContainer === null){
          const containerToRemove = document.getElementById('job-board-container');
          if(containerToRemove){
              document.body.removeChild(containerToRemove);
          }
      }

    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-5xl font-bold mb-4 text-center">Open Positions</h2>

      {/* The scripts will render their output into the 'job-board-container' */}

      <div className="flex justify-center">
        <a href="https://www.glassdoor.com/Overview/Working-at-CosmoLex-EI_IE1289709.11,19.htm">
          <img
            src="https://www.glassdoor.com/pc-app/static/img/partnerCenter/badges/eng_CHECK_US_273x90.png"
            alt="Glassdoor Check Us Out"
          />
        </a>
      </div>
    </div>
  );
};