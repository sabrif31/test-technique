import React, { FC, ReactElement, RefObject } from 'react'
import { TextField } from '@mui/material'
import styled from '@emotion/styled'

const Input = styled(TextField)`
  margin: 0 0 8px 0;
  width: 100%;
  background-color: #f3f3f3;
  border: none;
  border-radius: 10px;
  fieldset {
    border: none;
  }
`

type CustomTextFieldProps = {
  ref?: RefObject<HTMLInputElement>
  name: string
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  disabled?: boolean
  required?: boolean
  helperText?: string
  label?: string
  type?: string
  className?: string
  style?: object
  InputProps?: object
  defaultValue?: string
  sx?: object
}

const CustomTextField: FC<CustomTextFieldProps> = (
  props: CustomTextFieldProps
): ReactElement => {
  return (
    <Input
      ref={props.ref}
      sx={props.sx}
      label={props.label}
      disabled={props.disabled}
      name={props.name}
      onChange={props.changeHandler}
      type={props.type}
      helperText={props.helperText}
      style={props.style}
      className={props.className}
      defaultValue={props.defaultValue}
      value={props.value}
      required={props.required}
      variant={'outlined'}
      size={'small'}
      margin={'dense'}
    />
  )
}

export default CustomTextField
