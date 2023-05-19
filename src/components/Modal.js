

function Modal({ setShowModal }) {

  return (
    <>
      <div className="modal">
        <div className="modal__content">

          {/* <div className="display">
              <h2>Players ID</h2> 
              <h2>Correct Guesses</h2>
              </div> */}
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Players ID</th>
                <th>Correct Guesses</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ACSFKGLASJDKFDFDFDFDFDFDAS</td>
                <td>10</td>
              </tr>
              <tr>
                <td>2</td>
                <td>PHTNSIRMSLWOCQHSUAKELKSKSD</td>
                <td>15</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setShowModal(false)}>
            Close
          </button>

        </div>
      </div>
    </>
  );
}

function ExitModal({ setShowExitModal }) {
  <>
    <div className="modal">
      <div className="modal__content">
        <button onClick={() => setShowExitModal(false)}>
          Close
        </button>
        <h1>Are you sure you want to quit?</h1>
      </div>
    </div>
  </>
}

export { Modal, ExitModal };