import Radio from "../Forms/Radio";
import { useCallback, useEffect, useState } from "react";

const quiz = [
  {
    question: "Qual método é utilizado para criar componentes?",
    options: [
      "React.makeComponent()",
      "React.createComponent()",
      "React.createElement()",
      "React.makeElement()",
    ],
    answer: "React.createElement()",
    id: "p1",
  },
  {
    question: "Como importamos um componente externo?",
    options: [
      'import Component from "./Component"',
      'require("./Component")',
      'import {Component} from "./Component"',
      'import "./Component"',
    ],
    answer: 'import Component from "./Component"',
    id: "p2",
  },
  {
    question: "Qual hook não é nativo?",
    options: [
      "useImperativeHandle()",
      "useFetch()",
      "useSyncExternalStore()",
      "useMemo()",
    ],
    answer: "useFetch()",
    id: "p3",
  },
  {
    question: "Qual palavra deve ser utilizada para criarmos um hook?",
    options: ["set", "get", "use", "hook"],
    answer: "use",
    id: "p4",
  },
  {
    question: "Qual é o principal objetivo do React?",
    options: [
      "Facilitar a criação de animações em websites",
      "Facilitar a comunicação entre servidores e clientes",
      "Facilitar a construção de interfaces de usuário",
      "Facilitar a criação de APIs em Node.js",
    ],
    answer: "Facilitar a construção de interfaces de usuário",
    id: "p5",
  },
  {
    question:
      "Qual é a principal diferença entre uma prop e um estado em um componente do React?",
    options: [
      "Um estado é passado de um componente pai para um componente filho, enquanto uma prop é mantida dentro do próprio componente",
      "Uma prop é somente leitura, enquanto um estado pode ser alterado",
      "Uma prop é usada para comunicação entre componentes, enquanto um estado é usado apenas dentro do mesmo componente",
      "Não há diferença entre eles",
    ],
    answer: "Uma prop é somente leitura, enquanto um estado pode ser alterado",
    id: "p6",
  },
  {
    question:
      "Qual é o pacote do React usado para fazer chamadas assíncronas em uma API?",
    options: ["fetch", "jQuery", "axios", "superagent"],
    answer: "axios",
    id: "p7",
  },
  {
    question:
      "Qual é o método usado para atualizar o estado de um componente no React?",
    options: ["updateState()", "setState()", "changeState()", "replaceState()"],
    answer: "setState()",
    id: "p8",
  },
  {
    question: "O que é o Virtual DOM no React?",
    options: [
      "Uma forma de criar animações mais suaves em páginas da web",
      "Uma técnica para simular um ambiente virtual para testes de desenvolvimento",
      "Uma técnica para acelerar a renderização de componentes",
      "Uma representação da estrutura da página em memória",
    ],
    answer: "Uma representação da estrutura da página em memória",
    id: "p9",
  },
  {
    question:
      "Qual é a função do hook useEffect() em um componente de função do React?",
    options: [
      "Executar uma ação imediatamente antes do componente ser desmontado",
      "Executar uma ação imediatamente após a renderização do componente",
      "Executar uma ação antes da renderização do componente",
      "Não há tal método em um componente de função",
    ],
    answer: "Executar uma ação imediatamente após a renderização do componente",
    id: "p10",
  },
  {
    question: "O que é o React Router?",
    options: [
      "Uma forma de testar componentes do React",
      "Uma ferramenta para criar animações em páginas da web",
      "Uma biblioteca para lidar com roteamento em aplicações do React",
      "Uma biblioteca externa que o React depende",
    ],
    answer: "Uma biblioteca para lidar com roteamento em aplicações do React",
    id: "p11",
  },
  {
    question: "O que é o conceito de Suspense no React?",
    options: [
      "Um mecanismo para lidar com exceções em componentes do React",
      "Um recurso que permite a criação de animações de carregamento em componentes do React",
      "Um novo método de renderização de componentes do React",
      "Uma técnica para otimizar o desempenho de componentes do React usando lazy loading",
    ],
    answer:
      "Uma técnica para otimizar o desempenho de componentes do React usando lazy loading",
    id: "p12",
  },
];

const Quiz = () => {
  const defaultTimer = 30;

  const [answer, setAnswer] = useState(null);
  const [count, setCount] = useState(defaultTimer);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz[index];

  const isLastQuestion = useCallback(() => {
    index === quiz.length - 1 ? setResult(true) : setIndex(index + 1);
  }, [index]);

  useEffect(() => {
    const timer =
      count > 0 && setInterval(() => setCount(count - 1), 1000);

    if (count === 0) {
      setAnswer(null);
      setCount(defaultTimer);
      isLastQuestion();
    }

    return () => clearInterval(timer);
  }, [count, index, isLastQuestion]);

  function handleClick() {
    if (answer === currentQuestion.answer) setScore(score + 1);
    setAnswer(null);
    setCount(defaultTimer);
    isLastQuestion();
  }

  function showResult() {
    const correctAnswers = Math.floor((score / quiz.length) * 100);

    return (
      <>
        {correctAnswers >= 80 ? (
          <div className="result">
            <h2 style={{ color: "green" }}>Parabéns!</h2>
            <p>Você conseguiu {correctAnswers}% de acerto.</p>
          </div>
        ) : (
          <div className="result">
            <h2 style={{ color: "red" }}>Reprovado!</h2>
            <p>Você conseguiu apenas {correctAnswers}% de acerto.</p>
          </div>
        )}
        <button
          style={{ marginTop: "30px" }}
          onClick={() => {
            setIndex(0);
            setScore(0);
            setCount(defaultTimer);
            setResult(false);
          }}
        >
          Reiniciar
        </button>
      </>
    );
  }

  return (
    <>
      {!result ? (
        <div>
          <h2>
            Pergunta {index + 1} de {quiz.length}
          </h2>
          <fieldset className="box">
            <legend>{currentQuestion.question}</legend>
            <div className="answer">
              <div className="options">
                <Radio
                  options={currentQuestion.options}
                  value={answer}
                  setValue={setAnswer}
                />
              </div>
            </div>
            <button
              style={{ marginTop: "20px", display: "inline" }}
              onClick={handleClick}
              disabled={!answer ? true : false}
            >
              {index === quiz.length - 1 ? "Finalizar" : "Próxima"}
            </button>
            <div
              style={{ marginLeft: "20px", display: "inline-block" }}
            >
              00:{count.toString().padStart(2, '0')}
            </div>
          </fieldset>
        </div>
      ) : (
        showResult()
      )}
    </>
  );
};

export default Quiz;
