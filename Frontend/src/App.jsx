import HeroSection from '../Components/heroSection';
import MainLayout from '../MainLayout/MainLayout';
import './App.css'


function HomePage() {
  return (
    <>
      <section id="home">
        <HeroSection/>
      </section>

      <section id="programmes">
        {/* Programmes content */}
      </section>

      <section id="opportunities">
        {/* Opportunities content */}
      </section>
    </>
  );
}

function App() {

  return (
    <>
   <MainLayout>
      <HomePage />
    </MainLayout>   
     </>
  )
}

export default App
