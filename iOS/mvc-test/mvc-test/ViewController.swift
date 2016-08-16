//
//  ViewController.swift
//  mvc-test
//
//  Created by James Brown on 8/14/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var fullName: UILabel!
    @IBOutlet weak var renameField: UITextField!
    
    var person = Person(first: "Joe", last: "Blah")
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        fullName.text = person.fullName
        
    }

    @IBAction func renamePressed(_ sender: AnyObject) {
        if let txt = renameField.text {
            person.firstName = txt
            fullName.text = person.fullName
        }
    }


}

