import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { DayData } from '@/pages/Index';

interface DayViewProps {
  date: Date;
  dayData: DayData;
  onBack: () => void;
  onStatusChange: (status: 'busy' | 'free') => void;
}

const DayView = ({ date, dayData, onBack, onStatusChange }: DayViewProps) => {
  const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const weekDays = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
    'Четверг', 'Пятница', 'Суббота'
  ];

  const formatDate = () => {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getWeekDay = () => {
    return weekDays[date.getDay()];
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-white/80 transition-all mb-8 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 font-medium"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Назад к календарю</span>
        </button>

        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-white/30">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 rounded-full px-8 py-3 mb-6 shadow-lg">
              <span className="text-white font-bold text-lg">{getWeekDay()}</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold mb-4 text-white drop-shadow-2xl">
              {date.getDate()}
            </h1>
            
            <p className="text-white/90 text-xl font-medium">
              {formatDate()}
            </p>
          </div>

          <div className="border-t border-white/30 pt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Статус дня</h2>
              
              <div className="flex gap-4">
                <Button
                  onClick={() => onStatusChange('free')}
                  className={`flex-1 h-auto py-6 flex flex-col items-center gap-3 rounded-2xl text-lg font-bold transition-all duration-300 ${
                    dayData.status === 'free'
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-xl scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 border-2 border-white/40'
                  }`}
                >
                  <Icon name="Check" size={32} />
                  <span>✅ Свободен</span>
                </Button>
                
                <Button
                  onClick={() => onStatusChange('busy')}
                  className={`flex-1 h-auto py-6 flex flex-col items-center gap-3 rounded-2xl text-lg font-bold transition-all duration-300 ${
                    dayData.status === 'busy'
                      ? 'bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-xl scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 border-2 border-white/40'
                  }`}
                >
                  <Icon name="X" size={32} />
                  <span>🔴 Занят</span>
                </Button>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 flex items-start gap-4 border border-white/30">
              <Icon name="Info" size={24} className="text-yellow-300 mt-1" />
              <div>
                <p className="text-white font-medium">
                  {dayData.status === 'busy' 
                    ? 'В этот день вы заняты. Нажмите "Свободен" чтобы изменить статус.'
                    : 'В этот день вы свободны. Нажмите "Занят" чтобы изменить статус.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;