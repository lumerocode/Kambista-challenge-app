declare module '*.svg' {
  import type { ComponentType } from 'react'
  import type { SvgProps } from 'react-native-svg'
  const content: ComponentType<SvgProps>
  export default content
}

declare module '*.png' {
  const content: number
  export default content
}

declare module '*.jpg' {
  const content: number
  export default content
}

declare module '*.jpeg' {
  const content: number
  export default content
}
