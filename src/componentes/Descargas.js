// Descargas.js
import React from 'react';

const Descargas = () => {
  return (
    <section className="cont Descargas" id="Descargas">
      <h2 className="title">Descargas</h2>
      <figure>
        <img src={require('../assets/images/descarga.png').default} height="300" alt="Descarga" />
        <figcaption>Descarga</figcaption>
      </figure>
      <img src={require('../assets/images/descargafoto.png').default} height="300" alt="TiendaPinguino" id="descargapinguino" />
      <img src={require('../assets/images/unnamed.png').default} height="300" alt="geiser" id="geiser" />
    </section>
  );
};

export default Descargas;
