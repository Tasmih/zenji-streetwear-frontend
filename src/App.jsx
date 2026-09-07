import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { BackgroundAtmosphere } from './components/common/BackgroundAtmosphere';
import { InitialLoader } from './components/common/InitialLoader';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <InitialLoader duration={1800} />
          <div className="zenji-app">
            <BackgroundAtmosphere />
            <Navbar />
            <main className="zenji-main">
              <AppRouter />
            </main>
            <Footer />
            {/* Frontend UI Cart Drawer */}
            <CartDrawer />
            {/* Frontend UI Checkout Preview Modal */}
            <CheckoutModal />
          </div>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
