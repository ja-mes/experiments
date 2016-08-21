//
//  Constants.swift
//  rainyshinycloudy
//
//  Created by James Brown on 8/20/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import Foundation

let BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
let LATITUDE = "lat="
let LONGITUDE = "&lon="
let APP_ID = "&appid="
let API_KEY = "91c0efad0844343d8ab0c65349882270"

let CURRENT_WEATHER_URL = "\(BASE_URL)\(LATITUDE)-36\(LONGITUDE)123\(APP_ID)\(API_KEY)"

typealias DownloadComplete = () -> ()

