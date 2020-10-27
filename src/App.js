import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import MovieDatils from "./components/MovieDetails";

function App() {
  return (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/movie/:id" component={MovieDatils} />
    </Switch>
  </main>
  );
}

export default App;
