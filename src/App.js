import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import Navigation from './components/navigation/navigation.component';
import LandingPage from './pages/landingPage/landingPage.component';
import GalleryPage from './pages/galleryPage/galleryPage.component';
import RegistryPage from './pages/registryPage/registryPage.component';
import RegistryItems from './components/registryItems/registryItems.component';
import { getMultipleDocuments, getSingleDocument } from './firestore/getFromFirestore';
import { useDispatch } from 'react-redux';
import { updateRegistryUserEmail } from './redux/reducers/registryusers';
import { updateRegistryItems } from './redux/reducers/registryItems';

function App() {  
    const dispatch = useDispatch();

  // useEffect(() => {
  //   getMultipleDocuments("RegistryAccess").then((registryUsers) => dispatch(updateRegistryUsers(registryUsers)));
  // }, []);

  useEffect(() => {
    getMultipleDocuments("registryItems").then((registryItems) => dispatch(updateRegistryItems(registryItems)));
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<LandingPage/>}/>
          <Route path='gallery' element={<GalleryPage/>}></Route>
          <Route path='registry' element={<RegistryPage/>}></Route>
          <Route path='giftregistrypreview' element={<RegistryItems/>}></Route>
        </Route>
        <Route path='*' element={[<Navigation></Navigation>, <LandingPage></LandingPage>]}></Route>
      </Routes>
    </div>
  );
}

export default App;
