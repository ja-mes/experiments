//
//  ViewController.swift
//  Whats the Weather
//
//  Created by James Brown on 8/6/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var city: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func lookupWeather(sender: AnyObject) {
        //let url = NSURL(fileURLWithPath: "http://www.weather-forcast.com/locations/" + city.text! + "/forcasts/latest")
//        let url = NSURL(fileURLWithPath: "https://www.google.com")
//        
//        let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) in
//            
//            if let urlContent = data {
//                let webContent = NSString(data: urlContent, encoding: NSUTF8StringEncoding)
//                
//                dispatch_async(dispatch_get_main_queue(), {
//                    print(webContent)
//                })
//            }
//        }
//        
//        task.resume()
//        
        
        let url = NSURL(string: "http://www.weather-forcast.com/locations/Paris/forcasts/latest")!
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) in
            // will happen when task completes
            
            if let urlContent = data {
                let webContent = NSString(data: urlContent, encoding: NSUTF8StringEncoding)
                
                print(webContent)
                
            } else {
                // show error message
                
            }
        }
        
        task.resume()
        

    }

}

