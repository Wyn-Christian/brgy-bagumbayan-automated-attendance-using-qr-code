'use client';

import HomeHero from '../home-hero';
import HomeFeatures from '../home-features';
import HomeStatistics from '../home-statistics';
import HeroCallToAction from '../hero-call-to-action';
import HomeSystemProcess from '../home-system-process';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <HomeHero />

      <HomeFeatures />

      <HomeStatistics />

      <HomeSystemProcess />

      <HeroCallToAction />
    </>
  );
}
