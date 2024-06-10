import type {Component, JSX} from 'solid-js'

import Styles from './spinner-styles.scss'

type Props = JSX.HTMLAttributes<HTMLDivElement>

const Spinner: Component<Props> = (props: Props) => {
  return (
    <div {...props} class={[Styles.spinner, props.class].join(' ')}>
      <div /><div /><div /><div />
    </div>
  )
}

export default Spinner
