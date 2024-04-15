import './App.css';
import Login from './pages/auth/Login';
import Error from './pages/auth/Error';
import React, { useEffect } from 'react';
import BasicInfo from './pages/auth/BasicInfo';
import Playlist from './pages/playlist/Playlist';
import EditRecord from './pages/record/EditRecord';
import RecordStore from './pages/record/RecordStore';
import PlaylistAdd from './pages/playlist/PlaylistAdd';
import ResetPassword from './pages/auth/ResetPassword';
import PlaylistEdit from './pages/playlist/PlaylistEdit';
import ForgotPassword from './pages/auth/ForgotPassword';
import ContractManage from './pages/manage/ContractManage';
import PlaylistDetail from './pages/playlist/PlaylistDetail';
import PlaylistAddSong from './pages/playlist/PlaylistAddSong';
import AddExploitContract from './pages/manage/AddExploitContract';
import EditExploitContract from './pages/manage/EditExploitContract';
import CopyExploitContract from './pages/manage/CopyExploitContract';
import InfoExploitContract from './pages/manage/InfoExploitContract';
import NewPlaylistAddSong from './pages/playlist/NewPlaylistAddSong';
import AddAuthorizedContract from './pages/manage/AddAuthorizedContract';
import InfoAuthorizedContract from './pages/manage/InfoAuthorizedContract';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditAuthorizedContract from './pages/manage/EditAuthorizedContract';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path='/login' element={<Login/>} />
        <Route path='/error' element={<Error/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />

        {/* Profile */}
        <Route path='/profile' element={<BasicInfo/>} />

        {/* Manage */}
        <Route path='/contract-manage' element={<ContractManage/>} />
        <Route path='/add-exploit-contract' element={<AddExploitContract/>} />
        <Route path='/add-authorized-contract' element={<AddAuthorizedContract/>} />
        <Route path='/info-exploit-contract/:id' element={<InfoExploitContract/>} />
        <Route path='/edit-exploit-contract/:id' element={<EditExploitContract/>} />
        <Route path='/copy-exploit-contract/:id' element={<CopyExploitContract/>} />
        <Route path='/edit-authorized-contract/:id' element={<EditAuthorizedContract/>} />
        <Route path='/info-authorized-contract/:id' element={<InfoAuthorizedContract/>} />
        
        {/* Record Store */}
        <Route path='/record-store' element={<RecordStore/>} />
        <Route path='/edit-record/:id' element={<EditRecord/>} />

        {/* Playlist */}
        <Route path='/playlist' element={<Playlist/>} />
        <Route path='/add-playlist' element={<PlaylistAdd/>} />
        <Route path='/edit-playlist/:id' element={<PlaylistEdit/>} />
        <Route path='/detail-playlist/:id' element={<PlaylistDetail/>} />
        <Route path='/playlist-add-song/:id' element={<PlaylistAddSong/>} />
        <Route path='/new-playlist-add-song' element={<NewPlaylistAddSong/>} />

      </Routes>
    </Router>
  )
}

export default App;
