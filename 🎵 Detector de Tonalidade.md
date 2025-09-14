# 🎵 Detector de Tonalidade

Um aplicativo web para identificação instantânea da tonalidade de uma música (voz ou instrumento) em tempo real, com sugestão de acordes baseados na tonalidade detectada.

## Características

- **Detecção em Tempo Real**: Identifica a tonalidade instantaneamente enquanto você canta ou toca um instrumento
- **Sugestão de Acordes**: Exibe os acordes mais comuns da tonalidade detectada para facilitar o acompanhamento musical
- **Interface Moderna**: Design responsivo e intuitivo com gradientes e animações suaves
- **Compatibilidade**: Funciona em qualquer navegador moderno com suporte à Web Audio API
- **Sem Instalação**: Aplicativo web que roda diretamente no navegador

## Como Usar

1. Abra o aplicativo no seu navegador
2. Clique no botão "Iniciar Detecção"
3. Permita o acesso ao microfone quando solicitado
4. Cante ou toque um instrumento
5. A tonalidade será exibida em tempo real
6. Os acordes sugeridos aparecerão automaticamente baseados na tonalidade detectada

## Funcionalidades

### Detecção de Tonalidade
- Análise em tempo real das frequências de áudio
- Identificação precisa de tonalidades maiores
- Indicador de confiança da detecção

### Sugestão de Acordes
- Acordes diatônicos da tonalidade detectada
- Inclui tríades maiores, menores e diminutas
- Exibição clara e organizada dos acordes sugeridos

## Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação
- **CSS3**: Design moderno com gradientes e animações
- **JavaScript**: Lógica de processamento de áudio e detecção de tonalidade
- **Web Audio API**: Captura e análise de áudio em tempo real
- **FFT (Fast Fourier Transform)**: Análise de frequência para identificação de notas

## Algoritmo de Detecção

O aplicativo utiliza um algoritmo personalizado que:

1. Captura o áudio do microfone em tempo real
2. Aplica análise de frequência (FFT) para identificar picos de frequência
3. Converte as frequências em notas musicais
4. Analisa as notas detectadas para determinar a tonalidade mais provável
5. Calcula a confiança da detecção baseada na correspondência com escalas musicais
6. Sugere acordes diatônicos baseados na tonalidade identificada

## Acordes Sugeridos

Para cada tonalidade detectada, o aplicativo sugere os seguintes acordes diatônicos:
- I - Acorde maior da tônica
- ii - Acorde menor do segundo grau
- iii - Acorde menor do terceiro grau
- IV - Acorde maior do quarto grau
- V - Acorde maior do quinto grau
- vi - Acorde menor do sexto grau
- vii° - Acorde diminuto do sétimo grau

## Compatibilidade

- Chrome 66+
- Firefox 60+
- Safari 11.1+
- Edge 79+

## Limitações

- Requer permissão de acesso ao microfone
- Funciona melhor com instrumentos harmônicos e vozes afinadas
- A precisão pode variar dependendo do ruído ambiente e qualidade do microfone
- Atualmente suporta apenas tonalidades maiores

## Desenvolvido para Músicos

Este aplicativo foi especialmente desenvolvido para músicos que precisam identificar rapidamente a tonalidade de uma música e os acordes correspondentes durante ensaios, apresentações ou sessões de estudo musical. É uma ferramenta valiosa para acompanhamento musical, transposição e análise harmônica em tempo real.

