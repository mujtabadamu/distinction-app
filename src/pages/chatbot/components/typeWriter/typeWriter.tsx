import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypeWriterProps {
  children: string;
  onScroll: () => void;
}

export default function TypeWriter({ onScroll, children }: TypeWriterProps) {
  const [text, setText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!children) return;
      if (currentIndex < children.length) {
        setText((prevText) => prevText + children[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 20); // increase or reduce typing speed here

    return () => clearInterval(intervalId);
  }, [children, currentIndex]);
  useEffect(() => {
    onScroll();
  }, [text]);

  return (
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
