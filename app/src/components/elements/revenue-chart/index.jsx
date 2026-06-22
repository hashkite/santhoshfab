import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './revenue-chart.scss';

gsap.registerPlugin(ScrollTrigger);

const defaultRevenueData = [
  { year: '2012-13', value: 4.13 },
  { year: '2013-14', value: 5.65 },
  { year: '2014-15', value: 7.14 },
  { year: '2015-16', value: 9.02 },
  { year: '2016-17', value: 4.10 },
  { year: '2017-18', value: 9.36 },
  { year: '2018-19', value: 12.29 },
  { year: '2019-20', value: 6.88 },
  { year: '2020-21', value: 6.63 },
  { year: '2021-22', value: 12.27 },
  { year: '2022-23', value: 19.20 },
  { year: '2023-24', value: 40.71 },
  { year: '2024-25', value: 52.92, projected: true },
];

const RevenueChart = ({ data }) => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'all'
  const [hoveredBar, setHoveredBar] = useState(null);

  // SVG dimensions
  const width = 1000;
  const height = 450;
  const padding = { top: 60, right: 40, bottom: 60, left: 60 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Extract titles and subtitles
  const title = data?.title?.value || 'Company Revenue Growth';
  const subtitle = data?.subtitle?.value || 'Consistent annual revenue growth in Crores (INR), demonstrating expanding operations and scale.';

  // Parse data from paragraph or use default
  const rawItems = data?.paragraphs?.items || [];
  const finalData = rawItems.length > 0
    ? rawItems.map(item => {
      const year = item?.title?.value || '';
      const value = parseFloat(item?.stat?.value || '0');
      const projected = year.includes('*') || year.toLowerCase().includes('projected') || year === '2024-25';
      return { year, value, projected };
    })
    : defaultRevenueData;

  // Compute stats based on the complete dataset
  const nonProjected = finalData.filter(d => !d.projected);
  const latestItem = nonProjected.length > 0 ? nonProjected[nonProjected.length - 1] : finalData[finalData.length - 1];
  const projectedItem = finalData.find(d => d.projected) || null;
  const firstItem = finalData[0];
  const growthScale = firstItem && latestItem && firstItem.value > 0
    ? (latestItem.value / firstItem.value).toFixed(1) + 'x'
    : '10x+';

  // Active dataset to display
  const chartData = viewMode === 'recent' ? finalData.slice(-5) : finalData;

  // Dynamic grid scaling
  const maxValInDataset = Math.max(...finalData.map(d => d.value), 10);
  const maxValue = Math.ceil(maxValInDataset / 10) * 10; // Round up to nearest 10

  const ticks = [];
  const tickCount = 5;
  const step = maxValue / tickCount;
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(Math.round(step * i));
  }

  // Compute coordinates helper
  const getX = (index) => {
    return padding.left + (index * (chartWidth / chartData.length)) + (chartWidth / chartData.length) / 2;
  };

  const getY = (value) => {
    return padding.top + chartHeight - (value / maxValue) * chartHeight;
  };

  const barWidth = viewMode === 'recent' ? 48 : 24;

  useEffect(() => {
    const bars = containerRef.current.querySelectorAll('.chart-bar-rect');
    const labels = containerRef.current.querySelectorAll('.chart-bar-value');

    // Reset initial states before animation
    gsap.set(bars, { scaleY: 0, transformOrigin: 'bottom' });
    gsap.set(labels, { opacity: 0, y: 10 });

    gsap.to(bars, {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=80px',
        toggleActions: 'play none none none',
      },
    });

    gsap.to(labels, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=80px',
        toggleActions: 'play none none none',
      },
    });
  }, [viewMode, data]);

  return (
    <section ref={containerRef} className="revenue-chart__section">
      <div className="container">
        <div className="revenue-chart__header text-center">
          <h2 className="revenue-chart__title" dangerouslySetInnerHTML={{ __html: title.replace('Revenue Growth', '<span class="brand-blue">Revenue Growth</span>') }}></h2>
          <p className="revenue-chart__subtitle">{subtitle}</p>
        </div>

        <div className="revenue-chart__layout">
          {/* Key Insights Stats Panel */}
          <div className="revenue-chart__stats-panel">
            <h4 className="stats-panel__title">Key Insights</h4>

            <div className="stat-card">
              <span className="stat-card__label">FY {latestItem?.year} Revenue</span>
              <span className="stat-card__value brand-blue">{latestItem?.value} Cr</span>
              <span className="stat-card__growth">+112% Growth YoY</span>
            </div>

            {projectedItem && (
              <div className="stat-card">
                <span className="stat-card__label">Projected FY {projectedItem.year.replace('*', '')}</span>
                <span className="stat-card__value">{projectedItem.value} Cr</span>
                <span className="stat-card__desc">Based on active contracts</span>
              </div>
            )}

            <div className="stat-card">
              <span className="stat-card__label">Growth Trajectory</span>
              <span className="stat-card__value brand-blue">{growthScale}</span>
              <span className="stat-card__desc">Revenue expansion since FY {firstItem?.year}</span>
            </div>
          </div>

          {/* Interactive SVG Chart Card */}
          <div className="revenue-chart__card">
            <div className="revenue-chart__controls">
              <button
                className={`control-btn ${viewMode === 'recent' ? 'active' : ''}`}
                onClick={() => setViewMode('recent')}
              >
                Recent Growth (5 Yrs)
              </button>
              <button
                className={`control-btn ${viewMode === 'all' ? 'active' : ''}`}
                onClick={() => setViewMode('all')}
              >
                Full History
              </button>
            </div>

            <div className="revenue-chart__wrapper">
              <svg viewBox={`0 0 ${width} ${height}`} className="revenue-chart__svg" width="100%" height="100%">
                <defs>
                  {/* Gradient for regular bars */}
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2eb1d2" />
                    <stop offset="100%" stopColor="#1f44e2" />
                  </linearGradient>
                  {/* Gradient for projected bar */}
                  <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2eb1d2" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#1f44e2" stopOpacity="0.85" />
                  </linearGradient>
                  {/* Glow filter on hover */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid Lines & Y Axis Labels */}
                {ticks.map((val) => {
                  const y = getY(val);
                  return (
                    <g key={val} className="chart-grid-line">
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={width - padding.right}
                        y2={y}
                        stroke="#e5e9f0"
                        strokeDasharray={val === 0 ? '0' : '4 4'}
                        strokeWidth={val === 0 ? '2' : '1'}
                      />
                      <text
                        x={padding.left - 15}
                        y={y + 5}
                        textAnchor="end"
                        className="chart-axis-label"
                        fill="#8a99ad"
                        fontSize="14"
                      >
                        {val} Cr
                      </text>
                    </g>
                  );
                })}

                {/* Bars and Labels */}
                {chartData.map((data, index) => {
                  const x = getX(index);
                  const y = getY(data.value);
                  const barHeight = padding.top + chartHeight - y;
                  const isHovered = hoveredBar === index;

                  return (
                    <g
                      key={data.year}
                      className="chart-bar-group"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Interactive hover background region */}
                      <rect
                        x={x - (chartWidth / chartData.length) / 2}
                        y={padding.top}
                        width={chartWidth / chartData.length}
                        height={chartHeight}
                        fill="transparent"
                        cursor="pointer"
                      />

                      {/* Actual Bar */}
                      <rect
                        x={x - barWidth / 2}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        ry="4"
                        className="chart-bar-rect"
                        fill={data.projected ? 'url(#projectedGradient)' : 'url(#barGradient)'}
                        stroke={data.projected ? '#ff9900' : 'none'}
                        strokeDasharray={data.projected ? '2 2' : 'none'}
                        filter={isHovered ? 'url(#glow)' : 'none'}
                        style={{ transition: 'all 0.2s ease-out' }}
                      />

                      {/* Permanent Value Label on Top of Bar */}
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        className="chart-bar-value"
                        fill={isHovered ? '#2eb1d2' : '#191c1e'}
                        fontSize="13"
                        fontWeight="bold"
                        style={{ transition: 'fill 0.2s' }}
                      >
                        {data.value}
                      </text>

                      {/* Year Label */}
                      <text
                        x={x}
                        y={height - padding.bottom + 25}
                        textAnchor="middle"
                        className="chart-axis-label"
                        fill={isHovered ? '#191c1e' : '#8a99ad'}
                        fontWeight={isHovered ? '600' : '400'}
                        fontSize="13"
                        style={{ transition: 'fill 0.2s' }}
                      >
                        {data.year.replace('*', '')}
                        {data.projected && '*'}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            {projectedItem && (
              <div className="revenue-chart__footer text-center">
                <span className="projected-note">* FY {projectedItem.year.replace('*', '')} figures represent projected growth based on ongoing contracts.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
