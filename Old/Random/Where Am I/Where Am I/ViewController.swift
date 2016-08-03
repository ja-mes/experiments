//
//  ViewController.swift
//  Where Am I
//
//  Created by James Brown on 12/1/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit
import CoreLocation


class ViewController: UIViewController, CLLocationManagerDelegate {
    
    
    @IBOutlet var latitudeLabel: UILabel!
    @IBOutlet var longitudeLabel: UILabel!
    @IBOutlet var courseLabel: UILabel!
    @IBOutlet var speedLabel: UILabel!
    @IBOutlet var altitudeLabel: UILabel!
    @IBOutlet var addressLabel: UILabel!
    
    var manager:CLLocationManager!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        manager = CLLocationManager()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }
    
    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let userLocation:CLLocation = locations[0]
        
        self.latitudeLabel.text = String(userLocation.coordinate.latitude)
        self.longitudeLabel.text = String(userLocation.coordinate.longitude)
        
        self.courseLabel.text = String(userLocation.course)
        self.speedLabel.text = String(userLocation.speed)
        
        self.altitudeLabel.text = String(userLocation.altitude)
        
        CLGeocoder().reverseGeocodeLocation(userLocation) { (placemarks, error) -> Void in
            if error != nil {
                print(error)
            } else {
                if let p:CLPlacemark = CLPlacemark(placemark: placemarks![0]) {
                    var subThoroughfare:String = ""
                    
                    if(p.subThoroughfare != nil) {
                        subThoroughfare = p.subThoroughfare!
                    }
                    
                    self.addressLabel.text = "\(subThoroughfare) \(p.thoroughfare!) \n \(p.subLocality!) \n  \(p.subAdministrativeArea!) \n \(p.postalCode!) \n \(p.country!)"
                }
            }
        }

    }
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

