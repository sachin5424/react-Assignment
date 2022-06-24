import React from 'react';
import BookTable from './book-table'

export default function Index() {
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                <BookTable/>
                </div>
            </div>
        </div>
    </div>

    </>
  )
}
