import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample data - replace this with your actual data fetching logic
const sampleData = [
  { golfer: 'Tiger Woods', event: 'Masters', year: 2024, round: 'R1', score: 70 },
  { golfer: 'Rory McIlroy', event: 'Masters', year: 2024, round: 'R1', score: 72 },
  { golfer: 'Tiger Woods', event: 'Masters', year: 2024, round: 'R2', score: 68 },
  { golfer: 'Rory McIlroy', event: 'Masters', year: 2024, round: 'R2', score: 70 },
  { golfer: 'Tiger Woods', event: 'US Open', year: 2024, round: 'R1', score: 69 },
  { golfer: 'Rory McIlroy', event: 'US Open', year: 2024, round: 'R1', score: 68 },
  // ... more data ...
];

const App = () => {
  const [golfer1, setGolfer1] = useState('');
  const [golfer2, setGolfer2] = useState('');
  const [nRounds, setNRounds] = useState(30);
  const [comparisonData, setComparisonData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({});

  const golfers = [...new Set(sampleData.map(d => d.golfer))];

  useEffect(() => {
    if (golfer1 && golfer2) {
      const filteredData = sampleData.filter(d => d.golfer === golfer1 || d.golfer === golfer2);
      const groupedData = {};
      filteredData.forEach(d => {
        const key = `${d.event}-${d.year}-${d.round}`;
        if (!groupedData[key]) groupedData[key] = { event: d.event, year: d.year, round: d.round };
        groupedData[key][d.golfer] = d.score;
      });

      const commonRounds = Object.values(groupedData)
        .filter(scores => scores[golfer1] && scores[golfer2])
        .slice(-nRounds)
        .sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          if (a.event !== b.event) return a.event.localeCompare(b.event);
          return a.round.localeCompare(b.round);
        });

      setComparisonData(commonRounds);

      // Calculate summary stats
      const totalRounds = commonRounds.length;
      const golfer1Wins = commonRounds.filter(r => r[golfer1] < r[golfer2]).length;
      const golfer2Wins = commonRounds.filter(r => r[golfer2] < r[golfer1]).length;
      const ties = totalRounds - golfer1Wins - golfer2Wins;

      setSummaryStats({
        totalRounds,
        golfer1Wins,
        golfer2Wins,
        ties,
      });
    }
  }, [golfer1, golfer2, nRounds]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Golfer Comparison App</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Select onValueChange={setGolfer1}>
          <SelectTrigger>
            <SelectValue placeholder="Select Golfer 1" />
          </SelectTrigger>
          <SelectContent>
            {golfers.map(golfer => (
              <SelectItem key={golfer} value={golfer}>{golfer}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={setGolfer2}>
          <SelectTrigger>
            <SelectValue placeholder="Select Golfer 2" />
          </SelectTrigger>
          <SelectContent>
            {golfers.map(golfer => (
              <SelectItem key={golfer} value={golfer}>{golfer}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          type="number"
          placeholder="Number of recent rounds"
          value={nRounds}
          onChange={(e) => setNRounds(Number(e.target.value))}
        />
      </div>

      {summaryStats.totalRounds > 0 && (
        <Card className="mb-4">
          <CardHeader>Summary Statistics</CardHeader>
          <CardContent>
            <p>{golfer1} wins: {summaryStats.golfer1Wins} ({(summaryStats.golfer1Wins / summaryStats.totalRounds * 100).toFixed(1)}%)</p>
            <p>{golfer2} wins: {summaryStats.golfer2Wins} ({(summaryStats.golfer2Wins / summaryStats.totalRounds * 100).toFixed(1)}%)</p>
            <p>Ties: {summaryStats.ties} ({(summaryStats.ties / summaryStats.totalRounds * 100).toFixed(1)}%)</p>
          </CardContent>
        </Card>
      )}

      {comparisonData.length > 0 && (
        <Card>
          <CardHeader>Score Comparison</CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{golfer1}</TableHead>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead>{golfer2}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((round, index) => (
                  <TableRow key={index}>
                    <TableCell className={round[golfer1] < round[golfer2] ? 'bg-green-100' : ''}>
                      {round[golfer1]}
                    </TableCell>
                    <TableCell>{round.event} {round.year}</TableCell>
                    <TableCell>{round.round}</TableCell>
                    <TableCell className={round[golfer2] < round[golfer1] ? 'bg-green-100' : ''}>
                      {round[golfer2]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;