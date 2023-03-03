import { FC, ReactElement } from 'react'
import BlockBox from '../organisms/Box'
import DateTime from '../molecules/DateTime'

const CalendarPage: FC = (): ReactElement => {
  return (
    <BlockBox>
      <DateTime />
    </BlockBox>
  )
}

export default CalendarPage
