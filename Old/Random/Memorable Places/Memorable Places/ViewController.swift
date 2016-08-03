//
//  ViewController.swift
//  Memorable Places
//
//  Created by James Brown on 12/1/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit
import MapKit

class ViewController: UIViewController, CLLocationManagerDelegate {

    @IBOutlet var map: MKMapView!
    
    var manager: CLLocationManager!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        manager = CLLocationManager()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
        
        
        let uilpgr = UILongPressGestureRecognizer(target: self, action: "action:")
        uilpgr.minimumPressDuration = 2.0
        
        map.addGestureRecognizer(uilpgr)
    }
    
    func action(gestureReconizer:UIGestureRecognizer) {
        if gestureReconizer.state == UIGestureRecognizerState.Began {
            let touchPoint = gestureReconizer.locationInView(self.map)
            let newCoordinate = self.map.convertPoint(touchPoint, toCoordinateFromView: self.map)
            let location = CLLocation(latitude: newCoordinate.latitude, longitude: newCoordinate.longitude)
            
            CLGeocoder().reverseGeocodeLocation(location, completionHandler: { (placemarks, error) -> Void in
                
                var title = ""
                
                if(error == nil) {
                    var subThoroughfare:String! =  ""
                    var thoroughfare:String! = ""

                    if let p = placemarks?[0] {
                        if p.subThoroughfare != nil {
                            subThoroughfare = p.subThoroughfare
                            
                        }
                        
                        if p.thoroughfare != nil {
                            thoroughfare = p.thoroughfare
                            
                        }

                    }
                    
                    title = "\(subThoroughfare) \(thoroughfare)"
                    print(title)
                }
                
                if title == "" {
                    print("title")
                    title = "Added \(NSDate())"
                }
                
                places.append(["name":title, "lat":String(newCoordinate.latitude ), "long":String(newCoordinate.longitude)])
                
                
                let annotation = MKPointAnnotation()
                annotation.coordinate = newCoordinate
                annotation.title = title
                self.map.addAnnotation(annotation)
                
            })

            
            
        }
        

    }
    
    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let userLocation:CLLocation = locations[0]
        
        let latitude = userLocation.coordinate.latitude
        let longitude = userLocation.coordinate.longitude
        
        let latDelta:CLLocationDegrees = 0.01
        let lonDelta:CLLocationDegrees = 0.01
        
        let coordinate:CLLocationCoordinate2D = CLLocationCoordinate2DMake(latitude, longitude)
        let span:MKCoordinateSpan = MKCoordinateSpanMake(latDelta, lonDelta)
        
        let region:MKCoordinateRegion = MKCoordinateRegionMake(coordinate, span)
        
        
        self.map.setRegion(region, animated: true)
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

