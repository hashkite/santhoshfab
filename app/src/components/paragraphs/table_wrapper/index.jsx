import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import './table_wrapper.scss';

const TableWrapper = ({ data }) => {
  const containerRef = useRef(null);
  if (!data) return null;
  const { title, description, table_headers, table_rows } = data;
  const headers = table_headers?.items || [];
  const rows = table_rows?.items || [];

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(containerRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power1.out',
        });
      }
    },
    { scope: containerRef, dependencies: [data] }
  );

  return (
    <section className="table-wrapper" ref={containerRef}>
      <div className="container">
        {title?.value && (
          <h2 className="table-wrapper__title">{title.value}</h2>
        )}
        {description?.value && (
          <div
            className="table-wrapper__desc"
            dangerouslySetInnerHTML={{ __html: description.value }}
          />
        )}
        <div className="table-wrapper__table-container">
          <table className="table-wrapper__table">
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={`table-wrapper__th${
                      idx > 0 ? ' table-wrapper__th--right' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={row.id || rIdx} className="table-wrapper__tr">
                  {(row.cell?.items || []).map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`table-wrapper__td${
                        cIdx > 0 ? ' table-wrapper__td--right' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TableWrapper;
