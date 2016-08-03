//
//  ViewController.swift
//  Core Data Demo
//
//  Created by James Brown on 8/3/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let appDel: AppDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
        
        let context: NSManagedObjectContext = appDel.managedObjectContext
        
        var newUser = NSEntityDescription.insertNewObjectForEntityForName("Users", inManagedObjectContext: context)
        
        newUser.setValue("James", forKey: "username")
        newUser.setValue("foo", forKey: "password")
        
        do {
            try context.save()
        } catch {
            print("Unable to save")
        }
        
        let request = NSFetchRequest(entityName: "Users")
        request.returnsObjectsAsFaults = false
        
        do {
            let results = try context.executeFetchRequest(request)
            print(results)
        } catch {
            print("Unable to find")
        }
        
    }


}

