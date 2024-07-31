import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategouryCrousel from './CategouryCrousel'
import Latestjobs from './Latestjobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const naviget = useNavigate();

  useEffect(()=>{
    if (user?.role === "recruiter") {
      naviget("/admin/companies")
    }
  }, [])

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategouryCrousel />
      <Latestjobs />
      <Footer />
    </div>
  )
}

export default Home
