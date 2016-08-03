//
//  MenuViewController.swift
//  MyApp
//
//  Created by James Brown on 8/2/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class MenuViewController: UIViewController {

    @IBOutlet var dialogView: DesignableView!
    
    @IBAction func closeButtonDidTouch(sender: AnyObject) {
        dismissViewControllerAnimated(true, completion: nil)
        
        dialogView.animation = "fall"
        dialogView.animate()
    }
}
