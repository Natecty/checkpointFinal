import { Route, Routes } from "react-router-dom";
import { useState, useMemo } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContext from "./contexts/UserContext";
import DogList from "./pages/DogList";
import DogDetail from "./pages/DogDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const initialRegister = {
    pseudo: "",
    password: "",
    passwordverified: "",
  };
  const [register, setRegister] = useState(initialRegister);

  const values = useMemo(
    () => ({ initialRegister, register, setRegister }),
    [register]
  );
  return (
    <ChakraProvider>
      <div className="App">
        <main>
          <UserContext.Provider value={values}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users/:id/dogs" element={<DogList />} />
              <Route path="/users/:id/dogs/:id" element={<DogDetail />} />
            </Routes>
          </UserContext.Provider>
        </main>
      </div>
    </ChakraProvider>
  );
}

export default App;
