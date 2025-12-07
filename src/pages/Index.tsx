import { useState } from 'react';
import CalendarView from '@/components/CalendarView';
import DayView from '@/components/DayView';

export interface DayData {
  date: Date;
  status: 'busy' | 'free';
}

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [daysData, setDaysData] = useState<Map<string, DayData>>(new Map());

  const getDayKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const getDayData = (date: Date): DayData => {
    const key = getDayKey(date);
    return daysData.get(key) || { date, status: 'free' };
  };

  const updateDayStatus = (date: Date, status: 'busy' | 'free') => {
    const key = getDayKey(date);
    const newData = new Map(daysData);
    newData.set(key, { date, status });
    setDaysData(newData);
  };

  return (
    <div className="min-h-screen bg-background">
      {selectedDate ? (
        <DayView
          date={selectedDate}
          dayData={getDayData(selectedDate)}
          onBack={() => setSelectedDate(null)}
          onStatusChange={(status) => updateDayStatus(selectedDate, status)}
        />
      ) : (
        <CalendarView
          onDateSelect={setSelectedDate}
          getDayData={getDayData}
        />
      )}
    </div>
  );
};

export default Index;