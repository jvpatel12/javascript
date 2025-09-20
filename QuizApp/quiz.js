document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const questionCon = document.getElementById('question-container');
    const choicesList = document.getElementById('choices-list');
    const resultCon = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');

    const questions = [
        {
            "question": "Which data structure uses LIFO (Last In, First Out) ordering?",
            "choices": ["Queue", "Stack", "Linked List", "Binary Tree"],
            "answer": "Stack"
        },
        {
            "question": "Which SQL clause is used to remove duplicate rows from the result set?",
            "choices": ["UNIQUE", "DISTINCT", "GROUP BY", "HAVING"],
            "answer": "DISTINCT"
        },
        {
            "question": "Which HTTP method is typically used to update only part of a resource?",
            "choices": ["GET", "POST", "PUT", "PATCH"],
            "answer": "PATCH"
        },
        {
            "question": "What does DNS stand for?",
            "choices": ["Data Network Service", "Domain Name System", "Distributed Numbering Service", "Domain Networking Standard"],
            "answer": "Domain Name System"
        },
        {
            "question": "Which of the following is an example of a symmetric encryption algorithm?",
            "choices": ["RSA", "ECC", "AES", "DSA"],
            "answer": "AES"
        },
        {
            "question": "Which cloud service model provides just virtualized hardware and networking resources?",
            "choices": ["SaaS", "PaaS", "IaaS", "FaaS"],
            "answer": "IaaS"
        },
        {
            "question": "In CI/CD pipelines, what does CI stand for?",
            "choices": ["Continuous Integration", "Continuous Inspection", "Continuous Implementation", "Continuous Interaction"],
            "answer": "Continuous Integration"
        },
        {
            "question": "Which scheduling algorithm gives each process a small time slice in a cyclic order?",
            "choices": ["First-Come, First-Served", "Shortest Job First", "Round Robin", "Priority Scheduling"],
            "answer": "Round Robin"
        },
        {
            "question": "What is the average-case time complexity of searching for an element in a balanced BST?",
            "choices": ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            "answer": "O(log n)"
        },
        {
            "question": "Which technique is primarily used to reduce overfitting by randomly disabling neurons during training?",
            "choices": ["Batch Normalization", "Dropout", "Gradient Clipping", "Data Augmentation"],
            "answer": "Dropout"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    startButton.addEventListener('click', startQuiz);

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultCon.classList.add('hidden');
        startQuiz();
    });

    function startQuiz() {
        startButton.classList.add('hidden');
        resultCon.classList.add('hidden');
        questionCon.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        answered = false;
        nextButton.classList.add("hidden");
        questionCon.classList.remove('hidden');
        resultCon.classList.add("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
        const currentQ = questions[currentQuestionIndex];
        questionText.textContent = currentQ.question;
        choicesList.innerHTML = "";
        currentQ.choices.forEach((choice) => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.style.cursor = "pointer";
            li.addEventListener('click', () => selectAnswer(li, choice));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(selectedLi, choice) {
        if (answered) return;
        answered = true;
        const correctAnswer = questions[currentQuestionIndex].answer;
        Array.from(choicesList.children).forEach(li => {
            li.style.pointerEvents = 'none';
            if (li.textContent === correctAnswer) {
                li.style.background = '#16a34a';
                li.style.color = '#fff';
            }
        });
        if (choice === correctAnswer) {
            score++;
        } else {
            selectedLi.style.background = '#dc2626';
            selectedLi.style.color = '#fff';
        }
        nextButton.classList.remove("hidden");
    }

    function showResult() {
        questionCon.classList.add('hidden');
        resultCon.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
        startButton.classList.remove('hidden');
    }
}); 