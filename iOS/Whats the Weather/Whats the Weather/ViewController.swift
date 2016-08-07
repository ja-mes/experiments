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
    @IBOutlet weak var forecastLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func lookupWeather(sender: AnyObject) {
        var wasSuccessful = false
        
        if let url = NSURL(string: "http://www.weather-forecast.com/locations/" + city.text!.stringByReplacingOccurrencesOfString(" ", withString: "-") + "/forecasts/latest") {
            
            let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) -> Void in
                if let urlContent = data {
                    
                    let webContent = NSString(data: urlContent, encoding: NSUTF8StringEncoding)
                    
                    let websiteArray = webContent?.componentsSeparatedByString("3 Day Weather Forecast Summary:</b><span class=\"read-more-small\"><span class=\"read-more-content\"> <span class=\"phrase\">")
                    
                    if websiteArray?.count > 1 {
                        let weatherText = websiteArray![1].componentsSeparatedByString("</span></span></span>")[0].stringByReplacingOccurrencesOfString("&deg;", withString: "°")
                        
                        wasSuccessful = true
                        
                        dispatch_async(dispatch_get_main_queue(), {
                            self.forecastLabel.text = weatherText
                        })
                    }
                }
                
            }
            
            if wasSuccessful == false {
                self.forecastLabel.text = "Could not find weather for that city"
            }
            
            task.resume()
            
        }
        
    }

}

