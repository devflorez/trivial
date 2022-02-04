export default function CardQuestion({ question }) {
  return (
    <div className="cardQuestion">
      <header className="cardQuestion--header">
        <h2>{question.category}</h2>
        <span>{question.difficulty}</span>
      </header>
      <div
        className="cardQuestion--question"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
    </div>
  );
}
