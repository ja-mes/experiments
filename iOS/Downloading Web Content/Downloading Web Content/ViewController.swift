//
//  ViewController.swift
//  Downloading Web Content
//
//  Created by James Brown on 8/5/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var webView: UIWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let url = NSURL(string: "http://stackoverflow.com")!
        
        webView.loadRequest(NSURLRequest(URL: url))
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) in
            // will happen when task completes
            
            if let urlContent = data {
                let webContent = NSString(data: urlContent, encoding: NSUTF8StringEncoding)
                
                dispatch_async(dispatch_get_main_queue(), { 
                  self.webView.loadHTMLString(String(webContent!), baseURL: nil)
                })
                
            } else {
                // show error message
                
            }
        }
        
        task.resume()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

