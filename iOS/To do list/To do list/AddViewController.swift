//
//  AddViewController.swift
//  To do list
//
//  Created by James Brown on 8/4/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class AddViewController: UIViewController {
    
    // MARK: Outlets
    @IBOutlet weak var item: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    // MARK: Actions
    @IBAction func add(sender: AnyObject) {
        let todos = NSUserDefaults.standardUserDefaults().objectForKey("todo")
        
        if let todoArray = todos as? NSArray {
            let items = todoArray.arrayByAddingObject(item.text!)
            
            NSUserDefaults.standardUserDefaults().setObject(items, forKey: "todo")
        }
        else {
            NSUserDefaults.standardUserDefaults().setObject([item.text!], forKey: "todo")
        }
        
        print(NSUserDefaults.standardUserDefaults().objectForKey("todo"))
        
        //NSUserDefaults.standardUserDefaults().setObject(item.text, forKey: "todo")
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
