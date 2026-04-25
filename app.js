document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Initialization & Loading ---
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            initApp();
        }, 500);
    }, 1500);

    function initApp() {
        initTheme();
        initNavigation();
        initTimeline();
        initExplore();
        initSimulator();
        initQuiz();
        initGlossary();
        initGlobal();
        initChat();
        initAccessibility();
        animateStats();
        initParticles();
        
        // Removed Scroll tracker
    }

    // --- 2. Theme Management ---
    function initTheme() {
        const toggle = document.getElementById('themeToggle');
        const root = document.documentElement;
        
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            root.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            root.setAttribute('data-theme', 'light');
        }

        toggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 3. Navigation ---
    function initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const links = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.classList.remove('show');
                
                // Update active state
                links.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Intersection Observer for highlighting nav links on scroll
        const sections = document.querySelectorAll('section');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // --- 4. Timeline ---
    let currentTimelineIdx = 0;
    function initTimeline() {
        const viewer = document.getElementById('timelineViewer');
        const dotsContainer = document.getElementById('timelineDots');
        const progressFill = document.getElementById('timelineProgress');
        const prevBtn = document.getElementById('timelinePrev');
        const nextBtn = document.getElementById('timelineNext');

        // Create dots
        electionData.timeline.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = 'timeline-dot';
            dot.addEventListener('click', () => updateTimeline(idx));
            dotsContainer.appendChild(dot);
        });

        function updateTimeline(idx) {
            currentTimelineIdx = idx;
            const data = electionData.timeline[idx];
            
            // Update UI
            viewer.innerHTML = `
                <div class="timeline-card">
                    <h3>Step ${idx + 1}: ${data.title}</h3>
                    <p>${data.desc}</p>
                    <div class="timeline-details">
                        ${data.details.map(d => `<div>✓ ${d}</div>`).join('')}
                    </div>
                </div>
            `;

            // Update dots & progress
            const dots = dotsContainer.querySelectorAll('.timeline-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i <= idx);
            });
            progressFill.style.width = `${(idx / (electionData.timeline.length - 1)) * 100}%`;

            // Update buttons
            prevBtn.style.opacity = idx === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = idx === 0 ? 'none' : 'auto';
            nextBtn.style.opacity = idx === electionData.timeline.length - 1 ? '0.5' : '1';
            nextBtn.style.pointerEvents = idx === electionData.timeline.length - 1 ? 'none' : 'auto';
        }

        prevBtn.addEventListener('click', () => { if (currentTimelineIdx > 0) updateTimeline(currentTimelineIdx - 1); });
        nextBtn.addEventListener('click', () => { if (currentTimelineIdx < electionData.timeline.length - 1) updateTimeline(currentTimelineIdx + 1); });

        updateTimeline(0);
    }

    // --- 5. Explore Deep Dive ---
    function initExplore() {
        const tabs = document.querySelectorAll('.explore-tab');
        const content = document.getElementById('exploreContent');

        function updateExplore(tabId) {
            content.innerHTML = electionData.exploreContent[tabId];
            // Animate in
            content.style.opacity = '0';
            content.style.transform = 'translateY(10px)';
            setTimeout(() => {
                content.style.transition = 'all 0.3s';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 50);
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                updateExplore(e.target.dataset.tab);
            });
        });

        // Init first tab
        updateExplore('voter-rights');
    }

    // --- 6. Voting Simulator ---
    function initSimulator() {
        const screen = document.getElementById('simulatorScreen');
        const steps = document.querySelectorAll('.sim-step');
        let currentStep = 1;

        const renderStep = () => {
            // Update progress UI
            steps.forEach(step => {
                const stepNum = parseInt(step.dataset.step);
                step.classList.remove('active', 'completed');
                if (stepNum < currentStep) step.classList.add('completed');
                if (stepNum === currentStep) step.classList.add('active');
            });

            // Render Content
            if (currentStep === 1) {
                screen.innerHTML = `
                    <h3>Voter Registration</h3>
                    <p>Enter your details to check eligibility.</p>
                    <div class="sim-options">
                        <input type="text" placeholder="Full Name" class="search-input" style="margin-bottom: 1rem;">
                        <input type="number" placeholder="Age" class="search-input" id="simAge" style="margin-bottom: 1rem;">
                        <button class="btn btn-primary" id="simNextBtn">Check Eligibility</button>
                    </div>
                `;
                document.getElementById('simNextBtn').addEventListener('click', () => {
                    const age = document.getElementById('simAge').value;
                    if(age >= 18) { currentStep++; renderStep(); }
                    else { alert("You must be 18 or older to vote."); }
                });
            } else if (currentStep === 2) {
                screen.innerHTML = `
                    <h3>Identity Verification</h3>
                    <p>Presenting valid ID to the Polling Officer.</p>
                    <div class="sim-options">
                        <button class="sim-btn" id="simVerifyBtn">Show Voter ID Card</button>
                    </div>
                `;
                document.getElementById('simVerifyBtn').addEventListener('click', () => {
                    currentStep++; renderStep();
                });
            } else if (currentStep === 3) {
                screen.innerHTML = `
                    <h3>Cast Your Vote</h3>
                    <p>Select a candidate on the Electronic Voting Machine (EVM).</p>
                    <div class="sim-options">
                        <button class="sim-btn candidate-btn">Candidate A (Progressive Party)</button>
                        <button class="sim-btn candidate-btn">Candidate B (Conservative Party)</button>
                        <button class="sim-btn candidate-btn">NOTA (None of the Above)</button>
                    </div>
                `;
                document.querySelectorAll('.candidate-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        currentStep++; renderStep();
                    });
                });
            } else if (currentStep === 4) {
                screen.innerHTML = `
                    <h3>VVPAT Verification</h3>
                    <p>Checking the printed slip. Does it match your selection?</p>
                    <div class="sim-options">
                        <div style="background: white; color: black; padding: 2rem; border: 2px dashed #ccc; margin-bottom:1rem;">
                            VVPAT SLIP<br>Matches Your Choice
                        </div>
                        <button class="btn btn-primary" id="simConfirmBtn">Confirm & Finish</button>
                    </div>
                `;
                document.getElementById('simConfirmBtn').addEventListener('click', () => {
                    currentStep++; renderStep();
                });
            } else if (currentStep === 5) {
                screen.innerHTML = `
                    <h3>Vote Cast Successfully!</h3>
                    <div class="sim-result">Thank you for participating in democracy.</div>
                    <button class="btn btn-secondary mt-4" id="simRestartBtn" style="margin-top: 2rem;">Simulate Again</button>
                `;
                document.getElementById('simRestartBtn').addEventListener('click', () => {
                    currentStep = 1; renderStep();
                });
            }
        };

        renderStep();
    }

    // --- 7. Quiz ---
    let quizScore = 0;
    let currentQIdx = 0;
    function initQuiz() {
        const startDiv = document.getElementById('quizStart');
        const gameDiv = document.getElementById('quizGame');
        const catCards = document.querySelectorAll('.category-card');
        const questionText = document.getElementById('questionText');
        const optionsDiv = document.getElementById('quizOptions');
        const explanationDiv = document.getElementById('quizExplanation');
        const expContent = document.getElementById('explanationContent');
        const nextBtn = document.getElementById('quizNextBtn');
        const scoreSpan = document.getElementById('scorePoints');

        catCards.forEach(card => {
            card.addEventListener('click', () => {
                startDiv.classList.add('hidden');
                gameDiv.classList.remove('hidden');
                quizScore = 0;
                currentQIdx = 0;
                scoreSpan.innerText = '0';
                loadQuestion();
            });
        });

        function loadQuestion() {
            const qData = electionData.quiz[currentQIdx];
            questionText.innerText = qData.q;
            document.getElementById('quizQuestionCount').innerText = `Question ${currentQIdx + 1}/5`;
            
            optionsDiv.innerHTML = '';
            explanationDiv.classList.add('hidden');
            nextBtn.classList.add('hidden');

            qData.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.innerText = opt;
                btn.addEventListener('click', () => handleAnswer(idx, btn, qData.answer, qData.explanation));
                optionsDiv.appendChild(btn);
            });
        }

        function handleAnswer(selectedIdx, btnElement, correctIdx, explanation) {
            const options = optionsDiv.querySelectorAll('.quiz-option');
            options.forEach(opt => opt.disabled = true); // Disable all

            if (selectedIdx === correctIdx) {
                btnElement.classList.add('correct');
                quizScore += 100;
                scoreSpan.innerText = quizScore;
            } else {
                btnElement.classList.add('wrong');
                options[correctIdx].classList.add('correct');
            }

            expContent.innerText = explanation;
            explanationDiv.classList.remove('hidden');
            
            if (currentQIdx < 4) {
                nextBtn.classList.remove('hidden');
            } else {
                nextBtn.innerText = "Finish Quiz";
                nextBtn.classList.remove('hidden');
            }
        }

        nextBtn.addEventListener('click', () => {
            if (currentQIdx < 4) {
                currentQIdx++;
                loadQuestion();
            } else {
                gameDiv.innerHTML = `
                    <div style="text-align: center;">
                        <h2>Quiz Completed!</h2>
                        <div class="sim-result">Score: ${quizScore}</div>
                        <button class="btn btn-primary" style="margin-top:2rem;" onclick="location.reload()">Restart</button>
                    </div>
                `;
            }
        });
    }

    // --- 8. Glossary ---
    function initGlossary() {
        const grid = document.getElementById('glossaryGrid');
        const search = document.getElementById('glossarySearch');
        const filters = document.querySelectorAll('.filter-btn');

        function renderGlossary(filterText = '', charRange = 'all') {
            grid.innerHTML = '';
            
            let filtered = electionData.glossary.filter(item => {
                const matchesSearch = item.term.toLowerCase().includes(filterText.toLowerCase()) || 
                                      item.definition.toLowerCase().includes(filterText.toLowerCase());
                
                let matchesChar = true;
                if (charRange !== 'all') {
                    const firstChar = item.term.charAt(0).toUpperCase();
                    const [start, end] = charRange.split('-');
                    matchesChar = firstChar >= start && firstChar <= end;
                }
                
                return matchesSearch && matchesChar;
            });

            filtered.forEach(item => {
                grid.innerHTML += `
                    <div class="glossary-term">
                        <h4>${item.term}</h4>
                        <p>${item.definition}</p>
                    </div>
                `;
            });
        }

        search.addEventListener('input', (e) => {
            renderGlossary(e.target.value, document.querySelector('.filter-btn.active').dataset.filter);
        });

        filters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filters.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderGlossary(search.value, e.target.dataset.filter);
            });
        });

        renderGlossary();
    }

    // --- 9. Global Comparison ---
    function initGlobal() {
        const cardsDiv = document.getElementById('countryCards');
        const detailDiv = document.getElementById('countryDetail');
        const sel1 = document.getElementById('compareCountry1');
        const sel2 = document.getElementById('compareCountry2');
        const compTable = document.getElementById('comparisonTable');

        // Populate Cards
        electionData.global.forEach((country, idx) => {
            const card = document.createElement('div');
            card.className = `country-card ${idx === 0 ? 'active' : ''}`;
            card.innerHTML = `<span class="country-flag">${country.flag}</span> <span>${country.name}</span>`;
            card.addEventListener('click', () => {
                document.querySelectorAll('.country-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                updateCountryDetail(country);
            });
            cardsDiv.appendChild(card);
        });

        function updateCountryDetail(country) {
            detailDiv.innerHTML = `
                <h3>${country.flag} ${country.name}</h3>
                <p><strong>System:</strong> ${country.system}</p>
                <p><strong>Management Body:</strong> ${country.body}</p>
                <p><strong>Avg Turnout:</strong> ${country.turnout}</p>
                <p><strong>Voting Method:</strong> ${country.method}</p>
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--accent-primary);">
                    <strong>Unique Feature:</strong> ${country.unique}
                </div>
            `;
        }

        const compArena = document.getElementById('comparisonArena');

        function updateComparison() {
            const c1 = electionData.global.find(c => c.id === sel1.value);
            const c2 = electionData.global.find(c => c.id === sel2.value);

            const renderCard = (c) => {
                const turnoutPercent = c.turnout.replace(/[^0-9]/g, '');
                return `
                <div class="compare-card">
                    <div class="compare-card-header">
                        <span class="compare-flag">${c.flag}</span>
                        <h3>${c.name}</h3>
                    </div>
                    <div class="compare-stat">
                        <span class="stat-label">System</span>
                        <span class="stat-value badge">${c.system}</span>
                    </div>
                    <div class="compare-stat">
                        <span class="stat-label">Avg Turnout</span>
                        <div class="turnout-bar">
                            <div class="turnout-fill" style="width: ${turnoutPercent}%"></div>
                        </div>
                        <span class="stat-value highlight">${c.turnout}</span>
                    </div>
                    <div class="compare-stat">
                        <span class="stat-label">Voting Method</span>
                        <span class="stat-value">${c.method}</span>
                    </div>
                </div>
                `;
            };

            compArena.innerHTML = `
                ${renderCard(c1)}
                <div class="vs-arena-badge">VS</div>
                ${renderCard(c2)}
            `;
        }

        sel1.addEventListener('change', updateComparison);
        sel2.addEventListener('change', updateComparison);

        updateCountryDetail(electionData.global[0]);
        updateComparison();
    }

    // --- 10. AI Chat ---
    function initChat() {
        const toggle = document.getElementById('chatToggle');
        const widget = document.getElementById('chatWidget');
        const minimize = document.getElementById('chatMinimize');
        const input = document.getElementById('chatInput');
        const send = document.getElementById('chatSend');
        const messages = document.getElementById('chatMessages');
        const suggestions = document.querySelectorAll('.suggestion-chip');

        function openChat() {
            widget.classList.add('active');
            toggle.style.transform = 'scale(0)';
            document.getElementById('chatBadge').style.display = 'none';
        }

        toggle.addEventListener('click', openChat);
        
        const navCta = document.getElementById('openChatBtn');
        if (navCta) {
            navCta.addEventListener('click', (e) => {
                e.preventDefault();
                openChat();
            });
        }

        minimize.addEventListener('click', () => {
            widget.classList.remove('active');
            toggle.style.transform = 'scale(1)';
        });

        function addMessage(text, isUser = false) {
            const msg = document.createElement('div');
            msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
            msg.innerHTML = `
                ${!isUser ? '<div class="message-avatar">🤖</div>' : ''}
                <div class="message-content">${text}</div>
            `;
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        }

        function generateAIResponse(text) {
            const lowerText = text.toLowerCase();
            
            const glossaryMatch = electionData.glossary.find(item => lowerText.includes(item.term.toLowerCase()));
            if (glossaryMatch) return `Here's what I know about **${glossaryMatch.term}**: ${glossaryMatch.definition}`;

            if (lowerText.includes("right") || lowerText.includes("rights")) return "Every eligible citizen has fundamental rights: Universal Adult Suffrage, Secret Ballot, Right to Information, and NOTA.";
            if (lowerText.includes("system") || lowerText.includes("fptp") || lowerText.includes("pr")) return "Countries use different models to convert votes into seats, like First-Past-The-Post (FPTP), Proportional Representation (PR), and Ranked Choice.";
            if (lowerText.includes("finance") || lowerText.includes("money") || lowerText.includes("fund")) return "Regulating campaign finance is critical. This involves expenditure limits, transparency rules, and sometimes state funding.";
            if (lowerText.includes("security") || lowerText.includes("hack") || lowerText.includes("safe") || lowerText.includes("vvpat")) return "Modern elections require robust security. EVM machines are standalone to prevent hacking, and VVPAT provides a voter verifiable paper audit trail.";
            if (lowerText.includes("media") || lowerText.includes("news") || lowerText.includes("poll")) return "A free press is essential. State media provides equal time, and strict rules combat misinformation and regulate exit polls.";
            if (lowerText.includes("access") || lowerText.includes("disable") || lowerText.includes("blind")) return "Democracy must be accessible to all. This includes physical ramps, braille on EVMs, and remote voting options.";

            const timelineMatch = electionData.timeline.find(item => lowerText.includes(item.title.toLowerCase().split(' ')[0]) || lowerText.includes(item.title.toLowerCase().split(' ')[1] || 'xxxx'));
            if (timelineMatch) return `Regarding **${timelineMatch.title}**: ${timelineMatch.desc} For example: ${timelineMatch.details[0]}`;

            if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) return "Hello! I'm Poll-It, your Election Education AI. Ask me about voter rights, electoral systems, or how elections work!";

            return "That's an interesting topic! I'm a specialized AI focusing on democratic processes. Try asking me about 'Voter Rights', 'EVM Security', or 'Electoral Systems'.";
        }

        function handleSend() {
            const text = input.value.trim();
            if (!text) return;
            
            addMessage(text, true);
            input.value = '';

            // Simulated Smarter AI Response
            setTimeout(() => {
                const aiReply = generateAIResponse(text);
                addMessage(aiReply);
            }, 800 + Math.random() * 500);
        }

        send.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                input.value = chip.dataset.query;
                handleSend();
                document.getElementById('chatSuggestions').style.display = 'none';
            });
        });
    }

    // --- 11. Accessibility ---
    function initAccessibility() {
        const panel = document.getElementById('accessibilityPanel');
        const toggle = document.getElementById('accessibilityToggle');
        const menu = document.getElementById('accessibilityMenu');
        const root = document.body;

        toggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        document.getElementById('highContrast').addEventListener('change', (e) => {
            root.classList.toggle('high-contrast', e.target.checked);
        });
        document.getElementById('largeText').addEventListener('change', (e) => {
            root.classList.toggle('large-text', e.target.checked);
        });
        document.getElementById('reduceMotion').addEventListener('change', (e) => {
            root.classList.toggle('reduce-motion', e.target.checked);
        });
        document.getElementById('dyslexicFont').addEventListener('change', (e) => {
            root.classList.toggle('dyslexic-font', e.target.checked);
        });
        document.getElementById('textSizeSlider').addEventListener('input', (e) => {
            document.documentElement.style.fontSize = `${e.target.value}%`;
        });
    }

    // --- 12. Helpers & Animations ---
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    stat.innerText = target;
                }
            };
            update();
        });
    }

    // Removed progress tracker logic

    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(255, 255, 255, 0.1)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01;
                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});
