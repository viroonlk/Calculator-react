export default function CounterWrong() {
  let count = 0;

  return (
    <div>
      <h2>CounterWrong</h2>
      <p>count = {count}</p>
      <button onClick={() => { count = count + 1; }}>
        +1
      </button>
    </div>
  );
}
