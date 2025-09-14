// Algoritmo de detecção de tonalidade baseado em análise de frequência
class KeyDetector {
    constructor() {
        // Frequências das notas musicais (A4 = 440Hz como referência)
        this.noteFrequencies = {
            'C': [65.41, 130.81, 261.63, 523.25, 1046.50],
            'C#': [69.30, 138.59, 277.18, 554.37, 1108.73],
            'D': [73.42, 146.83, 293.66, 587.33, 1174.66],
            'D#': [77.78, 155.56, 311.13, 622.25, 1244.51],
            'E': [82.41, 164.81, 329.63, 659.25, 1318.51],
            'F': [87.31, 174.61, 349.23, 698.46, 1396.91],
            'F#': [92.50, 185.00, 369.99, 739.99, 1479.98],
            'G': [98.00, 196.00, 392.00, 783.99, 1567.98],
            'G#': [103.83, 207.65, 415.30, 830.61, 1661.22],
            'A': [110.00, 220.00, 440.00, 880.00, 1760.00],
            'A#': [116.54, 233.08, 466.16, 932.33, 1864.66],
            'B': [123.47, 246.94, 493.88, 987.77, 1975.53]
        };

        // Mapeamento de notas para tonalidades maiores
        this.majorKeys = {
            'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            'C#': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
            'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
            'D#': ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
            'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
            'F': ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
            'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
            'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
            'G#': ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
            'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
            'A#': ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
            'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
        };

        // Acordes comuns para cada tonalidade maior (Tríades Maiores e Menores)
        this.commonChords = {
            'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
            'C#': ['C#', 'D#m', 'Fm', 'F#', 'G#', 'A#m', 'Cdim'],
            'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
            'D#': ['D#', 'Fm', 'Gm', 'G#', 'A#', 'Cm', 'Ddim'],
            'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
            'F': ['F', 'Gm', 'Am', 'A#', 'C', 'Dm', 'Edim'],
            'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'Fdim'],
            'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
            'G#': ['G#', 'A#m', 'Cm', 'C#', 'D#', 'Fm', 'Gdim'],
            'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
            'A#': ['A#', 'Cm', 'Dm', 'D#', 'F', 'Gm', 'Adim'],
            'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim']
        };
    }

    // Converte dados de frequência em notas detectadas
    detectNotes(frequencyData, sampleRate) {
        const detectedNotes = [];
        const binSize = sampleRate / (frequencyData.length * 2);
        
        // Encontra picos de frequência
        for (let i = 1; i < frequencyData.length - 1; i++) {
            const frequency = i * binSize;
            const amplitude = frequencyData[i];
            
            // Só considera amplitudes significativas
            if (amplitude > 50 && 
                amplitude > frequencyData[i - 1] && 
                amplitude > frequencyData[i + 1]) {
                
                const note = this.frequencyToNote(frequency);
                if (note) {
                    detectedNotes.push({
                        note: note,
                        frequency: frequency,
                        amplitude: amplitude
                    });
                }
            }
        }
        
        return detectedNotes;
    }

    // Converte frequência para nota musical
    frequencyToNote(frequency) {
        let closestNote = null;
        let minDifference = Infinity;
        
        for (const [note, frequencies] of Object.entries(this.noteFrequencies)) {
            for (const noteFreq of frequencies) {
                const difference = Math.abs(frequency - noteFreq);
                if (difference < minDifference && difference < 10) { // Tolerância de 10Hz
                    minDifference = difference;
                    closestNote = note;
                }
            }
        }
        
        return closestNote;
    }

    // Detecta a tonalidade baseada nas notas encontradas
    detectKey(detectedNotes) {
        if (detectedNotes.length === 0) return null;
        
        // Conta a ocorrência de cada nota
        const noteCount = {};
        detectedNotes.forEach(noteData => {
            const note = noteData.note;
            noteCount[note] = (noteCount[note] || 0) + noteData.amplitude;
        });
        
        // Encontra a tonalidade que melhor se encaixa
        let bestKey = null;
        let bestScore = 0;
        
        for (const [key, scale] of Object.entries(this.majorKeys)) {
            let score = 0;
            
            // Calcula pontuação baseada nas notas da escala
            for (const note of scale) {
                if (noteCount[note]) {
                    score += noteCount[note];
                }
            }
            
            // Penaliza notas fora da escala
            for (const note in noteCount) {
                if (!scale.includes(note)) {
                    score -= noteCount[note] * 0.5;
                }
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestKey = key;
            }
        }
        
        return bestKey;
    }

    // Sugere acordes com base na tonalidade detectada
    suggestChords(key) {
        if (!key || !this.commonChords[key]) return [];
        return this.commonChords[key];
    }

    // Função principal para detectar tonalidade
    analyzeAudio(frequencyData, sampleRate) {
        const detectedNotes = this.detectNotes(frequencyData, sampleRate);
        const key = this.detectKey(detectedNotes);
        
        const suggestedChords = this.suggestChords(key);

        return {
            key: key,
            notes: detectedNotes,
            confidence: this.calculateConfidence(detectedNotes, key),
            suggestedChords: suggestedChords
        };
    }

    // Calcula a confiança da detecção
    calculateConfidence(detectedNotes, key) {
        if (!key || detectedNotes.length === 0) return 0;
        
        const scale = this.majorKeys[key];
        let inScaleCount = 0;
        let totalCount = detectedNotes.length;
        
        detectedNotes.forEach(noteData => {
            if (scale.includes(noteData.note)) {
                inScaleCount++;
            }
        });
        
        return Math.round((inScaleCount / totalCount) * 100);
    }
}

// Exporta a classe para uso no script principal
window.KeyDetector = KeyDetector;

