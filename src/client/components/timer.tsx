import {useState, useEffect} from 'react';

interface IProps {
    seconds: number;
    callback: () => void;
}

const Timer =  ({ seconds, callback }: IProps) => {

  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) {
      callback()
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () =>  clearInterval(intervalId);

  }, [timeLeft]);

  return (
    <span>{timeLeft}</span>
  );

};

export default Timer;