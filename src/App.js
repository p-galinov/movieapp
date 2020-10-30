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
      <Route render={() => <h1>404 Error not found!</h1>} />
    </Switch>
  </main>
  );
}

export default App;
