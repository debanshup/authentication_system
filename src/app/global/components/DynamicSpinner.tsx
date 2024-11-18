import React, { useState, useEffect, useRef } from 'react';

const DynamicSpinner = () => {

    return (
<div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
    <div className="text-center bg-white p-4 rounded shadow-sm" style={{ maxWidth: '300px', width: '100%' }}>
        <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fs-5 fw-semibold text-dark">
            Just a sec
        </p>
    </div>
</div>

    );
};

export default DynamicSpinner;
