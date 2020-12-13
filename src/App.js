import { Switch, Route, Redirect } from 'react-router-dom';
import PlotPage from './Containers/PlotPage/PlotPage';
import HomePage from './Containers/HomePage/HomePage';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path='/' component={PlotPage}/>
          <Route path="/" component={HomePage}/>
          <Redirect to='/'/>
        </Switch>
      </div>
  );
}

export default App;
