
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const ComparisonTable = ({ data }) => {

  const container = useRef(null);

  useGSAP(() => {
    if (!container.current) return;
    gsap.from(container.current, {
      opacity: 0,
      y: 40,
      ease: 'power1.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'center top',
        once: true,
      },
    });
  }, { scope: container });

  if (!data) return null;

  const title = data.title?.value || '';
  const subtitle = data.subtitle?.value || '';
  const description = data.description?.value || '';
  const columns = data.columns?.items || [];
  const rows = data.rows?.items || [];
  const cells = data.cells?.items || [];
  const cta = data.cta?.items?.[0] || null;

  // Build a matrix for cell lookup by row and column title value
  const getCell = (row, col) => {
    return cells.find(
      cell =>
        cell.comparison_rows?.items?.[0]?.title?.value === row.title?.value &&
        cell.comparison_columns?.items?.[0]?.title?.value === col.title?.value
    );
  };


  return (
    <section ref={container} className="comparison-table-section">
      <div className="comparison-table__container">
        <div className="comparison-table__header">
          <div className="comparison-table__title">{title}</div>
          <div className="comparison-table__subtitle">{subtitle}</div>
          <div className="comparison-table__desc" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="comparison-table__table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th></th>
                {columns.map(col => (
                  <th key={col.id} className="comparison-table__col-title">{col.title?.value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td className="comparison-table__row-title">
                    {row.title?.value}
                    {row.tooltip?.value && (
                      <span className="comparison-table__tooltip" title={row.tooltip.value}>?</span>
                    )}
                  </td>
                  {columns.map(col => {
                    const cell = getCell(row, col);
                    return (
                      <td key={col.id} className="comparison-table__cell">
                        {cell?.value?.value
                          ? cell.value.value === 'check'
                            ? <span className="comparison-table__check">&#10003;</span>
                            : <span>{cell.value.value}</span>
                          : <span className="comparison-table__dash">&#8212;</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="comparison-table__cta-row">
          <div className="comparison-table__cta-text">Let&apos;s discuss how your setup should look.</div>
          <button type="button" className="comparison-table__cta-btn">Schedule a Call</button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
