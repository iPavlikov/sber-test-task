import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

import './style.scss';

export function ChartCanvas({ rates }) {
  const chartEl = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    chart.current = new Chart(chartEl.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'USD',
            data: [],
            fill: false
          },
          {
            label: 'EUR',
            data: [],
            fill: false
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
      }
    })

    return () => chart.current.destroy()
  }, [])

  useEffect(() => {
    chart.current.data = {
      ...chart.current.data,
      labels: rates.labels,
      datasets: [
        {
          label: 'USD',
          data: rates.usd,
          fill: false,
          borderColor: '#b300b3'
        },
        {
          label: 'EUR',
          data: rates.eur,
          fill: false,
          borderColor: '#00b300'
        }
      ]
    }
    chart.current.update()
  }, [rates])

  return (
    <canvas className='Chart' ref={chartEl} ></canvas>
  )
}