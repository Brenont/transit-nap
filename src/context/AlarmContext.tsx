import React, {createContext, useState, useContext, ReactNode} from 'react';

interface AlarmLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface AlarmContextType {
  alarmLocation: AlarmLocation | null;
  isAlarmActive: boolean;
  setAlarm: (location: AlarmLocation) => void;
  clearAlarm: () => void;
  alarmHistory: AlarmLocation[];
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

interface AlarmProviderProps {
  children: ReactNode;
}

export const AlarmProvider: React.FC<AlarmProviderProps> = ({children}) => {
  const [alarmLocation, setAlarmLocation] = useState<AlarmLocation | null>(
    null,
  );
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [alarmHistory, setAlarmHistory] = useState<AlarmLocation[]>([]);

  const setAlarm = (location: AlarmLocation) => {
    setAlarmLocation(location);
    setIsAlarmActive(true);
  };

  const clearAlarm = () => {
    if (alarmLocation) {
      // Add to history when an alarm is cleared
      setAlarmHistory(prev => [...prev, alarmLocation]);
    }
    setAlarmLocation(null);
    setIsAlarmActive(false);
  };

  return (
    <AlarmContext.Provider
      value={{
        alarmLocation,
        isAlarmActive,
        setAlarm,
        clearAlarm,
        alarmHistory,
      }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = (): AlarmContextType => {
  const context = useContext(AlarmContext);
  if (context === undefined) {
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};
