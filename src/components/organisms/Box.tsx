import { FC, ReactElement, ReactNode } from 'react'
import { Box } from '@mui/material'
import styled from '@emotion/styled'

type BoxProps = {
  children: ReactNode
  sx?: object
}

const CustomBox = styled(Box)`
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  height: calc(100vh - 136px);
  padding: 10px;
  background-color: #ffffff;
`

const BlockBox: FC<BoxProps> = (props: BoxProps): ReactElement => {
  return <CustomBox sx={props.sx}>{props.children}</CustomBox>
}

export default BlockBox
