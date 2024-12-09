const DesignElementaryFAQ = () => {
    const faqs = [
      {
        question: "How do I create a project with Design Elementary?",
        answer:
          'Start by filling out the "Create Project" form on our website, providing details about your vision, requirements, and timeline.',
      },
      {
        question: "What information is required to initiate a project?",
        answer:
          "We need details about the project type, budget, location, and any specific preferences or ideas you have in mind.",
      },
      {
        question: "What happens after I submit my project request?",
        answer:
          "Our team will review your submission and schedule a meeting to discuss the next steps and project feasibility.",
      },
      {
        question: "Can I track the progress of my project?",
        answer:
          "Yes, we provide regular updates and a dedicated project manager to ensure transparent communication throughout.",
      },
      {
        question: "Is there a minimum project size you accept?",
        answer:
          "No project is too small or large for us. We cater to a wide range of requirements, from small renovations to large-scale constructions.",
      },
      {
        question: "What is included in the project package?",
        answer:
          "Our project package typically includes design conceptualization, planning, execution, and final delivery, all tailored to your needs.",
      },
    ];
  
    return (
      <div className="p-6 mx-4 md:mx-36 rounded-se-3xl my-10">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Design Elementary - Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-arrow border border-green-300 bg-white rounded-lg"
            >
              <div className="collapse-title text-lg font-medium text-green-800">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-700">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DesignElementaryFAQ;
  