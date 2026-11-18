import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'dark' | 'light'
  asset?: 'official' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showCampusBadge?: boolean
  subtitle?: string
  href?: string
  className?: string
}

export default function Logo({
  variant = 'dark',
  asset,
  size = 'md',
  showCampusBadge = true,
  subtitle,
  href = '/',
  className = '',
}: LogoProps) {
  // Dimensions calibrated to preserve the official logo aspect ratio
  const dimensions = {
    sm: { height: 34, width: 50 },
    md: { height: 44, width: 64 },
    lg: { height: 56, width: 82 },
  }[size]

  // Determine logo source
  let logoSrc = '/hult-prize-logo-dark.png'
  if (asset === 'official') {
    logoSrc = '/hult-prize-logo-official.jpeg'
  } else if (variant === 'light' || asset === 'light') {
    logoSrc = '/hult-prize-logo-light.png'
  }

  const isOfficialSquare = logoSrc.endsWith('.jpeg')

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official EF Hult Prize Logo Asset */}
      <div
        className={`relative flex-shrink-0 flex items-center justify-center overflow-hidden ${
          isOfficialSquare ? 'rounded-xl shadow-sm' : ''
        }`}
        style={{ height: dimensions.height, width: isOfficialSquare ? dimensions.height : undefined }}
      >
        <Image
          src={logoSrc}
          alt="Hult Prize Official Logo"
          width={isOfficialSquare ? dimensions.height : dimensions.width}
          height={dimensions.height}
          priority
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Official HULT PRIZE AASTU Lockup */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-black tracking-tight uppercase leading-none ${
              size === 'sm'
                ? 'text-sm sm:text-base'
                : size === 'lg'
                ? 'text-lg sm:text-2xl'
                : 'text-base sm:text-lg'
            } ${variant === 'light' ? 'text-white' : 'text-brand-midnight'}`}
          >
            HULT PRIZE
          </span>
          {showCampusBadge && (
            <span
              className={`inline-flex items-center font-black uppercase tracking-widest rounded-md px-2 py-0.5 leading-tight ${
                size === 'sm' ? 'text-[10px]' : 'text-xs'
              } ${
                variant === 'light'
                  ? 'bg-brand-pink/25 text-brand-pink border border-brand-pink/40 shadow-sm'
                  : 'bg-brand-pink/15 text-brand-pink border border-brand-pink/35 shadow-sm'
              }`}
            >
              AASTU
            </span>
          )}
        </div>
        {subtitle && (
          <span
            className={`text-[10px] sm:text-[11px] font-medium leading-tight mt-1 truncate ${
              variant === 'light' ? 'text-gray-300' : 'text-brand-midnight/65'
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90">
        {content}
      </Link>
    )
  }

  return content
}
