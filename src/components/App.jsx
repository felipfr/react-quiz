import Quiz from "./Quiz";

const App = () => {
  function blockRightClick(ev) {
    ev.preventDefault();
  }

  return (
    <div onContextMenu={blockRightClick}>
      <Quiz />
    </div>
  );
};

export default App;
