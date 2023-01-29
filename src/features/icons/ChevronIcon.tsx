import { Icon, IconProps } from '@hope-ui/solid'

function ChevronIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 48 48" {...props}>
      <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" fill="currentColor" />
    </Icon>
  )
}

export default ChevronIcon
