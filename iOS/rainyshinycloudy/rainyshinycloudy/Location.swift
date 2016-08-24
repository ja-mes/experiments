//
//  Location.swift
//  rainyshinycloudy
//
//  Created by James Brown on 8/23/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import CoreLocation

class Location {
    static var sharedInstance = Location()
    
    private init() {}
    
    var latitude: Double!
    var longitude: Double!
}
