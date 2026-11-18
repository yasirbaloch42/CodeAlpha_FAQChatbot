// // CodeAlpha FAQ Chatbot - Task 2
// Method: Predefined FAQ Dataset + Cosine Similarity (Scikit-learn Concept)
// No External AI API - As Per Task Requirement

const faqData = [
    { q: "what is internship duration how long", a: "The CodeAlpha Internship duration is 1 Month. During this period, you are required to complete at least 2 tasks." },
    { q: "when will i get certificate", a: "You will receive your certificate after completing at least 2 tasks and submitting your GitHub repository link and LinkedIn post." },
    { q: "how many tasks need to complete", a: "You need to complete a minimum of 2 tasks out of 4. For example: 1) Language Translation Tool, 2) FAQ Chatbot. Completing only 1 task is not eligible for a certificate." },
    { q: "is internship free fees cost", a: "Yes, the CodeAlpha Internship is 100% FREE. There are no fees and no hidden charges." },
    { q: "how to apply join internship", a: "To apply, comment on the CodeAlpha post, join the official WhatsApp community, and start working on your tasks." },
    { q: "how to upload project github", a: "Create a repository on GitHub with the name format: CodeAlpha_ProjectName. Example: CodeAlpha_FAQChatbot. Then upload your index.html, style.css, and script.js files." },
    { q: "what to post on linkedin", a: "On LinkedIn, post a demo video of your project with your GitHub link and tag @CodeAlpha. This is mandatory for certification." },
    { q: "what is task 1", a: "Task 1 is the Language Translation Tool. You need to build a tool that translates text from one language to another using a Translation API." },
    { q: "what is task 2", a: "Task 2 is the FAQ Chatbot. You need to build a chatbot using NLTK and Cosine Similarity that answers predefined FAQs." },
    { q: "what is task 3", a: "Task 3 is the Movie Recommendation System. You need to build a system that suggests movies based on user preferences." },
    { q: "what is task 4", a: "Task 4 is Object Detection. You need to build a system that detects objects in images, such as Cat, Dog, or Car." },
    { q: "what is python", a: "Python is a simple and powerful programming language widely used in AI, Web Development, and Data Science." },
    { q: "what is artificial intelligence ai", a: "Artificial Intelligence (AI) is the ability of a machine to understand, learn, and respond like a human. This chatbot is a basic example of AI." },
    { q: "what is nltk", a: "NLTK (Natural Language Toolkit) is a Python library used for text processing. In this chatbot, I have used NLTK-style tokenization to break questions into words." },
    { q: "what is cosine similarity", a: "Cosine Similarity measures how similar two sentences are by comparing their words. The higher the number of matching words, the higher the score, and the best-matching answer is selected." },
    { q: "what is html", a: "HTML (HyperText Markup Language) is used to create the structure of a website. The layout of this chatbot is built with HTML." },
    { q: "what is css", a: "CSS (Cascading Style Sheets) is used to style a website - colors, layout, fonts, and design. The professional look of this chatbot is created with CSS." },
    { q: "what is javascript", a: "JavaScript is a programming language that makes websites interactive. The entire logic of this chatbot is written in JavaScript." },
    { q: "who are you what is your name", a: "I am CodeAlphaBot, an AI Assistant developed by Muhammad Yasir for CodeAlpha Internship Task 2." },
    { q: "what can you do capabilities", a: "I can answer questions about Internship, Certificate, Tasks, Python, AI, NLTK, and Cosine Similarity. Please ask any FAQ from the list." },
    { q: "how to submit project", a: "To submit your project: 1) Upload it to GitHub, 2) Post a video on LinkedIn with the GitHub link, 3) Submit the links in the official submission form." },
    { q: "is there stipend paid", a: "This is an unpaid internship. You will not receive a stipend, but you will gain a Certificate, Practical Experience, and Skills that are valuable for your career." },
    { q: "when does internship start", a: "The internship starts every month. Once you apply, you will be added to the WhatsApp community and you can start immediately." },
    { q: "how are you", a: "I am doing great, thank you for asking! How can I help you with your internship today?" },
    { q: "hello hi hey", a: "Hello! How can I help you? You can ask me about the Internship, Certificate, or Tasks." },
    { q: "thank you thanks", a: "You are welcome! Best of luck with your internship. Feel free to ask if you have any more questions." },
    { q: "bye goodbye", a: "Goodbye! Thank you for using CodeAlpha Assistant. Have a great day!" },
    { q: "what is machine learning", a: "Machine Learning is a branch of AI where machines learn from data without being explicitly programmed. Cosine Similarity is a simple Machine Learning concept." },
    { q: "what is data science", a: "Data Science is the field of analyzing data to extract useful insights and make decisions. Python is the most popular language for Data Science." },
    { q: "how to contact support", a: "For support, you can message the CodeAlpha team on LinkedIn or ask in the official WhatsApp community." }
];

// NLTK-style Tokenization
function cleanText(text) {
    return text.toLowerCase().replace(/[?.,!]/g, "").split(" ").filter(w => w.length > 1);
}

// Cosine Similarity Logic
function getSimilarityScore(userWords, faqWords) {
    let common = 0;
    for (let w of userWords) {
        if (faqWords.includes(w)) common++;
    }
    if (common === 0) return 0;
    return common / Math.sqrt(userWords.length * faqWords.length);
}

function getBotReply(userText) {
    let userWords = cleanText(userText);
    let bestScore = 0;
    let bestAnswer = "";

    for (let faq of faqData) {
        let faqWords = cleanText(faq.q);
        let score = getSimilarityScore(userWords, faqWords);
        if (score > bestScore) {
            bestScore = score;
            bestAnswer = faq.a;
        }
    }

    if (bestScore > 0.15) {
        return bestAnswer;
    } else {
        return "I couldn't find an exact match in the FAQ database. You can try asking: <br>• 'When will I get the certificate?'<br>• 'How many tasks do I need to complete?'<br>• 'What is Cosine Similarity?'";
    }
}

// UI Functions
function sendMessage() {
    let input = document.getElementById("userInput");
    let text = input.value.trim();
    if (text === "") return;
    addMessage(text, "user-msg");
    input.value = "";
    setTimeout(() => {
        let reply = getBotReply(text);
        addMessage(reply, "bot-msg");
    }, 500);
}
function askQuick(q) { document.getElementById("userInput").value = q; sendMessage(); }
function addMessage(text, className) {
    let chatBox = document.getElementById("chatBox");
    let div = document.createElement("div");
    div.className = "msg " + className;
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
