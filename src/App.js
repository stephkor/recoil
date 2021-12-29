import logo from './logo.svg';
import './App.css';
import { RecoilRoot } from 'recoil';
import Todo from './Todo';


function App() {



  return (
    <div className="App">
      <RecoilRoot>
        <Todo/>
      </RecoilRoot>
    </div>
  );
}

export default App;
