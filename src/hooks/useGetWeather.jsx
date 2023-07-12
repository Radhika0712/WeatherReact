import React from 'react'
import { useState } from 'react'
import { getCurrentWeather,getTodayForecast,get5DayForecast,findCoordinates } from '../api/WeatherServices'

const useGetWeather = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorState, setErrorState] = useState(false)

    const [weatherInfo, setWeatherInfo] = useState([])

    const getCurrentWeatherInfo = async (lati,long)=>{
      console.log("GCWI")
        setIsLoading(true)
        const currentWeather = await getCurrentWeather(lati, long)
        setCurrentWeatherData(currentWeather)
        setIsLoading(false)
    }

    const getTodayForecastInfo = async (lat,lon)=>{
      console.log("GTFI")
      const todayForecast = await getTodayForecast(lat,lon)
      setTodayForecastData(todayForecast);
      
    }

    const getWeekForecastInfo = async (lat,lon)=>{
      console.log("GWFI")
      const weekForecast = await get5DayForecast(lat,lon)
      setWeekForecastData(weekForecast)
      await getWeatherInfo()
    }

    const getCoordinatesData = async (cityName)=>{
      setErrorState(false)
      setIsLoading(true)
      try{
        const cityData = await findCoordinates(cityName)
        getWeatherInfo(cityData.lat,cityData.lon,cityName)
      }
      catch(err){
        setErrorState(err.message)
      }
      
    }



    const getWeatherInfo = async(lat,lon,cityName)=>{
      try{
        let currentWeather = await getCurrentWeather(lat, lon)
        const todayForecast = await getTodayForecast(lat,lon)
        const weekForecast = await get5DayForecast(lat,lon)
        currentWeather = {...currentWeather,name:cityName.toUpperCase()}
        setWeatherInfo([currentWeather,todayForecast,weekForecast])
        setIsLoading(false)
      }
      catch(err){
        console.log("what error")
      }
    }

  return {
    isLoading,
    getCoordinatesData,
    errorState,
    weatherInfo
  }
}

export default useGetWeather