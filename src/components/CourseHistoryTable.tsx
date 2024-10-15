'use client'; 

import React, { useState, useMemo } from 'react';

interface PlayerData {
  dg_id: number;
  player_name: string;
  dk_salary: number;
  draftkings: number;
  total_rounds: number;
  sg_mean: number;
  [key: string]: number | string;
}

interface EventInfo {
  event_id: number;
  event_name: string;
  course_name: string;
}

interface CourseHistoryTableProps {
  data: {
    event_info: EventInfo[];
    records: PlayerData[];
  };
}

const CourseHistoryTable: React.FC<CourseHistoryTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({ key: 'sg_mean', direction: 'descending' });
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  
  const years = ['2023', '2022', '2021', '2020', '2019'];

  const eventInfo = data.event_info[0];  // Assuming there's only one event for now
  const players = data.records;

  // Set the initial selected event
  React.useEffect(() => {
    if (eventInfo && selectedEvent === null) {
      setSelectedEvent(eventInfo.event_id);
    }
  }, [eventInfo, selectedEvent]);

  const getYearCellStyle = (value: string | number) => {
    if (value === null || value === undefined || value === '') return 'bg-white text-transparent';
    if (value === 'CUT' || value === 'DQ') return 'bg-[#54436B] text-white';
    if (value === 'T1' || value === '1') return 'bg-[#D4AF37] text-white';
    return 'bg-[#50CB93] text-white';
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...players];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] == null && b[sortConfig.key] == null) return 0;
        if (a[sortConfig.key] == null) return 1;
        if (b[sortConfig.key] == null) return -1;
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [players, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{eventInfo.event_name}</h2>
        <button
          onClick={() => setSelectedEvent(eventInfo.event_id)}
          className="px-4 py-2 rounded bg-purple-600 text-white font-medium"
        >
          {eventInfo.course_name}
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-2 py-1 text-left font-medium text-black uppercase tracking-wider sticky left-0 bg-gray-100 z-10 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer" onClick={() => requestSort('player_name')}>
                Player {sortConfig?.key === 'player_name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th scope="col" className="px-2 py-1 text-center font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => requestSort('dk_salary')}>
                Salary {sortConfig?.key === 'dk_salary' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th scope="col" className="px-2 py-1 text-center font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => requestSort('draftkings')}>
                Odds {sortConfig?.key === 'draftkings' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th scope="col" className="px-2 py-1 text-center font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => requestSort('total_rounds')}>
                Rounds {sortConfig?.key === 'total_rounds' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th scope="col" className="px-2 py-1 text-center font-medium text-black uppercase tracking-wider cursor-pointer" onClick={() => requestSort('sg_mean')}>
                SG Avg {sortConfig?.key === 'sg_mean' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              {years.map((year, index) => (
                <th key={year} scope="col" className={`px-2 py-1 text-center font-medium text-black uppercase tracking-wider cursor-pointer ${index === 0 ? 'border-l-2 border-black' : ''}`} onClick={() => requestSort(year)}>
                  {year} {sortConfig?.key === year && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((player) => (
              <tr key={player.dg_id}>
                <td className="px-2 py-1 whitespace-nowrap font-medium text-gray-900 sticky left-0 bg-white z-10 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]">{player.player_name}</td>
                <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-center">${player.dk_salary?.toLocaleString() ?? 'N/A'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-center">{player.draftkings ? `+${player.draftkings}` : 'N/A'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-center">{player.total_rounds ?? 'N/A'}</td>
                <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-center">
                  {player.sg_mean != null ? player.sg_mean.toFixed(2) : 'N/A'}
                </td>
                {years.map((year, index) => (
                  <td key={year} className={`px-2 py-1 whitespace-nowrap font-medium text-center ${getYearCellStyle(player[year])} ${index === 0 ? 'border-l-2 border-black' : ''}`}>
                    {player[year] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseHistoryTable;