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
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Назад к календарю</span>
        </button>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-4">
              <span className="text-primary font-medium">{getWeekDay()}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              {date.getDate()}
            </h1>
            
            <p className="text-muted-foreground text-lg">
              {formatDate()}
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Статус дня</h2>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => onStatusChange('free')}
                  variant={dayData.status === 'free' ? 'default' : 'outline'}
                  className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
                >
                  <Icon name="Check" size={24} />
                  <span className="text-sm">Свободен</span>
                </Button>
                
                <Button
                  onClick={() => onStatusChange('busy')}
                  variant={dayData.status === 'busy' ? 'default' : 'outline'}
                  className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
                >
                  <Icon name="X" size={24} />
                  <span className="text-sm">Занят</span>
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
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