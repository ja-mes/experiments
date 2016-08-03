//
//  ViewController.swift
//  Guessing Game
//
//  Created by James Brown on 11/25/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
  
    var randomNum = arc4random_uniform(6);
    
    @IBOutlet var textField: UITextField!
    @IBOutlet var correctLabel: UILabel!
    
    @IBAction func submitButton(sender: AnyObject) {
        let userNum = UInt32(textField.text!)
//        let randomNum = Int(randomNum!)
        
        print(randomNum)
        print(userNum)
        
        if userNum == randomNum {
            correctLabel.text = "Correct!"
            randomNum = arc4random_uniform(6);
        }
        else {
            correctLabel.text = "Wrong!"
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

