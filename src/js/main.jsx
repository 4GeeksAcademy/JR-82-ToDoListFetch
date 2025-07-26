import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';
import Shounen from './components/Shounen';
import Isekai from './components/Isekai';
import Thriller from './components/Thriller';
import Fantasy from './components/Fantasy';
import SliceOfLife from './components/SliceOfLife';
import Top10 from './components/Top10';
import Movies from './components/Movies';
import Dropped from './components/DroppedList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shounen" element={<Shounen />} />
        <Route path="/isekai" element={<Isekai />} />
        <Route path="/thriller" element={<Thriller />} />
        <Route path="/fantasy" element={<Fantasy />} />
        <Route path="/sliceOfLife" element={<SliceOfLife />} />
        <Route path="/top10" element={<Top10 />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/dropped" element={<Dropped />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
