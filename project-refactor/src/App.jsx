
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import ShortenForm from './components/ShortenForm'
import BodyText from './components/BodyText'
import Footer from './components/Footer'


function App() {
  return (
    <>
<h1>Url Shortener</h1>  
<Navbar />
<Header />
<ShortenForm />
<BodyText />
<Footer />

    </>
  )
}

export default App;
