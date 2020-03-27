import React from 'react';

import './style.scss'

export function Row({ usd, eur }) {
  return (
    <tr className='TableRow'>
      <td className='TableRow__col'>&#8381; {usd}</td>
      <td className='TableRow__col'>&#8381; {eur}</td>
    </tr>
  )
}
