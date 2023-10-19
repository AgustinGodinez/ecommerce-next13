import { Button, Confirm } from 'semantic-ui-react'

export function Confirme({...rest}) {
  return (
    <Confirm className='confirm' size='mini' {...rest} />
  )
  
}
