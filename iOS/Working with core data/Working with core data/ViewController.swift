//
//  ViewController.swift
//  Working with core data
//
//  Created by James Brown on 8/7/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let appDel: AppDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
        
        let context: NSManagedObjectContext = appDel.managedObjectContext
        
//        let newUser = NSEntityDescription.insertNewObjectForEntityForName("Users", inManagedObjectContext: context)
//        
//        newUser.setValue("Foo", forKey: "username")
//        newUser.setValue("ppass123", forKey: "password")
//        
//        do {
//            try context.save()
//        }
//        catch {
//            print("Unable to save record")
//        }
        
        
        let request = NSFetchRequest(entityName: "Users")
        
        request.predicate = NSPredicate(format: "username = %@", "Foo")
        
        request.returnsObjectsAsFaults = false
        
        do {
            let results = try context.executeFetchRequest(request)
            
            if results.count > 0 {
                for result in results as! [NSManagedObject] {
                    
//                    context.deleteObject(result)
//                    
//                    do {
//                        try context.save()
//                    }
//                    catch {
//                        
//                    }
                    
                    if let username = result.valueForKey("username") as? String {
                        print(username)
                    }
                }
            }
        }
        catch {
            print("Unable to find record")
        }
        
    }

}

