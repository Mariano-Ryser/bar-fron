import { useState } from 'react';

// Definimos el tipo para una escritura
type Escritura = {
  id: number;
  titulo: string;
  textoCorto: string;
  textoCompleto: string;
};

// Datos de ejemplo (simulando una fuente de datos)
const escriturasData: Escritura[] = [
  {
    id: 1,
    titulo: "El susurro del bosque",
    textoCorto: "Entre los árboles centenarios, el viento lleva secretos olvidados...",
    textoCompleto: "Entre los árboles centenarios, el viento lleva secretos olvidados por generaciones. Cada hoja que cae es una palabra perdida, y cada raíz, una historia que espera ser contada. Los musgos guardan la memoria de los pasos que nunca volvieron, y la luz que se filtra entre las copas dibuja en el suelo el mapa de un mundo que solo los pacientes saben leer.",
  },
  {
    id: 2,
    titulo: "La luz de la mañana",
    textoCorto: "El sol despide la noche con caricias de oro y plata...",
    textoCompleto: "El sol despide la noche con caricias de oro y plata que se derraman sobre los campos dormidos. El rocío brilla como lágrimas de alegría, y los pájaros entonan un himno al nuevo día. En cada rayo hay una promesa de calor, y en cada sombra, el susurro de un sueño que se desvanece. La mañana es un lienzo donde la luz pinta posibilidades infinitas.",
  },
  {
    id: 3,
    titulo: "El último viaje",
    textoCorto: "El barco zarpa al horizonte, llevando consigo recuerdos y promesas...",
    textoCompleto: "El barco zarpa al horizonte, llevando consigo recuerdos y promesas que el viento salado se encarga de desdibujar. Las olas cantan canciones de tierras lejanas, y las gaviotas escoltan al navío como fantasmas de antiguos navegantes. Cada amarra que se suelta es un adiós, y cada vela que se hincha, un nuevo comienzo. El mar es un libro abierto donde cada ola es una página que el tiempo se encarga de mojar.",
  },
];

const Escritura = () => {
  const [selectedEscritura, setSelectedEscritura] = useState<Escritura | null>(null);

  return (
    <>
      {/* Estilos en línea para el tema madera */}
      <style jsx>{`
        .wood-bg {
          background: #a67b5b; /* base marrón */
          background-image: 
            repeating-linear-gradient(45deg, rgba(255, 215, 175, 0.1) 0px, rgba(255, 215, 175, 0.1) 2px, transparent 2px, transparent 4px),
            linear-gradient(to bottom, #8b5a2b, #6b3f1f);
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: 'Georgia', serif;
        }
        .title {
          text-align: center;
          font-size: 2.8rem;
          font-weight: bold;
          color: #f7e3c0;
          text-shadow: 3px 3px 0 #3d2b1f, 5px 5px 10px rgba(0,0,0,0.7);
          margin-bottom: 2.5rem;
          letter-spacing: 3px;
          border-bottom: 3px solid #d4a373;
          display: inline-block;
          padding-bottom: 0.5rem;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .card {
          background: #d9b382;
          background-image: radial-gradient(circle at 10% 20%, #e8c9a0, #b8845c);
          border-radius: 20px 20px 20px 20px;
          box-shadow: 0 15px 25px rgba(0,0,0,0.6), inset 0 -3px 0 rgba(0,0,0,0.3), inset 0 3px 5px rgba(255,215,175,0.6);
          padding: 1.8rem 1.5rem;
          transition: all 0.25s ease;
          cursor: pointer;
          border: 2px solid #7c5d3a;
          position: relative;
          backdrop-filter: blur(2px);
        }
        .card:hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 20px 35px rgba(0,0,0,0.8), inset 0 -3px 0 #4d2f18;
          border-color: #b48b5a;
        }
        .card:active {
          transform: scale(0.98);
        }
        .card h3 {
          font-size: 1.8rem;
          color: #faf0dc;
          text-shadow: 2px 2px 0 #4d2f18, 3px 3px 8px rgba(0,0,0,0.6);
          margin: 0 0 0.75rem 0;
          letter-spacing: 1px;
          border-left: 5px solid #e6c394;
          padding-left: 12px;
        }
        .card p {
          font-size: 1rem;
          color: #3d2b1f;
          font-weight: 500;
          line-height: 1.5;
          text-shadow: 1px 1px 0 rgba(255,215,175,0.3);
          margin: 0;
          font-style: italic;
        }
        .card::after {
          content: '';
          position: absolute;
          top: 8px;
          right: 12px;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #e6c394 10%, #8b5a2b 80%);
          border-radius: 50%;
          opacity: 0.3;
          pointer-events: none;
        }
        /* Modal overlay con efecto madera oscura */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(30, 18, 8, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease;
        }
        .modal-content {
          background: #d9b382;
          background-image: radial-gradient(circle at 30% 20%, #e8c9a0, #b07d4e);
          max-width: 700px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          border-radius: 30px 30px 30px 30px;
          box-shadow: 0 30px 50px rgba(0,0,0,0.8), inset 0 -5px 0 #4d2f18, inset 0 5px 15px rgba(255,215,175,0.5);
          padding: 2.5rem 2.2rem;
          border: 3px solid #7c5d3a;
          position: relative;
          animation: slideUp 0.3s ease;
        }
        .modal-content h2 {
          font-size: 2.5rem;
          color: #faf0dc;
          text-shadow: 3px 3px 0 #4d2f18, 4px 4px 12px rgba(0,0,0,0.5);
          margin: 0 0 1.5rem 0;
          border-bottom: 4px solid #c9a16e;
          padding-bottom: 0.5rem;
          letter-spacing: 2px;
        }
        .modal-content p {
          font-size: 1.2rem;
          color: #2b1a0e;
          line-height: 1.8;
          text-shadow: 1px 1px 0 rgba(255,215,175,0.2);
          white-space: pre-wrap;
          font-weight: 500;
        }
        .close-btn {
          position: sticky;
          bottom: 0;
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }
        .close-btn button {
          background: #6b3f1f;
          border: none;
          color: #f7e3c0;
          font-size: 1.3rem;
          font-weight: bold;
          padding: 0.7rem 2rem;
          border-radius: 50px;
          box-shadow: 0 5px 0 #3d2b1f, 0 8px 15px rgba(0,0,0,0.4);
          transition: 0.1s linear;
          cursor: pointer;
          text-shadow: 1px 1px 0 #3d2b1f;
          letter-spacing: 2px;
          border: 1px solid #a67b5b;
        }
        .close-btn button:hover {
          background: #7c4f2e;
          transform: translateY(2px);
          box-shadow: 0 3px 0 #3d2b1f;
        }
        .close-btn button:active {
          transform: translateY(5px);
          box-shadow: 0 0px 0 #3d2b1f;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        /* Scroll personalizado para modal */
        .modal-content::-webkit-scrollbar {
          width: 12px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #6b3f1f;
          border-radius: 20px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: #d4a373;
          border-radius: 20px;
          border: 2px solid #4d2f18;
        }
        .footer {
          text-align: center;
          margin-top: 3rem;
          color: #d4b48c;
          font-size: 0.9rem;
          text-shadow: 1px 1px 0 #3d2b1f;
          border-top: 1px solid #7c5d3a;
          padding-top: 1.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 600px) {
          .title { font-size: 2rem; }
          .card h3 { font-size: 1.4rem; }
          .modal-content { padding: 1.8rem; }
          .modal-content h2 { font-size: 1.8rem; }
        }
      `}</style>

      <div className="wood-bg">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 className="title">📜 Mis Escrituras</h1>
        </div>

        <div className="grid-container">
          {escriturasData.map((escritura) => (
            <div 
              key={escritura.id} 
              className="card" 
              onClick={() => setSelectedEscritura(escritura)}
              role="button"
              tabIndex={0}
              aria-label={`Abrir escritura: ${escritura.titulo}`}
            >
              <h3>{escritura.titulo}</h3>
              <p>{escritura.textoCorto}</p>
            </div>
          ))}
        </div>

        <div className="footer">
          ✦ Haz clic en cualquier tarjeta para leer el texto completo ✦
        </div>
      </div>

      {/* Modal */}
      {selectedEscritura && (
        <div className="modal-overlay" onClick={() => setSelectedEscritura(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEscritura.titulo}</h2>
            <p>{selectedEscritura.textoCompleto}</p>
            <div className="close-btn">
              <button onClick={() => setSelectedEscritura(null)}>✕ Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Escritura;