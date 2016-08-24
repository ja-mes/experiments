//
//  Constants.swift
//  rainyshinycloudy
//
//  Created by James Brown on 8/20/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import Foundation

let CURRENT_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?lat=\(Location.sharedInstance.latitude!)&lon=\(Location.sharedInstance.longitude!)&appid=91c0efad0844343d8ab0c65349882270"
let FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=\(Location.sharedInstance.latitude!)&lon=\(Location.sharedInstance.longitude!)&cnt=10&mode=json&appid=91c0efad0844343d8ab0c65349882270"

typealias DownloadComplete = () -> ()

