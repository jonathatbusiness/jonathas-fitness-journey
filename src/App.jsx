import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Target, Activity, ChevronDown } from "lucide-react";
import "./App.css";

const workouts = {
  A: {
    title: "Treino A",
    subtitle: "Postura, costas, peito equilibrado, glúteo e core",
    exercises: [
      {
        name: "Puxada frontal na polia",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wide-grip-lat-pull-down-1.gif",
        equipment: "Máquina pulley",
        sets: "3",
        reps: "10–12",
        load: "25kg inicial | até 30kg se fácil",
        execution:
          "Mantenha o peito aberto, puxe a barra até a parte superior do peito e conduza os cotovelos para baixo. Não jogue o tronco para trás.",
        goal: "Fortalecer dorsal, abrir o tronco e ajudar na correção dos ombros projetados para frente.",
      },
      {
        name: "Remada sentada",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cable%20seated%20rows%201.png",
        equipment: "Remada articulada ou polia",
        sets: "3",
        reps: "10–12",
        load: "30kg inicial | 35kg se confortável",
        execution:
          "Inicie a puxada pelas escápulas, mantenha o peito firme e evite impulsionar a lombar.",
        goal: "Fortalecer costas médias, melhorar alinhamento escapular e sustentar postura mais aberta.",
      },
      {
        name: "Supino máquina ou halteres",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bench_press_1.jpg",
        equipment: "Máquina convergente ou halteres",
        sets: "3",
        reps: "10–12",
        load: "10kg cada lado ou halteres de 10kg",
        execution:
          "Mantenha ombros para trás, peito aberto e controle a descida. Não deixe os ombros subirem.",
        goal: "Fortalecer peitoral sem reforçar postura fechada.",
      },
      {
        name: "Face Pull",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/CableMachineUprightRow.JPG",
        equipment: "Polia com corda",
        sets: "3",
        reps: "12–15",
        load: "10–15kg",
        execution:
          "Puxe a corda na direção do rosto, abrindo os cotovelos. Movimento controlado, sem roubar.",
        goal: "Melhorar postura, fortalecer deltoide posterior, manguito e estabilidade escapular.",
      },
      {
        name: "Agachamento no Smith",
        image:
          "https://placehold.co/1200x700/111722/8df7a6?text=Agachamento+Smith",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Agachamento+Smith",
        equipment: "Smith",
        sets: "3",
        reps: "10–12",
        load: "Apenas barra nas 2 primeiras semanas",
        execution:
          "Pés firmes, tronco estável, desça controlando o quadril e suba sem travar os joelhos.",
        goal: "Fortalecer pernas, glúteos e estabilidade corporal.",
      },
      {
        name: "Mesa flexora",
        image: "https://placehold.co/1200x700/111722/8df7a6?text=Mesa+Flexora",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Mesa+Flexora",
        equipment: "Mesa flexora",
        sets: "3",
        reps: "12",
        load: "20–25kg",
        execution:
          "Flexione os joelhos de forma controlada, sem tirar o quadril do apoio.",
        goal: "Fortalecer posterior de coxa e equilibrar a cadeia inferior.",
      },
      {
        name: "Prancha",
        image: "https://placehold.co/1200x700/111722/8df7a6?text=Prancha",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Prancha",
        equipment: "Peso corporal",
        sets: "3",
        reps: "30–45s",
        load: "Peso corporal",
        execution:
          "Corpo em linha reta, abdômen ativo, sem deixar o quadril cair.",
        goal: "Fortalecer core e melhorar estabilização postural.",
      },
    ],
  },
  B: {
    title: "Treino B",
    subtitle: "Posterior, ombro, estabilidade, definição e pernas",
    exercises: [
      {
        name: "Puxada neutra",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/Close-grip-front-lat-pull-down-1.png",
        equipment: "Pulley com pegada neutra",
        sets: "3",
        reps: "10–12",
        load: "25–30kg",
        execution:
          "Puxe com cotovelos para baixo, peito aberto e tronco firme.",
        goal: "Trabalhar dorsal, costas superiores e postura.",
      },
      {
        name: "Remada baixa articulada",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cable-seated-rows-1.png",
        equipment: "Máquina articulada ou polia",
        sets: "3",
        reps: "10–12",
        load: "10–15kg por lado ou 30kg na polia",
        execution:
          "Puxe sem balançar o tronco. Contraia as escápulas no final do movimento.",
        goal: "Fortalecer costas médias e melhorar estabilidade escapular.",
      },
      {
        name: "Desenvolvimento de ombro máquina",
        image:
          "https://placehold.co/1200x700/111722/8df7a6?text=Desenvolvimento+de+Ombro",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Desenvolvimento+de+Ombro",
        equipment: "Máquina de ombro",
        sets: "3",
        reps: "10–12",
        load: "10kg cada lado ou 20kg total",
        execution:
          "Empurre de forma controlada, sem elevar demais os ombros ou arquear a lombar.",
        goal: "Fortalecer ombros com controle e estabilidade.",
      },
      {
        name: "Crucifixo inverso",
        image:
          "https://placehold.co/1200x700/111722/8df7a6?text=Crucifixo+Inverso",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Crucifixo+Inverso",
        equipment: "Máquina peck deck inverso",
        sets: "3",
        reps: "12–15",
        load: "10–15kg",
        execution:
          "Abra os braços com controle, sentindo a parte posterior dos ombros.",
        goal: "Melhorar postura visual, ombros alinhados e costas superiores.",
      },
      {
        name: "Leg Press",
        image: "https://placehold.co/1200x700/111722/8df7a6?text=Leg+Press",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Leg+Press",
        equipment: "Leg press",
        sets: "3",
        reps: "12",
        load: "80–100kg total",
        execution:
          "Pés firmes, descida controlada e sem travar completamente os joelhos na subida.",
        goal: "Fortalecer pernas, glúteos e estabilidade inferior.",
      },
      {
        name: "Stiff com halteres",
        image:
          "https://placehold.co/1200x700/111722/8df7a6?text=Stiff+com+Halteres",
        fallbackImage:
          "https://placehold.co/1200x700/111722/8df7a6?text=Stiff+com+Halteres",
        equipment: "Halteres",
        sets: "3",
        reps: "10–12",
        load: "10kg cada halter",
        execution:
          "Coluna neutra, quadril para trás e descida lenta. Sinta posterior e glúteos.",
        goal: "Fortalecer cadeia posterior, glúteos e estabilidade lombopélvica.",
      },
      {
        name: "Abdominal máquina ou crunch",
        image:
          "https://commons.wikimedia.org/wiki/Special:Redirect/file/Crunches.jpg",
        equipment: "Máquina abdominal ou solo",
        sets: "3",
        reps: "15",
        load: "20kg na máquina ou peso corporal",
        execution:
          "Contraia o abdômen sem puxar o pescoço. Movimento curto e controlado.",
        goal: "Fortalecer core e melhorar sustentação do tronco.",
      },
    ],
  },
};

function ExerciseAccordion({ exercise, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.article className="accordion-card" layout>
      <button className="accordion-header" onClick={() => setOpen(!open)}>
        <span>{exercise.name}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="accordion-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="exercise-image"
              onError={(event) => {
                event.currentTarget.src = exercise.fallbackImage;
              }}
            />

            <div className="exercise-grid">
              <div>
                <strong>Equipamento</strong>
                <span>{exercise.equipment}</span>
              </div>
              <div>
                <strong>Séries</strong>
                <span>{exercise.sets}</span>
              </div>
              <div>
                <strong>Repetições</strong>
                <span>{exercise.reps}</span>
              </div>
              <div>
                <strong>Carga inicial</strong>
                <span>{exercise.load}</span>
              </div>
            </div>

            <div className="description">
              <h4>Execução</h4>
              <p>{exercise.execution}</p>

              <h4>Objetivo</h4>
              <p>{exercise.goal}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("A");
  const workout = workouts[activeTab];

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-badge">
          <Dumbbell size={18} />
          Jonatha's Fitness Journey
        </div>

        <h1>
          Treino full body para postura, definição e recomposição corporal
        </h1>

        <p>
          Plano pensado para treinar dia sim, dia não, em até 1h, com foco em
          melhorar postura, reduzir gordura, fortalecer costas, core, glúteos e
          construir um físico mais atlético sem hipertrofia exagerada.
        </p>

        <div className="hero-stats">
          <div>
            <Target size={18} />
            <span>Postura</span>
          </div>
          <div>
            <Activity size={18} />
            <span>Definição</span>
          </div>
          <div>
            <Dumbbell size={18} />
            <span>Full Body A/B</span>
          </div>
        </div>
      </section>

      <section className="tabs-wrapper">
        <div className="tabs">
          {["A", "B"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              Treino {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="workout-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="workout-title">
              <span>{workout.title}</span>
              <h2>{workout.subtitle}</h2>
            </div>

            <div className="accordion-list">
              {workout.exercises.map((exercise, index) => (
                <ExerciseAccordion
                  key={exercise.name}
                  exercise={exercise}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
