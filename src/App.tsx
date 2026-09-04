import { ThemeProvider } from './theme/ThemeContext'
import { OrderProvider } from './order/OrderContext'
import { ToastProvider } from './components/Toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import QualityPromise from './components/QualityPromise'
import HowItWorks from './components/HowItWorks'
import GroupOrders from './components/GroupOrders'
import About from './components/About'
import OrderCta from './components/OrderCta'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import OrderBar from './components/OrderBar'
import OrderSummaryModal from './components/OrderSummaryModal'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <OrderProvider>
        <ToastProvider>
          <Navbar />
          <main>
            <Hero />
            <Menu />
            <QualityPromise />
            <HowItWorks />
            <GroupOrders />
            <About />
            <OrderCta />
          </main>
          <Footer />
          <FloatingWhatsApp />
          <OrderBar />
          <OrderSummaryModal />
        </ToastProvider>
      </OrderProvider>
    </ThemeProvider>
  )
}

export default App
