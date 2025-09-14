const startButton = document.getElementById('startButton');
const keyDisplay = document.getElementById('keyDisplay');
const chordsDisplay = document.getElementById('chordsDisplay');
const statusIndicator = document.getElementById('statusIndicator');

let audioContext;
let analyser;
let microphone;
let javascriptNode;
let keyDetector;

// Inicializa o detector de tonalidade
keyDetector = new KeyDetector();

startButton.addEventListener('click', async () => {
    if (audioContext && audioContext.state === 'running') {
        audioContext.suspend();
        startButton.innerHTML = '<span class="status-indicator" id="statusIndicator"></span>Iniciar Detecção';
        keyDisplay.textContent = '--';
        keyDisplay.className = '';
        chordsDisplay.textContent = '--';
        chordsDisplay.className = '';
        statusIndicator.classList.remove('active');
        return;
    }

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphone = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 2048;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = () => {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);

            // Analisa o áudio para detectar a tonalidade
            const result = keyDetector.analyzeAudio(array, audioContext.sampleRate);
            
            if (result.key && result.confidence > 30) {
                keyDisplay.textContent = `${result.key}`;
                keyDisplay.className = '';
                
                // Exibe os acordes sugeridos
                if (result.suggestedChords && result.suggestedChords.length > 0) {
                    chordsDisplay.textContent = result.suggestedChords.join(' • ');
                    chordsDisplay.className = '';
                } else {
                    chordsDisplay.textContent = 'Nenhum acorde sugerido';
                    chordsDisplay.className = '';
                }
            } else {
                keyDisplay.textContent = 'Analisando...';
                keyDisplay.className = 'analyzing';
                chordsDisplay.textContent = 'Analisando...';
                chordsDisplay.className = 'analyzing';
            }
        };

        audioContext.resume();
        startButton.innerHTML = '<span class="status-indicator active"></span>Parar Detecção';
    } catch (err) {
        console.error('Erro ao acessar o microfone:', err);
        keyDisplay.textContent = 'Erro: Microfone não acessível';
        keyDisplay.className = 'error';
        chordsDisplay.textContent = 'Erro: Microfone não acessível';
        chordsDisplay.className = 'error';
        alert('Não foi possível acessar o microfone. Verifique as permissões.');
    }
});


