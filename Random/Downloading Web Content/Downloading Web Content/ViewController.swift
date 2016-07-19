//
//  ViewController.swift
//  Downloading Web Content
//
//  Created by James Brown on 11/27/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var webView: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let url = NSURL(string: "http://www.stackoverflow.com")!
        
        print(url)
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) -> Void in
            // Will happen when task completes
            
            if let urlContent = data {
                let webContent = NSString(data: urlContent, encoding: NSUTF8StringEncoding)
                
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    self.webView.loadHTMLString(String(webContent), baseURL: nil)
                })
                
            }
            else {
                // Show error message
            }
        }
        
        task.resume()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

