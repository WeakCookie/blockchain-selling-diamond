import cx from 'classnames'
import Image from 'next/image'

export interface IIconProps {
  iconName: string
  size?: number
  width?: string | number
  height?: string | number
  alt?: string
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const Icon = (props: IIconProps) => {
  const { iconName, size, alt, width, height, className, onClick, onMouseEnter, onMouseLeave } = props
  const defaultSize: number = 32
  const iconSize: number = size ? size : defaultSize

  return (
    <Image
      src={`/assets/icons/${iconName}`}
      alt={alt}
      unoptimized
      loading="eager"
      width={width || iconSize}
      height={height || iconSize}
      className={cx(className, { [`is-clickable`]: onClick })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Icon
