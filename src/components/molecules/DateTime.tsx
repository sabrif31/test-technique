import { FC, ReactElement, useState } from 'react'
import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import _isEmpty from 'lodash/isEmpty'
import InputLabel from '@mui/material/InputLabel'

import CustomTextField from '../atoms/TextField'
import Calendar from '../atoms/Calendar'
import CustomButton from '../atoms/Button'
import TimePicker from '../atoms/TimePicker'

type DateTimeProps = {
  onSelectDate?: (date: string) => void
  format?: string
  locale?: any
  intervals?: number | undefined
  injectTimes?: Array<string>
  includeTimes?: Array<string>
  maxTime?: Date
  minTime?: Date
  excludeTimes?: Array<string>
  filterTime?: React.ChangeEvent<HTMLInputElement>
  onChange?: any
  timeFormat?: string
  timeIntervals?: number
}

const DateTimeContainer = styled.div`
  display: flex;
  width: 600px;
`
const DateContainer = styled.div`
  margin-right: 50px;
`
const TimeContainer = styled.div``
const InputContainer = styled.div`
  display: flex;
  align-items: center;

  label {
    color: #3858c0;
    width: 50px;
  }

  .time {
    border: 1px solid rgba(75, 135, 251, 1);
    width: 100px;
  }
`
const DateButtonContainer = styled.div`
  display: flex;
  .schedule-button {
    margin-right: 10px;
  }
`

const DateTime: FC<DateTimeProps> = (props: DateTimeProps): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [finalDate, setFinalDate] = useState<string>('')

  const onSchedule = () =>
    setFinalDate(`${format(selectedDate, 'dd/MM/yyyy')} ${selectedTime}:00`)

  return (
    <>
      <Typography variant={'h5'} sx={{ marginBottom: '10px' }}>
        Schedule Response
      </Typography>
      <DateTimeContainer>
        <DateContainer>
          <InputContainer>
            <InputLabel>Date</InputLabel>
            <CustomTextField
              disabled
              value={format(selectedDate, 'dd/MM/yyyy')}
              name={'date'}
              type={'text'}
            />
          </InputContainer>
          <Calendar onSelectDate={setSelectedDate} />
          <DateButtonContainer>
            <CustomButton
              type="submit"
              variant={'contained'}
              className={'schedule-button'}
              onClick={onSchedule}
              disabled={_isEmpty(selectedDate) && _isEmpty(selectedTime)}
            >
              Schedule
            </CustomButton>
            <CustomButton type="submit" variant={'outlined'}>
              Cancel
            </CustomButton>
          </DateButtonContainer>
        </DateContainer>
        <TimeContainer>
          <InputContainer>
            <InputLabel>Time</InputLabel>
            <CustomTextField
              disabled
              value={selectedTime}
              name={'time'}
              type={'text'}
              className="time"
            />
          </InputContainer>
          <TimePicker selected={selectedDate} onChange={setSelectedTime} />
        </TimeContainer>
      </DateTimeContainer>
      Date: {finalDate}
    </>
  )
}

export default DateTime
