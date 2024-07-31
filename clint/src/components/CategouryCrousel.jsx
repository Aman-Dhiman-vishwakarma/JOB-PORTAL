import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchedquery } from '@/redux/jobSlice'

const category = [
    "Frontend Devloper",
    "Backend Devloper",
    "Data Science",
    "Graphics Designing",
    "FullStack Devloper",
    "MernStack Devloper"
]

const CategouryCrousel = () => {
  const dispatch = useDispatch();
  const naviget = useNavigate();
  
  const searchjobhandler = (categoury) => {
    dispatch(setsearchedquery(categoury))
    naviget('/browse')
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-14">
        <CarouselContent>
            {category.map((cate, index)=><CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3" ><Button onClick={()=>{searchjobhandler(cate)}} variant="outline" className="rounded-full">{cate}</Button></CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
  <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategouryCrousel
