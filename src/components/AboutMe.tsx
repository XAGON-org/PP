'use client';

import * as React from 'react';
import {
  AnimatedProfileCard,
  ProfileCardContent,
  SocialLink,
} from './animations/profile/animated-profile-card';
import data from '../utils/data.json'

// --- Icons ---
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5..." />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 512 512" fill="currentColor">
    <path d="M389.2 48h70.6L305.6 224.2..." />
  </svg>
);

// --- Data Array ---
const cardsData = data.about.profiles;

export default function AnimatedProfileCardLightDemo() {
  return (
    <>
    <p className="text-2xl font-semibold text-center">Our Team</p>
    <div className="flex flex-col md:flex-row min-h-[100%] w-full items-center justify-center gap-6 flex-wrap bg-background p-4">
      {cardsData.map((card, index) => (
        <AnimatedProfileCard
          key={index}
          accentColor="#2b2b2bd1"
          onAccentForegroundColor="#c7c7c7"
          onAccentMutedForegroundColor="#eeeeeead"
          baseCard={
            <ProfileCardContent
              {...card}
              variant="default"
              showAvatar={false}
            />
          }
          overlayCard={
            <ProfileCardContent
              {...card}
              variant="on-accent"
              showAvatar={true}
              cardStyle={{ backgroundColor: 'var(--accent-color)' }}
            />
          }
        />
      ))}
    </div>
    </>
  );
}