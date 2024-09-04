import React from 'react';
import Layout from '../components/Layout';
import CourseHistoryTable from '../components/CourseHistoryTable';

const CourseHistoryPage = () => {
  // This is example data. In a real application, you'd likely fetch this data from an API or GraphQL.
  const exampleData = [
    { name: "Burns, Sam", dkSalary: "$10,900", dkOdds: "+1400", rounds: "20", sgAvg: "2.49", year2023: "6", year2022: "1", year2021: "1", year2019: "T30", year2018: "T12" },
    { name: "Riley, Davis", dkSalary: "$8,400", dkOdds: "+25000", rounds: "8", sgAvg: "2.33", year2023: "T19", year2022: "2", year2021: "", year2019: "", year2018: "" },
    // Add more player data here...
  ];

  return (
    <Layout>
      <h1>Course History</h1>
      <CourseHistoryTable data={exampleData} />
    </Layout>
  );
};

export default CourseHistoryPage;