export default function PlayersTableSkeleton() {
  return (
    <div className="schedule-section-area mobile-table">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 m-auto">
            <div className="schedule">
              <div className="table-responsive d-none d-lg-block">
                <table className="table table-bordered table-sm simple-table">
                  <thead>
                    <tr>
                      <th className="text-center">Rank</th>
                      <th>Name</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Age</th>
                      <th className="text-center">Rating</th>
                      <th className="text-center">ACF ID</th>
                      <th className="text-center">FIDE Rating</th>
                      <th className="text-center">FIDE ID</th>
                      <th className="text-center">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i}>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-2"></span></div></td>
                        <td><div className="placeholder-glow"><span className="placeholder col-8"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-3"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-1"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-2"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-3"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-2"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-3"></span></div></td>
                        <td className="text-center"><div className="placeholder-glow"><span className="placeholder col-2"></span></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-lg-none">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th style={{width: '13%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rank</th>
                      <th style={{width: '49%', textAlign: 'left', padding: '8px 4px', border: '1px solid #dee2e6'}}>Name</th>
                      <th style={{width: '19%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rating</th>
                      <th style={{width: '19%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>FIDE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i}>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                          <div className="placeholder-glow"><span className="placeholder col-2"></span></div>
                        </td>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'left', paddingLeft: '8px'}}>
                          <div className="placeholder-glow"><span className="placeholder col-8"></span></div>
                        </td>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                          <div className="placeholder-glow"><span className="placeholder col-2"></span></div>
                        </td>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                          <div className="placeholder-glow"><span className="placeholder col-2"></span></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
