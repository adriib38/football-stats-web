import React from 'react';

export default function Dot({ color = '#D7263D', size = '9px' }) {
    return (
        <div style={{
            background: color,
            width: size,
            height: size,
            borderRadius: '50%'
        }}>
        </div>
    );
}
