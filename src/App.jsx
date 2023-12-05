import './App.css'
import { Box, Button, CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import NotFound from './errors/NotFound'
import HomePage from './components/HomePage'
import Login from './components/login'
import GoToTop from './ScrollToTop'
import Register from './components/Register'
import CategorieAdd from './components/Categories/CategorieAdd'
import CategorieRemove from './components/Categories/CategorieRemove'
import CategorieUpdate from './components/Categories/CategorieUpdate'
import CategorieView from './components/Categories/CategorieView'
import ItemView from './components/Items/ItemView'
import ItemCreate from './components/Items/ItemCreate'
import ItemUpdate from './components/Items/ItemUpdate'
import Header from './components/HeaderFooter/Header'
import Footer from './components/HeaderFooter/Footer'
import AboutPage from './components/AboutPage'

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <Box>
        <GoToTop />
        <Header />
        <Box className="my-background" sx={{minHeight:"80vh"}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Signin" element={<Login />} />
            <Route path="/Signup" element={<Register />} />
            <Route path="/categoriesAdd" element={<CategorieAdd />} />
            <Route path="/categoriesRemove" element={<CategorieRemove />} />
            <Route path="/categoriesUpdate/:id" element={<CategorieUpdate />} />
            <Route path="/categories/:id/items" element={<CategorieView />} />
            <Route path="/itemsView/:item_id" element={<ItemView />} />
            <Route path="categories/:id/items/:item_id" element={<ItemView />} />
            <Route path="/categories/:id/itemsCreate" element={<ItemCreate />} />
            <Route path="/categories/:id/itemsUpdate/:item_id" element={<ItemUpdate />} />
            <Route path="/AboutPage" element={<AboutPage />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </div>
  )
}

export default App