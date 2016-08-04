//
//  ViewController.swift
//  Controlling the keyboard
//
//  Created by James Brown on 8/4/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var textField: UITextField!
    @IBOutlet weak var textLabel: UILabel!
    
    @IBAction func buttonPress(sender: AnyObject) {
        textLabel.text = textField.text
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

