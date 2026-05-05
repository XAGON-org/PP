import React from 'react'
import AnimatedProfileCard from '../components/AboutMe'
import Skills from '../components/Skills'
import GithubC from '../components/GithubContributions'
import '../styles/main-about.scss'
import { Abt } from '../components/Abt'

export default function About() {
  return (
    <div id='about' className='section'>
      <div className='about-container grid'>
        <Abt />
        <AnimatedProfileCard />
        {/* <Skills />
        <GithubC /> */}
      </div>
    </div>
  )
}
