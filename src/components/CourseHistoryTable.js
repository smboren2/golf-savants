import React, { useState, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import './CourseHistoryTable.css';

const CourseHistoryTable = () => {
  const [sortColumn, setSortColumn] = useState('sgAvg');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const data = useStaticQuery(graphql`
    query {
      allCourseHistoryCsv {
        nodes {
          player: player_name
          dkSalary: dk_salary
          dkOdds: draftkings
          rounds: total_rounds
          sgAvg: sg_mean
          year2023: year2023
          year2022: year2022
          year2021: year2021
          year2020: year2020
          year2019: year2019
        }
      }
    }
  `);

  const courseHistoryData = data.allCourseHistoryCsv.nodes;

  const getYearCellClass = (value) => {
    if (value === null || value === undefined || value === 'NA' || value === '') return 'na';
    if (value === 'CUT' || value === 'DQ') return 'cut';
    if (value === 1) return 'first';
    return 'other';
  };

  const formatYearValue = (value) => {
    if (value === null || value === undefined || value === 'NA' || value === '') return '';
    if (value === 'CUT' || value === 'DQ') return value;
    if (typeof value === 'number') {
      if (value === 1) return '1';
      return `T${value}`;
    }
    return value;
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return courseHistoryData;

    const compareValues = (a, b) => {
      if (a === 'NA' || a === '') return 1;
      if (b === 'NA' || b === '') return -1;
      if (a === 'CUT') return b === 'DQ' ? -1 : 1;
      if (b === 'CUT') return a === 'DQ' ? 1 : -1;
      if (a === 'DQ') return 1;
      if (b === 'DQ') return -1;
      return a - b;
    };

    return [...courseHistoryData].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === 'player') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (sortColumn === 'dkSalary' || sortColumn === 'dkOdds') {
        aValue = parseFloat(aValue.replace(/[$,+]/g, ''));
        bValue = parseFloat(bValue.replace(/[$,+]/g, ''));
      }

      if (sortColumn === 'sgAvg') {
        aValue = aValue === 'NA' ? -Infinity : parseFloat(aValue);
        bValue = bValue === 'NA' ? -Infinity : parseFloat(bValue);
      }

      const result = compareValues(aValue, bValue);
      return sortDirection === 'asc' ? result : -result;
    });
  }, [courseHistoryData, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (column.startsWith('year')) return;
    setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const renderHeader = (column, label) => {
    if (column.startsWith('year')) {
      return <th>{label}</th>;
    }
    return (
      <th onClick={() => handleSort(column)}>
        {label} {sortColumn === column && (sortDirection === 'asc' ? '▲' : '▼')}
      </th>
    );
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="tournament-name">THE COUNTRY CLUB OF JACKSON - COURSE HISTORY</div>
        <div className="subtitle">SANDERSON FARMS CHAMPIONSHIP</div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {renderHeader('player', 'PLAYER')}
                {renderHeader('dkSalary', 'DK SALARY')}
                {renderHeader('dkOdds', 'DK ODDS')}
                {renderHeader('rounds', 'ROUNDS')}
                {renderHeader('sgAvg', 'SG AVG')}
                {renderHeader('year2023', '2023')}
                {renderHeader('year2022', '2022')}
                {renderHeader('year2021', '2021')}
                {renderHeader('year2020', '2020')}
                {renderHeader('year2019', '2019')}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((player, index) => (
                <tr key={index}>
                  <td>{player.player}</td>
                  <td>{player.dkSalary}</td>
                  <td>{player.dkOdds}</td>
                  <td>{player.rounds}</td>
                  <td>{player.sgAvg}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2023)}`}>{formatYearValue(player.year2023)}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2022)}`}>{formatYearValue(player.year2022)}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2021)}`}>{formatYearValue(player.year2021)}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2020)}`}>{formatYearValue(player.year2020)}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2019)}`}>{formatYearValue(player.year2019)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseHistoryTable;