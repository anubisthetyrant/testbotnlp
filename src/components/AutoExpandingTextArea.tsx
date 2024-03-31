import { useRef, useEffect } from 'react';
import "./expandable_textarea.css"


type Props = {
  setSendDisabled: (value: boolean) => void,
  inputText: string,
  setInputText: (value: string) => void,
  handleSend: () => void
  
}


const ExpandableTextarea = ({setSendDisabled, inputText, setInputText, handleSend}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSendDisabled(inputText.length > 0 ? false : true);
  }, [inputText, setSendDisabled])

  const handleChange = (value: string) => {
    setInputText(value);
    updateSize();
  };

  const updateSize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.maxHeight = '40px';
      textarea.style.height = 'auto';
      textarea.style.maxHeight = `${textarea.scrollHeight}px`; 
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  // text area on key down
  const hanldeKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setInputText(inputText + '\n');
      updateSize();
    }
  }
  return (
    <textarea
      ref={textareaRef}
      value={inputText}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={hanldeKeyDown}
      placeholder="Type your message here"
      style={{
        resize: 'none',
        overflow: 'hidden',
        minHeight: '10px',
        width: '80%',
        height: '40px',
        boxSizing: 'border-box',
        borderRadius: '8px',
        border: '1px solid transparent',
        padding: '10px',
        fontFamily: 'inherit',
        fontSize: '14px',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'pre-wrap',
        maxInlineSize: '80%',
        paddingRight: '40px',
        backgroundColor: '#666666',
        boxShadow: '0 0 10px 0 rgba(84, 84, 84, 0.4)',
        color: '#fff',
        transition: 'border 0.3s ease',
      }}
    />
    
  );
};

export default ExpandableTextarea;