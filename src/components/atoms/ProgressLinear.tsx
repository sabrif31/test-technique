import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import styled from '@emotion/styled'

const LoaderBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
`

type ProgressProps = {
  isLoading: boolean
}

const ProgressLinear: FC<ProgressProps> = (
  props: ProgressProps
): ReactElement => {
  return <LoaderBox>{props.isLoading && <LinearProgress />}</LoaderBox>
}

export default ProgressLinear
