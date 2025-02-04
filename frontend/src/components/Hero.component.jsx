import React from 'react'

const Hero = () => {
  return (
    <section className="hero d-flex align-items-center justify-content-center text-center">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
            <h1 className="display-4 fw-bold">Benvenuto in ZenLife</h1>
            <p className="lead">Trova equilibrio, pace e benessere con noi.</p>
            <a href="#contatti" className="btn btn-light btn-lg fw-bold">Scopri i nostri corsi</a>
        </div>
    </section>
  )
}

export default Hero