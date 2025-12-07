import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { DayData } from '@/pages/Index';
import html2canvas from 'html2canvas';

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
  getDayData: (date: Date) => DayData;
}

const CalendarView = ({ onDateSelect, getDayData }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

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

  const downloadCalendarAsJPG = async () => {
    if (!calendarRef.current) return;

    try {
      const bgImage = new Image();
      bgImage.crossOrigin = 'anonymous';
      bgImage.src = 'https://cdn.poehali.dev/files/istockphoto-1435226158-612x612.jpg';
      
      await new Promise((resolve) => {
        bgImage.onload = resolve;
      });

      const canvas = await html2canvas(calendarRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      const ctx = finalCanvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(bgImage, 0, 0, finalCanvas.width, finalCanvas.height);
        ctx.drawImage(canvas, 0, 0);
        
        finalCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `calendar-${monthNames[currentDate.getMonth()]}-${currentDate.getFullYear()}.jpg`;
            link.click();
            URL.revokeObjectURL(url);
          }
        }, 'image/jpeg', 0.95);
      }
    } catch (error) {
      console.error('Error downloading calendar:', error);
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex justify-end">
          <button
            onClick={downloadCalendarAsJPG}
            className="flex items-center gap-2 px-6 py-3 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-105 text-white font-semibold shadow-xl border border-white/20"
          >
            <Icon name="Download" size={20} />
            Скачать календарь JPG
          </button>
        </div>
        
      <div ref={calendarRef}>
        <div className="flex items-center justify-between mb-8 backdrop-blur-md bg-white/10 rounded-2xl p-4 shadow-xl border border-white/20">
          <button
            onClick={() => changeMonth(-1)}
            className="p-3 hover:bg-white/20 rounded-xl transition-all hover:scale-110 text-white"
          >
            <Icon name="ChevronLeft" size={28} />
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          
          <button
            onClick={() => changeMonth(1)}
            className="p-3 hover:bg-white/20 rounded-xl transition-all hover:scale-110 text-white"
          >
            <Icon name="ChevronRight" size={28} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-bold text-white/90 py-3 backdrop-blur-sm bg-white/10 rounded-lg"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
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
                  aspect-square rounded-2xl p-3 transition-all duration-300
                  hover:scale-110 hover:shadow-2xl animate-scale-in
                  backdrop-blur-md border-2
                  ${today ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''}
                  ${dayData.status === 'busy' 
                    ? 'bg-gradient-to-br from-red-500/30 to-pink-500/30 border-red-400/50 hover:from-red-500/40 hover:to-pink-500/40' 
                    : 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-400/50 hover:from-green-500/40 hover:to-emerald-500/40'
                  }
                `}
                style={{ animationDelay: `${index * 10}ms` }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-xl font-bold mb-1 text-white drop-shadow-lg">
                    {date.getDate()}
                  </span>
                  <span className={`text-xs font-semibold ${
                    dayData.status === 'busy' 
                      ? 'text-red-200' 
                      : 'text-green-200'
                  }`}>
                    {dayData.status === 'busy' ? '🔴 Занят' : '✅ Свободен'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default CalendarView;