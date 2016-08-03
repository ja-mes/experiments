//
//  ViewController.swift
//  Downloading an Image
//
//  Created by James Brown on 12/15/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var image: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let url = NSURL(string: "https://upload.wikimedia.org/wikipedia/commons/f/fb/H-IIA_F17_launching_AKATSUKI.jpg")
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data, response, error) -> Void in
            
            if error != nil {
                print(error)
            }
            else {
                
                var documentsDirectory: String?
                
                var paths: [AnyObject] = NSSearchPathForDirectoriesInDomains(NSSearchPathDirectory.DocumentationDirectory, NSSearchPathDomainMask.UserDomainMask, true)
                
                if paths.count > 0 {
                    
                }
                
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    if let img = UIImage(data: data!) {
                        self.image.image = img
                    }
                })

            }
            
        }
        
        task.resume()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

