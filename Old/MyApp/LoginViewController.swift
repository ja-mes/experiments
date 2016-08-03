//
//  LoginViewController.swift
//  MyApp
//
//  Created by James Brown on 8/1/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    @IBOutlet var dialogView: DesignableView!
    
    @IBAction func closeButtonDidTouch(sender: AnyObject) {
        dismissViewControllerAnimated(true, completion: nil)
    }
    @IBAction func loginButtonDidTouch(sender: AnyObject) {
        dialogView.animation = "shake"
        dialogView.animate()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
