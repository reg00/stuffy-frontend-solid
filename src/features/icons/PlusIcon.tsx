import { Icon, IconProps } from '@hope-ui/solid'

function PlusIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 48 48" {...props}>
      <path
        d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"
        fill="currentColor"
      />
    </Icon>
  )
}

export default PlusIcon
