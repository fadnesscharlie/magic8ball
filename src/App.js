import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import DataProvider from "./context/questionData";
import { DataContext } from "./context/questionData";

function App() {
  return (
    <div className="App">
      <Header />
      <DataProvider>
        <Main />
      </DataProvider>
    </div>
  );
}

export default App;
