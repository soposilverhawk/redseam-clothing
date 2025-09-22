import "./App.css";
import "./styles/variables.css";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import ContentWrapper from "./components/contentWrapper/ContentWrapper";
import { useLocation } from "react-router-dom";
import ROUTES from "./routes/Routes";

function App() {
  const location = useLocation();

  return location.pathname !== ROUTES.LOGIN &&
    location.pathname !== ROUTES.REGISTER ? (
    <ContentWrapper>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </ContentWrapper>
  ) : (
    <>
      <ContentWrapper>
        <Header />
      </ContentWrapper>
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;