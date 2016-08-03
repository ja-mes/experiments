//
//  LearnViewController.swift
//  MyApp
//
//  Created by James Brown on 8/2/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class LearnViewController: UIViewController {
    @IBOutlet var dialogView: DesignableView!
    @IBOutlet var bookImageView: SpringImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(true)
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewDidAppear(true)
        
        dialogView.animate()
    }
    
    @IBAction func learnButtonDidTouch(sender: AnyObject) {
        bookImageView.animation = "pop"
        bookImageView.animate()
    }
    
    @IBAction func closeButtonDidTouch(sender: AnyObject) {
        dialogView.animation = "fall"
        dialogView.animateNext {
            self.dismissViewControllerAnimated(true, completion: nil)
        }
    }
}
