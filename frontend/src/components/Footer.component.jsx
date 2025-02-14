import React from 'react'

const Footer = () => {
  return (
    <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
      <li className="nav-item"><a href="/corsi" className="nav-link px-2 text-body-secondary">Corsi</a></li>
      <li className="nav-item"><a href="/docenti" className="nav-link px-2 text-body-secondary">Docenti</a></li>
      <li className="nav-item"><a href="/contattaci" className="nav-link px-2 text-body-secondary">Contattaci</a></li>
      <li className="nav-item"><a href="/login" className="nav-link px-2 text-body-secondary">Login</a></li>
    </ul>
    <p class="text-center text-body-secondary">© 2025 ZenLife, Inc</p>
  </footer>
  )
}

export default Footer