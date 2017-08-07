//
//  Constants.swift
//  Weathered
//
//  Created by Jake Christopher on 3/7/17.
//  Copyright © 2017 Jake Christopher Attard. All rights reserved.
//

import Foundation

typealias DownloadComplete = () -> ()

let API_HOMEPAGE = "http://openweathermap.org/"
let NOTIF_DOWNLOAD_COMPLETE = NSNotification.Name("dataDownloaded")

let API_KEY = "&appid=eb5606e256d17f43ea52acc4ed37c8e0"
let API_UNITS = "&units=metric"
let LONG = Location.instance.longitude
let LAT = Location.instance.latitude

let API_URL_CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/weather?lat=\(LAT)&lon=\(LONG)\(API_UNITS)\(API_KEY)"
let API_URL_FORECAST = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=\(LAT)&lon=\(LONG)&cnt=8\(API_UNITS)\(API_KEY)"
