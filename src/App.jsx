import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Error404 from './pages/Error404'
import Categorias from './pages/Categorias'
import Tendencias from './pages/Tendencias'
import Carrusel from './components/Carrusel'
import Mejorvaloradascine from './pages/Mejorvaloradascine'
import Recientes from './pages/Recientes'
import DetallesPeliculas from './pages/DetallesPeliculas'
import Busquedas from './pages/Busquedas'
import PeliculasActor from './pages/PeliculasActor'



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/tendencias' element={<Tendencias />} />
        <Route path='/*' element={<Error404 />} />
        <Route path='/categorias/:id/:tipo' element={<Categorias />} />
        <Route path='/carrusel' element={<Carrusel />} />
        <Route path='/mejorvaloradascine' element={<Mejorvaloradascine />} />
        <Route path='/recientes' element={<Recientes />} />
        <Route path="/detallespeliculas/:id/:tipo" element={<DetallesPeliculas />} />
        <Route path="/serie/:id" element={<DetallesPeliculas />} />
        <Route path='/busquedas' element={<Busquedas />} />
        <Route path="/actor/:actorId" element={<PeliculasActor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App