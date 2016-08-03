//
//  ViewController.swift
//  Core Data Demo
//
//  Created by James Brown on 12/14/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let appDel: AppDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
        
        let context: NSManagedObjectContext = appDel.managedObjectContext
        
        /*
        let newUser = NSEntityDescription.insertNewObjectForEntityForName("Users", inManagedObjectContext: context)
        
        newUser.setValue("Foo", forKey: "username")
        newUser.setValue("fo100", forKey: "password")
        
        do {
            try context.save()
        }
        catch {
             print("Error saving")
        }
        */
        
        
        let request = NSFetchRequest(entityName: "Users")
        request.predicate = NSPredicate(format: "username = %@ ", "Baz")
            
        request.returnsObjectsAsFaults = false
        
        do {
            let results = try context.executeFetchRequest(request)
            
            if(results.count > 0) {
                for result in results as! [NSManagedObject] {
                    
                    context.Object(result)
                    //result.setValue("Baz", forKey: "username")
                    
                    do {
                        try context.save()
                    }
                    catch {
                        print("There was a problem saving")
                    }
                    
                    if let username = result.valueForKey("username") as? String {
                        print(username)
                    }
                }
            }

        }
        catch {
            print("Fetch failed")
        }
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

