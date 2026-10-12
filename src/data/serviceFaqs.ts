export interface ServiceFaq {
  question: string;
  answer: string;
}

export const serviceFaqs: Record<string, ServiceFaq[]> = {
  "Accounting Services": [
    {
      question: "What does an accounting engagement include?",
      answer:
        "The books are kept accurate, the statements issued on time, and VAT, corporate tax, and payroll held in order. The work is explained in plain language, so leadership can decide from numbers it can stand behind.",
    },
    {
      question: "Do you handle VAT and corporate tax in the UAE?",
      answer:
        "Yes. Returns are prepared and filings kept compliant for businesses operating in the UAE. Before anything is filed, we set out what is due, when it is due, and what the figures mean.",
    },
    {
      question: "How often will we see the numbers?",
      answer:
        "Reporting follows the decisions you have to make. Management reports, budgets, and commentary are issued on an agreed cycle, in time to be used rather than filed.",
    },
    {
      question: "Can you set up the accounting system as well as keep the books?",
      answer:
        "Yes. A system is selected and configured around the way the business actually operates, then the books are kept on it day to day. The setup is meant to be used, not demonstrated once and left.",
    },
    {
      question: "Who is the reporting written for?",
      answer:
        "Owners, banks, and advisers. Statements are structured so they can be read with confidence, and the commentary stays with the figures on the same page.",
    },
  ],
  "Feasibility Studies Consultancy": [
    {
      question: "When is a feasibility study worth commissioning?",
      answer:
        "Before capital is committed. The study tests whether a project can stand commercially, financially, and operationally, while the decision can still be changed.",
    },
    {
      question: "What does the study decide?",
      answer:
        "Whether to proceed, revise the plan, or stop. The recommendation follows the evidence, and it is written for the people who have to act on it.",
    },
    {
      question: "How are market and cost treated?",
      answer:
        "Demand is judged against what the project can actually deliver, not against a hopeful total. Cost is set against the return the project can reasonably support, with the assumptions stated.",
    },
    {
      question: "What happens to the risks you find?",
      answer:
        "Each material risk is named, with what it would take to reduce it, or with the reason it should stop the plan. Risks are not left as a list at the back of the file.",
    },
    {
      question: "What do we receive at the end?",
      answer:
        "A position you can defend: the evidence, the assumptions, and a recommendation tied to a decision. The study is written so a board can decide, not so a file can be filed away.",
    },
  ],
  "Maritime Consultancy": [
    {
      question: "Who is this practice for?",
      answer:
        "Owners and operators who need a clearer commercial strategy, firmer control of risk, and an operation that holds from the first plan through to daily management.",
    },
    {
      question: "Does the advice stay at strategy, or does it reach the operation?",
      answer:
        "It reaches both. The commercial plan is specific to the trade, the assets, and the clients you can serve, and the work is then run, measured, and corrected against that plan.",
    },
    {
      question: "How do you treat operating risk?",
      answer:
        "Risks are identified and the processes tightened so work moves without avoidable delay. The aim is fewer surprises in the operation, and a clearer response when one appears.",
    },
    {
      question: "Can you help with how the business is presented to clients?",
      answer:
        "Yes. Development and market positioning describe the offer in terms those clients recognise, rather than in general claims.",
    },
    {
      question: "What does a recommendation look like?",
      answer:
        "It closes on a decision the management team can put to work: what should change, who owns it, and what good looks like.",
    },
  ],
  "Media Studies & Consultancy": [
    {
      question: "Where does a media engagement begin?",
      answer:
        "With the message and the audience. We look at how coverage is being read, then at the campaign, the public appearance, or the channel that has to carry it.",
    },
    {
      question: "Do you develop campaigns as well as analyse them?",
      answer:
        "Yes. Campaigns are built with your team around a defined need: who it is for, what it has to achieve, and how it will be recognised.",
    },
    {
      question: "Can you advise on a speech or a public appearance?",
      answer:
        "Yes. Public relations advice covers appearances, speeches, and presentations, so the message heard in the room is the one you intend.",
    },
    {
      question: "How do you treat social media?",
      answer:
        "We read current interest and manage the platforms where that audience already is. The work follows what the public is asking for, not a calendar filled for its own sake.",
    },
    {
      question: "Is training part of the work?",
      answer:
        "Where the team needs it, yes. Workshops stay with the parts of media work those people actually use, and with the developments that affect that work.",
    },
  ],
  "Human Resources Consultancy": [
    {
      question: "What does an HR engagement cover?",
      answer:
        "It runs from the people strategy to the programmes, assessments, training, and hiring that carry it out. The work is aligned with the goals the business has already chosen.",
    },
    {
      question: "Will the strategy match how we already operate?",
      answer:
        "It is written to sit with the organisation's goals. It says how people, roles, and decisions should support the work the business is trying to do.",
    },
    {
      question: "How do you judge the programmes we already have?",
      answer:
        "Directly. We set out what is sound, what is weak, and what should change, in a form leadership can act on.",
    },
    {
      question: "Do you handle hiring as well as internal programmes?",
      answer:
        "Yes. Recruitment strategy says where to look, what to offer, and how a good appointment is judged, so the organisation attracts and keeps the people it needs.",
    },
    {
      question: "Is training included?",
      answer:
        "Where the skills are missing, yes. Sessions stay with the work those teams perform, so the capability is used and not only taught.",
    },
  ],
  "Innovation & Artificial Intelligence Consultancy": [
    {
      question: "Do you begin with a tool or with a problem?",
      answer:
        "With a problem. The engagement starts from the decision the business needs to make, then asks whether artificial intelligence earns a place in it.",
    },
    {
      question: "What does an AI strategy actually say?",
      answer:
        "Where to begin, what to leave, and how success will be judged. It is tied to business priorities, the data you have, and the way teams already work.",
    },
    {
      question: "Will a programme fit the way we operate?",
      answer:
        "It is introduced so it fits current operations, rather than sitting beside them. Adoption is part of the work, because a system that staff do not use has not been implemented.",
    },
    {
      question: "How do you know whether it is performing?",
      answer:
        "We review the work directly: what is sound, what is fragile, and whether the result is worth the effort. The analysis is tied back to the decision, not left as a dashboard.",
    },
    {
      question: "Is training included?",
      answer:
        "Where the skills are missing, yes. Training stays with the tasks those teams actually perform, so the programme is used and not only installed.",
    },
  ],
  "Project Development Consultancy": [
    {
      question: "What does a project engagement decide?",
      answer:
        "How the work will be chosen, governed, and judged. The strategy says what will be delivered, how it will be run, and what done looks like.",
    },
    {
      question: "Does the advice stay on paper, or does it reach the project?",
      answer:
        "It reaches the project. Programmes are introduced so the work becomes more effective, and adoption is part of the engagement.",
    },
    {
      question: "How do you review work that is already underway?",
      answer:
        "We look at what is holding, what is slipping, and what should change. The findings are written for the people who have to correct the work.",
    },
    {
      question: "Can you put a performance system in place?",
      answer:
        "Yes. The system shows project teams the standard they are being held to, and it is built to be used through the life of the work.",
    },
    {
      question: "How are the figures used?",
      answer:
        "To decide which project choices are worth continuing and which should change. The analysis is tied back to that decision, not left as a report on its own.",
    },
  ],
};
