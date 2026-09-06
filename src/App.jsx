import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { BackgroundAtmosphere } from './components/common/BackgroundAtmosphere';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="zenji-app">
          <BackgroundAtmosphere />
          <Navbar />
          <main className="zenji-main">
            <AppRouter />
          </main>
          <Footer />
          {/* Frontend UI Cart Drawer */}
          <CartDrawer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
