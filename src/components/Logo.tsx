import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showCampusBadge?: boolean
  campusName?: string
  href?: string
  className?: string
}

export default function Logo({
  variant = 'dark',
  size = 'md',
  showCampusBadge = true,
  campusName,
  href = '/',
  className = '',
}: LogoProps) {
  // Height sizing mapped to maintain original proportions
  const dimensions = {
    sm: { height: 32, width: 47 },
    md: { height: 40, width: 59 },
    lg: { height: 52, width: 76 },
  }[size]

  const logoSrc =
    variant === 'light'
      ? '/hult-prize-logo-light.png'
      : '/hult-prize-logo-dark.png'

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official EF Hult Prize Logo Asset */}
      <div className="relative flex-shrink-0" style={{ height: dimensions.height }}>
        <Image
          src={logoSrc}
          alt="EF Hult Prize"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Official Brand Wordmark & OnCampus Hierarchy */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-extrabold tracking-tight leading-none ${
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
            } ${variant === 'light' ? 'text-white' : 'text-brand-midnight'}`}
          >
            EF Hult Prize
          </span>
          {showCampusBadge && (
            <span
              className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full px-2 py-0.5 text-[10px] leading-tight ${
                variant === 'light'
                  ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/40'
                  : 'bg-brand-pink/10 text-brand-pink border border-brand-pink/30'
              }`}
            >
              OnCampus
            </span>
          )}
        </div>
        {campusName && (
          <span
            className={`text-[11px] font-medium leading-tight mt-0.5 ${
              variant === 'light' ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {campusName}
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
