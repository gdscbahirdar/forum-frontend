import {
  badges,
  goodAnswer,
  goodQuestion,
  goodTags,
  ownAnswer,
  reputationRules,
  votingImportance
} from "./helpArticles";

export const categories = [
  { name: "Asking", articleCounts: 2 },
  { name: "Answering", articleCounts: 2 },
  { name: "Reputation", articleCounts: 2 },
  { name: "Badges", articleCounts: 1 }
];

export const articles = [
  {
    category: "Asking",
    articles: [
      {
        id: 1,
        title: "How do I ask a good question?",
        content: goodQuestion
      },
      {
        id: 2,
        title: "What are tags, and how should I use them?",
        content: goodTags
      }
    ]
  },
  {
    category: "Answering",
    articles: [
      {
        id: 1,
        title: "How do I write a good answer?",
        content: goodAnswer
      },
      {
        id: 2,
        title: "Can I answer my own question?",
        content: ownAnswer
      }
    ]
  },
  {
    category: "Reputation",
    articles: [
      {
        id: 1,
        title: "Why is voting important?",
        content: votingImportance
      },
      {
        id: 2,
        title: "What is reputation? How do I earn (and lose) it?",
        content: reputationRules
      }
    ]
  },
  {
    category: "Badges",
    articles: [
      {
        id: 1,
        title: "What are badges?",
        content: badges
      }
    ]
  }
];
