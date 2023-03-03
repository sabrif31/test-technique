import { FC, ReactElement, useState } from 'react'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'

const css = `
    .my-selected:not([disabled]) { 
        font-weight: bold; 
        border: 2px solid rgba(75, 135, 251, 1);
        border-radius: 8px;
        color: rgba(75, 135, 251, 1);
    }
    .my-selected:hover:not([disabled]) { 
        border: 0;
        background-color: rgba(75, 135, 251, 1);
    }
    .my-today {
        background-color: #f3f3f3;
        border-radius: 8px;
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
        border-radius: 8px;
        background-color: rgba(75, 135, 251, 1);
        color: #ffffff;
    }
    .rdp-caption_label {
        color: #3858c0;
        font-size: 16px;
    }
    .rdp-months {
        color: #474f58;
    }
    .rdp-nav_button:hover {
        background-color: #f3f3f3;
    }
    .rdp-nav_button svg {
        transform: scale(0.8);
    }
    .rdp-nav_button svg path{
        fill: #818894;
    }
    .rdp-nav_button:hover:not([disabled]):not(.rdp-day_selected) {
        background-color: #f3f3f3;
    }
`

type CalendarProps = {
  onSelectDate: (date: Date) => void
  className?: string
}

const Calendar: FC<CalendarProps> = (props: CalendarProps): ReactElement => {
  const [selected, setSelected] = useState<Date>()

  const onSelect = (date: any) => {
    setSelected(date)
    props.onSelectDate(date)
  }

  return (
    <>
      <style>{css}</style>
      <DayPicker
        className={props.className}
        mode="single"
        selected={selected}
        onSelect={onSelect}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today',
        }}
        modifiersStyles={{
          disabled: { fontSize: '75%' },
        }}
      />
    </>
  )
}

export default Calendar
