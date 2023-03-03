import { FC, ReactElement } from 'react'
import BlockBox from '../organisms/Box'
import Search from '../molecules/Search'

const SearchPage: FC = (): ReactElement => {
  return (
    <BlockBox>
      <Search keys={['activity', 'category', 'sector']} />
    </BlockBox>
  )
}

export default SearchPage
