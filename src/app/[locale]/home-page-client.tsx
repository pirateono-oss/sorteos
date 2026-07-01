'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import { Shuffle, HelpCircle, Mic, FileText, Copy, Check, Play, Download, RotateCcw, Plus, Trash2 } from 'lucide-react';

const triviaData = {
  es: [
    { q: '¿Cuál es el río más largo del mundo?', a: 'El Amazonas', d: 'medium' },
    { q: '¿En qué año llegó el hombre a la luna?', a: '1969', d: 'easy' },
    { q: '¿Cuál es el país más grande de Sudamérica?', a: 'Brasil', d: 'easy' },
    { q: '¿Qué idioma se habla en Brasil?', a: 'Portugués', d: 'easy' },
    { q: '¿Cuál es la capital de Argentina?', a: 'Buenos Aires', d: 'easy' },
    { q: '¿Quién pintó "La noche estrellada"?', a: 'Vincent van Gogh', d: 'medium' },
    { q: '¿Cuántos huesos tiene el cuerpo humano adulto?', a: '206', d: 'hard' },
    { q: '¿Cuál es el océano más grande?', a: 'El Pacífico', d: 'medium' },
    { q: '¿En qué país se originó el fútbol?', a: 'Inglaterra', d: 'medium' },
    { q: '¿Cuál es el animal terrestre más rápido?', a: 'El guepardo', d: 'medium' },
    { q: '¿Qué planeta es conocido como el "planeta rojo"?', a: 'Marte', d: 'easy' },
    { q: '¿Cuántos continentes hay?', a: '7', d: 'easy' },
    { q: '¿Quién escribió "Cien años de soledad"?', a: 'Gabriel García Márquez', d: 'hard' },
    { q: '¿Cuál es el metal más caro del mundo?', a: 'El rodio', d: 'hard' },
    { q: '¿En qué año cayó el Muro de Berlín?', a: '1989', d: 'medium' },
    { q: '¿Cuál es el volcán más alto del mundo?', a: 'El Ojos del Salado', d: 'hard' },
    { q: '¿Qué país tiene más husos horarios?', a: 'Francia', d: 'hard' },
    { q: '¿Cuál es el libro más vendido de la historia?', a: 'La Biblia', d: 'medium' },
    { q: '¿Quién desarrolló la teoría de la relatividad?', a: 'Albert Einstein', d: 'medium' },
    { q: '¿Cuál es el país más poblado del mundo?', a: 'India', d: 'easy' },
  ],
  pt: [
    { q: 'Qual é o rio mais longo do mundo?', a: 'O Amazonas', d: 'medium' },
    { q: 'Em que ano o homem chegou à lua?', a: '1969', d: 'easy' },
    { q: 'Qual é o maior país da América do Sul?', a: 'Brasil', d: 'easy' },
    { q: 'Qual é a capital da Argentina?', a: 'Buenos Aires', d: 'easy' },
    { q: 'Quem pintou "A noite estrelada"?', a: 'Vincent van Gogh', d: 'medium' },
    { q: 'Quantos ossos tem o corpo humano adulto?', a: '206', d: 'hard' },
    { q: 'Qual é o oceano mais grande?', a: 'O Pacífico', d: 'medium' },
    { q: 'Qual é o animal terrestre mais rápido?', a: 'O guepardo', d: 'medium' },
    { q: 'Qual planeta é conhecido como "planeta vermelho"?', a: 'Marte', d: 'easy' },
    { q: 'Quantos continentes existem?', a: '7', d: 'easy' },
    { q: 'Quem escreveu "Cem anos de solidão"?', a: 'Gabriel García Márquez', d: 'hard' },
    { q: 'Qual é o metal mais caro do mundo?', a: 'O ródio', d: 'hard' },
    { q: 'Em que ano caiu o Muro de Berlim?', a: '1989', d: 'medium' },
    { q: 'Qual é o país mais populoso do mundo?', a: 'Índia', d: 'easy' },
  ],
  en: [
    { q: 'What is the longest river in the world?', a: 'The Amazon', d: 'medium' },
    { q: 'What year did man land on the moon?', a: '1969', d: 'easy' },
    { q: 'What is the largest country in South America?', a: 'Brazil', d: 'easy' },
    { q: 'Who painted "The Starry Night"?', a: 'Vincent van Gogh', d: 'medium' },
    { q: 'How many bones are in the adult human body?', a: '206', d: 'hard' },
    { q: 'What is the largest ocean?', a: 'The Pacific', d: 'medium' },
    { q: 'What is the fastest land animal?', a: 'The cheetah', d: 'medium' },
    { q: 'Which planet is known as the "Red Planet"?', a: 'Mars', d: 'easy' },
    { q: 'How many continents are there?', a: '7', d: 'easy' },
    { q: 'Who wrote "One Hundred Years of Solitude"?', a: 'Gabriel García Márquez', d: 'hard' },
    { q: 'What is the most expensive metal in the world?', a: 'Rhodium', d: 'hard' },
    { q: 'What year did the Berlin Wall fall?', a: '1989', d: 'medium' },
    { q: 'What is the most populous country in the world?', a: 'India', d: 'easy' },
  ],
};

export default function SorteosPage() {
  const params = useParams();
  const locale = params.locale as string;
  if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const [tab, setTab] = useState<'wheel' | 'trivia' | 'voice' | 'essay'>('wheel');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl tool-icon shadow-lg">
          <Shuffle className="h-7 w-7 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{dict.siteTitle}</h1>
        <p className="text-muted-foreground">{dict.siteTagline}</p>
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {[
          { key: 'wheel', label: dict.wheelOfNames, icon: Shuffle },
          { key: 'trivia', label: dict.triviaGen, icon: HelpCircle },
          { key: 'voice', label: dict.voiceRecorder, icon: Mic },
          { key: 'essay', label: dict.essayTyper, icon: FileText },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as typeof tab)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${tab === key ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-foreground hover:bg-secondary border border-border'}`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {tab === 'wheel' && <WheelOfNames dict={dict} />}
      {tab === 'trivia' && <TriviaGen dict={dict} locale={locale} />}
      {tab === 'voice' && <VoiceRecorder dict={dict} />}
      {tab === 'essay' && <EssayTyper dict={dict} locale={locale} />}
    </div>
  );
}

function WheelOfNames({ dict }: { dict: any }) {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const addName = () => {
    if (input.trim() && !names.includes(input.trim())) {
      setNames([...names, input.trim()]);
      setInput('');
    }
  };

  const spin = () => {
    if (names.length < 2 || spinning) return;
    setSpinning(true);
    setWinner(null);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const slice = 360 / names.length;
    const target = Math.floor(Math.random() * names.length);
    const totalRotation = rotation + extraSpins * 360 + (360 - target * slice - slice / 2);
    setRotation(totalRotation);
    
    setTimeout(() => {
      setSpinning(false);
      setWinner(names[target]);
    }, 4000);
  };

  const colors = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F','#BB8FCE','#85C1E9'];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col items-center gap-6">
        {/* Wheel */}
        <div className="mb-2 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/30 p-3 text-xs text-muted-foreground">
          💡 <strong>Cómo usar:</strong> Añade al menos 2 nombres, luego presiona <strong>¡Girar!</strong> para seleccionar un ganador al azar.
        </div>
        <div className="relative" style={{ width: 280, height: 280 }}>
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-lg" style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
            {names.map((name, i) => {
              const slice = 360 / names.length;
              return (
                <div key={i} className="absolute left-1/2 top-0 flex items-center justify-center"
                  style={{ width: 140, height: 140, transformOrigin: '0 140px', transform: `rotate(${i * slice}deg)`, background: colors[i % colors.length], clipPath: `polygon(0 0, 50% 100%, 100% 0)` }}>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2"
            style={{ borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '28px solid #ef4444' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-lg font-bold shadow-md">?</div>
          </div>
        </div>

        {winner && <p className="text-xl font-bold text-primary">🎉 {dict.winner}: {winner}</p>}

        {/* Names list */}
        <div className="flex w-full flex-wrap gap-2">
          {names.map((name, i) => (
            <span key={i} className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-sm">
              {name}
              <button onClick={() => setNames(names.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
            </span>
          ))}
        </div>

        <div className="flex w-full gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addName()}
            placeholder={dict.enterName} className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" />
          <button onClick={addName} className="flex items-center gap-1 rounded-xl bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"><Plus className="h-4 w-4" /></button>
        </div>

        <div className="flex gap-3">
          <button onClick={spin} disabled={names.length < 2 || spinning}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold ${names.length < 2 || spinning ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
            <Shuffle className="h-4 w-4" /> {dict.spin}
          </button>
          <button onClick={() => { setNames([]); setWinner(null); setRotation(0); }}
            className="flex items-center gap-1 rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-secondary/80">
            <RotateCcw className="h-4 w-4" /> {dict.resetWheel}
          </button>
        </div>
      </div>
    </div>
  );
}

function TriviaGen({ dict, locale }: { dict: any; locale: string }) {
  const items = triviaData[locale as keyof typeof triviaData] || triviaData.en;
  const [difficulty, setDifficulty] = useState<string>('all');
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const filtered = difficulty === 'all' ? items : items.filter(q => q.d === difficulty);
  const question = filtered[current] || filtered[0];

  const next = () => {
    setShowAnswer(false);
    setCurrent((current + 1) % filtered.length);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {[
          { key: 'all', label: dict.all },
          { key: 'easy', label: dict.easy },
          { key: 'medium', label: dict.medium },
          { key: 'hard', label: dict.hard },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => { setDifficulty(key); setCurrent(0); setShowAnswer(false); }}
            className={`rounded-lg px-3 py-1.5 text-sm ${difficulty === key ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}>
            {label}
          </button>
        ))}
      </div>

      {question && (
        <div className="mb-2 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/30 p-3 text-xs text-muted-foreground">
          💡 <strong>Cómo usar:</strong> Elige la dificultad, lee la pregunta y toca <strong>Mostrar respuesta</strong> para verificar.
        </div>
        <div className="py-8">
          <p className="mb-2 text-xs text-muted-foreground uppercase tracking-wide">{dict.question}</p>
          <p className="mb-8 text-xl font-semibold leading-relaxed">{question.q}</p>
          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              {dict.showAnswer}
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-bold text-primary">✓ {question.a}</p>
              <button onClick={next} className="rounded-xl bg-secondary px-6 py-3 text-sm font-semibold hover:bg-secondary/80">
                {dict.nextQuestion}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VoiceRecorder({ dict }: { dict: any }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = e => chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.current.start();
      setRecording(true);
    } catch {}
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <div className="mb-2 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/30 p-3 text-xs text-muted-foreground">
        💡 <strong>Cómo usar:</strong> Presiona <strong>Empezar a grabar</strong>, habla al micrófono, luego presiona Detener. Puedes reproducir o descargar el audio.
      </div>
      <div className="mb-6 flex justify-center">
        <div className={`flex h-32 w-32 items-center justify-center rounded-full${recording ? 'bg-red-100 animate-pulse' : 'bg-secondary'}`}>
          <Mic className={`h-12 w-12 ${recording ? 'text-red-500' : 'text-muted-foreground'}`} />
        </div>
      </div>

      {recording ? (
        <button onClick={stopRecording} className="rounded-xl bg-red-500 px-8 py-3 text-sm font-semibold text-white hover:bg-red-600">
          ⏹ {dict.stopRecording}
        </button>
      ) : (
        <button onClick={startRecording} className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          🎤 {dict.startRecording}
        </button>
      )}

      {recording && <p className="mt-4 text-sm text-red-500 animate-pulse">🔴 {dict.recording}</p>}

      {audioUrl && !recording && (
        <div className="mt-6 flex justify-center gap-3">
          <audio controls src={audioUrl} className="h-10" />
          <a href={audioUrl} download="recording.webm" className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm hover:bg-secondary/80">
            <Download className="h-4 w-4" /> {dict.downloadRecording}
          </a>
        </div>
      )}
    </div>
  );
}

function EssayTyper({ dict, locale }: { dict: any; locale: string }) {
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const wordCount = text ? text.split(/\s+/).length : 0;

  const templates: Record<string, string[]> = {
    es: [
      'El {tema} es un tema fascinante que ha capturado la atención de expertos y público general por igual. A lo largo de la historia, hemos visto cómo este campo ha evolucionado de maneras sorprendentes.\n\nEn primer lugar, es importante entender los fundamentos del {tema}. Desde sus orígenes hasta su desarrollo actual, cada etapa ha contribuido a formar lo que conocemos hoy.\n\nAdemás, el impacto del {tema} en la sociedad contemporánea no puede subestimarse. Cada día, nuevas investigaciones y descubrimientos amplían nuestro conocimiento y abren nuevas posibilidades.\n\nEn conclusión, el {tema} seguirá siendo un área de gran interés y relevancia en los próximos años, ofreciendo oportunidades para seguir aprendiendo y descubriendo.',
      '¿Qué sabemos realmente sobre {tema}? Esta pregunta ha intrigado a pensadores durante generaciones.\n\nEl {tema} nos invita a reflexionar sobre aspectos fundamentales de nuestra existencia. A través del estudio de este fenómeno, podemos obtener una comprensión más profunda del mundo que nos rodea.\n\nExpertos en la materia han señalado que el {tema} presenta tanto desafíos como oportunidades. Por un lado, nos enfrentamos a preguntas complejas que requieren soluciones innovadoras.\n\nPor otro lado, precisamente esta complejidad hace que el estudio del {tema} sea tan apasionante y gratificante.',
      '{tema} representa uno de los pilares fundamentales de nuestro entendimiento moderno. Desde las civilizaciones antiguas hasta la era digital, este concepto ha evolucionado constantemente.\n\nLos investigadores han dedicado décadas al estudio del {tema}, produciendo una vasta cantidad de literatura y conocimiento. Sin embargo, todavía hay mucho por descubrir.\n\nLo que hace al {tema} particularmente interesante es su naturaleza multidisciplinaria. No se limita a un solo campo, sino que abarca múltiples áreas del saber humano.\n\nMirando hacia el futuro, está claro que {tema} continuará siendo un tema central en nuestras discusiones académicas y cotidianas.',
    ],
    pt: [
      'O {tema} é um tópico fascinante que tem capturado a atenção de especialistas e do público em geral. Ao longo da história, temos visto como este campo evoluiu de maneiras surpreendentes.\n\nEm primeiro lugar, é importante entender os fundamentos do {tema}. Desde suas origens até seu desenvolvimento atual, cada etapa contribuiu para formar o que conhecemos hoje.\n\nAlém disso, o impacto do {tema} na sociedade contemporânea não pode ser subestimado. Cada dia, novas pesquisas e descobertas ampliam nosso conhecimento.\n\nEm conclusão, o {tema} continuará sendo uma área de grande interesse e relevância nos próximos anos.',
    ],
    en: [
      'The topic of {tema} is fascinating and has captured the attention of experts and the general public alike. Throughout history, we have seen how this field has evolved in surprising ways.\n\nFirst, it is important to understand the fundamentals of {tema}. From its origins to its current development, each stage has contributed to forming what we know today.\n\nFurthermore, the impact of {tema} on contemporary society cannot be underestimated. Every day, new research and discoveries expand our knowledge.\n\nIn conclusion, {tema} will continue to be an area of great interest and relevance in the coming years.',
    ],
  };

  const generate = () => {
    if (!topic.trim()) return;
    const lang = locale === 'pt' ? 'pt' : locale === 'es' ? 'es' : 'en';
    const tpls = templates[lang] || templates.en;
    const tpl = tpls[Math.floor(Math.random() * tpls.length)];
    setText(tpl.replace(/\{tema\}/g, topic.trim()));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-2 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/30 p-3 text-xs text-muted-foreground">
            💡 <strong>Cómo usar:</strong> Escribe un tema (ej: inteligencia artificial, cambio climático) y presiona <strong>Generar texto</strong> para obtener un párrafo automático.
          </div>
        <div className="flex gap-3">
          <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()}
            placeholder={dict.topic} className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
          <button onClick={generate} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <FileText className="h-4 w-4" /> {dict.generateText}
          </button>
        </div>
      </div>

      {text && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{wordCount} {dict.wordCount}</p>
            <div className="flex gap-2">
              <button onClick={() => navigator.clipboard.writeText(text)}
                className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs hover:bg-secondary/80">
                <Copy className="h-3 w-3" /> {dict.copyText}
              </button>
              <button onClick={generate} className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs hover:bg-secondary/80">
                <RotateCcw className="h-3 w-3" /> {dict.generateMore}
              </button>
            </div>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed text-foreground">{text}</div>
        </div>
      )}
    </div>
  );
}
