import React from 'react';
import AuthorTable from './author-table'

export default function Index() {
  return (
    <>
    <div className="container">
        <div className="row ">
            <div className="col-md-10 text-center">
                <div className="card mb-3">
                <AuthorTable/>
                </div>
            </div>
        </div>
    </div>

    </>
  )
}
