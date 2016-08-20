//
//  ViewController.swift
//  core-data-to
//
//  Created by James Brown on 8/18/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext
        
        let employee = NSEntityDescription.insertNewObject(forEntityName: "Employee", into: context)
        
        employee.setValue("Joe", forKey: "name")
        
        do {
            try context.save()
        } catch {
            print("Failed to save context: \(error)")
        }
        
        let employeesFetch = NSFetchRequest<NSFetchRequestResult>(entityName: "Employee")
        
        let firstName = "Joe"
        employeesFetch.predicate = NSPredicate(format: "name == %@", firstName)
        
        do {
            let fetchedEmployees = try context.fetch(employeesFetch)
            
            print(fetchedEmployees)
        } catch {
            fatalError()
        }
        

        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
