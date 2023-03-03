import { FC, ReactElement, useState } from 'react'
import styled from '@emotion/styled'
import {
  newDate,
  getStartOfDay,
  addMinutes,
  formatDate,
  isTimeInDisabledRange,
  isTimeDisabled,
  timesToInjectAfter,
} from '../../utils/date-utils'

import frLocale from 'date-fns/locale/fr'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  overflow: auto;
  text-align: center;
  justify-content: center;
`
const LiTime = styled.li`
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
  &.selected {
    background-color: rgba(75, 135, 251, 1);
    color: #ffffff;
    /*
      border: 1px solid rgba(75, 135, 251, 1);
      color: rgba(75, 135, 251, 1);
      font-weight: bold;
      */
  }
`
const UlTime = styled.ul`
  width: 100%;
`

type TimePickerProps = {
  format?: string
  locale?: any
  intervals?: number | undefined
  selected?: number | Date
  injectTimes?: Array<string>
  includeTimes?: Array<string>
  maxTime?: Date
  minTime?: Date
  excludeTimes?: Array<string>
  filterTime?: React.ChangeEvent<HTMLInputElement>
  onChange?: any
}

const TimePicker: FC<TimePickerProps> = (
  props: TimePickerProps
): ReactElement => {
  const [selectedTime, setSelectedTime] = useState<string>('')

  const renderTimes = () => {
    let times: Array<Date> = []
    const format = props.format ? props.format : 'p'
    const intervals = props.intervals

    const base = getStartOfDay(newDate(props.selected))

    const multiplier = 1440 / Number(intervals)
    const sortedInjectTimes =
      props.injectTimes &&
      props.injectTimes.sort((a: string, b: string) => {
        return Number(a) - Number(b)
      })

    for (let i = 0; i < multiplier; i++) {
      const currentTime = addMinutes(base, i * Number(intervals))
      times.push(currentTime)
      if (sortedInjectTimes) {
        const timesToInject = timesToInjectAfter(
          base,
          currentTime,
          i,
          intervals,
          sortedInjectTimes
        )
        times = times.concat(timesToInject)
      }
    }

    return times.map((time, i) => {
      const timeFormat = formatDate(time, format, props.locale)
      return (
        <LiTime
          key={i}
          onClick={() => {
            setSelectedTime(timeFormat)
            handleClick(timeFormat)
          }}
          className={selectedTime === timeFormat ? 'selected' : ''}
          tabIndex={0}
        >
          {formatDate(time, format, props.locale)}
        </LiTime>
      )
    })
  }

  const handleClick = (time: string) => {
    if (
      ((props.minTime || props.maxTime) &&
        isTimeInDisabledRange(time, {
          minTime: props.minTime,
          maxTime: props.maxTime,
        })) ||
      ((props.excludeTimes || props.includeTimes || props.filterTime) &&
        isTimeDisabled(time, {
          excludeTimes: props.excludeTimes,
          filterTime: props.filterTime,
          includeTimes: props.includeTimes,
        }))
    )
      return
    props.onChange(time)
  }

  return (
    <Container>
      <UlTime tabIndex={0}>{renderTimes()}</UlTime>
    </Container>
  )
}

const defaultProps: TimePickerProps = {
  intervals: 30,
  format: 'HH:mm',
  locale: frLocale,
}
TimePicker.defaultProps = defaultProps

/*
const defaultProps: ButtonProps = {
    children: 'Save',
    type: "button",
    variant: "contained",
};
CustomButton.defaultProps = defaultProps;
*/

export default TimePicker
