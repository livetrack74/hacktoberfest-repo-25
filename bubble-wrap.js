  document.addEventListener('DOMContentLoaded', () => {
            const bubbleGrid = document.getElementById('bubbleGrid');
            const numBubbles = 200;
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;

            let synth;
            const startAudio = async () => {
                if (Tone.context.state !== 'running') {
                    await Tone.start();
                }
                // Use a MembraneSynth for a more percussive sound
                synth = new Tone.MembraneSynth({
                    pitchDecay: 0.05,
                    octaves: 10,
                    envelope: {
                        attack: 0.001,
                        decay: 0.4,
                        sustain: 0.01,
                        release: 0.2
                    }
                }).toDestination();
            };

            // --- Theme Toggle Logic ---
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                body.classList.add(savedTheme);
                if (savedTheme === 'dark-mode') {
                    themeToggle.querySelector('.material-icons').textContent = 'light_mode';
                }
            }
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
                themeToggle.querySelector('.material-icons').textContent = body.classList.contains('dark-mode') ? 'light_mode' : 'brightness_2';
            });

            function createBubbles() {
                bubbleGrid.innerHTML = '';
                for (let i = 0; i < numBubbles; i++) {
                    const bubble = document.createElement('div');
                    bubble.classList.add('bubble');
                    bubble.addEventListener('mousedown', popBubble);
                    bubble.addEventListener('touchstart', popBubble, { passive: true });
                    bubbleGrid.appendChild(bubble);
                }
            }

            function popBubble(e) {
                const bubble = e.target;
                if (!bubble.classList.contains('popped')) {
                    bubble.classList.add('popped');
                    if (synth) {
                        // Trigger a random, more percussive note
                        const note = ["C3", "G3", "C4", "G4", "C5"][Math.floor(Math.random() * 5)];
                        synth.triggerAttackRelease(note, "8n");
                    }
                }
            }

            document.body.addEventListener('mousedown', startAudio, { once: true });
            document.body.addEventListener('touchstart', startAudio, { once: true });

            createBubbles();
        });