import { useEffect, useRef, useState } from 'react'
import './App.css'

type DateType = {
  year: number;
  month: string;
  day: string;
}

type TimeType = {
  h: string;
  m: string;
  s: string;
}

function App() {
  const [currentDate, setCurrentDate] = useState<DateType | null>(null);
  const [time, setTime] = useState<TimeType | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const timeRef = useRef<number | null>(null);

  const handleBtnClick = () => setShow(prev => !prev);

  const getCurrentDate = () => {
    const months = "január,február,március,április,május,június,július,augusztus,szeptember,október,november,december".split(",");
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    setCurrentDate({year: y, month: months[m], day: String(d).padStart(2, "0")});
  }
  useEffect(() => {
    getCurrentDate();
  }, []);

  useEffect(()=> {
    timeRef.current = setInterval(() => {
      const date = new Date();
      setTime({h: String(date.getHours()).padStart(2, "0"), m: String(date.getMinutes()).padStart(2, "0"), s: String(date.getSeconds()).padStart(2, "0")})
    }, 1000 );

    // Clean up:
    return () => {
      clearInterval(timeRef.current!);
    }
  }, [show]);

  return (
    <>
      <header>
        <h1>Óra-alkalmazás</h1>
        <h2>Mai dátum:</h2>
        <h3>{`${currentDate?.year}. ${currentDate?.month} ${currentDate?.day}.`}</h3>
      </header>
      <main>
        <button
        onClick={handleBtnClick}
        >{show ? "Elrejt" : "Mutat"}</button>
        {show && <section>
          <div className="hour">{time?.h}</div>
          <div className="min">{time?.m}</div>
          <div className="sec">{time?.s}</div>
        </section>}
      </main>
    </>
  )
}

export default App
