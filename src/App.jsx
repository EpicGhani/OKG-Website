import Hero from "./components/Hero"
import About from "./components/About"
import Works from "./components/Works"
import Affiliate from "./components/Affiliate"
import Service from "./components/Service"
import Contact from "./components/Contact"

// DATA HOLDERS
import affiliates from "./data/affiliates.json";
import products from "./data/products.json";

function App() {

  const hasAffiliates = Array.isArray(affiliates) && affiliates.length > 0;
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <div className="app">
      <Hero hasWorks={hasProducts}/>

      <About/>
      
      {hasAffiliates && <Affiliate/>}

      {hasProducts && <Works/>}

      <Service/>

      <Contact/>
    </div>
  )
}

export default App
