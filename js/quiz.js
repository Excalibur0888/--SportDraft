class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.totalQuestions = 5;
        this.questions = [
            {
                question: "What is Fantasy Sports?",
                options: [
                    "A video game genre",
                    "A virtual sports competition based on real-world statistics",
                    "A sports movie category",
                    "A type of sports equipment"
                ],
                correct: 1
            },
            {
                question: "How do players earn points in Fantasy Sports?",
                options: [
                    "By watching sports games",
                    "Through real athletes' performance statistics",
                    "By predicting game outcomes",
                    "By playing video games"
                ],
                correct: 1
            },
            {
                question: "What is a Fantasy Sports Draft?",
                options: [
                    "A lottery system",
                    "A team selection process",
                    "A tournament format",
                    "A scoring system"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a common type of Fantasy Sports league?",
                options: [
                    "Season-long leagues",
                    "Daily fantasy sports",
                    "Virtual reality leagues",
                    "Dynasty leagues"
                ],
                correct: 2
            },
            {
                question: "What makes a successful Fantasy Sports strategy?",
                options: [
                    "Following team rivalries",
                    "Data analysis and player statistics",
                    "Choosing favorite players",
                    "Copying other players' teams"
                ],
                correct: 1
            }
        ];
        
        this.selectedAnswer = null;
        this.init();
    }

    init() {
        this.updateUI();
        this.setupEventListeners();
    }

    updateUI() {
        // Update progress
        const progressInfo = document.querySelector('.quiz-progress-info');
        progressInfo.textContent = `Question ${this.currentQuestion + 1} of ${this.totalQuestions}`;

        // Update progress bar
        const progressFill = document.querySelector('.quiz-progress-fill');
        progressFill.style.width = `${((this.currentQuestion + 1) / this.totalQuestions) * 100}%`;

        // Update question
        const questionEl = document.querySelector('.quiz-question');
        questionEl.textContent = this.questions[this.currentQuestion].question;

        // Update options
        const optionsContainer = document.querySelector('.quiz-options');
        optionsContainer.innerHTML = '';
        
        this.questions[this.currentQuestion].options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option';
            optionEl.dataset.index = index;
            optionEl.textContent = option;
            optionsContainer.appendChild(optionEl);
        });

        // Update navigation buttons
        const prevButton = document.querySelector('.quiz-nav-button.previous');
        const nextButton = document.querySelector('.quiz-nav-button.next');

        prevButton.disabled = this.currentQuestion === 0;
        nextButton.disabled = true;

        if (this.currentQuestion === this.totalQuestions - 1) {
            nextButton.textContent = 'Finish Quiz';
        } else {
            nextButton.textContent = 'Next Question';
        }
    }

    setupEventListeners() {
        const optionsContainer = document.querySelector('.quiz-options');
        const prevButton = document.querySelector('.quiz-nav-button.previous');
        const nextButton = document.querySelector('.quiz-nav-button.next');

        optionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.quiz-option');
            if (!option) return;

            // Remove previous selection
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Add new selection
            option.classList.add('selected');
            this.selectedAnswer = parseInt(option.dataset.index);
            nextButton.disabled = false;
        });

        prevButton.addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.selectedAnswer = null;
                this.updateUI();
            }
        });

        nextButton.addEventListener('click', () => {
            if (this.selectedAnswer === null) return;

            // Show correct/incorrect feedback
            const options = document.querySelectorAll('.quiz-option');
            const correctAnswer = this.questions[this.currentQuestion].correct;

            options[correctAnswer].classList.add('correct');
            if (this.selectedAnswer !== correctAnswer) {
                options[this.selectedAnswer].classList.add('incorrect');
            }

            // Wait before moving to next question
            setTimeout(() => {
                if (this.currentQuestion < this.totalQuestions - 1) {
                    this.currentQuestion++;
                    this.selectedAnswer = null;
                    this.updateUI();
                } else {
                    this.finishQuiz();
                }
            }, 1500);

            // Disable navigation while showing feedback
            nextButton.disabled = true;
            prevButton.disabled = true;
        });
    }

    finishQuiz() {
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-header">
                <h2>Quiz Completed!</h2>
                <p>Thank you for testing your Fantasy Sports knowledge.</p>
            </div>
            <button class="quiz-nav-button next" onclick="location.reload()">Try Again</button>
        `;
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
}); 