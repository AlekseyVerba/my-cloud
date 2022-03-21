import React, { useEffect } from 'react';
import Nav from '../Nav';
import { Routes, Route, Navigate } from "react-router-dom"
import LogForm from '../Forms/LogForm';
import RegForm from '../Forms/RegForm';
import ConfirmToken from '../ConfirmToken';
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from '../../hooks/useActions';
import Disk from '../Disk';
import "./index.scss"
import Popup from '../Popup';
import BlockLoadingFiles from '../BlockLoadingFiles';
import AccessFile from '../AccessFile';
import Profile from '../Profile';
import Loader from '../Loader';

function App() {
  const { isAuth, loader_status_user } = useTypedSelector(state => state.user)
  const { checkAuth, changeFocus } = useActions()

  useEffect(() => {

    checkAuth()
  }, [])

  const cancelFocus = () => {
    changeFocus(null)
  }

  return (
    <div className='app' onClick={cancelFocus}>
      <Nav />
      <div className='container container--top'>
        {

          loader_status_user === false ?

            <div>
              {!isAuth ?
                <Routes>
                  <Route path='/login' element={<LogForm />} />
                  <Route path='/registration' element={<RegForm />} />
                  <Route path='/register-token/:token' element={<ConfirmToken />} />
                  <Route path='/file/:fileID' element={<AccessFile />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
                :
                <Routes>
                  <Route path='/' element={<Disk />} />
                  <Route path='/file/:fileID' element={<AccessFile />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              }
            </div>

            : <Loader />

        }



      </div>
      <Popup />
      <BlockLoadingFiles />
    </div>
  );
}

export default App;
