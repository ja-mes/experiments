//
//  ViewController.swift
//  Swipes and Shakes
//
//  Created by James Brown on 12/2/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    
    func swiped(gesture: UIGestureRecognizer) {
        if let swipeGesture = gesture as? UISwipeGestureRecognizer {
            
            switch swipeGesture.direction {
                case UISwipeGestureRecognizerDirection.Right:
                    print("swiped right")
                case UISwipeGestureRecognizerDirection.Up:
                    print("swiped up")
                default:
                    break
            }
        }
    }
    
    
    override func motionEnded(motion: UIEventSubtype, withEvent event: UIEvent?) {
        if event?.subtype == UIEventSubtype.MotionShake {
            print("Device was shook")
        }
    }

    override func viewDidLoad(){
        super.viewDidLoad()
        
        let swipeRight = UISwipeGestureRecognizer(target: self, action: "swiped:")
        swipeRight.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeRight)
        
        let swipeUp = UISwipeGestureRecognizer(target: self, action: "swiped:")
        swipeUp.direction = UISwipeGestureRecognizerDirection.Up
        self.view.addGestureRecognizer(swipeUp)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

