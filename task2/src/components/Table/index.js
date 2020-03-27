import React from 'react';

import { Row } from './components/Row';

import './style.scss';

export function Table({ rates }) {
  return (
    <table className='Table'>
      <thead className='Table__head'>
        <tr className='Table__headRow'>
          <td className='Table__headCol'>USD</td>
          <td className='Table__headCol'>EUR</td>
        </tr>
      </thead>
      <tbody>
        {
          rates.map(row => (
            <Row
              key={row.id}
              usd={row.usd}
              eur={row.eur}
            />
          ))
        }
      </tbody>
    </table>
  )
}