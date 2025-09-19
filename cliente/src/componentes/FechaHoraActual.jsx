import React, { useState, useEffect } from 'react';

const FechaHoraActual = () => {
  const [fechaHora, setFechaHora] = useState('');

  useEffect(() => {
    const actualizarFechaHora = () => {
      const ahora = new Date();

      // Formato corto: dd/mm/yyyy hh:mm:ss
      const dia = ahora.getDate().toString().padStart(2, '0');
      const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
      const anio = ahora.getFullYear();
      const hora = ahora.getHours().toString().padStart(2, '0');
      const minuto = ahora.getMinutes().toString().padStart(2, '0');
      

      const fechaFormateada = `${dia}/${mes}/${anio} | ${hora}:${minuto}`;
      setFechaHora(fechaFormateada);
    };

    actualizarFechaHora();
    const intervalo = setInterval(actualizarFechaHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>
      {fechaHora}
    </div>
  );
};

export default FechaHoraActual;