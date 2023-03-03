// https://medium.com/@sandupa.egodage/react-form-with-typescript-c74510b2f9d3
// https://dev.to/karan316/build-forms-using-react-the-easy-way-with-typescript-46bh
import { FC, ReactElement, ReactNode } from 'react'
import { Paper } from '@mui/material'
import styled from '@emotion/styled'

type PaperProps = {
  children: ReactNode
  square?: boolean
  sx?: object
}

const CustomPaper = styled(Paper)`
  padding: 8px;
  text-align: center;
  width: 350px;
`

const BlockPaper: FC<PaperProps> = (props: PaperProps): ReactElement => {
  return (
    <CustomPaper square={props.square} sx={props.sx}>
      {props.children}
    </CustomPaper>
  )
}

export default BlockPaper
