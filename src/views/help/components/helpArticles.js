export const goodQuestion = `
Asking a good question is key to getting helpful and timely answers from the community. Follow these guidelines to craft your question effectively:

### 1. Search Before You Ask
Before posting a new question, use the search feature to see if your question has already been asked and answered. This can save you time and help you find the information you need more quickly.

### 2. Be Specific and Clear
- **Title**: Summarize your problem in a concise and descriptive title. A good title gives a clear idea of the issue at a glance.
  - **Bad**: "Help needed"
  - **Good**: "How to resolve a '404 Not Found' error in Django?"
- **Details**: Provide detailed information about your problem. Include relevant context, such as:
  - What you are trying to achieve
  - What you have tried so far
  - Any error messages or unexpected behavior

### 3. Include Relevant Information
- **Code Snippets**: If your question involves code, include a minimal, reproducible example. This means sharing just enough code to demonstrate the problem without unnecessary details.
- **Environment Details**: Mention the tools, libraries, or technologies you are using. For example, the version of a programming language, framework, or operating system can be crucial for understanding the issue.

### 4. Be Concise
While it's important to provide enough detail, avoid including superfluous information that can obscure the main issue. Aim for a balance between detail and brevity.

### 5. Use Proper Formatting
- Use code formatting for any code snippets to improve readability.
- Break up text into paragraphs or bullet points to make it easier to follow.

### 6. Tag Appropriately
Use relevant tags to categorize your question. Tags help experts in specific areas find your question and provide accurate answers. Choose tags that accurately describe the main topics of your question.

### 7. Be Respectful and Courteous
- **Tone**: Use a polite and respectful tone. Remember, everyone here is volunteering their time to help.
- **Gratitude**: A simple “thank you” goes a long way in fostering a positive community atmosphere.

### Example of a Good Question

**Title**: How to fix a 'TypeError: NoneType' object is not iterable in Python?

**Body**:
I am trying to iterate over a list in Python, but I keep encountering the error 'TypeError: NoneType object is not iterable'. Here is a snippet of my code:

\`\`\`python
my_list = None
for item in my_list:
    print(item)
\`\`\`

I expected the code to print each item in the list, but instead, I get an error. I have checked that \`my_list\` should be a list, but I can't figure out where it goes wrong. I am using Python 3.8. Any insights on what might be causing this issue and how to fix it?

Thanks in advance for your help!

### Final Tips
- Proofread your question before posting. Clear, well-written questions are more likely to receive helpful answers.
- Respond to any follow-up questions from those trying to help you. Providing additional information promptly can lead to quicker solutions.

By following these guidelines, you can ask effective questions that are more likely to receive accurate and helpful responses. Happy asking!
`;

export const goodTags = `
Tags are a crucial part of our forum, helping to categorize questions and make it easier for users to find and provide answers. Here’s how to effectively use tags:

### 1. What Are Tags?
Tags are keywords or phrases that describe the main topics of your question. They act as labels that group similar questions together, making it easier for others to find and respond to your question.

### 2. Why Use Tags?
- **Discoverability**: Tags help users find questions that are relevant to their expertise or interests.
- **Organization**: Tags keep the forum organized by topic, making it easier to navigate and search.
- **Engagement**: Properly tagged questions are more likely to attract responses from knowledgeable users.

### 3. How to Choose the Right Tags
- **Be Specific**: Use tags that are directly related to your question. For example, use \`python\` for a Python-related question rather than a general tag like \`programming\`.
- **Use Existing Tags**: As you type, existing tags will be suggested. Use these whenever possible to maintain consistency.
- **Multiple Tags**: You can use multiple tags to cover different aspects of your question. For example, a question about Django forms in Python might use \`python\`, \`django\`, and \`forms\`.

### 4. How to Add Tags to Your Question
When you ask a question, you’ll see a field to add tags. Start typing a keyword, and suggestions will appear. Select the most relevant tags for your question.

### 5. Examples of Good Tagging
**Example 1:**
\`\`\`
Title: How to resolve a '404 Not Found' error in Django?

Tags: \`django\`, \`404-error\`, \`web-development\`
\`\`\`

**Example 2:**
\`\`\`
Title: Best practices for writing unit tests in Python

Tags: \`python\`, \`unit-testing\`, \`best-practices\`
\`\`\`

### 6. Tagging Tips
- **Relevance**: Ensure that each tag is directly related to your question.
- **Specificity**: Avoid overly broad tags; they can make it harder for experts to find your question.
- **Moderation**: Use a sufficient number of tags to cover the topics, but don’t over-tag. Aim for 3-5 tags that best describe your question.

### 7. Review and Edit Tags
After posting, you can review and edit the tags on your question. If someone suggests better tags, consider updating your tags to improve the question's visibility.

By using tags effectively, you help improve the overall quality and efficiency of our forum, making it easier for everyone to find and provide the answers they need. Happy tagging!
`;

export const goodAnswer = `
Writing a good answer is crucial to helping others and building a strong community. Follow these guidelines to craft a clear, helpful, and informative response:

### 1. Understand the Question
Before answering, make sure you fully understand the question. Read it carefully, and if something is unclear, ask for clarification in the comments.

### 2. Be Clear and Concise
- **Structure**: Start with a brief summary of your answer. Use headings, bullet points, or numbered lists to organize your response.
- **Clarity**: Write in simple, straightforward language. Avoid jargon or complex terms unless necessary, and explain them if used.

### 3. Provide Detailed Explanations
- **Step-by-Step**: If the answer involves multiple steps, provide a detailed, step-by-step guide.
- **Examples**: Include examples to illustrate your points. Code snippets, diagrams, or screenshots can be very helpful.
- **Context**: Explain why your solution works. Understanding the reasoning behind a solution helps others learn and apply similar approaches to different problems.

### 4. Use Proper Formatting
- **Code**: Use code blocks to format any code snippets. This improves readability and helps others copy and paste the code easily.
- **Links**: If referring to external resources, provide links. Ensure they are relevant and add value to your answer.

### 5. Be Polite and Respectful
- **Tone**: Maintain a positive and respectful tone. Remember, everyone is here to learn and help each other.
- **Encouragement**: Encourage the questioner and others. Positive reinforcement fosters a supportive community.

### 6. Proofread Before Posting
Review your answer for any errors or unclear parts. A well-written, error-free answer is more likely to be upvoted and accepted.

### 7. Follow Up
After posting your answer, check back for any comments or follow-up questions. Engage with the questioner to provide additional help if needed.

### Example of a Good Answer

**Question**: How can I reverse a string in Python?

**Answer**:
\`\`\`markdown
You can reverse a string in Python using slicing. Here’s a simple example:

\`\`\`python
def reverse_string(s):
    return s[::-1]

# Example usage
print(reverse_string("hello"))  # Output: "olleh"
\`\`\`

### Explanation:
- The slicing syntax \`s[::-1]\` means start at the end of the string and end at position 0, moving with the step -1, which reverses the string.
- This method is efficient and works for any string.

Alternatively, you can use a loop or the \`reversed\` function, but slicing is the most concise and Pythonic way to reverse a string.
\`\`\`

### Final Tips
- **Stay on Topic**: Ensure your answer addresses the specific question asked.
- **Avoid Assumptions**: Don’t assume the questioner has prior knowledge. Provide explanations that a beginner can understand.
- **Be Generous with Your Knowledge**: Share any additional tips or best practices related to the question.

By following these guidelines, you can write answers that are not only helpful but also contribute to the overall quality and knowledge base of the community. Happy answering!
`;

export const ownAnswer = `
Absolutely! Answering your own question is not only allowed but also encouraged in many cases. Here are a few reasons why:

### 1. Contribution to the Community
By answering your own question, you contribute valuable information to the community's knowledge base. Your insights and solutions can help others who encounter similar issues in the future.

### 2. Completeness of Information
Sometimes, you may find a solution to your problem after posting the question. By providing your own answer, you ensure that the question is fully resolved and that others can benefit from your findings.

### 3. Clarification and Validation
Answering your own question allows you to clarify any misunderstandings or misconceptions that may arise from the initial question. It also provides validation for your solution, as you have firsthand experience with its effectiveness.

### How to Answer Your Own Question
- Follow the same guidelines for writing a good answer as you would for answering someone else's question.
- Be clear, concise, and provide detailed explanations.
- Use proper formatting, including code blocks for code snippets and links for references.
- Consider providing additional context or insights gained from your experience.

### Example
If you've encountered a problem with a software tool and later found a workaround or solution, you can post your question along with your solution as an answer. This helps others who may face similar challenges in the future.

### Final Note
Answering your own question is not only acceptable but also beneficial for the community. Don't hesitate to share your knowledge and experiences, as they can greatly benefit others. Happy answering!
`;

export const votingImportance = `
Voting is a fundamental aspect of any community-driven platform, including our forum. Here are several reasons why voting plays a crucial role in our community:

### 1. Quality Control
Voting helps maintain the quality of content on the forum. Users can upvote high-quality questions, answers, and comments, while downvoting those that are low-quality or irrelevant. This ensures that the most helpful and relevant content is prominently displayed.

### 2. Community Engagement
Voting encourages community engagement and participation. It allows users to express their opinions on the value and relevance of contributions made by others. Through voting, users can actively shape the direction and focus of discussions on the forum.

### 3. Recognition and Appreciation
Votes serve as a form of recognition and appreciation for valuable contributions. When users receive upvotes on their questions or answers, it validates their efforts and encourages continued participation. This positive reinforcement fosters a supportive and collaborative community atmosphere.

### 4. Feedback Mechanism
Voting serves as a feedback mechanism for users to provide feedback on the quality and relevance of content. A high number of upvotes indicates that the content is helpful and appreciated by the community, while downvotes signal areas for improvement or clarification.

### 5. Content Discovery
Popular and highly-voted questions and answers are more likely to be seen by a larger audience. This enhances content discovery and ensures that valuable insights and solutions are accessible to more users. By voting, users play a role in curating and surfacing the most relevant content.

### 6. Accountability
Voting holds users accountable for their contributions. High-quality content is rewarded with upvotes, while low-quality or irrelevant content may receive downvotes. This incentivizes users to provide thoughtful and helpful contributions to the community.

### Conclusion
Voting is a fundamental aspect of our forum community, serving multiple purposes ranging from quality control to community engagement. By actively participating in voting, users contribute to the overall quality, relevance, and success of the forum. Your votes matter, so make them count!

### Take Action
- **Upvote**: If you find a question, answer, or comment helpful and valuable, consider upvoting it to recognize the contributor's effort.
- **Downvote**: If you come across content that is low-quality, irrelevant, or violates community guidelines, consider downvoting it to provide feedback and maintain the quality of the forum.

Thank you for being an active and engaged member of our community!

`;

export const reputationRules = `
Reputation is a measure of your standing and contributions within our community. It reflects the trust and respect other users have for your posts and interactions. Here's how you can earn and potentially lose reputation:

### Earning Reputation
**You Gain Reputation When:**
- **Question Upvoted**: +10 reputation points when someone upvotes your question.
- **Answer Upvoted**: +10 reputation points when someone upvotes your answer.
- **Answer Accepted**: +15 reputation points when your answer is marked as "accepted" by the question asker. The question asker also receives +2 reputation points for accepting an answer.

### Daily Limits
- You can earn a maximum of 200 reputation points per day from the combination of upvotes and downvotes.

### Losing Reputation
**You Lose Reputation When:**
- **Question Downvoted**: -2 reputation points when someone downvotes your question.
- **Answer Downvoted**: -2 reputation points when someone downvotes your answer.

### Starting Reputation
- All users start with one reputation point, and reputation can never drop below 1.

### Exceptions
- Accepting your own answer does not increase your reputation.
- If a user reverses a vote, the corresponding reputation loss or gain will be reversed as well.

### Conclusion
Your reputation reflects your contributions and interactions within our community. By consistently providing valuable and helpful content, you can increase your reputation and earn the respect of your peers. Remember to always strive for quality and engagement in your posts.

Keep in mind the guidelines for earning and losing reputation as you participate in our community. Your reputation is an important aspect of your presence here, so use it wisely and positively contribute to the community's growth and success!
`;

export const badges = `
Badges are rewards given to users for their contributions and activities on the forum. They are divided into three categories: Bronze, Silver, and Gold. Each badge represents a different level of accomplishment and participation within the community.

### Bronze Badges
Bronze badges are awarded for basic use of the site and encourage users to engage in typical functions such as posting questions, answering questions, and voting. They are relatively easy to obtain and serve as a starting point for users on the forum.

### Silver Badges
Silver badges are awarded to experienced users who regularly participate in the community. They encourage continued engagement by setting longer-term goals. While less common than bronze badges, they are attainable with dedication and consistent participation.

### Gold Badges
Gold badges are reserved for the most committed and skilled users. They reward difficult feats and require a high level of skill, knowledge, and dedication to achieve. Gold badges represent significant achievements within the community.

### Question Badges
- **Favorite Question**: Question saved by 25 users (Silver)
- **Stellar Question**: Question saved by 100 users (Gold)
- **Nice Question**: Question score of 10 or more (Bronze)
- **Good Question**: Question score of 25 or more (Silver)
- **Great Question**: Question score of 100 or more (Gold)
- **Popular Question**: Question with 500 views (Bronze)
- **Notable Question**: Question with 750 views (Silver)
- **Famous Question**: Question with 1000 views (Gold)

### Answer Badges
- **Favorite Answer**: Answer saved by 25 users (Silver)
- **Stellar Answer**: Answer saved by 100 users (Gold)
- **Guru**: Accepted answer and score of 40 or more (Silver)
- **Nice Answer**: Answer score of 10 or more (Bronze)
- **Good Answer**: Answer score of 25 or more (Silver)
- **Great Answer**: Answer score of 100 or more (Gold)
- **Self-Learner**: Answer your own question with score of 3 or more (Bronze)
- **Teacher**: Answer a question with score of 1 or more (Bronze)

### Leaderboards
The forum features daily, weekly, monthly, and all-time leaderboards that display top users based on points earned within these periods. Leaderboards add a competitive element to the community and recognize active and engaged members.

Badges and leaderboards provide incentives for users to contribute positively to the community and recognize their efforts and achievements. Happy posting and earning badges!
`;
