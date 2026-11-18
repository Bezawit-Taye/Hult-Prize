import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showCampusBadge?: boolean
  subtitle?: string
  href?: string
  className?: string
}

export default function Logo({
  variant = 'dark',
  size = 'md',
  showCampusBadge = true,
  subtitle,
  href = '/',
  className = '',
}: LogoProps) {
  // Sizing for the official uploaded square logo (idEuIqpG_7_1794977573764.jpeg)
  const dimensions = {
    sm: { size: 36 },
    md: { size: 46 },
    lg: { size: 58 },
  }[size]

  // Use the exact uploaded official logo asset
  const logoSrc = '/idEuIqpG_7_1794977573764.jpeg'

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Uploaded EF Hult Prize Logo Badge */}
      <div
        className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-white/20 bg-brand-midnight"
        style={{ width: dimensions.size, height: dimensions.size }}
      >
        <Image
          src={logoSrc}
          alt="HULT PRIZE AASTU Official Logo"
          width={dimensions.size}
          height={dimensions.size}
          priority
          className="w-full h-full object-cover"
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
            } ${
              variant === 'light'
                ? 'text-white'
                : 'text-brand-midnight dark:text-white'
            }`}
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
                  : 'bg-brand-pink/15 dark:bg-brand-pink/25 text-brand-pink border border-brand-pink/35 dark:border-brand-pink/40 shadow-sm'
              }`}
            >
              AASTU
            </span>
          )}
        </div>
        {subtitle && (
          <span
            className={`text-[10px] sm:text-[11px] font-medium leading-tight mt-1 truncate ${
              variant === 'light'
                ? 'text-gray-300'
                : 'text-brand-midnight/65 dark:text-slate-400'
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
