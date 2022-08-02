import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Cadastro } from '../Pages/Cadastro';
import { ConfirmarSenha } from '../Pages/ConfirmarSenha';
import { EditProfilePss } from '../Pages/EditProfilePessoaJuridica';
import {Login} from "../Pages/Login/index"
import { RecuperarSenha } from '../Pages/RecuperarSenha';
import { Home } from '../Pages/Home';
import { CadastrarPubli } from '../Pages/CadastrarPubli';
import { HomeRevisor } from '../Pages/HomeRevisor';
import { TesteDark } from '../Pages/TesteDark';
import {EditarPubli } from '../Pages/EditarPubli';
import { ProfilePessoa } from '../Pages/EditarProfilePessoa';
import { EditarPubliEvento } from '../Pages/EditarPubliEvento';
import { EditarPubliNoticia } from '../Pages/EditarPubliNoticia';
import { EditarPubliOportunidade } from '../Pages/EditarPubliOportunidade';
import { AuthContext } from '../context/AuthContext';


function isAuth(Component) {
    const {token} = useContext(AuthContext);
    return token || localStorage.getItem("Authorization") ? Component : <Navigate to={{ pathname: "/login" }}/>
}

function initialPage() {
    const {token} = useContext(AuthContext);
    return token || localStorage.getItem("Authorization") ? <Navigate to={{ pathname: "/home" }}/> : <Navigate to={{ pathname: "/login" }}/>
}

export function Rotas() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={initialPage()}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/cadastro" element={<Cadastro/>} />
              <Route path="/editarperfilpessoajuridica" element={<EditProfilePss/>} />
              <Route path="/recuperarsenha" element={<RecuperarSenha/>} />
              <Route path="/confirmarsenha" element={<ConfirmarSenha/>} />
              <Route path="/home" element={isAuth(<Home/>)} />
              <Route path="/cadastrarpubli" element={isAuth(<CadastrarPubli/>)} />
              <Route path="/editarpubli" element={isAuth(<EditarPubli/>)} />
              <Route path="/editarpublievento/:id" element={isAuth(<EditarPubliEvento/>)} />
              <Route path="/editarpublinoticia/:id" element={isAuth(<EditarPubliNoticia/>)} />
              <Route path="/editarpublioportunidade/:id" element={isAuth(<EditarPubliOportunidade/>)} />
              <Route path="/homerevisor" element={isAuth(<HomeRevisor/>)} />
              <Route path="/testedark" element={<TesteDark/>} />
              <Route path="/editarperfilpessoafisica" element={isAuth(<ProfilePessoa/>)} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
      </Router>
  )
}