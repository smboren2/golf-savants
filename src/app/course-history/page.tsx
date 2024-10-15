import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import CourseHistoryTable from '../../components/CourseHistoryTable';

export const metadata = {
  title: 'Course History | Golf Savants',
  description: 'View course history for golf tournaments',
};

async function getCourseHistoryData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'course_hist.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function CourseHistory() {
  const courseHistoryData = await getCourseHistoryData();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Course History</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <CourseHistoryTable data={courseHistoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}