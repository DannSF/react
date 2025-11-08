function Greeting({ name, age, country }) {
  return (
    <div className="greeting">
      <h2>👋 Hello, {name}</h2>
      {age && <p>🎂 You are {age} years old</p>}
      {country && <p>📍 From: {country}</p>}
    </div>
  );
}

export default Greeting;
