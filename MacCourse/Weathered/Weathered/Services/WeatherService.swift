//
//  WeatherService.swift
//  Weathered
//
//  Created by Jake Christopher on 3/7/17.
//  Copyright © 2017 Jake Christopher Attard. All rights reserved.
//

import Foundation
import Alamofire

class WeatherService {
    static let instance = WeatherService()
    fileprivate var _currentWeather = CurrentWeather()
    fileprivate var _forecast = [Forecast]()
    
    var currentWeather: CurrentWeather {
        get {
            return _currentWeather
        } set {
            _currentWeather = newValue
        }
    }
    
    var forecast: [Forecast] {
        get {
            return _forecast
        } set {
            _forecast = newValue
        }
    }
    
    func downloadWeatherDetails (completed: @escaping DownloadComplete) {
        let url = URL(string: API_URL_CURRENT_WEATHER)
        Alamofire.request(url!).responseData { (response) in
            
            self.currentWeather = CurrentWeather.loadCurrentWeatherFromData(response.data!)
            completed()
        }
    }
    
    func downloadForeCast (completed: @escaping DownloadComplete) {
        let url = URL(string: API_URL_FORECAST)
        Alamofire.request(url!).response { (response) in
            self.forecast = Forecast.loadForecastfromData(response.data!)
            if self.forecast.count > 0 {
                self.forecast.remove(at: 0)
            }
            completed()
        }
    }
}
