import "./App.css";
import "./styles/variables.css";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import ContentWrapper from "./components/contentWrapper/ContentWrapper";
import { useLocation } from "react-router-dom";
import ROUTES from "./routes/Routes";
import { useState, useEffect } from "react";
import CartInfo from "./components/Shared/Cart/CartInfo";

function App() {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => {
    setIsCartOpen(true);
    // not using toggle since the cart sidebar will have its own functionality to exit
  };

  return location.pathname !== ROUTES.LOGIN &&
    location.pathname !== ROUTES.REGISTER ? (
    <ContentWrapper>
      <Header openCart={openCart} />
      <main>
        <AppRoutes />
      </main>
      {isCartOpen && <div className="overlay"></div>}
      <CartInfo isOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
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
