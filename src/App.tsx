import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UsersProvider } from "./hooks/useUsers";
import { ClientProvider } from "./hooks/useClient";
import { OrderProvider } from "./hooks/useOrder";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

export function App() {
  return (
    <Router>
      <ClientProvider>
        <OrderProvider>
          <UsersProvider>
            <Header />
            <div
              style={{
                minHeight: "310px",
              }}
            >
              <Routes />
            </div>

            <Footer />
            <GlobalStyle />
          </UsersProvider>
        </OrderProvider>
      </ClientProvider>
    </Router>
  );
}
