import React from 'react';
import './CourseHistoryTable.css';

const CourseHistoryTable = ({ data }) => {
  const getYearCellClass = (value) => {
    if (!value) return 'na';
    if (value === 'CUT' || value === 'DQ') return 'cut';
    if (value === '1') return 'first';
    return 'other';
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="tournament-name">INNISBROOK RESORT (COPPERHEAD COURSE) - COURSE HISTORY</div>
        <div className="subtitle">VALSPAR CHAMPIONSHIP</div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PLAYER</th>
                <th>DK SALARY</th>
                <th>DK ODDS</th>
                <th>ROUNDS</th>
                <th>SG AVG</th>
                <th>2023</th>
                <th>2022</th>
                <th>2021</th>
                <th>2019</th>
                <th>2018</th>
              </tr>
            </thead>
            <tbody>
              {data.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.dkSalary}</td>
                  <td>{player.dkOdds}</td>
                  <td>{player.rounds}</td>
                  <td>{player.sgAvg}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2023)}`}>{player.year2023}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2022)}`}>{player.year2022}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2021)}`}>{player.year2021}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2019)}`}>{player.year2019}</td>
                  <td className={`year-cell ${getYearCellClass(player.year2018)}`}>{player.year2018}</td>
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