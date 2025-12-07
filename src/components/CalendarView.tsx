import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { DayData } from '@/pages/Index';

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
  getDayData: (date: Date) => DayData;
}

const CalendarView = ({ onDateSelect, getDayData }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days: (Date | null)[] = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayData = getDayData(date);
            const today = isToday(date);

            return (
              <button
                key={index}
                onClick={() => onDateSelect(date)}
                className={`
                  aspect-square rounded-xl p-2 transition-all duration-200
                  hover:scale-105 hover:shadow-lg animate-scale-in
                  ${today ? 'ring-2 ring-primary' : ''}
                  ${dayData.status === 'busy' 
                    ? 'bg-destructive/20 hover:bg-destructive/30' 
                    : 'bg-card hover:bg-card/80'
                  }
                `}
                style={{ animationDelay: `${index * 10}ms` }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-lg font-semibold mb-1">
                    {date.getDate()}
                  </span>
                  <span className={`text-xs ${
                    dayData.status === 'busy' 
                      ? 'text-destructive font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    {dayData.status === 'busy' ? 'Занят' : 'Свободен'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;