import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import './App.css';

import Navigation from './components/navigation/navigation.component';
import LandingPage from './pages/landingPage/landingPage.component';
import GalleryPage from './pages/galleryPage/galleryPage.component';
import RegistryPage from './pages/registryPage/registryPage.component';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={[<Navigation/>]}>
          <Route index element={<LandingPage/>}/>
          <Route path='gallery' element={<GalleryPage/>}></Route>
          <Route path='registry' element={<RegistryPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
