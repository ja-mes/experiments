//
//  ViewController.swift
//  test project
//
//  Created by James Brown on 11/24/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var label: UILabel!

    @IBOutlet var textField: UITextField!
    
    @IBAction func button(sender: AnyObject) {
        print("button tapped")
        label.text = textField.text
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("test")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

