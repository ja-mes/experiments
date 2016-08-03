//
//  ViewController.swift
//  Controlling The Keyboard
//
//  Created by James Brown on 11/26/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {

   
    @IBOutlet var resultLabel: UILabel!
    @IBOutlet var textField: UITextField!
    
    @IBAction func buttonClick(sender: AnyObject) {
        resultLabel.text = textField.text
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.text.delegate = self
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    func textFieldShouldReturn(textField: UITextField!) -> Bool {
        textField.resignFirstResponder()
        
        return true
    }

}

