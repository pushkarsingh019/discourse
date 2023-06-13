import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing screens
import HomeScreen from "./screens/HomeScreen";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
