import "./App.css";

import { BrowserRouter } from "react-router-dom";
import RouterPage from "./RouterPage";

function App() {
  return (
    <>
      <div className='main'>
        <BrowserRouter>
          <RouterPage />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
