//
//  ViewController.swift
//  Current Conditions
//
//  Created by James Brown on 11/29/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var cityField: UITextField!
    
    @IBOutlet var resultLabel: UILabel!
    
    @IBAction func submit(sender: AnyObject) {
        if let city = cityField.text {
            
            let url = NSURL(string: "http://www.weather-forecast.com/locations/" + city + "/forecasts/latest")!
            
            let task = NSURLSession.sharedSession().dataTaskWithURL(url, completionHandler: { (data, response, error) -> Void in
                
                if let urlContent = data {
                    let webContent = NSString(data: urlContent, encoding: NSUTF8StringEncoding)
                    
                    let websiteArray = webContent?.componentsSeparatedByString("3 Day Weather Forecast Summary:</b><span class=\"read-more-small\"><span class=\"read-more-content\"> <span class=\"phrase\">")
                    
                    if websiteArray!.count > 0 {
                        let weatherArray = websiteArray![1].componentsSeparatedByString("</span>")
                        
                        if weatherArray.count > 0 {
                            let weatherSummary = weatherArray[0]
                            
                            print(weatherSummary)
                            
                            dispatch_async(dispatch_get_main_queue(), { () -> Void in
                                self.resultLabel.text = weatherSummary
                            })
                        }
                    
                    }
                    
                    
                }
                else {
                    // No data returned - show error message
                }
                
            })
            
            task.resume()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

