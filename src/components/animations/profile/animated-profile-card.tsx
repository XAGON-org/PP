'use client';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { cn } from '@lib/utils';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useRef } from 'react';




/**
 * A presentational component that displays the content of a user profile card.
 * It is designed to be composed within other components, such as an animation container.
 */


export interface SocialLink {
  id: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

export interface Skill {
  name: string;
  logo: string;
}

export interface sftSkill {
  name: string;
  logo: string;
}

export interface ProfileCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  bio: string;
  avatarSrc: string;
  avatarFallback: string;
  variant?: 'default' | 'on-accent';
  socials?: SocialLink[];
  skills?: Skill[];
  sftskills?: string[];
  showAvatar?: boolean;
  titleStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  descriptionClassName?: string;
  bioClassName?: string;
  footerClassName?: string;
}

export const ProfileCardContent = React.forwardRef<
  HTMLDivElement,
  ProfileCardContentProps
>(
  (
    {
      className,
      name,
      role,
      bio,
      avatarSrc,
      avatarFallback,
      variant = 'default',
      socials = [],
      skills = [],
      sftskills = [],
      showAvatar = true,
      titleStyle,
      cardStyle,
      descriptionClassName,
      bioClassName,
      footerClassName,
      ...props
    },
    ref
  ) => {
    const isOnAccent = variant === 'on-accent';

    return (
      <Card
        ref={ref}
        className={cn(
          'w-full h-full p-8 flex flex-col rounded-3xl border-0',
          isOnAccent
            ? 'text-[var(--on-accent-foreground)]'
            : 'bg-card text-card-foreground',
          className
        )}
        style={cardStyle}
        {...props}
      >
        {/* HEADER */}
        <CardHeader className="p-0">
          <div className={cn('flex-shrink-0', !showAvatar && 'invisible')}>
            <Avatar
              className="h-16 w-16 ring-2 ring-offset-4 ring-offset-card"
              style={
                {
                  '--tw-ring-color': 'var(--accent-color)',
                } as React.CSSProperties
              }
            >
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </div>

          <CardDescription
            className={cn(
              'pt-6 text-left',
              !isOnAccent && 'text-muted-foreground',
              descriptionClassName
            )}
            style={
              isOnAccent ? { color: 'var(--on-accent-muted-foreground)' } : {}
            }
          >
            {role}
          </CardDescription>

          <CardTitle
            className="text-3xl text-left"
            style={{
              ...(isOnAccent
                ? { color: 'var(--on-accent-foreground)' }
                : {}),
              ...titleStyle,
            }}
          >
            {name}
          </CardTitle>
        </CardHeader>

        {/* BIO */}
        <CardContent className="p-0 flex-grow mt-6">
          <p
            className={cn(
              'text-base leading-relaxed text-left',
              !isOnAccent && 'text-foreground/80',
              bioClassName
            )}
            style={isOnAccent ? { opacity: 0.9 } : {}}
          >
            {bio}
          </p>

          <div className="projects">
            <span className="projects-label">Expertise in </span>
            {sftskills.map((tag, i) => (
              <span key={i} className="project-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* SKILLS (SCROLLABLE) */}
          {skills.length > 0 && (
            <div className="mt-6 max-h-32 overflow-y-auto pr-2">
              <div className="grid grid-cols-6 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center text-xs"
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="h-10 w-10 object-contain mb-1"
                    />
                    <span className="truncate w-full">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        {/* FOOTER */}
        {socials.length > 0 && (
          <CardFooter className={cn('p-0 mt-6', footerClassName)}>
            <div
              className={cn(
                'flex items-center gap-4',
                !isOnAccent && 'text-muted-foreground'
              )}
              style={
                isOnAccent
                  ? { color: 'var(--on-accent-muted-foreground)' }
                  : {}
              }
            >
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'transition-opacity',
                    isOnAccent
                      ? 'hover:opacity-75'
                      : 'hover:text-foreground'
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);

ProfileCardContent.displayName = 'ProfileCardContent';

export interface AnimatedProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The React node to display as the base layer of the card. */
  baseCard: React.ReactNode;
  /** The React node to display as the overlay layer, revealed on hover. */
  overlayCard: React.ReactNode;
  /**
   * The accent color used for the border and avatar ring.
   * Accepts any valid CSS color value.
   */
  accentColor?: string;
  /**
   * The color for primary text when on the accent background.
   * @default '#c7c7c7'
   */
  onAccentForegroundColor?: string;
  /**
   * The color for secondary/muted text when on the accent background.
   * @default '#eeeeeead'
   */
  onAccentMutedForegroundColor?: string;
}

/**
 * A container component that creates a circular reveal animation on hover.
 * It composes two child components, a `baseCard` and an `overlayCard`,
 * to create the effect.
 */
export const AnimatedProfileCard = React.forwardRef<
  HTMLDivElement,
  AnimatedProfileCardProps
>(
  (
    {
      className,
      accentColor = 'var(--primary)',
      onAccentForegroundColor = '#c7c7c7',
      onAccentMutedForegroundColor = '#eeeeeead',
      baseCard,
      overlayCard,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const overlayThemeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const initialClipPath = 'circle(40px at 64px 64px)';
    const hoverClipPath = 'circle(150% at 64px 64px)';

    useGSAP(
      () => {
        gsap.set(overlayRef.current, { clipPath: initialClipPath });
      },
      { scope: containerRef }
    );
    const handleMouseEnter = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: hoverClipPath,
        duration: 0.7,
        ease: 'expo.inOut',
      });
    };
    const handleMouseLeave = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: initialClipPath,
        duration: 1.2,
        ease: 'expo.out(1, 1)',
      });
    };

    return (
      <div
        ref={setContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          {
            '--accent-color': accentColor,
            '--on-accent-foreground': onAccentForegroundColor,
            '--on-accent-muted-foreground': onAccentMutedForegroundColor,
            borderColor: 'var(--accent-color)',
          } as React.CSSProperties
        }
        className={cn(
          'relative h-fit w-[40%] overflow-hidden rounded-3xl border-2',
          className
        )}
        {...props}
      >
        <div className='h-full w-full'>{baseCard}</div>
        <div
          ref={overlayRef}
          className={cn('absolute inset-0 h-full w-full', overlayThemeClass)}
        >
          {overlayCard}
        </div>
      </div>
    );
  }
);
AnimatedProfileCard.displayName = 'AnimatedProfileCard';